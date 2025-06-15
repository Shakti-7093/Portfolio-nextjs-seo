import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Shield, Eye, Lock, UserCheck, FileText, Mail } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy | Portfolio",
  description: "Privacy policy explaining how we collect, use, and protect your personal information.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="mr-2" size={20} />
            Back to Portfolio
          </Link>
          <div className="flex items-center mb-4">
            <Shield className="mr-4" size={32} />
            <h1 className="text-4xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-xl text-white/90">
            Your privacy is important to us. This policy explains how we handle your information.
          </p>
          <p className="text-sm text-white/70 mt-4">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {/* Information We Collect */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Eye className="mr-3 text-blue-600" size={24} />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Information We Collect</h2>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Personal Information</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  • <strong>Contact Information:</strong> Name, email address when you contact us
                </li>
                <li>
                  • <strong>Communication:</strong> Messages you send through our contact form
                </li>
                <li>
                  • <strong>Professional Information:</strong> Any professional details you share
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mt-4">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Automatically Collected Information
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  • <strong>Analytics Data:</strong> Page views, time spent, user interactions
                </li>
                <li>
                  • <strong>Technical Information:</strong> Browser type, device information, IP address
                </li>
                <li>
                  • <strong>Cookies:</strong> Preferences, session data, analytics tracking
                </li>
              </ul>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <UserCheck className="mr-3 text-green-600" size={24} />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">How We Use Your Information</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-blue-900 dark:text-blue-100">Communication</h3>
                <ul className="space-y-2 text-blue-800 dark:text-blue-200">
                  <li>• Respond to your inquiries</li>
                  <li>• Send requested information</li>
                  <li>• Follow up on conversations</li>
                </ul>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-green-900 dark:text-green-100">Improvement</h3>
                <ul className="space-y-2 text-green-800 dark:text-green-200">
                  <li>• Analyze website usage</li>
                  <li>• Improve user experience</li>
                  <li>• Optimize content and features</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Protection */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Lock className="mr-3 text-purple-600" size={24} />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data Protection & Security</h2>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-2 text-purple-900 dark:text-purple-100">Encryption</h3>
                  <p className="text-sm text-purple-800 dark:text-purple-200">
                    All data transmitted is encrypted using SSL/TLS protocols
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-purple-900 dark:text-purple-100">Access Control</h3>
                  <p className="text-sm text-purple-800 dark:text-purple-200">
                    Limited access to personal information on need-to-know basis
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-purple-900 dark:text-purple-100">Regular Updates</h3>
                  <p className="text-sm text-purple-800 dark:text-purple-200">
                    Security measures are regularly reviewed and updated
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Cookies */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <FileText className="mr-3 text-orange-600" size={24} />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Cookies & Tracking</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-orange-900 dark:text-orange-100">Essential Cookies</h3>
                <p className="text-orange-800 dark:text-orange-200">
                  Required for basic website functionality, user preferences, and security.
                </p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-orange-900 dark:text-orange-100">Analytics Cookies</h3>
                <p className="text-orange-800 dark:text-orange-200">
                  Help us understand how visitors interact with our website to improve user experience.
                </p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-orange-900 dark:text-orange-100">Performance Cookies</h3>
                <p className="text-orange-800 dark:text-orange-200">
                  Collect information about website performance and user interactions.
                </p>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <UserCheck className="mr-3 text-indigo-600" size={24} />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Rights</h2>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 text-indigo-900 dark:text-indigo-100">Data Access & Control</h3>
                  <ul className="space-y-2 text-indigo-800 dark:text-indigo-200">
                    <li>• Request access to your personal data</li>
                    <li>• Request correction of inaccurate data</li>
                    <li>• Request deletion of your data</li>
                    <li>• Withdraw consent at any time</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-indigo-900 dark:text-indigo-100">Cookie Management</h3>
                  <ul className="space-y-2 text-indigo-800 dark:text-indigo-200">
                    <li>• Manage cookie preferences</li>
                    <li>• Opt-out of analytics tracking</li>
                    <li>• Clear stored cookies</li>
                    <li>• Update consent preferences</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Mail className="mr-3 text-red-600" size={24} />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Us</h2>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
              <p className="text-red-800 dark:text-red-200 mb-4">
                If you have any questions about this Privacy Policy or how we handle your data, please contact us:
              </p>
              <div className="space-y-2 text-red-800 dark:text-red-200">
                <p>
                  <strong>Email:</strong> privacy@yourportfolio.com
                </p>
                <p>
                  <strong>Response Time:</strong> We aim to respond within 48 hours
                </p>
              </div>
            </div>
          </section>

          {/* Updates */}
          <section className="mb-12">
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Policy Updates</h2>
              <p className="text-gray-700 dark:text-gray-300">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
