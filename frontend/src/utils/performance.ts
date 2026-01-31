/**
 * Performance monitoring utilities
 * Track and report performance metrics
 */

interface PerformanceMetrics {
  loadTime: number;
  firstPaint: number;
  firstContentfulPaint: number;
  domContentLoaded: number;
  domInteractive: number;
  timeToInteractive: number;
}

class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};
  private observers: PerformanceObserver[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'performance' in window) {
      this.initializeObservers();
      this.capturePageLoadMetrics();
    }
  }

  /**
   * Initialize performance observers
   */
  private initializeObservers() {
    try {
      // Observe paint metrics
      const paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-paint') {
            this.metrics.firstPaint = entry.startTime;
          }
          if (entry.name === 'first-contentful-paint') {
            this.metrics.firstContentfulPaint = entry.startTime;
          }
        }
      });
      paintObserver.observe({ entryTypes: ['paint'] });
      this.observers.push(paintObserver);

      // Observe navigation timing
      const navigationObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const navEntry = entry as PerformanceNavigationTiming;
          this.metrics.domContentLoaded = navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart;
          this.metrics.domInteractive = navEntry.domInteractive - navEntry.fetchStart;
          this.metrics.loadTime = navEntry.loadEventEnd - navEntry.fetchStart;
        }
      });
      navigationObserver.observe({ entryTypes: ['navigation'] });
      this.observers.push(navigationObserver);
    } catch (error) {
      console.warn('Performance observers not supported:', error);
    }
  }

  /**
   * Capture page load metrics
   */
  private capturePageLoadMetrics() {
    if (document.readyState === 'complete') {
      this.calculateMetrics();
    } else {
      window.addEventListener('load', () => this.calculateMetrics());
    }
  }

  /**
   * Calculate and store metrics
   */
  private calculateMetrics() {
    const timing = performance.timing;
    
    this.metrics.loadTime = timing.loadEventEnd - timing.navigationStart;
    this.metrics.domContentLoaded = timing.domContentLoadedEventEnd - timing.domContentLoadedEventStart;
    this.metrics.domInteractive = timing.domInteractive - timing.navigationStart;
    this.metrics.timeToInteractive = timing.domInteractive - timing.fetchStart;

    if (process.env.NODE_ENV === 'development') {
      console.log('Performance Metrics:', this.metrics);
    }

    // Send to analytics in production
    if (process.env.NODE_ENV === 'production') {
      this.sendToAnalytics();
    }
  }

  /**
   * Measure specific operation duration
   */
  public measureOperation(name: string, operation: () => void | Promise<void>): void {
    const startMark = `${name}-start`;
    const endMark = `${name}-end`;
    const measureName = `${name}-duration`;

    performance.mark(startMark);

    const result = operation();

    if (result instanceof Promise) {
      result.then(() => {
        performance.mark(endMark);
        performance.measure(measureName, startMark, endMark);
        const measure = performance.getEntriesByName(measureName)[0];
        console.log(`${name} took ${measure.duration.toFixed(2)}ms`);
      });
    } else {
      performance.mark(endMark);
      performance.measure(measureName, startMark, endMark);
      const measure = performance.getEntriesByName(measureName)[0];
      console.log(`${name} took ${measure.duration.toFixed(2)}ms`);
    }
  }

  /**
   * Get current metrics
   */
  public getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }

  /**
   * Send metrics to analytics service
   */
  private sendToAnalytics() {
    // TODO: Integrate with analytics service (Google Analytics, Mixpanel, etc.)
    console.log('Sending metrics to analytics:', this.metrics);
  }

  /**
   * Calculate Web Vitals scores
   */
  public getWebVitals(): {
    lcp: number | null; // Largest Contentful Paint
    fid: number | null; // First Input Delay
    cls: number | null; // Cumulative Layout Shift
  } {
    let lcp: number | null = null;
    let fid: number | null = null;
    let cls: number | null = null;

    try {
      // LCP
      const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
      if (lcpEntries.length > 0) {
        lcp = (lcpEntries[lcpEntries.length - 1] as any).startTime;
      }

      // FID
      const fidEntries = performance.getEntriesByType('first-input');
      if (fidEntries.length > 0) {
        fid = (fidEntries[0] as any).processingStart - (fidEntries[0] as any).startTime;
      }

      // CLS
      const clsEntries = performance.getEntriesByType('layout-shift');
      cls = clsEntries.reduce((sum, entry: any) => {
        if (!entry.hadRecentInput) {
          return sum + entry.value;
        }
        return sum;
      }, 0);
    } catch (error) {
      console.warn('Error calculating Web Vitals:', error);
    }

    return { lcp, fid, cls };
  }

  /**
   * Monitor component render time
   */
  public measureComponentRender(componentName: string): () => void {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      if (renderTime > 16) { // More than 1 frame at 60fps
        console.warn(`${componentName} render took ${renderTime.toFixed(2)}ms (> 16ms)`);
      }
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`${componentName} rendered in ${renderTime.toFixed(2)}ms`);
      }
    };
  }

  /**
   * Clean up observers
   */
  public cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Export singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Helper function to measure async operations
export const measureAsync = async <T>(
  name: string,
  operation: () => Promise<T>
): Promise<T> => {
  const startTime = performance.now();
  
  try {
    const result = await operation();
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    console.log(`${name} completed in ${duration.toFixed(2)}ms`);
    
    return result;
  } catch (error) {
    const endTime = performance.now();
    const duration = endTime - startTime;
    console.error(`${name} failed after ${duration.toFixed(2)}ms`, error);
    throw error;
  }
};

export default performanceMonitor;
