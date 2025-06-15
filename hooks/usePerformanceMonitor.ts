"use client";

import { useState, useEffect, useCallback } from "react";
import { type PerformanceMetric } from "../lib/performance";

type BudgetStatus = {
  totalSize: number;
  violations: string[];
  withinBudget: boolean;
};

export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [performanceScore, setPerformanceScore] = useState<number>(0);
  const [budgetStatus, setBudgetStatus] = useState<BudgetStatus | null>(null);

  // Calculate overall performance score
  const calculatePerformanceScore = useCallback(
    (metricsData: PerformanceMetric[]) => {
      if (!metricsData.length) {
        setPerformanceScore(0);
        return;
      }
      const latestMetrics = metricsData.slice(-5);
      const scores = latestMetrics.map((metric) => {
        switch (metric.rating) {
          case "good":
            return 100;
          case "needs-improvement":
            return 60;
          case "poor":
            return 20;
          default:
            return 50;
        }
      });
      const averageScore =
        scores.reduce((sum, score) => sum + score, 0) / scores.length;
      setPerformanceScore(Math.round(averageScore));
    },
    []
  );

  // Get metrics by type
  const getMetricsByType = useCallback(
    (type: string) => metrics.filter((metric) => metric.name === type),
    [metrics]
  );

  // Get latest metric by type
  const getLatestMetric = useCallback(
    (type: string) => {
      const typeMetrics = getMetricsByType(type);
      return typeMetrics.length ? typeMetrics[typeMetrics.length - 1] : null;
    },
    [getMetricsByType]
  );

  // Get performance insights
  const getPerformanceInsights = useCallback(() => {
    const insights: string[] = [];
    const lcp = getLatestMetric("LCP");
    const fid = getLatestMetric("FID");
    const cls = getLatestMetric("CLS");

    if (lcp?.rating === "poor") {
      insights.push(
        "Large Contentful Paint is slow. Consider optimizing images and reducing server response time."
      );
    }
    if (fid?.rating === "poor") {
      insights.push(
        "First Input Delay is high. Consider reducing JavaScript execution time."
      );
    }
    if (cls?.rating === "poor") {
      insights.push(
        "Cumulative Layout Shift is high. Ensure images and ads have defined dimensions."
      );
    }
    if (budgetStatus && !budgetStatus.withinBudget) {
      insights.push(
        "Performance budget exceeded. Consider optimizing resource sizes."
      );
    }
    if (!insights.length) {
      insights.push("Performance looks good! Keep up the great work.");
    }
    return insights;
  }, [getLatestMetric, budgetStatus]);

  // Load metrics and budget on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    // initPerformanceTracking() // Removed because it is not exported from the module

    const loadMetrics = () => {
      const stored = localStorage.getItem("performance-metrics");
      if (stored) {
        try {
          const parsedMetrics: PerformanceMetric[] = JSON.parse(stored);
          setMetrics(parsedMetrics);
          calculatePerformanceScore(parsedMetrics);
        } catch (error) {
          console.error("Error parsing stored metrics:", error);
        }
      }
    };

    loadMetrics();
    // setBudgetStatus(checkPerformanceBudget())
    setIsLoading(false);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "performance-metrics" && e.newValue) {
        try {
          const newMetrics: PerformanceMetric[] = JSON.parse(e.newValue);
          setMetrics(newMetrics);
          calculatePerformanceScore(newMetrics);
        } catch (error) {
          console.error("Error parsing new metrics:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [calculatePerformanceScore]);

  // Force refresh metrics and budget
  const refreshMetrics = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      // setBudgetStatus(checkPerformanceBudget())
      setIsLoading(false);
    }, 1000);
  }, []);

  return {
    metrics,
    performanceScore,
    budgetStatus,
    isLoading,
    getMetricsByType,
    getLatestMetric,
    getPerformanceInsights,
    refreshMetrics,
  };
}
