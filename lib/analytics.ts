"use client";

// Google Analytics 4 configuration
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Initialize Google Analytics
export function initGA() {
  if (typeof window === "undefined" || !GA_TRACKING_ID) return;

  // Load gtag script
  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  script.async = true;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;

  gtag("js", new Date());
  gtag("config", GA_TRACKING_ID, {
    page_title: document.title,
    page_location: window.location.href,
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  console.log("Google Analytics initialized:", GA_TRACKING_ID);
}

export function trackPageView(url: string, title?: string) {
  if (typeof window === "undefined" || !window.gtag || !GA_TRACKING_ID) return;

  window.gtag("config", GA_TRACKING_ID, {
    page_title: title || document.title,
    page_location: url,
  });
}

export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
}

export function trackInteraction(element: string, action: string) {
  trackEvent(action, "User Interaction", element);
}

export function trackFormSubmission(formName: string, success = true) {
  trackEvent("form_submit", "Form", formName, success ? 1 : 0);
}

export function trackDownload(fileName: string) {
  trackEvent("download", "File", fileName);
}

export function trackExternalLink(url: string) {
  trackEvent("click", "External Link", url);
}

export function trackScrollDepth() {
  if (typeof window === "undefined") return;

  let maxScroll = 0;
  const thresholds = [25, 50, 75, 90, 100];
  const tracked = new Set<number>();

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);

    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;

      thresholds.forEach((threshold) => {
        if (scrollPercent >= threshold && !tracked.has(threshold)) {
          tracked.add(threshold);
          trackEvent("scroll", "Scroll Depth", `${threshold}%`, threshold);
        }
      });
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}

export function trackTimeOnPage() {
  if (typeof window === "undefined") return;

  const startTime = Date.now();
  const intervals = [30, 60, 120, 300];
  const tracked = new Set<number>();

  const checkTime = () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    intervals.forEach((interval) => {
      if (timeSpent >= interval && !tracked.has(interval)) {
        tracked.add(interval);
        trackEvent("timing", "Time on Page", `${interval}s`, interval);
      }
    });
  };

  const intervalId = setInterval(checkTime, 10000);

  const handleBeforeUnload = () => {
    const totalTime = Math.floor((Date.now() - startTime) / 1000);
    trackEvent("timing", "Session Duration", "total", totalTime);
  };

  window.addEventListener("beforeunload", handleBeforeUnload);

  return () => {
    clearInterval(intervalId);
    window.removeEventListener("beforeunload", handleBeforeUnload);
  };
}

export function trackPerformanceMetrics() {
  if (typeof window === "undefined") return;

  const sendToGA4 = (metric: any) => {
    if (!window.gtag) return;
    window.gtag("event", "web_vitals", {
      event_category: "Performance",
      event_label: metric.name,
      value: Math.round(
        metric.name === "CLS" ? metric.value * 1000 : metric.value
      ),
      custom_parameter_1: metric.rating || "unknown",
      custom_parameter_2: metric.navigationType || "navigate",
      custom_parameter_3:
        (navigator as any).connection?.effectiveType || "unknown",
      non_interaction: true,
    });
  };

  import("web-vitals").then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
    onCLS(sendToGA4);
    onINP(sendToGA4);
    onFCP(sendToGA4);
    onLCP(sendToGA4);
    onTTFB(sendToGA4);
  });
}

export function trackUserPreferences() {
  if (typeof window === "undefined") return;

  const theme = localStorage.getItem("theme") || "system";
  trackEvent("preference", "Theme", theme);

  const deviceInfo = {
    screen: `${screen.width}x${screen.height}`,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    pixelRatio: window.devicePixelRatio || 1,
    touchSupport: "ontouchstart" in window,
  };

  trackEvent("device_info", "Screen Resolution", deviceInfo.screen);
  trackEvent("device_info", "Viewport Size", deviceInfo.viewport);
  trackEvent("device_info", "Pixel Ratio", deviceInfo.pixelRatio.toString());
  trackEvent(
    "device_info",
    "Touch Support",
    deviceInfo.touchSupport.toString()
  );

  if (navigator.connection) {
    trackEvent(
      "connection",
      "Effective Type",
      navigator.connection.effectiveType
    );
    trackEvent(
      "connection",
      "Downlink",
      navigator.connection.downlink?.toString()
    );
  }
}

export function initPrivacyCompliantAnalytics() {
  if (typeof window === "undefined") return;

  const hasConsent = localStorage.getItem("analytics-consent") === "true";

  if (hasConsent) {
    initGA();
    trackPerformanceMetrics();
    trackScrollDepth();
    trackTimeOnPage();
    trackUserPreferences();
  } else {
    console.log("Analytics consent not given");
  }
}

export function giveAnalyticsConsent() {
  localStorage.setItem("analytics-consent", "true");
  initPrivacyCompliantAnalytics();
}

export function revokeAnalyticsConsent() {
  localStorage.setItem("analytics-consent", "false");
  if (window.gtag) {
    window.gtag("consent", "update", {
      analytics_storage: "denied",
      ad_storage: "denied",
    });
  }
}

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
  interface Navigator {
    connection?: {
      effectiveType?: string;
      downlink?: number;
      [key: string]: any;
    };
  }
}
