"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cookie,
  X,
  Settings,
  Shield,
  BarChart3,
  Target,
  Check,
  Info,
  Scale,
  Clock,
  User,
} from "lucide-react";
import { Button } from "./ui/button";
import { giveAnalyticsConsent, revokeAnalyticsConsent } from "../lib/analytics";

interface ConsentRecord {
  timestamp: string;
  preferences: {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
  };
  version: string;
  userAgent: string;
  ipHash: string;
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showGDPRDetails, setShowGDPRDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setTimeout(() => setShowBanner(true), 2000);
    } else {
      try {
        const savedPreferences = JSON.parse(consent);
        setPreferences(savedPreferences);
        if (savedPreferences.analytics) {
          giveAnalyticsConsent();
        }
      } catch (error) {
        console.error("Error parsing cookie preferences:", error);
      }
    }
  }, []);

  const logConsent = (newPreferences: typeof preferences) => {
    const consentRecord: ConsentRecord = {
      timestamp: new Date().toISOString(),
      preferences: newPreferences,
      version: "1.0",
      userAgent: navigator.userAgent,
      ipHash: "hashed_for_privacy",
    };

    const consentHistory = JSON.parse(
      localStorage.getItem("consent-history") || "[]"
    );
    consentHistory.push(consentRecord);
    localStorage.setItem(
      "consent-history",
      JSON.stringify(consentHistory.slice(-10))
    );
  };

  const acceptAll = () => {
    const newPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(newPreferences);
    localStorage.setItem("cookie-consent", JSON.stringify(newPreferences));
    logConsent(newPreferences);
    giveAnalyticsConsent();
    setShowBanner(false);
    setShowSettings(false);
  };

  const acceptNecessary = () => {
    const newPreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    setPreferences(newPreferences);
    localStorage.setItem("cookie-consent", JSON.stringify(newPreferences));
    logConsent(newPreferences);
    revokeAnalyticsConsent();
    setShowBanner(false);
    setShowSettings(false);
  };

  const savePreferences = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(preferences));
    logConsent(preferences);
    if (preferences.analytics) {
      giveAnalyticsConsent();
    } else {
      revokeAnalyticsConsent();
    }
    setShowBanner(false);
    setShowSettings(false);
  };

  const togglePreference = (key: keyof typeof preferences) => {
    if (key === "necessary") return;
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const cookieTypes = [
    {
      key: "necessary" as const,
      title: "Essential Cookies",
      description:
        "Required for the website to function properly. These cannot be disabled.",
      icon: Shield,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      required: true,
      legalBasis: "Legitimate Interest",
      retention: "Session or 1 year",
      purpose: "Website functionality, security, user authentication",
      dataTypes: "Session ID, security tokens, user preferences",
    },
    {
      key: "analytics" as const,
      title: "Analytics Cookies",
      description:
        "Help us understand how visitors interact with our website to improve user experience.",
      icon: BarChart3,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      required: false,
      legalBasis: "Consent",
      retention: "Up to 26 months",
      purpose:
        "Website analytics, performance monitoring, user behavior analysis",
      dataTypes: "Page views, click events, device information, anonymized IP",
    },
    {
      key: "marketing" as const,
      title: "Marketing Cookies",
      description:
        "Used to track visitors across websites for personalized advertising and marketing.",
      icon: Target,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      required: false,
      legalBasis: "Consent",
      retention: "Up to 2 years",
      purpose:
        "Personalized advertising, marketing campaigns, social media integration",
      dataTypes: "User interests, browsing behavior, demographic data",
    },
  ];

  return (
    <AnimatePresence>
      {showBanner && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Cookie Consent Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {!showSettings && !showGDPRDetails ? (
                // Main Cookie Banner
                <div className="p-4 sm:p-6 lg:p-8">
                  {/* Header */}
                  <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <motion.div
                      className="p-2 sm:p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full flex-shrink-0"
                      initial={{ rotate: -10, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{
                        delay: 0.2,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      <Cookie
                        className="text-blue-600 dark:text-blue-400"
                        size={20}
                      />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <motion.h2
                        className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        We Respect Your Privacy
                      </motion.h2>
                      <motion.p
                        className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-3 sm:mb-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        We use cookies and similar technologies to enhance your
                        browsing experience, analyze site traffic, and provide
                        personalized content. Your consent is important to us
                        and you can withdraw it at any time.
                      </motion.p>

                      {/* GDPR Compliance Notice */}
                      <motion.div
                        className="bg-blue-50 dark:bg-blue-900/20 p-3 sm:p-4 rounded-lg border border-blue-200 dark:border-blue-800"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Scale
                            className="text-blue-600 dark:text-blue-400 flex-shrink-0"
                            size={16}
                          />
                          <span className="text-xs sm:text-sm font-semibold text-blue-900 dark:text-blue-100">
                            GDPR Compliance
                          </span>
                        </div>
                        <p className="text-xs text-blue-800 dark:text-blue-200 mb-2">
                          As per GDPR regulations, we process your data lawfully
                          and transparently. You have full control over your
                          data and can exercise your rights at any time.
                        </p>
                        <button
                          onClick={() => setShowGDPRDetails(true)}
                          className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
                        >
                          View detailed data processing information →
                        </button>
                      </motion.div>
                    </div>
                  </div>

                  {/* Cookie Types Preview */}
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    {cookieTypes.map((type, index) => (
                      <motion.div
                        key={type.key}
                        className={`p-3 sm:p-4 rounded-xl border-2 ${
                          type.required || preferences[type.key]
                            ? `${type.bgColor} border-current ${type.color}`
                            : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400"
                        } transition-all duration-300`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center gap-2 sm:gap-3 mb-2">
                          <type.icon size={16} className="flex-shrink-0" />
                          <span className="font-semibold text-xs sm:text-sm">
                            {type.title}
                          </span>
                          {(type.required || preferences[type.key]) && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                delay: 0.9 + index * 0.1,
                                type: "spring",
                                stiffness: 300,
                              }}
                            >
                              <Check
                                size={14}
                                className="text-green-500 flex-shrink-0"
                              />
                            </motion.div>
                          )}
                        </div>
                        <p className="text-xs opacity-80 mb-2">
                          {type.description}
                        </p>
                        <div className="text-xs opacity-70 space-y-1">
                          <div className="flex items-center gap-1">
                            <Scale size={10} className="flex-shrink-0" />
                            <span className="truncate">
                              Legal Basis: {type.legalBasis}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={10} className="flex-shrink-0" />
                            <span className="truncate">
                              Retention: {type.retention}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    className="flex flex-col sm:flex-row gap-2 sm:gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <Button
                      onClick={() => setShowSettings(true)}
                      variant="outline"
                      className="flex-1 h-10 sm:h-12 text-xs sm:text-sm border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <Settings size={16} className="mr-2 flex-shrink-0" />
                      <span className="truncate">Customize</span>
                    </Button>
                    <Button
                      onClick={acceptNecessary}
                      variant="outline"
                      className="flex-1 h-10 sm:h-12 text-xs sm:text-sm border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <span className="truncate">Necessary Only</span>
                    </Button>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1"
                    >
                      <Button
                        onClick={acceptAll}
                        className="w-full h-10 sm:h-12 text-xs sm:text-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                      >
                        <span className="truncate">Accept All</span>
                      </Button>
                    </motion.div>
                  </motion.div>

                  {/* Footer Links */}
                  <motion.div
                    className="mt-4 sm:mt-6 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      Learn more:{" "}
                      <a
                        href="/privacy-policy"
                        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                      >
                        Privacy Policy
                      </a>{" "}
                      •{" "}
                      <a
                        href="/cookie-policy"
                        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                      >
                        Cookie Policy
                      </a>{" "}
                      •{" "}
                      <a
                        href="/gdpr-rights"
                        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                      >
                        Your GDPR Rights
                      </a>
                    </p>
                  </motion.div>
                </div>
              ) : showGDPRDetails ? (
                // GDPR Details Panel (keeping existing implementation but making it responsive)
                <div className="p-4 sm:p-6 lg:p-8 max-h-[90vh] overflow-y-auto">
                  {/* GDPR Header */}
                  <div className="flex items-center justify-between mb-6 sm:mb-8">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <motion.div
                        className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex-shrink-0"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Scale
                          className="text-blue-600 dark:text-blue-400"
                          size={20}
                        />
                      </motion.div>
                      <div className="min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate">
                          GDPR Data Processing Details
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                          Transparent information about how we process your data
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => setShowGDPRDetails(false)}
                      variant="ghost"
                      size="sm"
                      className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 flex-shrink-0"
                    >
                      <X size={20} />
                    </Button>
                  </div>

                  {/* Rest of GDPR content with responsive adjustments */}
                  <div className="space-y-4 sm:space-y-6">
                    {/* Data Controller Information */}
                    <div className="p-4 sm:p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-4">
                        <User
                          className="text-blue-600 dark:text-blue-400"
                          size={20}
                        />
                        <h4 className="text-base sm:text-lg font-semibold text-blue-900 dark:text-blue-100">
                          Data Controller
                        </h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-blue-800 dark:text-blue-200">
                        <div className="space-y-1">
                          <p>
                            <strong>Company:</strong> Your Portfolio Ltd.
                          </p>
                          <p>
                            <strong>Address:</strong> 123 Privacy Street, Data
                            City, DC 12345
                          </p>
                          <p>
                            <strong>Email:</strong> privacy@yourportfolio.com
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p>
                            <strong>DPO Contact:</strong> dpo@yourportfolio.com
                          </p>
                          <p>
                            <strong>Registration:</strong> ICO Registration
                            Z1234567
                          </p>
                          <p>
                            <strong>EU Representative:</strong> Available upon
                            request
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        onClick={() => setShowSettings(true)}
                        variant="outline"
                        className="flex-1 h-10 sm:h-12 text-xs sm:text-sm"
                      >
                        <Settings size={16} className="mr-2" />
                        Manage Preferences
                      </Button>
                      <Button
                        onClick={() => setShowGDPRDetails(false)}
                        className="flex-1 h-10 sm:h-12 text-xs sm:text-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      >
                        Back to Cookie Settings
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                // Settings Panel (responsive version)
                <div className="p-4 sm:p-6 lg:p-8 max-h-[90vh] overflow-y-auto">
                  {/* Settings Header */}
                  <div className="flex items-center justify-between mb-6 sm:mb-8">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <motion.div
                        className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex-shrink-0"
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Settings
                          className="text-blue-600 dark:text-blue-400"
                          size={20}
                        />
                      </motion.div>
                      <div className="min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                          Cookie Preferences
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                          Customize your cookie settings below
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => setShowSettings(false)}
                      variant="ghost"
                      size="sm"
                      className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 flex-shrink-0"
                    >
                      <X size={20} />
                    </Button>
                  </div>

                  {/* Consent Information */}
                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Info
                        className="text-yellow-600 dark:text-yellow-400 flex-shrink-0"
                        size={16}
                      />
                      <span className="text-xs sm:text-sm font-semibold text-yellow-900 dark:text-yellow-100">
                        Consent Management
                      </span>
                    </div>
                    <p className="text-xs text-yellow-800 dark:text-yellow-200">
                      Your consent is freely given, specific, informed and
                      unambiguous. You can withdraw your consent at any time
                      without affecting the lawfulness of processing based on
                      consent before its withdrawal.
                    </p>
                  </div>

                  {/* Cookie Settings */}
                  <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                    {cookieTypes.map((type, index) => (
                      <motion.div
                        key={type.key}
                        className={`p-4 sm:p-6 rounded-xl border-2 ${
                          type.bgColor
                        } ${
                          type.required || preferences[type.key]
                            ? `border-current ${type.color}`
                            : "border-gray-200 dark:border-gray-700"
                        } transition-all duration-300`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                            <motion.div
                              className={`p-2 sm:p-3 rounded-lg ${type.bgColor} flex-shrink-0`}
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              transition={{ duration: 0.2 }}
                            >
                              <type.icon className={type.color} size={20} />
                            </motion.div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                <span className="truncate">{type.title}</span>
                                {type.required && (
                                  <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full whitespace-nowrap">
                                    Required
                                  </span>
                                )}
                              </h4>
                              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                                {type.description}
                              </p>
                              <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                                <div className="flex items-center gap-1">
                                  <Scale size={12} className="flex-shrink-0" />
                                  <span className="truncate">
                                    Legal Basis: {type.legalBasis}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock size={12} className="flex-shrink-0" />
                                  <span className="truncate">
                                    Retention: {type.retention}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            {type.required ? (
                              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                                <Check size={20} />
                                <span className="text-xs sm:text-sm font-medium hidden sm:inline">
                                  Always Active
                                </span>
                              </div>
                            ) : (
                              <motion.button
                                onClick={() => togglePreference(type.key)}
                                className={`relative inline-flex h-6 w-11 sm:h-8 sm:w-14 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                  preferences[type.key]
                                    ? "bg-gradient-to-r from-blue-500 to-purple-500"
                                    : "bg-gray-300 dark:bg-gray-600"
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <motion.span
                                  className="inline-block h-4 w-4 sm:h-6 sm:w-6 transform rounded-full bg-white shadow-lg transition-transform duration-300"
                                  animate={{
                                    x: preferences[type.key]
                                      ? window.innerWidth >= 640
                                        ? 28
                                        : 24
                                      : 4,
                                  }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30,
                                  }}
                                />
                              </motion.button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Settings Action Buttons */}
                  <motion.div
                    className="flex flex-col sm:flex-row gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Button
                      onClick={acceptNecessary}
                      variant="outline"
                      className="flex-1 h-10 sm:h-12 text-xs sm:text-sm border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      Essential Only
                    </Button>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1"
                    >
                      <Button
                        onClick={savePreferences}
                        className="w-full h-10 sm:h-12 text-xs sm:text-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                      >
                        Save Preferences
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
