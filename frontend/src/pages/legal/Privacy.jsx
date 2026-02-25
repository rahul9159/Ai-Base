import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export default function Privacy() {
    const sections = [
        {
            title: 'Information We Collect',
            content: 'We collect information you provide directly to us, such as when you create an account, use our services, or communicate with us. This includes your name, email address, and any content you create using our AI tools.'
        },
        {
            title: 'How We Use Your Information',
            content: 'We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to protect our users and services. We never sell your personal information to third parties.'
        },
        {
            title: 'Data Security',
            content: 'We implement industry-standard security measures to protect your data. All data is encrypted in transit and at rest. We regularly audit our security practices to ensure your information remains safe.'
        },
        {
            title: 'Your Rights',
            content: 'You have the right to access, update, or delete your personal information at any time. You can also request a copy of all data we have about you. Contact us to exercise these rights.'
        },
        {
            title: 'Cookies and Tracking',
            content: 'We use cookies and similar technologies to improve your experience, analyze usage, and deliver personalized content. You can control cookie preferences in your browser settings.'
        },
        {
            title: 'Third-Party Services',
            content: 'We may use third-party services for analytics and infrastructure. These services have their own privacy policies and we ensure they meet our security standards.'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-purple-50/20">
            <section className="py-20 lg:py-32">
                <div className="container mx-auto px-6 max-w-4xl">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Shield className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
                        <p className="text-gray-600 text-lg">Last updated: February 6, 2026</p>
                    </div>

                    {/* Introduction */}
                    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 mb-8">
                        <p className="text-gray-700 leading-relaxed text-lg">
                            At AI-Base, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services. Please read this policy carefully to understand our practices regarding your personal data.
                        </p>
                    </div>

                    {/* Sections */}
                    <div className="space-y-8">
                        {sections.map((section, idx) => (
                            <div key={idx} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                                <p className="text-gray-700 leading-relaxed">{section.content}</p>
                            </div>
                        ))}
                    </div>

                    {/* Contact */}
                    <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">Questions About Privacy?</h2>
                        <p className="text-lg mb-6 opacity-90">
                            If you have any questions about this Privacy Policy, please contact us.
                        </p>
                        <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all">
                            Contact Privacy Team
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
