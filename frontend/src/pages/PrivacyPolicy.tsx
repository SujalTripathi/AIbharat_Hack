import React from 'react';
import { Shield, Lock, Eye, Database, UserCheck, FileText } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto animate-fadeIn">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mb-6 animate-float shadow-2xl shadow-blue-500/30">
            <Shield className="text-white" size={40} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Privacy Policy
            </span>
          </h1>
          <p className="text-gray-400 text-sm">Last updated: January 31, 2026</p>
        </div>

        {/* Content */}
        <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 space-y-8">
          {/* Introduction */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Eye className="text-blue-400" size={24} />
              <h2 className="text-2xl font-bold text-white">Introduction</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              At CareerAI, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered career placement platform.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Database className="text-purple-400" size={24} />
              <h2 className="text-2xl font-bold text-white">Information We Collect</h2>
            </div>
            <div className="space-y-4 text-gray-300">
              <div className="bg-white/5 rounded-xl p-4">
                <h3 className="font-semibold text-white mb-2">Personal Information</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Resume data (name, contact information, education, work experience)</li>
                  <li>Skills and qualifications</li>
                  <li>Career preferences and goals</li>
                  <li>Interview responses and feedback</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <h3 className="font-semibold text-white mb-2">Usage Information</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Platform usage patterns and feature interactions</li>
                  <li>Session duration and frequency</li>
                  <li>Device and browser information</li>
                  <li>IP address and location data</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="text-green-400" size={24} />
              <h2 className="text-2xl font-bold text-white">How We Use Your Information</h2>
            </div>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Analyze and optimize your resume for ATS compatibility</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Generate personalized interview questions and feedback</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Identify skill gaps and recommend learning paths</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Match you with relevant job opportunities</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Improve our AI models and platform features</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Send updates about your progress and new features</span>
              </li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Lock className="text-yellow-400" size={24} />
              <h2 className="text-2xl font-bold text-white">Data Security</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              We implement industry-standard security measures to protect your personal information:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-4">
                <div className="font-semibold text-yellow-400 mb-2">Encryption</div>
                <p className="text-sm text-gray-300">All data transmitted is encrypted using SSL/TLS protocols</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-4">
                <div className="font-semibold text-yellow-400 mb-2">Secure Storage</div>
                <p className="text-sm text-gray-300">Your data is stored in encrypted databases with restricted access</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-4">
                <div className="font-semibold text-yellow-400 mb-2">Regular Audits</div>
                <p className="text-sm text-gray-300">We conduct regular security audits and updates</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-4">
                <div className="font-semibold text-yellow-400 mb-2">Access Control</div>
                <p className="text-sm text-gray-300">Strict access controls and authentication mechanisms</p>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="text-pink-400" size={24} />
              <h2 className="text-2xl font-bold text-white">Your Rights</h2>
            </div>
            <div className="space-y-3 text-gray-300">
              <p className="leading-relaxed">You have the right to:</p>
              <ul className="space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">→</span>
                  <span><strong className="text-white">Access:</strong> Request a copy of your personal data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">→</span>
                  <span><strong className="text-white">Correction:</strong> Request corrections to inaccurate data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">→</span>
                  <span><strong className="text-white">Deletion:</strong> Request deletion of your personal data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">→</span>
                  <span><strong className="text-white">Portability:</strong> Request transfer of your data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">→</span>
                  <span><strong className="text-white">Opt-out:</strong> Unsubscribe from marketing communications</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">Contact Us</h2>
            <p className="text-gray-300 mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-gray-300"><strong className="text-white">Email:</strong> privacy@careerai.com</p>
              <p className="text-gray-300"><strong className="text-white">Developer:</strong> Sujal Tripathi</p>
              <p className="text-gray-300"><strong className="text-white">LinkedIn:</strong> <a href="https://www.linkedin.com/in/sujaltripathi/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">linkedin.com/in/sujaltripathi</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
