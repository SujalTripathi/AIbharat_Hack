import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });

    // Log to error reporting service in production
    if (process.env.NODE_ENV === 'production') {
      // TODO: Send to error tracking service (Sentry, LogRocket, etc.)
      console.error('Production error:', {
        error: error.toString(),
        stack: error.stack,
        componentStack: errorInfo.componentStack
      });
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900/20 to-slate-900 flex items-center justify-center px-4">
          <div className="max-w-2xl w-full">
            <div className="backdrop-blur-lg bg-white/5 border border-red-500/20 rounded-2xl p-8 sm:p-12 shadow-2xl">
              {/* Error Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center animate-pulse">
                  <AlertTriangle className="text-white" size={40} />
                </div>
              </div>

              {/* Error Message */}
              <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Oops! Something went wrong
                </h1>
                <p className="text-gray-300 text-lg mb-6">
                  We're sorry for the inconvenience. Our team has been notified.
                </p>

                {/* Error Details (Development Only) */}
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <div className="mt-6 p-4 bg-slate-800/50 rounded-lg text-left overflow-auto max-h-60">
                    <p className="text-red-400 font-mono text-sm mb-2">
                      <strong>Error:</strong> {this.state.error.toString()}
                    </p>
                    {this.state.error.stack && (
                      <pre className="text-xs text-gray-400 whitespace-pre-wrap break-words">
                        {this.state.error.stack}
                      </pre>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={this.handleReload}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-white font-semibold hover:scale-105 transition-transform duration-200 shadow-lg shadow-cyan-500/50"
                >
                  <RefreshCcw size={20} />
                  <span>Reload Page</span>
                </button>

                <button
                  onClick={this.handleGoHome}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-white/10 border border-white/20 rounded-lg text-white font-semibold hover:bg-white/20 transition-colors duration-200"
                >
                  <Home size={20} />
                  <span>Go Home</span>
                </button>
              </div>

              {/* Help Text */}
              <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <p className="text-sm text-gray-400">
                  If this problem persists, please{' '}
                  <a
                    href="mailto:support@careerai.com"
                    className="text-cyan-400 hover:text-cyan-300 underline"
                  >
                    contact support
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
