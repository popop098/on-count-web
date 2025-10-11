import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return;

    // Monitor Core Web Vitals
    const reportWebVitals = (metric) => {
      // Send to analytics service (replace with your preferred analytics)
      console.log('Web Vital:', metric);
      
      // Example: Send to Google Analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', metric.name, {
          event_category: 'Web Vitals',
          event_label: metric.id,
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          non_interaction: true,
        });
      }
    };

    // Import and initialize web-vitals
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(reportWebVitals);
      getFID(reportWebVitals);
      getFCP(reportWebVitals);
      getLCP(reportWebVitals);
      getTTFB(reportWebVitals);
    });

    // Monitor bundle size
    const checkBundleSize = () => {
      if ('performance' in window && 'getEntriesByType' in window.performance) {
        const resources = window.performance.getEntriesByType('resource');
        const jsResources = resources.filter(resource => 
          resource.name.includes('.js') && 
          !resource.name.includes('node_modules')
        );
        
        const totalSize = jsResources.reduce((total, resource) => {
          return total + (resource.transferSize || 0);
        }, 0);
        
        console.log('Bundle size analysis:', {
          totalJSResources: jsResources.length,
          totalSize: `${(totalSize / 1024).toFixed(2)} KB`,
          resources: jsResources.map(r => ({
            name: r.name.split('/').pop(),
            size: `${((r.transferSize || 0) / 1024).toFixed(2)} KB`
          }))
        });
      }
    };

    // Run bundle analysis after page load
    setTimeout(checkBundleSize, 2000);
  }, []);

  return null;
}