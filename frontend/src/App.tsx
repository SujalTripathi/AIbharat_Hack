import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import OfflineIndicator from './components/OfflineIndicator';
import SEO from './components/SEO';
import Home from './pages/Home';
import ResumeCheckerModern from './pages/ResumeCheckerModern';
import MockInterviewModern from './pages/MockInterviewModern';
import SkillGapModern from './pages/SkillGapModern';
import JobRecommendations from './pages/JobRecommendations';
import History from './pages/History';
import { trackPageView } from './utils/analytics';
import { performanceMonitor } from './utils/performance';

// Analytics tracker component
function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    // Track page view
    trackPageView(location.pathname, document.title);
  }, [location]);

  return null;
}

function App() {
  useEffect(() => {
    // Initialize performance monitoring
    console.log('⚡ CareerAI initialized');
    console.log('📊 Performance metrics:', performanceMonitor.getMetrics());

    // Cleanup on unmount
    return () => {
      performanceMonitor.cleanup();
    };
  }, []);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <Router>
          <SEO />
          <OfflineIndicator />
          <AnalyticsTracker />
          
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#1e293b',
                color: '#fff',
                padding: '16px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
          
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/resume" element={<ResumeCheckerModern />} />
              <Route path="/interview" element={<MockInterviewModern />} />
              <Route path="/skill-gap" element={<SkillGapModern />} />
              <Route path="/jobs" element={<JobRecommendations />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </Layout>
        </Router>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
