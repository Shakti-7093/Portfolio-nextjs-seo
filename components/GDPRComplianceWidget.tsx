"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, Settings, Download, Trash2, Eye } from "lucide-react";
import { Button } from "./ui/button";

export default function GDPRComplianceWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [consentHistory, setConsentHistory] = useState<any[]>([]);

  useEffect(() => {
    // Load consent history
    const history = JSON.parse(localStorage.getItem("consent-history") || "[]");
    setConsentHistory(history);
  }, []);

  const downloadMyData = () => {
    const userData = {
      consentHistory,
      preferences: JSON.parse(localStorage.getItem("cookie-consent") || "{}"),
      timestamp: new Date().toISOString(),
      dataController: "Your Portfolio Ltd.",
      legalBasis: "Consent and Legitimate Interest",
    };

    const blob = new Blob([JSON.stringify(userData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `my-data-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const deleteMyData = () => {
    if (
      confirm(
        "Are you sure you want to delete all your data? This action cannot be undone."
      )
    ) {
      localStorage.removeItem("cookie-consent");
      localStorage.removeItem("consent-history");
      localStorage.removeItem("analytics-consent");
      setConsentHistory([]);
      alert("Your data has been deleted successfully.");
    }
  };

  return (
    <>
      {/* Floating GDPR Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg z-30"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="GDPR Rights & Data Management"
      >
        <Scale size={20} />
      </motion.button>

      {/* GDPR Widget Modal */}
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
              className="fixed bottom-4 left-4 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 max-w-md z-50"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Scale
                    className="text-blue-600 dark:text-blue-400"
                    size={20}
                  />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Your GDPR Rights
                </h3>
              </div>

              <div className="space-y-3 mb-6">
                <Button
                  onClick={downloadMyData}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Download size={16} className="mr-2" />
                  Download My Data
                </Button>

                <Button
                  onClick={() => window.open("/gdpr-rights", "_blank")}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Eye size={16} className="mr-2" />
                  View All Rights
                </Button>

                <Button
                  onClick={() => {
                    // Reopen cookie settings
                    setIsOpen(false);
                    // Trigger cookie consent modal
                    localStorage.removeItem("cookie-consent");
                    window.location.reload();
                  }}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Settings size={16} className="mr-2" />
                  Manage Cookies
                </Button>

                <Button
                  onClick={deleteMyData}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <Trash2 size={16} className="mr-2" />
                  Delete My Data
                </Button>
              </div>

              {consentHistory.length > 0 && (
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Consent History ({consentHistory.length} records)
                  </h4>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Last updated:{" "}
                    {new Date(
                      consentHistory[consentHistory.length - 1]?.timestamp
                    ).toLocaleDateString()}
                  </div>
                </div>
              )}

              <div className="flex gap-2 mt-4">
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  Close
                </Button>
                <Button
                  onClick={() =>
                    window.open("mailto:privacy@yourportfolio.com", "_blank")
                  }
                  size="sm"
                  className="flex-1"
                >
                  Contact DPO
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
