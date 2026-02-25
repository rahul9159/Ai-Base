import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Mic, Video, Image, Palette } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../../lib/animations';

export default function Integrations() {
    const integrations = [
        {
            name: 'Slack',
            description: 'Connect AI-Base to your Slack workspace for seamless team collaboration.',
            icon: '💬',
            category: 'Communication',
            status: 'Available'
        },
        {
            name: 'Discord',
            description: 'Integrate with Discord to bring AI tools to your community.',
            icon: '🎮',
            category: 'Communication',
            status: 'Available'
        },
        {
            name: 'Zapier',
            description: 'Automate workflows by connecting AI-Base with 5000+ apps.',
            icon: '⚡',
            category: 'Automation',
            status: 'Available'
        },
        {
            name: 'Google Drive',
            description: 'Save and sync your AI-generated content directly to Google Drive.',
            icon: '📁',
            category: 'Storage',
            status: 'Available'
        },
        {
            name: 'Dropbox',
            description: 'Store your AI creations securely in Dropbox.',
            icon: '📦',
            category: 'Storage',
            status: 'Available'
        },
        {
            name: 'WordPress',
            description: 'Publish AI-generated content directly to your WordPress site.',
            icon: '📝',
            category: 'CMS',
            status: 'Available'
        },
        {
            name: 'Notion',
            description: 'Sync AI-generated content with your Notion workspace.',
            icon: '📓',
            category: 'Productivity',
            status: 'Coming Soon'
        },
        {
            name: 'GitHub',
            description: 'Integrate with GitHub for code generation and documentation.',
            icon: '🐙',
            category: 'Development',
            status: 'Coming Soon'
        }
    ];

    const categories = [...new Set(integrations.map(i => i.category))];

    return (
        <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-purple-50/30 py-20"
        >
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">
                        Integrations
                    </h1>
                    <p className="text-xl text-gray-600">
                        Connect AI-Base with your favorite tools and platforms to supercharge your workflow.
                    </p>
                </div>

                {/* Categories */}
                {categories.map((category, idx) => (
                    <div key={idx} className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">{category}</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {integrations
                                .filter(integration => integration.category === category)
                                .map((integration, index) => (
                                    <div
                                        key={index}
                                        className="bg-white p-6 rounded-2xl border-2 border-gray-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="text-4xl">{integration.icon}</div>
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${integration.status === 'Available'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                                    }`}
                                            >
                                                {integration.status}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {integration.name}
                                        </h3>
                                        <p className="text-gray-600 mb-4">{integration.description}</p>
                                        <button
                                            className={`w-full py-2 rounded-lg font-semibold transition-all ${integration.status === 'Available'
                                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                                }`}
                                            disabled={integration.status !== 'Available'}
                                        >
                                            {integration.status === 'Available' ? 'Connect' : 'Coming Soon'}
                                        </button>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}

                {/* CTA Section */}
                <div className="mt-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
                    <h2 className="text-3xl font-bold mb-4">Need a Custom Integration?</h2>
                    <p className="text-lg mb-6 opacity-90">
                        We can build custom integrations for your enterprise needs.
                    </p>
                    <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all">
                        Contact Sales
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
