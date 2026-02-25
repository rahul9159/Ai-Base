import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle, Sparkles, Zap, Code, Palette } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../../lib/animations';

export default function Changelog() {
    const updates = [
        {
            version: '2.5.0',
            date: 'February 6, 2026',
            type: 'Major Update',
            changes: [
                { type: 'new', icon: Sparkles, text: 'Added Logo Maker AI tool with advanced branding capabilities' },
                { type: 'new', icon: Zap, text: 'Introduced circular scroll progress indicator' },
                { type: 'improvement', icon: CheckCircle, text: 'Enhanced dropdown menus in navigation with smooth animations' },
                { type: 'improvement', icon: Palette, text: 'Redesigned pricing cards with better visual hierarchy' }
            ]
        },
        {
            version: '2.4.0',
            date: 'January 28, 2026',
            type: 'Feature Release',
            changes: [
                { type: 'new', icon: Sparkles, text: 'Video Generation tool now supports 4K output' },
                { type: 'new', icon: Code, text: 'API access for Pro and Enterprise plans' },
                { type: 'improvement', icon: CheckCircle, text: 'Improved Voice Assistant accuracy by 30%' },
                { type: 'fix', icon: CheckCircle, text: 'Fixed image generation timeout issues' }
            ]
        },
        {
            version: '2.3.0',
            date: 'January 15, 2026',
            type: 'Feature Release',
            changes: [
                { type: 'new', icon: Sparkles, text: 'Added Image Generation tool with multiple style options' },
                { type: 'improvement', icon: Zap, text: 'Faster AI response times across all tools' },
                { type: 'improvement', icon: CheckCircle, text: 'Enhanced mobile responsiveness' }
            ]
        },
        {
            version: '2.2.0',
            date: 'December 20, 2025',
            type: 'Update',
            changes: [
                { type: 'new', icon: Sparkles, text: 'Voice Assistant now supports 15 languages' },
                { type: 'improvement', icon: CheckCircle, text: 'Improved chatbox context retention' },
                { type: 'fix', icon: CheckCircle, text: 'Fixed pricing display issues on mobile' }
            ]
        },
        {
            version: '2.1.0',
            date: 'December 1, 2025',
            type: 'Update',
            changes: [
                { type: 'new', icon: Code, text: 'Added Zapier integration for workflow automation' },
                { type: 'improvement', icon: Zap, text: 'Optimized video generation speed by 40%' },
                { type: 'fix', icon: CheckCircle, text: 'Resolved authentication issues' }
            ]
        }
    ];

    const getTypeColor = (type) => {
        switch (type) {
            case 'new':
                return 'text-green-600 bg-green-50';
            case 'improvement':
                return 'text-blue-600 bg-blue-50';
            case 'fix':
                return 'text-orange-600 bg-orange-50';
            default:
                return 'text-gray-600 bg-gray-50';
        }
    };

    const getTypeLabel = (type) => {
        switch (type) {
            case 'new':
                return 'New';
            case 'improvement':
                return 'Improved';
            case 'fix':
                return 'Fixed';
            default:
                return 'Update';
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-purple-50/30 py-20"
        >
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">
                        Changelog
                    </h1>
                    <p className="text-xl text-gray-600">
                        Stay updated with the latest features, improvements, and fixes.
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 to-purple-200" />

                    {updates.map((update, idx) => (
                        <div key={idx} className="relative mb-12 pl-20">
                            {/* Timeline dot */}
                            <div className="absolute left-6 top-2 w-5 h-5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 border-4 border-white shadow-lg" />

                            {/* Update card */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-blue-200 transition-all">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-1">
                                            Version {update.version}
                                        </h2>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Calendar className="w-4 h-4" />
                                            <span>{update.date}</span>
                                        </div>
                                    </div>
                                    <span className="px-4 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold">
                                        {update.type}
                                    </span>
                                </div>

                                {/* Changes list */}
                                <div className="space-y-3">
                                    {update.changes.map((change, changeIdx) => {
                                        const Icon = change.icon;
                                        return (
                                            <div
                                                key={changeIdx}
                                                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                            >
                                                <div className={`p-2 rounded-lg ${getTypeColor(change.type)}`}>
                                                    <Icon className="w-4 h-4" />
                                                </div>
                                                <div className="flex-1">
                                                    <span className={`text-xs font-semibold px-2 py-1 rounded ${getTypeColor(change.type)}`}>
                                                        {getTypeLabel(change.type)}
                                                    </span>
                                                    <p className="text-gray-700 mt-1">{change.text}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Subscribe CTA */}
                <div className="mt-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
                    <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
                    <p className="text-lg mb-6 opacity-90">
                        Subscribe to get notified about new features and updates.
                    </p>
                    <div className="flex gap-2 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                        <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
