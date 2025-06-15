import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeft,
  Scale,
  Shield,
  User,
  FileText,
  Download,
  Trash2,
  Edit,
  Eye,
  AlertTriangle,
  Mail,
  Phone,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Your GDPR Rights | Portfolio",
  description: "Learn about your data protection rights under GDPR and how to exercise them.",
}

export default function GDPRRightsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="mr-2" size={20} />
            Back to Portfolio
          </Link>
          <div className="flex items-center mb-4">
            <Scale className="mr-4" size={32} />
            <h1 className="text-4xl font-bold">Your GDPR Rights</h1>
          </div>
          <p className="text-xl text-white/90">
            Under the General Data Protection Regulation (GDPR), you have comprehensive rights regarding your personal
            data.
          </p>
          <p className="text-sm text-white/70 mt-4">Effective since May 25, 2018</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Overview */}
        <section className="mb-12">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="text-blue-600 dark:text-blue-400" size={24} />
              <h2 className="text-xl font-bold text-blue-900 dark:text-blue-100">Your Rights Overview</h2>
            </div>
            <p className="text-blue-800 dark:text-blue-200 mb-4">
              The GDPR gives you specific rights over your personal data. These rights are designed to give you control
              over how your information is collected, used, and shared.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800 dark:text-blue-200">
              <div>
                <p>
                  <strong>Free of Charge:</strong> Most rights can be exercised free of charge
                </p>
                <p>
                  <strong>Response Time:</strong> We respond within 30 days (extendable to 60 days)
                </p>
              </div>
              <div>
                <p>
                  <strong>Identity Verification:</strong> We may need to verify your identity
                </p>
                <p>
                  <strong>No Discrimination:</strong> Exercising rights won't affect our services
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Individual Rights */}
        <div className="space-y-8">
          {/* Right to Access */}
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border-l-4 border-green-500">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Eye className="text-green-600 dark:text-green-400" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-green-900 dark:text-green-100 mb-3">Right to Access</h3>
                <p className="text-green-800 dark:text-green-200 mb-4">
                  You have the right to request copies of your personal data and information about how we process it.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-green-900 dark:text-green-100">What you can request:</h4>
                    <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                      <li>• Copies of your personal data</li>
                      <li>• Purposes of processing</li>
                      <li>• Categories of data processed</li>
                      <li>• Recipients of your data</li>
                      <li>• Retention periods</li>
                      <li>• Source of the data</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-green-900 dark:text-green-100">How to request:</h4>
                    <p className="text-sm text-green-800 dark:text-green-200 mb-2">
                      Email us at <strong>privacy@yourportfolio.com</strong> with:
                    </p>
                    <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                      <li>• Your full name and contact details</li>
                      <li>• Proof of identity</li>
                      <li>• Specific data you want to access</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right to Rectification */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-500">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Edit className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-3">Right to Rectification</h3>
                <p className="text-blue-800 dark:text-blue-200 mb-4">
                  You have the right to have inaccurate personal data corrected or completed if it's incomplete.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">When to use this right:</h4>
                    <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                      <li>• Personal data is inaccurate</li>
                      <li>• Information is incomplete</li>
                      <li>• Data needs updating</li>
                      <li>• Contact details have changed</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">Our obligations:</h4>
                    <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                      <li>• Correct inaccurate data without delay</li>
                      <li>• Complete incomplete data</li>
                      <li>• Inform third parties of corrections</li>
                      <li>• Provide confirmation of changes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right to Erasure */}
          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border-l-4 border-red-500">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <Trash2 className="text-red-600 dark:text-red-400" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-red-900 dark:text-red-100 mb-3">
                  Right to Erasure ("Right to be Forgotten")
                </h3>
                <p className="text-red-800 dark:text-red-200 mb-4">
                  You have the right to have your personal data deleted in certain circumstances.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-red-900 dark:text-red-100">When this applies:</h4>
                    <ul className="text-sm text-red-800 dark:text-red-200 space-y-1">
                      <li>• Data no longer necessary for original purpose</li>
                      <li>• You withdraw consent</li>
                      <li>• Data processed unlawfully</li>
                      <li>• Legal obligation to delete</li>
                      <li>• You object and no overriding interests</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-red-900 dark:text-red-100">Exceptions:</h4>
                    <ul className="text-sm text-red-800 dark:text-red-200 space-y-1">
                      <li>• Freedom of expression and information</li>
                      <li>• Legal compliance requirements</li>
                      <li>• Public interest or scientific research</li>
                      <li>• Legal claims establishment/defense</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right to Restrict Processing */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border-l-4 border-yellow-500">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <AlertTriangle className="text-yellow-600 dark:text-yellow-400" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-yellow-900 dark:text-yellow-100 mb-3">
                  Right to Restrict Processing
                </h3>
                <p className="text-yellow-800 dark:text-yellow-200 mb-4">
                  You have the right to limit how we use your personal data in certain situations.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-yellow-900 dark:text-yellow-100">When you can restrict:</h4>
                    <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
                      <li>• You contest the accuracy of data</li>
                      <li>• Processing is unlawful</li>
                      <li>• We no longer need the data</li>
                      <li>• You've objected to processing</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-yellow-900 dark:text-yellow-100">What restriction means:</h4>
                    <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
                      <li>• Data stored but not processed</li>
                      <li>• Processing only with your consent</li>
                      <li>• For legal claims or protection</li>
                      <li>• For public interest reasons</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right to Data Portability */}
          <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border-l-4 border-purple-500">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Download className="text-purple-600 dark:text-purple-400" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-purple-900 dark:text-purple-100 mb-3">
                  Right to Data Portability
                </h3>
                <p className="text-purple-800 dark:text-purple-200 mb-4">
                  You have the right to receive your personal data in a structured, commonly used format and transfer it
                  to another service.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-purple-900 dark:text-purple-100">Conditions:</h4>
                    <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
                      <li>• Processing based on consent or contract</li>
                      <li>• Processing carried out by automated means</li>
                      <li>• Technically feasible to transfer</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-purple-900 dark:text-purple-100">Data formats:</h4>
                    <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
                      <li>• JSON (JavaScript Object Notation)</li>
                      <li>• CSV (Comma-Separated Values)</li>
                      <li>• XML (Extensible Markup Language)</li>
                      <li>• Other machine-readable formats</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right to Object */}
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg border-l-4 border-indigo-500">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                <Shield className="text-indigo-600 dark:text-indigo-400" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-100 mb-3">Right to Object</h3>
                <p className="text-indigo-800 dark:text-indigo-200 mb-4">
                  You have the right to object to processing of your personal data in certain circumstances.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-indigo-900 dark:text-indigo-100">When you can object:</h4>
                    <ul className="text-sm text-indigo-800 dark:text-indigo-200 space-y-1">
                      <li>• Processing for legitimate interests</li>
                      <li>• Direct marketing (absolute right)</li>
                      <li>• Scientific/historical research</li>
                      <li>• Statistical purposes</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-indigo-900 dark:text-indigo-100">Our response:</h4>
                    <ul className="text-sm text-indigo-800 dark:text-indigo-200 space-y-1">
                      <li>• Stop processing unless compelling grounds</li>
                      <li>• Immediately stop direct marketing</li>
                      <li>• Demonstrate overriding legitimate interests</li>
                      <li>• Continue only for legal claims</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How to Exercise Your Rights */}
        <section className="mt-12 mb-12">
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-6">
              <User className="text-gray-600 dark:text-gray-400" size={24} />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">How to Exercise Your Rights</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Contact Methods</h3>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    <span>
                      <strong>Email:</strong> privacy@yourportfolio.com
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} />
                    <span>
                      <strong>Phone:</strong> +1 (555) 123-4567
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText size={16} />
                    <span>
                      <strong>Post:</strong> 123 Privacy Street, Data City, DC 12345
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Required Information</h3>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>• Your full name and contact details</li>
                  <li>• Proof of identity (copy of ID/passport)</li>
                  <li>• Specific right you want to exercise</li>
                  <li>• Clear description of your request</li>
                  <li>• Any relevant account information</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Response Time:</strong> We will respond to your request within 30 days. In complex cases, we may
                extend this to 60 days and will inform you of any delay.
              </p>
            </div>
          </div>
        </section>

        {/* Complaints */}
        <section className="mb-12">
          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-200 dark:border-red-800">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="text-red-600 dark:text-red-400" size={24} />
              <h2 className="text-xl font-bold text-red-900 dark:text-red-100">Right to Lodge a Complaint</h2>
            </div>
            <p className="text-red-800 dark:text-red-200 mb-4">
              If you're not satisfied with how we handle your personal data or respond to your requests, you have the
              right to lodge a complaint with a supervisory authority.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2 text-red-900 dark:text-red-100">EU/EEA Residents</h3>
                <p className="text-sm text-red-800 dark:text-red-200">
                  Contact your local data protection authority. Find your local authority at{" "}
                  <a
                    href="https://edpb.europa.eu/about-edpb/board/members_en"
                    className="underline hover:no-underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    edpb.europa.eu
                  </a>
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-red-900 dark:text-red-100">UK Residents</h3>
                <p className="text-sm text-red-800 dark:text-red-200">
                  Contact the Information Commissioner's Office (ICO) at{" "}
                  <a
                    href="https://ico.org.uk"
                    className="underline hover:no-underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ico.org.uk
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
