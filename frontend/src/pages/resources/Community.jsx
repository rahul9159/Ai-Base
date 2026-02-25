import React from 'react';
import { Users, MessageCircle, Heart, Star, TrendingUp, Award } from 'lucide-react';

export default function Community() {
    const stats = [
        { icon: Users, number: '50K+', label: 'Members' },
        { icon: MessageCircle, number: '10K+', label: 'Discussions' },
        { icon: Star, number: '5K+', label: 'Projects Shared' },
        { icon: Award, number: '500+', label: 'Contributors' }
    ];

    const discussions = [
        {
            title: 'Best practices for prompt engineering',
            author: 'Sarah M.',
            replies: 45,
            likes: 128,
            category: 'Tips & Tricks'
        },
        {
            title: 'Show & Tell: AI-Generated Art Gallery',
            author: 'Alex K.',
            replies: 89,
            likes: 256,
            category: 'Showcase'
        },
        {
            title: 'How to optimize API usage for cost efficiency',
            author: 'David L.',
            replies: 32,
            likes: 94,
            category: 'Best Practices'
        },
        {
            title: 'Feature Request: Batch processing support',
            author: 'Emily R.',
            replies: 67,
            likes: 183,
            category: 'Feature Requests'
        },
        {
            title: 'Beginner\'s guide to AI video generation',
            author: 'Michael T.',
            replies: 54,
            likes: 142,
            category: 'Tutorials'
        },
        {
            title: 'Community Challenge: Create with AI',
            author: 'AI-Base Team',
            replies: 156,
            likes: 421,
            category: 'Events'
        }
    ];

    const resources = [
        { title: 'Community Guidelines', icon: '📋' },
        { title: 'Discord Server', icon: '💬' },
        { title: 'GitHub Discussions', icon: '💻' },
        { title: 'Community Events', icon: '🎉' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-purple-50/20">
            {/* Hero Section */}
            <section className="py-20 lg:py-32">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Users className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">Community</h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Join thousands of creators, developers, and AI enthusiasts building amazing things with AI-Base.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        {stats.map((stat, idx) => {
                            const Icon = stat.icon;
                            return (
                                <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-1">
                                        {stat.number}
                                    </div>
                                    <div className="text-gray-600">{stat.label}</div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Community Resources */}
                    <div className="max-w-4xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Join the Conversation</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {resources.map((resource, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all cursor-pointer text-center group">
                                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{resource.icon}</div>
                                    <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Trending Discussions */}
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Trending Discussions</h2>
                        <div className="space-y-4">
                            {discussions.map((discussion, idx) => (
                                <div key={idx} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all cursor-pointer">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                                                    {discussion.category}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">{discussion.title}</h3>
                                            <p className="text-gray-600 text-sm">Started by {discussion.author}</p>
                                        </div>
                                        <div className="flex flex-col items-end gap-2 text-sm text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <MessageCircle className="w-4 h-4" />
                                                <span>{discussion.replies}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Heart className="w-4 h-4" />
                                                <span>{discussion.likes}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
                        <h2 className="text-4xl font-bold mb-4">Ready to Join?</h2>
                        <p className="text-xl mb-8 opacity-90">
                            Connect with fellow creators, share your work, and learn from the community.
                        </p>
                        <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all">
                            Join Community
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
