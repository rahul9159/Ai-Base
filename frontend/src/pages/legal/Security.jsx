import React from 'react';
import { Shield, Lock, Eye, Server, Key, AlertTriangle } from 'lucide-react';

export default function Security() {
    const features = [
        {
            icon: Lock,
            title: 'End-to-End Encryption',
            description: 'All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption.'
        },
        {
            icon: Server,
            title: 'Secure Infrastructure',
            description: 'Our services run on enterprise-grade cloud infrastructure with 99.9% uptime SLA.'
        },
        {
            icon: Key,
            title: 'Access Controls',
            description: 'Multi-factor authentication and role-based access control protect your account.'
        },
        {
            icon: Eye,
            title: 'Regular Audits',
            description: 'We conduct regular security audits and penetration testing by third-party experts.'
        }
    ];

    const certifications = [
        { name: 'SOC 2 Type II', icon: '🏆' },
        { name: 'ISO 27001', icon: '✅' },
        { name: 'GDPR Compliant', icon: '🇪🇺' },
        { name: 'CCPA Compliant', icon: '🔒' }
    ];

    const bestPractices = [
        'Use a strong, unique password for your AI-Base account',
        'Enable two-factor authentication (2FA) for added security',
        'Regularly review your account activity and connected devices',
        'Never share your account credentials with anyone',
        'Keep your email address and recovery information up to date',
        'Report any suspicious activity immediately to our security team'
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-purple-50/20">
            <section className="py-20 lg:py-32">
                <div className="container mx-auto px-6">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Shield className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">Security</h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Your security is our top priority. Learn how we protect your data and keep your account safe.
                        </p>
                    </div>

                    {/* Security Features */}
                    <div className="max-w-6xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Security Measures</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {features.map((feature, idx) => {
                                const Icon = feature.icon;
                                return (
                                    <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow">
                                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                                            <Icon className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                                        <p className="text-gray-600 text-sm">{feature.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Certifications */}
                    <div className="max-w-4xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Certifications & Compliance</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {certifications.map((cert, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center">
                                    <div className="text-4xl mb-3">{cert.icon}</div>
                                    <p className="font-semibold text-gray-900">{cert.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Best Practices */}
                    <div className="max-w-4xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Security Best Practices</h2>
                        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
                            <ul className="space-y-4">
                                {bestPractices.map((practice, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-700">{practice}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Report Security Issue */}
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-8">
                            <div className="flex items-start gap-4 mb-6">
                                <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0" />
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Found a Security Issue?</h2>
                                    <p className="text-gray-700 mb-4">
                                        We take security vulnerabilities seriously. If you've discovered a security issue, please report it to our security team immediately.
                                    </p>
                                    <button className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors">
                                        Report Security Issue
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="max-w-4xl mx-auto mt-12">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-center text-white">
                            <h2 className="text-3xl font-bold mb-4">Questions About Security?</h2>
                            <p className="text-lg mb-6 opacity-90">
                                Our security team is available 24/7 to address your concerns.
                            </p>
                            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all">
                                Contact Security Team
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
