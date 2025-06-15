type Metric = {
  name: string;
  value: number;
  id: string;
  navigationType?: string;
};

export type PerformanceMetric = {
  name: string;
  value: number;
  rating: string;
  timestamp: number;
  id: string;
  navigationType: string;
};

function getPerformanceRating(name: string, value: number): string {
  if (name === "CLS") {
    return value < 0.1 ? "good" : value < 0.25 ? "needs improvement" : "poor";
  }
  if (name === "LCP") {
    return value < 2500 ? "good" : value < 4000 ? "needs improvement" : "poor";
  }
  if (name === "FID") {
    return value < 100 ? "good" : value < 300 ? "needs improvement" : "poor";
  }
  return "unknown";
}

export function sendToAnalytics(metric: Metric) {
  const performanceMetric: PerformanceMetric = {
    name: metric.name,
    value: metric.value,
    rating: getPerformanceRating(metric.name, metric.value),
    timestamp: Date.now(),
    id: metric.id,
    navigationType: metric.navigationType || "navigate",
  };

  if (typeof window !== "undefined" && window.gtag) {
    try {
      window.gtag("event", metric.name, {
        event_category: "Web Vitals",
        event_label: metric.id,
        value: Math.round(
          metric.name === "CLS" ? metric.value * 1000 : metric.value
        ),
        custom_parameter_1: performanceMetric.rating,
        non_interaction: true,
      });
    } catch (err) {
      console.error("Failed to send metric to gtag:", err, metric);
    }
  }

  if (typeof window !== "undefined") {
    fetch("/api/analytics/performance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(performanceMetric),
    }).catch((err) => {
      console.error(
        "Failed to send metric to analytics endpoint:",
        err,
        performanceMetric
      );
    });
  }

  if (typeof window !== "undefined") {
    try {
      const stored = JSON.parse(
        localStorage.getItem("performance-metrics") || "[]"
      );
      stored.push(performanceMetric);
      if (stored.length > 50) stored.shift();
      localStorage.setItem("performance-metrics", JSON.stringify(stored));
    } catch (err) {
      console.error(
        "Failed to store performance metric in localStorage:",
        err,
        performanceMetric
      );
    }
  }
}
