"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BarChart3, CheckCircle, XCircle, AlertTriangle, Eye, EyeOff, RefreshCw } from "lucide-react"
import { Button } from "./ui/button"
import { isAdminUser } from "../lib/admin-access"

interface AnalyticsStatus {
  gaLoaded: boolean
  gaConfigured: boolean
  trackingId: string | null
  consentGiven: boolean
  dataLayerExists: boolean
  recentEvents: any[]
  errors: string[]
}

export default function AnalyticsDebugger() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasAdminAccess, setHasAdminAccess] = useState(false)
  const [status, setStatus] = useState<AnalyticsStatus>({
    gaLoaded: false,
    gaConfigured: false,
    trackingId: null,
    consentGiven: false,
    dataLayerExists: false,
    recentEvents: [],
    errors: [],
  })

  useEffect(() => {
    setHasAdminAccess(isAdminUser())
  }, [])

  const checkAnalyticsStatus = () => {
    const errors: string[] = []
    let gaLoaded = false
    let gaConfigured = false
    let trackingId: string | null = null
    let consentGiven = false
    let dataLayerExists = false
    let recentEvents: any[] = []

    try {
      // Check if Google Analytics script is loaded
      gaLoaded = typeof window.gtag === "function"
      if (!gaLoaded) {
        errors.push("Google Analytics script not loaded")
      }

      // Check tracking ID
      trackingId = process.env.NEXT_PUBLIC_GA_ID || null
      if (!trackingId) {
        errors.push("GA_TRACKING_ID not found in environment variables")
      } else {
        gaConfigured = true
      }

      // Check consent
      const consent = localStorage.getItem("cookie-consent")
      if (consent) {
        const consentData = JSON.parse(consent)
        consentGiven = consentData.analytics === true
      }
      if (!consentGiven) {
        errors.push("Analytics consent not given by user")
      }

      // Check dataLayer
      dataLayerExists = Array.isArray(window.dataLayer)
      if (!dataLayerExists) {
        errors.push("Google Analytics dataLayer not found")
      } else {
        // Get recent events from dataLayer
        recentEvents = window.dataLayer.slice(-10) || []
      }

      // Additional checks
      if (gaLoaded && !window.gtag) {
        errors.push("gtag function not available")
      }
    } catch (error) {
      errors.push(`Error checking analytics: ${error}`)
    }

    setStatus({
      gaLoaded,
      gaConfigured,
      trackingId,
      consentGiven,
      dataLayerExists,
      recentEvents,
      errors,
    })
  }

  useEffect(() => {
    if (hasAdminAccess && isOpen) {
      checkAnalyticsStatus()
    }
  }, [hasAdminAccess, isOpen])

  const sendTestEvent = () => {
    if (window.gtag) {
      window.gtag("event", "test_event", {
        event_category: "Debug",
        event_label: "Analytics Test",
        value: 1,
      })

      // Refresh status after sending event
      setTimeout(checkAnalyticsStatus, 1000)
    }
  }

  const getStatusIcon = (condition: boolean) => {
    return condition ? (
      <CheckCircle className="text-green-500" size={16} />
    ) : (
      <XCircle className="text-red-500" size={16} />
    )
  }

  // Don't show if not admin
  if (!hasAdminAccess) return null

  return (
    <>
      {/* Analytics Debug Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 left-4 p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg z-30"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Analytics Debugger (Admin Only)"
      >
        <BarChart3 size={20} />
      </motion.button>

      {/* Analytics Debugger Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="fixed inset-4 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-y-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <BarChart3 className="text-purple-600 dark:text-purple-400" size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Analytics Debugger</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Check Google Analytics configuration and data flow
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={checkAnalyticsStatus} variant="outline" size="sm">
                      <RefreshCw size={16} className="mr-2" />
                      Refresh
                    </Button>
                    <Button onClick={() => setIsOpen(false)} variant="ghost" size="sm">
                      ✕
                    </Button>
                  </div>
                </div>

                {/* Status Overview */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">GA Script</span>
                      {getStatusIcon(status.gaLoaded)}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {status.gaLoaded ? "Loaded successfully" : "Not loaded"}
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Configuration</span>
                      {getStatusIcon(status.gaConfigured)}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{status.trackingId || "No tracking ID"}</p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">User Consent</span>
                      {getStatusIcon(status.consentGiven)}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {status.consentGiven ? "Analytics enabled" : "Consent required"}
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">DataLayer</span>
                      {getStatusIcon(status.dataLayerExists)}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {status.dataLayerExists ? `${status.recentEvents.length} events` : "Not found"}
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Status</span>
                      {getStatusIcon(status.gaLoaded && status.gaConfigured && status.consentGiven)}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {status.gaLoaded && status.gaConfigured && status.consentGiven
                        ? "Working correctly"
                        : "Issues detected"}
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Test Event</span>
                      <Button onClick={sendTestEvent} size="sm" disabled={!status.gaLoaded || !status.consentGiven}>
                        Send
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Send test event to GA</p>
                  </div>
                </div>

                {/* Errors */}
                {status.errors.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-3 flex items-center gap-2">
                      <AlertTriangle className="text-red-500" size={20} />
                      Issues Found ({status.errors.length})
                    </h3>
                    <div className="space-y-2">
                      {status.errors.map((error, index) => (
                        <div
                          key={index}
                          className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800"
                        >
                          <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Setup Instructions */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Setup Checklist</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      {getStatusIcon(!!status.trackingId)}
                      <div>
                        <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                          1. Environment Variable Set
                        </p>
                        <p className="text-xs text-blue-800 dark:text-blue-200">
                          NEXT_PUBLIC_GA_ID = {status.trackingId || "Not set"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      {getStatusIcon(status.gaLoaded)}
                      <div>
                        <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                          2. Google Analytics Script Loaded
                        </p>
                        <p className="text-xs text-blue-800 dark:text-blue-200">
                          {status.gaLoaded ? "✓ Script loaded successfully" : "✗ Script not loaded"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      {getStatusIcon(status.consentGiven)}
                      <div>
                        <p className="text-sm font-medium text-blue-900 dark:text-blue-100">3. User Consent Given</p>
                        <p className="text-xs text-blue-800 dark:text-blue-200">
                          {status.consentGiven
                            ? "✓ Analytics consent granted"
                            : "✗ User needs to accept analytics cookies"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Events */}
                {status.recentEvents.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Recent DataLayer Events ({status.recentEvents.length})
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg max-h-60 overflow-y-auto">
                      <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                        {JSON.stringify(status.recentEvents.slice(-5), null, 2)}
                      </pre>
                    </div>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Quick Actions</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    <Button
                      onClick={() => window.open("https://analytics.google.com", "_blank")}
                      variant="outline"
                      className="justify-start"
                    >
                      <Eye size={16} className="mr-2" />
                      Open Google Analytics
                    </Button>
                    <Button
                      onClick={() => {
                        localStorage.removeItem("cookie-consent")
                        window.location.reload()
                      }}
                      variant="outline"
                      className="justify-start"
                    >
                      <RefreshCw size={16} className="mr-2" />
                      Reset Cookie Consent
                    </Button>
                    <Button
                      onClick={() => {
                        console.log("Analytics Status:", status)
                        console.log("DataLayer:", window.dataLayer)
                        console.log("gtag function:", window.gtag)
                      }}
                      variant="outline"
                      className="justify-start"
                    >
                      <EyeOff size={16} className="mr-2" />
                      Log Debug Info
                    </Button>
                    <Button
                      onClick={sendTestEvent}
                      disabled={!status.gaLoaded || !status.consentGiven}
                      className="justify-start"
                    >
                      <BarChart3 size={16} className="mr-2" />
                      Send Test Event
                    </Button>
                  </div>
                </div>

                {/* Instructions */}
                <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                    How to Check Google Analytics Dashboard:
                  </h4>
                  <ol className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
                    <li>
                      1. Open{" "}
                      <a
                        href="https://analytics.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        Google Analytics
                      </a>
                    </li>
                    <li>2. Select your property (G-N1NFJTDC5V)</li>
                    <li>3. Go to Reports → Realtime to see live data</li>
                    <li>4. Navigate your site to generate events</li>
                    <li>5. Check "Events" section for custom events</li>
                  </ol>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
