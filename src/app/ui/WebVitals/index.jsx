/**
 * Composant pour tracker les Web Vitals (Core Web Vitals)
 * Mesure les métriques de performance importantes
 */
"use client";

import { useEffect } from "react";

export default function WebVitals() {
  useEffect(() => {
    // Ne tracker que si on est en production et si l'API est disponible
    if (
      typeof window === "undefined" ||
      process.env.NODE_ENV !== "production" ||
      !("PerformanceObserver" in window)
    ) {
      return;
    }

    // Fonction pour envoyer les métriques (à adapter selon votre service d'analytics)
    const sendToAnalytics = (metric) => {
      // Exemple : envoyer à Google Analytics, Plausible, ou votre service
      // Vous pouvez remplacer par votre service d'analytics préféré
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", metric.name, {
          event_category: "Web Vitals",
          value: Math.round(metric.value),
          event_label: metric.id,
          non_interaction: true,
        });
      }

      // Log en développement
      if (process.env.NODE_ENV === "development") {
        console.log(`[Web Vitals] ${metric.name}:`, Math.round(metric.value), metric.id);
      }
    };

    // Mesurer LCP (Largest Contentful Paint)
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        sendToAnalytics({
          name: "LCP",
          value: lastEntry.renderTime || lastEntry.loadTime,
          id: lastEntry.entryType,
        });
      });
      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
    } catch (e) {
      // PerformanceObserver non supporté ou erreur
    }

    // Mesurer FID (First Input Delay)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          sendToAnalytics({
            name: "FID",
            value: entry.processingStart - entry.startTime,
            id: entry.name,
          });
        });
      });
      fidObserver.observe({ entryTypes: ["first-input"] });
    } catch (e) {
      // PerformanceObserver non supporté ou erreur
    }

    // Mesurer CLS (Cumulative Layout Shift)
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        sendToAnalytics({
          name: "CLS",
          value: clsValue,
          id: "cumulative-layout-shift",
        });
      });
      clsObserver.observe({ entryTypes: ["layout-shift"] });
    } catch (e) {
      // PerformanceObserver non supporté ou erreur
    }

    // Mesurer TTFB (Time to First Byte)
    try {
      const navigationObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === "navigation") {
            const ttfb = entry.responseStart - entry.requestStart;
            sendToAnalytics({
              name: "TTFB",
              value: ttfb,
              id: "time-to-first-byte",
            });
          }
        });
      });
      navigationObserver.observe({ entryTypes: ["navigation"] });
    } catch (e) {
      // PerformanceObserver non supporté ou erreur
    }
  }, []);

  return null; // Ce composant ne rend rien visuellement
}
