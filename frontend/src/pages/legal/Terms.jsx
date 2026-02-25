import React from 'react';
import { FileText, AlertCircle, CheckCircle } from 'lucide-react';

export default function Terms() {
    const sections = [
        {
            title: '1. Acceptance of Terms',
            content: 'By accessing and using AI-Base services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.'
        },
        {
            title: '2. Use of Services',
            content: 'You agree to use our services only for lawful purposes and in accordance with these Terms. You must not use our services in any way that violates any applicable laws or regulations.'
        },
        {
            title: '3. User Accounts',
            content: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use.'
        },
        {
            title: '4. Intellectual Property',
            content: 'Content you create using our AI tools belongs to you. However, you grant us a license to use, store, and process your content to provide our services. Our platform, technology, and branding remain our intellectual property.'
        },
        {
            title: '5. Prohibited Activities',
            content: 'You may not use our services to create illegal, harmful, or offensive content. You may not attempt to reverse engineer, hack, or interfere with our services. Violation may result in account termination.'
        },
        {
            title: '6. Payment and Subscriptions',
            content: 'Paid subscriptions are billed in advance on a recurring basis. You can cancel at any time, but refunds are only provided as specified in our refund policy. Prices may change with 30 days notice.'
        },
        {
            title: '7. Limitation of Liability',
            content: 'AI-Base is provided "as is" without warranties. We are not liable for any indirect, incidental, or consequential damages arising from your use of our services.'
        },
        {
            title: '8. Changes to Terms',
            content: 'We reserve the right to modify these terms at any time. We will notify users of significant changes via email. Continued use of services after changes constitutes acceptance.'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-purple-50/20">
            <section className="py-20 lg:py-32">
                <div className="container mx-auto px-6 max-w-4xl">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <FileText className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">Terms of Service</h1>
                        <p className="text-gray-600 text-lg">Last updated: February 6, 2026</p>
                    </div>

                    {/* Introduction */}
                    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 mb-8">
                        <p className="text-gray-700 leading-relaxed text-lg">
                            Welcome to AI-Base. These Terms of Service govern your use of our platform and services. By using AI-Base, you agree to comply with and be bound by the following terms and conditions.
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

                    {/* Important Notice */}
                    <div className="mt-12 bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-8">
                        <div className="flex items-start gap-4">
                            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Important Notice</h3>
                                <p className="text-gray-700">
                                    These terms constitute a legally binding agreement. If you have questions or concerns about any provision, please contact our legal team before using our services.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">Questions About Our Terms?</h2>
                        <p className="text-lg mb-6 opacity-90">
                            Our legal team is here to help clarify any questions you may have.
                        </p>
                        <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all">
                            Contact Legal Team
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
