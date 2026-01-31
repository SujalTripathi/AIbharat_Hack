import React from 'react';
import { FileCheck, Scale, AlertTriangle, Users, Zap, CheckCircle } from 'lucide-react';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto animate-fadeIn">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl mb-6 animate-float shadow-2xl shadow-green-500/30">
            <FileCheck className="text-white" size={40} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Terms of Service
            </span>
          </h1>
          <p className="text-gray-400 text-sm">Last updated: January 31, 2026</p>
        </div>

        {/* Content */}
        <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 space-y-8">
          {/* Acceptance */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Scale className="text-green-400" size={24} />
              <h2 className="text-2xl font-bold text-white">Acceptance of Terms</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              By accessing and using CareerAI ("the Service"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
            </p>
          </section>

          {/* Service Description */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Zap className="text-blue-400" size={24} />
              <h2 className="text-2xl font-bold text-white">Service Description</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              CareerAI provides AI-powered career placement tools including:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="text-blue-400" size={18} />
                  <h3 className="font-semibold text-white">Resume Analysis</h3>
                </div>
                <p className="text-sm text-gray-400">ATS compatibility scoring and optimization suggestions</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="text-green-400" size={18} />
                  <h3 className="font-semibold text-white">Mock Interviews</h3>
                </div>
                <p className="text-sm text-gray-400">AI-generated questions with detailed feedback</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="text-purple-400" size={18} />
                  <h3 className="font-semibold text-white">Skill Gap Analysis</h3>
                </div>
                <p className="text-sm text-gray-400">Personalized learning recommendations</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="text-orange-400" size={18} />
                  <h3 className="font-semibold text-white">Job Matching</h3>
                </div>
                <p className="text-sm text-gray-400">AI-powered job recommendations</p>
              </div>
            </div>
          </section>

          {/* User Responsibilities */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Users className="text-purple-400" size={24} />
              <h2 className="text-2xl font-bold text-white">User Responsibilities</h2>
            </div>
            <div className="space-y-3 text-gray-300">
              <p className="leading-relaxed">As a user of CareerAI, you agree to:</p>
              <ul className="space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Provide accurate and truthful information in your resume and profile</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Not upload malicious files or attempt to compromise the platform</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Not use the Service for any illegal or unauthorized purpose</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Not share your account credentials with others</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Respect intellectual property rights of others</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Use the Service in compliance with all applicable laws</span>
                </li>
              </ul>
            </div>
          </section>

          {/* AI Disclaimer */}
          <section className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="text-yellow-400" size={24} />
              <h2 className="text-xl font-bold text-white">AI-Generated Content Disclaimer</h2>
            </div>
            <div className="space-y-3 text-gray-300 text-sm">
              <p className="leading-relaxed">
                <strong className="text-yellow-400">Important:</strong> CareerAI uses artificial intelligence to generate recommendations, feedback, and suggestions. While we strive for accuracy:
              </p>
              <ul className="space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">⚠</span>
                  <span>AI-generated content should be reviewed and verified by users</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">⚠</span>
                  <span>Recommendations are guidance, not guaranteed outcomes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">⚠</span>
                  <span>Users are responsible for final decisions about their careers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">⚠</span>
                  <span>We do not guarantee job placement or interview success</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <FileCheck className="text-pink-400" size={24} />
              <h2 className="text-2xl font-bold text-white">Intellectual Property</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-3">
              All content, features, and functionality of CareerAI are owned by us and protected by international copyright, trademark, and other intellectual property laws.
            </p>
            <p className="text-gray-300 leading-relaxed">
              You retain ownership of your resume and personal data, but grant us a license to process and analyze it to provide our services.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Scale className="text-red-400" size={24} />
              <h2 className="text-2xl font-bold text-white">Limitation of Liability</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              CareerAI and its developers shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the Service. We provide the platform "as is" without warranties of any kind.
            </p>
          </section>

          {/* Termination */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="text-orange-400" size={24} />
              <h2 className="text-2xl font-bold text-white">Termination</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              We reserve the right to terminate or suspend access to the Service immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <FileCheck className="text-cyan-400" size={24} />
              <h2 className="text-2xl font-bold text-white">Changes to Terms</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              We reserve the right to modify these Terms at any time. Continued use of the Service after changes constitutes acceptance of the modified Terms. We will notify users of significant changes.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">Questions About Terms?</h2>
            <p className="text-gray-300 mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-gray-300"><strong className="text-white">Email:</strong> legal@careerai.com</p>
              <p className="text-gray-300"><strong className="text-white">Developer:</strong> Sujal Tripathi</p>
              <p className="text-gray-300"><strong className="text-white">GitHub:</strong> <a href="https://github.com/SujalTripathi" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">github.com/SujalTripathi</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
