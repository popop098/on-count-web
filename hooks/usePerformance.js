import { useEffect } from 'react';
import { reportWebVitals } from '@/lib/performance';

export const usePerformanceMonitoring = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // Monitor Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        reportWebVitals({
          name: 'LCP',
          value: lastEntry.startTime,
          id: 'lcp',
        });
      });
      
      // Monitor First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          reportWebVitals({
            name: 'FID',
            value: entry.processingStart - entry.startTime,
            id: 'fid',
          });
        });
      });

      // Monitor Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        reportWebVitals({
          name: 'CLS',
          value: clsValue,
          id: 'cls',
        });
      });

      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        fidObserver.observe({ entryTypes: ['first-input'] });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.warn('Performance monitoring not supported:', e);
      }

      return () => {
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
      };
    }
  }, []);
};

export const useResourceTiming = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.transferSize > 100000) { // Log resources > 100KB
            console.warn(`Large resource detected: ${entry.name} (${Math.round(entry.transferSize / 1024)}KB)`);
          }
        });
      });

      try {
        observer.observe({ entryTypes: ['resource'] });
      } catch (e) {
        console.warn('Resource timing not supported:', e);
      }

      return () => observer.disconnect();
    }
  }, []);
};