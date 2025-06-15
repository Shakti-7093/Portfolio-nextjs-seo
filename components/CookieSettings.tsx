"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Settings, Shield, BarChart3, Target } from "lucide-react"
import { Button } from "./ui/button"
import { Switch } from "./ui/switch"

interface CookieSettingsProps {
  isOpen: boolean
  onClose: () => void
}

export default function CookieSettings({ isOpen, onClose }: CookieSettingsProps) {
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    const saved = localStorage.getItem("cookie-consent")
    if (saved) {
      try {
        setPreferences(JSON.parse(saved))
      } catch (error) {
        console.error("Error parsing cookie preferences:", error)
      }
    }
  }, [])

  const saveSettings = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(preferences))
    onClose()
  }

  const togglePreference = (key: keyof typeof preferences) => {
    if (key === "necessary") return
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  if (!isOpen) return null

  return (
    <motion.div
      className="fixed bottom-4 right-4 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 max-w-md z-50"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <Settings className="text-blue-600 dark:text-blue-400" size={20} />
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white">Cookie Settings</h3>
      </div>

      <div className="space-y-4 mb-6">
        {[
          {
            key: "necessary" as const,
            title: "Essential",
            icon: Shield,
            description: "Required for basic functionality",
            required: true,
          },
          {
            key: "analytics" as const,
            title: "Analytics",
            icon: BarChart3,
            description: "Help improve user experience",
            required: false,
          },
          {
            key: "marketing" as const,
            title: "Marketing",
            icon: Target,
            description: "Personalized advertising",
            required: false,
          },
        ].map((type) => (
          <div key={type.key} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center gap-3">
              <type.icon size={16} className="text-gray-600 dark:text-gray-400" />
              <div>
                <div className="font-medium text-sm text-gray-900 dark:text-white">{type.title}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{type.description}</div>
              </div>
            </div>
            {type.required ? (
              <div className="text-xs text-green-600 dark:text-green-400 font-medium">Always On</div>
            ) : (
              <Switch
                checked={preferences[type.key]}
                onCheckedChange={() => togglePreference(type.key)}
                className="data-[state=checked]:bg-blue-600"
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Button onClick={onClose} variant="outline" size="sm" className="flex-1">
          Cancel
        </Button>
        <Button onClick={saveSettings} size="sm" className="flex-1">
          Save Settings
        </Button>
      </div>
    </motion.div>
  )
}
