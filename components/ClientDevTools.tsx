"use client";
import { useEffect, useState } from "react";
import AnalyticsDebugger from "./AnalyticsDebugger";
import PerformanceMonitor from "./PerformanceMonitor";
import PerformanceOptimizer from "./PerformanceOptimizer";

export default function ClientDevTools() {
  const [showDevTools, setShowDevTools] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("admin-email");
    setShowDevTools(email === "shaktisinghchundawat7093@gmail.com");
  }, []);

  if (!showDevTools) return null;

  return (
    <>
      <AnalyticsDebugger />
      <PerformanceMonitor />
      <PerformanceOptimizer />
    </>
  );
}
