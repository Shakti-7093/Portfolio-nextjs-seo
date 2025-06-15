"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Activity, AlertTriangle, CheckCircle, Info, RefreshCw, X, LogOut } from "lucide-react"
import { Button } from "./ui/button"
import { usePerformanceMonitor } from "../hooks/usePerformanceMonitor"
import { usePagePerformance } from "../hooks/usePagePerformance"
import { isAdminUser, adminLogout } from "../lib/admin-access"
import AdminLogin from "./AdminLogin"

export default function PerformanceMonitor() {
  const [isOpen, setIsOpen] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [hasAdminAccess, setHasAdminAccess] = useState(false)
  const {
    metrics,
    performanceScore,
    budgetStatus,
    isLoading,
    getLatestMetric,
    getPerformanceInsights,
    refreshMetrics,
  } = usePerformanceMonitor()
  const { performanceData } = usePagePerformance()

  useEffect(() => {
    setHasAdminAccess(isAdminUser())
  }, [])

  const handleAdminLogin = () => {
    setHasAdminAccess(true)
    setShowLogin(false)
  }

  const handleLogout = () => {
    adminLogout()
    setHasAdminAccess(false)
    setIsOpen(false)
  }

  const handleMonitorClick = () => {
    if (hasAdminAccess) {
      setIsOpen(true)
    } else {
      setShowLogin(true)
    }
  }

  // Don't show anything if not admin user
  if (!hasAdminAccess && !showLogin) {
    return null
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500"
    if (score >= 70) return "text-yellow-500"
    return "text-red-500"
  }

  const getMetricColor = (rating: string) => {
    switch (rating) {
      case "good":
        return "text-green-500"
      case "needs-improvement":
        return "text-yellow-500"
      case "poor":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B"
    const k = 1024
    const sizes = ["B", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
  }

  const formatTime = (ms: number) => {
    if (ms < 1000) return `${Math.round(ms)}ms`
    return `${(ms / 1000).toFixed(2)}s`
  }

  return (
    <>
      {/* Admin Login Modal */}
      <AnimatePresence>{showLogin && <AdminLogin onLogin={handleAdminLogin} />}</AnimatePresence>

      {/* Floating Performance Button - Only show if admin */}
      {hasAdminAccess && (
        <motion.div
          className="fixed bottom-4 right-4 z-50"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2, duration: 0.3 }}
        >
          <Button
            onClick={handleMonitorClick}
            className={`rounded-full w-12 h-12 shadow-lg ${getScoreColor(performanceScore)} bg-white dark:bg-gray-800 border-2`}
            variant="outline"
            size="icon"
          >
            <Activity size={20} />
          </Button>

          {/* Performance Score Badge */}
          <motion.div
            className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white dark:bg-gray-800 border-2 flex items-center justify-center text-xs font-bold ${getScoreColor(performanceScore)}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2.5, duration: 0.3 }}
          >
            {performanceScore}
          </motion.div>
        </motion.div>
      )}

      {/* Performance Monitor Modal */}
      <AnimatePresence>
        {isOpen && hasAdminAccess && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <Activity className="text-blue-500" size={24} />
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Performance Monitor</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Core Web Vitals & Performance Metrics</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button onClick={refreshMetrics} variant="outline" size="sm" disabled={isLoading}>
                    <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
                  </Button>
                  <Button onClick={handleLogout} variant="outline" size="sm" title="Logout">
                    <LogOut size={16} />
                  </Button>
                  <Button onClick={() => setIsOpen(false)} variant="ghost" size="sm">
                    <X size={20} />
                  </Button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Performance Score */}
                <div className="text-center">
                  <div className={`text-4xl font-bold ${getScoreColor(performanceScore)}`}>{performanceScore}</div>
                  <p className="text-gray-600 dark:text-gray-400">Overall Performance Score</p>
                </div>

                {/* Core Web Vitals */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Core Web Vitals</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {["LCP", "FID", "CLS"].map((metricType) => {
                      const metric = getLatestMetric(metricType)
                      return (
                        <div key={metricType} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900 dark:text-white">{metricType}</span>
                            {metric && (
                              <div className={`flex items-center gap-1 ${getMetricColor(metric.rating)}`}>
                                {metric.rating === "good" ? (
                                  <CheckCircle size={16} />
                                ) : metric.rating === "needs-improvement" ? (
                                  <Info size={16} />
                                ) : (
                                  <AlertTriangle size={16} />
                                )}
                              </div>
                            )}
                          </div>
                          {metric ? (
                            <div>
                              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                {metricType === "CLS" ? metric.value.toFixed(3) : formatTime(metric.value)}
                              </div>
                              <div className={`text-sm capitalize ${getMetricColor(metric.rating)}`}>
                                {metric.rating.replace("-", " ")}
                              </div>
                            </div>
                          ) : (
                            <div className="text-gray-500 dark:text-gray-400">No data</div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Page Performance */}
                {performanceData && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Page Performance</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Load Time</div>
                        <div className="text-xl font-bold text-gray-900 dark:text-white">
                          {formatTime(performanceData.loadTime)}
                        </div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">DOM Ready</div>
                        <div className="text-xl font-bold text-gray-900 dark:text-white">
                          {formatTime(performanceData.domContentLoaded)}
                        </div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Resources</div>
                        <div className="text-xl font-bold text-gray-900 dark:text-white">
                          {performanceData.resourceCount}
                        </div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Size</div>
                        <div className="text-xl font-bold text-gray-900 dark:text-white">
                          {formatBytes(performanceData.resourceSize)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Performance Budget */}
                {budgetStatus && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Performance Budget</h3>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900 dark:text-white">Budget Status</span>
                        <div
                          className={`flex items-center gap-1 ${budgetStatus.withinBudget ? "text-green-500" : "text-red-500"}`}
                        >
                          {budgetStatus.withinBudget ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
                          {budgetStatus.withinBudget ? "Within Budget" : "Over Budget"}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Total Size: {formatBytes(budgetStatus.totalSize)}
                      </div>
                      {budgetStatus.violations.length > 0 && (
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-red-600 dark:text-red-400">Violations:</div>
                          {budgetStatus.violations.map((violation, index) => (
                            <div key={index} className="text-xs text-red-600 dark:text-red-400">
                              • {violation}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Performance Insights */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Performance Insights</h3>
                  <div className="space-y-2">
                    {getPerformanceInsights().map((insight, index) => (
                      <div key={index} className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <Info size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{insight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Metrics */}
                {metrics.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Recent Metrics</h3>
                    <div className="max-h-40 overflow-y-auto">
                      <div className="space-y-2">
                        {metrics
                          .slice(-10)
                          .reverse()
                          .map((metric, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded"
                            >
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-900 dark:text-white">{metric.name}</span>
                                <span className={`text-sm ${getMetricColor(metric.rating)}`}>
                                  {metric.rating.replace("-", " ")}
                                </span>
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {metric.name === "CLS" ? metric.value.toFixed(3) : formatTime(metric.value)}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
