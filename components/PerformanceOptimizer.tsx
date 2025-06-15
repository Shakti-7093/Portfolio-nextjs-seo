"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Zap, ImageIcon, Code, Wifi } from "lucide-react"
import { isAdminUser } from "../lib/admin-access"

interface OptimizationSuggestion {
  type: "image" | "script" | "style" | "network"
  title: string
  description: string
  impact: "high" | "medium" | "low"
  implemented: boolean
}

export default function PerformanceOptimizer() {
  const [suggestions, setSuggestions] = useState<OptimizationSuggestion[]>([])
  const [hasAdminAccess, setHasAdminAccess] = useState(false)

  useEffect(() => {
    // Check admin access
    setHasAdminAccess(isAdminUser())
  }, [])

  useEffect(() => {
    // Only run analysis if admin user
    if (!hasAdminAccess) return

    // Analyze current page and generate suggestions
    const analyzePage = () => {
      const suggestions: OptimizationSuggestion[] = []

      // Check for unoptimized images
      const images = document.querySelectorAll("img")
      const largeImages = Array.from(images).filter((img) => {
        return img.naturalWidth > 1920 || img.naturalHeight > 1080
      })

      if (largeImages.length > 0) {
        suggestions.push({
          type: "image",
          title: "Optimize Large Images",
          description: `Found ${largeImages.length} images that could be optimized for better performance.`,
          impact: "high",
          implemented: false,
        })
      }

      // Check for unused CSS
      if (document.styleSheets.length > 5) {
        suggestions.push({
          type: "style",
          title: "Reduce CSS Bundle Size",
          description: "Consider code splitting or removing unused CSS to improve load times.",
          impact: "medium",
          implemented: false,
        })
      }

      // Check for large JavaScript bundles
      if (
        performance
          .getEntriesByType("resource")
          .some((r) => r.name.includes(".js") && (r as PerformanceResourceTiming).transferSize > 500000)
      ) {
        suggestions.push({
          type: "script",
          title: "Optimize JavaScript Bundles",
          description: "Large JavaScript files detected. Consider code splitting and lazy loading.",
          impact: "high",
          implemented: false,
        })
      }

      // Check network conditions
      if ("connection" in navigator) {
        const connection = (navigator as any).connection
        if (connection && (connection.effectiveType === "2g" || connection.effectiveType === "slow-2g")) {
          suggestions.push({
            type: "network",
            title: "Optimize for Slow Networks",
            description: "Slow network detected. Consider implementing progressive loading.",
            impact: "high",
            implemented: false,
          })
        }
      }

      setSuggestions(suggestions)
    }

    // Run analysis after page load
    if (document.readyState === "complete") {
      setTimeout(analyzePage, 1000)
    } else {
      window.addEventListener("load", () => setTimeout(analyzePage, 1000))
    }
  }, [hasAdminAccess])

  // Don't render anything if not admin user or no suggestions
  if (!hasAdminAccess || suggestions.length === 0) return null

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "text-red-500 bg-red-50 dark:bg-red-900/20"
      case "medium":
        return "text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
      case "low":
        return "text-green-500 bg-green-50 dark:bg-green-900/20"
      default:
        return "text-gray-500 bg-gray-50 dark:bg-gray-900/20"
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon size={16} />
      case "script":
        return <Code size={16} />
      case "style":
        return <Code size={16} />
      case "network":
        return <Wifi size={16} />
      default:
        return <Zap size={16} />
    }
  }

  return (
    <motion.div
      className="fixed bottom-20 right-4 max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 z-40"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 3, duration: 0.5 }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Zap className="text-blue-500" size={20} />
        <h3 className="font-semibold text-gray-900 dark:text-white">Performance Tips</h3>
        <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full">
          Admin Only
        </span>
      </div>

      <div className="space-y-2">
        {suggestions.slice(0, 3).map((suggestion, index) => (
          <motion.div
            key={index}
            className="flex items-start gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-700"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.2 + index * 0.1 }}
          >
            <div className={`p-1 rounded ${getImpactColor(suggestion.impact)}`}>{getIcon(suggestion.type)}</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 dark:text-white">{suggestion.title}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">{suggestion.description}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {suggestions.length > 3 && (
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
          +{suggestions.length - 3} more suggestions
        </div>
      )}
    </motion.div>
  )
}
