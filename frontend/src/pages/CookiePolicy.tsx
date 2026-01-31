import React from 'react';
import { Cookie, Settings, BarChart, Shield, Info, ToggleLeft } from 'lucide-react';

const CookiePolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto animate-fadeIn">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl mb-6 animate-float shadow-2xl shadow-amber-500/30">
            <Cookie className="text-white" size={40} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Cookie Policy
            </span>
          </h1>
          <p className="text-gray-400 text-sm">Last updated: January 31, 2026</p>
        </div>

        {/* Content */}
        <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 space-y-8">
          {/* What Are Cookies */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Info className="text-amber-400" size={24} />
              <h2 className="text-2xl font-bold text-white">What Are Cookies?</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              Cookies are small text files that are placed on your device when you visit CareerAI. They help us provide you with a better experience by remembering your preferences and analyzing how you use our platform.
            </p>
            <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl p-4">
              <p className="text-sm text-gray-300 italic">
                💡 Think of cookies as digital sticky notes that help us remember you and improve your experience!
              </p>
            </div>
          </section>

          {/* Types of Cookies */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Settings className="text-blue-400" size={24} />
              <h2 className="text-2xl font-bold text-white">Types of Cookies We Use</h2>
            </div>
            <div className="space-y-4">
              {/* Essential Cookies */}
              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Shield className="text-green-400" size={20} />
                    <h3 className="font-bold text-white">Essential Cookies</h3>
                  </div>
                  <span className="px-3 py-1 bg-green-500/20 border border-green-500/40 text-green-400 text-xs rounded-full font-semibold">
                    Required
                  </span>
                </div>
                <p className="text-sm text-gray-300 mb-3">
                  These cookies are necessary for the platform to function properly. They enable core features like security, authentication, and basic functionality.
                </p>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-xs text-gray-400 font-semibold mb-2">Examples:</div>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Session management and user authentication</li>
                    <li>• Security and fraud prevention</li>
                    <li>• Load balancing and performance</li>
                  </ul>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <BarChart className="text-blue-400" size={20} />
                    <h3 className="font-bold text-white">Analytics Cookies</h3>
                  </div>
                  <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/40 text-blue-400 text-xs rounded-full font-semibold">
                    Optional
                  </span>
                </div>
                <p className="text-sm text-gray-300 mb-3">
                  These cookies help us understand how visitors interact with our platform by collecting anonymous information about usage patterns.
                </p>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-xs text-gray-400 font-semibold mb-2">Examples:</div>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Page views and navigation patterns</li>
                    <li>• Feature usage statistics</li>
                    <li>• Error tracking and debugging</li>
                    <li>• Performance monitoring</li>
                  </ul>
                </div>
              </div>

              {/* Functional Cookies */}
              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <ToggleLeft className="text-purple-400" size={20} />
                    <h3 className="font-bold text-white">Functional Cookies</h3>
                  </div>
                  <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/40 text-purple-400 text-xs rounded-full font-semibold">
                    Optional
                  </span>
                </div>
                <p className="text-sm text-gray-300 mb-3">
                  These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.
                </p>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-xs text-gray-400 font-semibold mb-2">Examples:</div>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Language and region preferences</li>
                    <li>• Theme and display settings</li>
                    <li>• Recently viewed jobs and resumes</li>
                    <li>• User interface customizations</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Managing Cookies */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Settings className="text-green-400" size={24} />
              <h2 className="text-2xl font-bold text-white">Managing Your Cookie Preferences</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              You have control over which cookies you accept. Here's how to manage them:
            </p>
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-5">
                <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <span className="text-green-400">1.</span> Browser Settings
                </h3>
                <p className="text-sm text-gray-300 mb-2">
                  Most browsers allow you to control cookies through their settings. You can:
                </p>
                <ul className="text-sm text-gray-400 space-y-1 pl-4">
                  <li>• Block all cookies</li>
                  <li>• Accept only first-party cookies</li>
                  <li>• Delete cookies after browsing</li>
                  <li>• Set exceptions for specific websites</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-5">
                <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <span className="text-blue-400">2.</span> Platform Settings
                </h3>
                <p className="text-sm text-gray-300">
                  Within CareerAI, you can manage your cookie preferences through your account settings. This allows you to opt-in or opt-out of optional cookies while keeping essential ones active.
                </p>
              </div>
            </div>
          </section>

          {/* Third-Party Cookies */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="text-yellow-400" size={24} />
              <h2 className="text-2xl font-bold text-white">Third-Party Cookies</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              We may use trusted third-party services that set their own cookies to help us improve CareerAI:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-4">
                <div className="font-semibold text-white mb-2">Analytics Services</div>
                <p className="text-sm text-gray-400">Help us understand usage patterns and improve features</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="font-semibold text-white mb-2">Error Tracking</div>
                <p className="text-sm text-gray-400">Help us identify and fix technical issues quickly</p>
              </div>
            </div>
          </section>

          {/* Impact of Blocking Cookies */}
          <section className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Info className="text-red-400" size={24} />
              <h2 className="text-xl font-bold text-white">Impact of Blocking Cookies</h2>
            </div>
            <p className="text-gray-300 text-sm mb-3">
              While you can block or delete cookies, please note that:
            </p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">⚠</span>
                <span>Some features may not work properly without cookies</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">⚠</span>
                <span>You may need to re-enter information on each visit</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">⚠</span>
                <span>Your experience may be less personalized</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">⚠</span>
                <span>Analytics data may be incomplete, affecting service improvements</span>
              </li>
            </ul>
          </section>

          {/* Updates */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Cookie className="text-purple-400" size={24} />
              <h2 className="text-2xl font-bold text-white">Updates to This Policy</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              We may update this Cookie Policy from time to time to reflect changes in technology or legal requirements. We will notify you of any significant changes and update the "Last updated" date at the top of this page.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">Questions About Cookies?</h2>
            <p className="text-gray-300 mb-4">
              If you have any questions about our use of cookies, please contact us:
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-gray-300"><strong className="text-white">Email:</strong> cookies@careerai.com</p>
              <p className="text-gray-300"><strong className="text-white">Developer:</strong> Sujal Tripathi</p>
              <p className="text-gray-300"><strong className="text-white">X (Twitter):</strong> <a href="https://x.com/sujaltripa48643" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">@sujaltripa48643</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
