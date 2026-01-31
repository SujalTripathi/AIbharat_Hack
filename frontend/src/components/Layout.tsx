import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, MessageSquare, TrendingUp, Briefcase, History, Home, Menu, X, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import Logo from './Logo';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/resume', label: 'Resume Checker', icon: FileText },
    { path: '/interview', label: 'Mock Interview', icon: MessageSquare },
    { path: '/skill-gap', label: 'Skill Gap', icon: TrendingUp },
    { path: '/jobs', label: 'Job Match', icon: Briefcase },
    { path: '/history', label: 'History', icon: History },
  ];

  // Full-screen pages that don't need the layout wrapper
  const fullScreenPages = ['/', '/resume', '/interview', '/skill-gap', '/jobs', '/history'];
  const isFullScreen = fullScreenPages.includes(location.pathname);

  if (isFullScreen) {
    return (
      <div className="min-h-screen">
        {/* Enhanced Header for full-screen pages */}
        <header className="fixed top-0 left-0 right-0 bg-slate-900/90 backdrop-blur-xl border-b border-white/10 z-50 shadow-2xl shadow-blue-500/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <Link to="/" className="hover:scale-105 transition-transform duration-300">
                <Logo size="md" showText={true} />
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`group relative flex items-center space-x-2 px-5 py-2.5 rounded-xl transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 shadow-lg shadow-blue-500/20'
                          : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Icon size={20} className={isActive ? 'animate-pulse' : ''} />
                      <span className="font-semibold text-sm tracking-wide">{item.label}</span>
                      {isActive && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500"></div>
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-white hover:bg-white/10 rounded-xl transition-colors"
              >
                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden absolute top-20 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-b border-white/10 shadow-2xl animate-slideDown">
              <nav className="max-w-7xl mx-auto px-4 py-6 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-5 py-4 rounded-xl transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border border-blue-500/30'
                          : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Icon size={24} />
                      <span className="font-semibold text-lg">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          )}
        </header>

        {/* Enhanced Mobile Bottom Navigation */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-white/10 z-50 shadow-2xl shadow-black/20">
          <div className="grid grid-cols-6 gap-1 p-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-br from-blue-500/30 to-purple-500/30 text-blue-400 scale-105 shadow-lg shadow-blue-500/20'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={22} className={isActive ? 'animate-pulse' : ''} />
                  <span className="text-[10px] mt-1.5 font-semibold tracking-wide">{item.label.split(' ')[0]}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Main Content */}
        <main className="pt-20 pb-24 lg:pb-8">
          {children}
        </main>

        {/* Enhanced Footer */}
        <footer className="bg-slate-950/80 backdrop-blur-xl border-t border-white/10 pb-20 lg:pb-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* Brand Column */}
              <div className="space-y-4">
                <Logo size="md" showText={true} />
                <p className="text-gray-400 text-sm leading-relaxed">
                  AI-powered career placement tool helping professionals land their dream jobs through intelligent resume analysis, interview prep, and skill development.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  {navItems.slice(1, 5).map((item) => (
                    <li key={item.path}>
                      <Link 
                        to={item.path} 
                        className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2"
                      >
                        <item.icon size={16} />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-white font-bold text-lg mb-4">Connect With Us</h3>
                <div className="flex gap-3 mb-4">
                  <a href="https://github.com/SujalTripathi" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 hover:bg-blue-500/20 text-gray-400 hover:text-blue-400 rounded-xl transition-all hover:scale-110">
                    <Github size={20} />
                  </a>
                  <a href="https://x.com/sujaltripa48643" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 hover:bg-blue-500/20 text-gray-400 hover:text-blue-400 rounded-xl transition-all hover:scale-110">
                    <Twitter size={20} />
                  </a>
                  <a href="https://www.linkedin.com/in/sujaltripathi/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 hover:bg-blue-500/20 text-gray-400 hover:text-blue-400 rounded-xl transition-all hover:scale-110">
                    <Linkedin size={20} />
                  </a>
                  <a href="mailto:feedback@careerai.com" className="p-3 bg-white/5 hover:bg-blue-500/20 text-gray-400 hover:text-blue-400 rounded-xl transition-all hover:scale-110">
                    <Mail size={20} />
                  </a>
                </div>
                <p className="text-gray-400 text-sm">
                  feedback@careerai.com
                </p>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-400 text-sm text-center md:text-left">
                  © 2026 CareerAI. Empowering careers with artificial intelligence.
                </p>
                <div className="flex gap-6 text-sm">
                  <Link to="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors">Privacy Policy</Link>
                  <Link to="/terms" className="text-gray-400 hover:text-blue-400 transition-colors">Terms of Service</Link>
                  <Link to="/cookies" className="text-gray-400 hover:text-blue-400 transition-colors">Cookie Policy</Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Regular layout for non-full-screen pages
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="hover:scale-105 transition-transform">
              <Logo size="md" showText={true} />
            </Link>

            <nav className="hidden md:flex space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 shadow-md'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-semibold text-sm">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white shadow-lg">
            <nav className="px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={22} />
                    <span className="font-semibold">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
        <div className="grid grid-cols-6 gap-1 p-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-gradient-to-br from-blue-50 to-purple-50 text-blue-700 scale-105'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon size={22} />
                <span className="text-[10px] mt-1.5 font-semibold">{item.label.split(' ')[0]}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12 pb-24 md:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm text-center md:text-left">
              © 2026 CareerAI. AI-Powered Career Placement Tool.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors">
                <Github size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
