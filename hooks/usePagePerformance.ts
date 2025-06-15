"use client"

import { useState, useEffect } from "react"

interface PagePerformanceData {
  loadTime: number
  domContentLoaded: number
  firstPaint: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  timeToInteractive: number
  resourceCount: number
  resourceSize: number
}

export function usePagePerformance() {
  const [performanceData, setPerformanceData] = useState<PagePerformanceData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (typeof window === "undefined" || !window.performance) {
      setIsLoading(false)
      return
    }

    const measurePerformance = () => {
      try {
        const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
        const paintEntries = performance.getEntriesByType("paint")
        const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[]

        // Calculate metrics
        const loadTime = navigation.loadEventEnd - navigation.fetchStart
        const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart

        const firstPaint = paintEntries.find((entry) => entry.name === "first-paint")?.startTime || 0
        const firstContentfulPaint =
          paintEntries.find((entry) => entry.name === "first-contentful-paint")?.startTime || 0

        // Calculate resource metrics
        const resourceSize = resources.reduce((total, resource) => total + (resource.transferSize || 0), 0)
        const resourceCount = resources.length

        // Estimate Time to Interactive (simplified)
        const timeToInteractive = Math.max(domContentLoaded, firstContentfulPaint + 1000)

        // Get LCP from PerformanceObserver if available
        let largestContentfulPaint = 0
        if ("PerformanceObserver" in window) {
          try {
            const observer = new PerformanceObserver((list) => {
              const entries = list.getEntries()
              const lastEntry = entries[entries.length - 1]
              if (lastEntry) {
                largestContentfulPaint = lastEntry.startTime
              }
            })
            observer.observe({ entryTypes: ["largest-contentful-paint"] })
          } catch (error) {
            console.warn("LCP observation failed:", error)
          }
        }

        const data: PagePerformanceData = {
          loadTime,
          domContentLoaded,
          firstPaint,
          firstContentfulPaint,
          largestContentfulPaint,
          timeToInteractive,
          resourceCount,
          resourceSize,
        }

        setPerformanceData(data)
        setIsLoading(false)
      } catch (error) {
        console.error("Performance measurement failed:", error)
        setIsLoading(false)
      }
    }

    // Wait for page to load completely
    if (document.readyState === "complete") {
      setTimeout(measurePerformance, 100)
    } else {
      window.addEventListener("load", () => {
        setTimeout(measurePerformance, 100)
      })
    }
  }, [])

  return { performanceData, isLoading }
}
