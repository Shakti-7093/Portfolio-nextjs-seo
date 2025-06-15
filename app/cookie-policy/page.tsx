import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Cookie, Settings, BarChart3, Shield, Trash2, RefreshCw } from "lucide-react"

export const metadata: Metadata = {
  title: "Cookie Policy | Portfolio",
  description: "Cookie policy explaining how we use cookies and similar technologies on our website.",
}

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="mr-2" size={20} />
            Back to Portfolio
          </Link>
          <div className="flex items-center mb-4">
            <Cookie className="mr-4" size={32} />
            <h1 className="text-4xl font-bold">Cookie Policy</h1>
          </div>
          <p className="text-xl text-white/90">
            Learn about how we use cookies and similar technologies to enhance your experience.
          </p>
          <p className="text-sm text-white/70 mt-4">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {/* What Are Cookies */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Cookie className="mr-3 text-orange-600" size={24} />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">What Are Cookies?</h2>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg">
              <p className="text-orange-800 dark:text-orange-200 mb-4">
                Cookies are small text files that are stored on your device when you visit our website. They help us
                provide you with a better experience by remembering your preferences and analyzing how you use our site.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2 text-orange-900 dark:text-orange-100">First-Party Cookies</h3>
                  <p className="text-sm text-orange-800 dark:text-orange-200">
                    Set directly by our website for essential functionality
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-orange-900 dark:text-orange-100">Third-Party Cookies</h3>
                  <p className="text-sm text-orange-800 dark:text-orange-200">
                    Set by external services like analytics providers
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Types of Cookies */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Settings className="mr-3 text-blue-600" size={24} />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Types of Cookies We Use</h2>
            </div>

            <div className="space-y-6">
              {/* Essential Cookies */}
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border-l-4 border-green-500">
                <div className="flex items-center mb-3">
                  <Shield className="mr-2 text-green-600" size={20} />
                  <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">Essential Cookies</h3>
                  <span className="ml-auto px-2 py-1 bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 text-xs rounded-full">
                    Always Active
                  </span>
                </div>
                <p className="text-green-800 dark:text-green-200 mb-3">
                  These cookies are necessary for the website to function properly and cannot be disabled.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-1 text-green-900 dark:text-green-100">Purpose:</h4>
                    <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                      <li>• Website security</li>
                      <li>• User authentication</li>
                      <li>• Form submissions</li>
                      <li>• Theme preferences</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-green-900 dark:text-green-100">Duration:</h4>
                    <p className="text-sm text-green-800 dark:text-green-200">Session or up to 1 year</p>
                    <h4 className="font-medium mb-1 mt-2 text-green-900 dark:text-green-100">Examples:</h4>
                    <p className="text-sm text-green-800 dark:text-green-200">theme_preference, csrf_token</p>
                  </div>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-center mb-3">
                  <BarChart3 className="mr-2 text-blue-600" size={20} />
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">Analytics Cookies</h3>
                  <span className="ml-auto px-2 py-1 bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                    Optional
                  </span>
                </div>
                <p className="text-blue-800 dark:text-blue-200 mb-3">
                  Help us understand how visitors interact with our website by collecting anonymous information.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-1 text-blue-900 dark:text-blue-100">Purpose:</h4>
                    <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                      <li>• Page view tracking</li>
                      <li>• User behavior analysis</li>
                      <li>• Performance monitoring</li>
                      <li>• Content optimization</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-blue-900 dark:text-blue-100">Duration:</h4>
                    <p className="text-sm text-blue-800 dark:text-blue-200">Up to 2 years</p>
                    <h4 className="font-medium mb-1 mt-2 text-blue-900 dark:text-blue-100">Provider:</h4>
                    <p className="text-sm text-blue-800 dark:text-blue-200">Google Analytics</p>
                  </div>
                </div>
              </div>

              {/* Performance Cookies */}
              <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border-l-4 border-purple-500">
                <div className="flex items-center mb-3">
                  <RefreshCw className="mr-2 text-purple-600" size={20} />
                  <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100">Performance Cookies</h3>
                  <span className="ml-auto px-2 py-1 bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs rounded-full">
                    Optional
                  </span>
                </div>
                <p className="text-purple-800 dark:text-purple-200 mb-3">
                  Collect information about website performance and user interactions to improve functionality.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-1 text-purple-900 dark:text-purple-100">Purpose:</h4>
                    <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
                      <li>• Load time monitoring</li>
                      <li>• Error tracking</li>
                      <li>• Feature usage analysis</li>
                      <li>• User experience optimization</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-purple-900 dark:text-purple-100">Duration:</h4>
                    <p className="text-sm text-purple-800 dark:text-purple-200">Session to 1 year</p>
                    <h4 className="font-medium mb-1 mt-2 text-purple-900 dark:text-purple-100">Examples:</h4>
                    <p className="text-sm text-purple-800 dark:text-purple-200">
                      performance_metrics, user_interactions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Managing Cookies */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Settings className="mr-3 text-indigo-600" size={24} />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Managing Your Cookie Preferences</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-indigo-900 dark:text-indigo-100">On Our Website</h3>
                <ul className="space-y-3 text-indigo-800 dark:text-indigo-200">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Use our cookie consent banner to manage preferences</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Access cookie settings anytime from the footer</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Toggle individual cookie categories on/off</span>
                  </li>
                </ul>
              </div>

              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-indigo-900 dark:text-indigo-100">In Your Browser</h3>
                <ul className="space-y-3 text-indigo-800 dark:text-indigo-200">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Block all cookies in browser settings</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Delete existing cookies from your device</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Set up automatic cookie deletion</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <p className="text-yellow-800 dark:text-yellow-200">
                <strong>Note:</strong> Disabling certain cookies may affect website functionality and your user
                experience.
              </p>
            </div>
          </section>

          {/* Third-Party Services */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <BarChart3 className="mr-3 text-green-600" size={24} />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Third-Party Services</h2>
            </div>

            <div className="space-y-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-green-900 dark:text-green-100">Google Analytics</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-green-800 dark:text-green-200 mb-2">
                      We use Google Analytics to understand how visitors use our website.
                    </p>
                    <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                      <li>• Anonymized IP addresses</li>
                      <li>• No personally identifiable information</li>
                      <li>• Aggregated usage statistics</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-green-900 dark:text-green-100">Opt-out Options:</h4>
                    <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                      <li>
                        •{" "}
                        <a
                          href="https://tools.google.com/dlpage/gaoptout"
                          className="underline hover:no-underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Google Analytics Opt-out Browser Add-on
                        </a>
                      </li>
                      <li>• Use our cookie preferences</li>
                      <li>• Enable "Do Not Track" in your browser</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Your Choices */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Trash2 className="mr-3 text-red-600" size={24} />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Choices & Rights</h2>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 text-red-900 dark:text-red-100">Accept or Decline</h3>
                  <p className="text-sm text-red-800 dark:text-red-200">
                    You can choose to accept or decline non-essential cookies when you first visit our site.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-red-900 dark:text-red-100">Change Preferences</h3>
                  <p className="text-sm text-red-800 dark:text-red-200">
                    Update your cookie preferences at any time through our cookie settings.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-red-900 dark:text-red-100">Delete Cookies</h3>
                  <p className="text-sm text-red-800 dark:text-red-200">
                    Clear all cookies from your browser or delete specific cookies manually.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact & Updates */}
          <section className="mb-12">
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Questions & Updates</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Contact Us</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    If you have questions about our cookie policy, contact us at{" "}
                    <strong>cookies@yourportfolio.com</strong>
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Policy Updates</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    We may update this policy periodically. Check this page for the latest information.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
