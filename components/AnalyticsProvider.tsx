"use client"

import type React from "react"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { initPrivacyCompliantAnalytics, trackPageView } from "../lib/analytics"

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    initPrivacyCompliantAnalytics()
  }, [])

  useEffect(() => {
    // Track page views on route changes
    if (pathname) {
      trackPageView(window.location.href, document.title)
    }
  }, [pathname])

  return <>{children}</>
}
