"use client"

// Admin access control for performance monitor
export function isAdminUser(): boolean {
  if (typeof window === "undefined") return false

  // Method 1: Check for admin key in localStorage
  const adminKey = localStorage.getItem("admin-access-key")
  if (adminKey === process.env.NEXT_PUBLIC_ADMIN_KEY) {
    return true
  }

  // Method 2: Check for specific IP (you can add your IP here)
  // Note: This won't work reliably in production due to proxies/CDNs

  // Method 3: Check for development environment
  if (process.env.NODE_ENV === "development") {
    return true
  }

  // Method 4: Check URL parameter (temporary access)
  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.get("admin") === process.env.NEXT_PUBLIC_ADMIN_SECRET) {
    // Store admin access for session
    sessionStorage.setItem("admin-session", "true")
    return true
  }

  // Check session storage
  if (sessionStorage.getItem("admin-session") === "true") {
    return true
  }

  return false
}

// Admin login function
export function adminLogin(password: string): boolean {
  if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
    localStorage.setItem("admin-access-key", process.env.NEXT_PUBLIC_ADMIN_KEY || "")
    sessionStorage.setItem("admin-session", "true")
    return true
  }
  return false
}

// Admin logout function
export function adminLogout(): void {
  localStorage.removeItem("admin-access-key")
  sessionStorage.removeItem("admin-session")
}
