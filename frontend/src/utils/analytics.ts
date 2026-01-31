/**
 * Analytics tracking utilities
 * Centralized analytics tracking for user interactions
 */

type EventCategory = 'User' | 'Resume' | 'Interview' | 'Job' | 'SkillGap' | 'Navigation';
type EventAction = string;
type EventLabel = string;

interface AnalyticsEvent {
  category: EventCategory;
  action: EventAction;
  label?: EventLabel;
  value?: number;
  timestamp?: number;
}

interface PageView {
  path: string;
  title: string;
  timestamp: number;
}

class Analytics {
  private events: AnalyticsEvent[] = [];
  private pageViews: PageView[] = [];
  private sessionStart: number;
  private isInitialized: boolean = false;

  constructor() {
    this.sessionStart = Date.now();
    this.initializeAnalytics();
  }

  /**
   * Initialize analytics services
   */
  private initializeAnalytics() {
    if (typeof window === 'undefined') return;

    // Initialize Google Analytics (if gtag is available)
    if (typeof (window as any).gtag === 'function') {
      this.isInitialized = true;
      console.log('Google Analytics initialized');
    }

    // Track session start
    this.trackEvent('User', 'Session Start', 'New Session');
  }

  /**
   * Track custom events
   */
  public trackEvent(
    category: EventCategory,
    action: EventAction,
    label?: EventLabel,
    value?: number
  ): void {
    const event: AnalyticsEvent = {
      category,
      action,
      label,
      value,
      timestamp: Date.now()
    };

    this.events.push(event);

    // Send to Google Analytics if available
    if (this.isInitialized && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      });
    }

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', event);
    }

    // Send to custom analytics endpoint in production
    if (process.env.NODE_ENV === 'production') {
      this.sendToServer(event);
    }
  }

  /**
   * Track page views
   */
  public trackPageView(path: string, title: string): void {
    const pageView: PageView = {
      path,
      title,
      timestamp: Date.now()
    };

    this.pageViews.push(pageView);

    // Send to Google Analytics if available
    if (this.isInitialized && typeof (window as any).gtag === 'function') {
      (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: path,
        page_title: title
      });
    }

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Page View:', pageView);
    }
  }

  /**
   * Track user actions for features
   */
  public trackFeatureUsage(featureName: string, action: string, details?: string): void {
    this.trackEvent('User', `${featureName} - ${action}`, details);
  }

  /**
   * Track errors
   */
  public trackError(errorName: string, errorMessage: string, stackTrace?: string): void {
    this.trackEvent('User', 'Error', errorName, 1);

    // Send detailed error info
    if (process.env.NODE_ENV === 'production') {
      this.sendToServer({
        type: 'error',
        name: errorName,
        message: errorMessage,
        stack: stackTrace,
        timestamp: Date.now()
      });
    }
  }

  /**
   * Track API calls
   */
  public trackAPICall(endpoint: string, method: string, duration: number, success: boolean): void {
    this.trackEvent(
      'User',
      'API Call',
      `${method} ${endpoint} - ${success ? 'Success' : 'Failed'}`,
      duration
    );
  }

  /**
   * Track user timing
   */
  public trackTiming(category: string, variable: string, time: number, label?: string): void {
    if (this.isInitialized && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'timing_complete', {
        name: variable,
        value: time,
        event_category: category,
        event_label: label
      });
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(`Timing: ${category} - ${variable}: ${time}ms ${label || ''}`);
    }
  }

  /**
   * Track conversions (goals achieved)
   */
  public trackConversion(goalName: string, value?: number): void {
    this.trackEvent('User', 'Conversion', goalName, value);

    if (this.isInitialized && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'conversion', {
        send_to: 'AW-CONVERSION_ID', // Replace with actual conversion ID
        value: value,
        currency: 'USD'
      });
    }
  }

  /**
   * Get session duration
   */
  public getSessionDuration(): number {
    return Date.now() - this.sessionStart;
  }

  /**
   * Get all tracked events
   */
  public getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  /**
   * Get all page views
   */
  public getPageViews(): PageView[] {
    return [...this.pageViews];
  }

  /**
   * Send data to analytics server
   */
  private async sendToServer(data: any): Promise<void> {
    try {
      // TODO: Replace with actual analytics endpoint
      const endpoint = '/api/analytics';
      
      await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
    } catch (error) {
      console.error('Failed to send analytics:', error);
    }
  }

  /**
   * Clear stored data (useful for privacy)
   */
  public clear(): void {
    this.events = [];
    this.pageViews = [];
  }
}

// Export singleton instance
export const analytics = new Analytics();

// Convenience functions
export const trackEvent = (
  category: EventCategory,
  action: EventAction,
  label?: EventLabel,
  value?: number
) => analytics.trackEvent(category, action, label, value);

export const trackPageView = (path: string, title: string) =>
  analytics.trackPageView(path, title);

export const trackFeatureUsage = (featureName: string, action: string, details?: string) =>
  analytics.trackFeatureUsage(featureName, action, details);

export default analytics;
