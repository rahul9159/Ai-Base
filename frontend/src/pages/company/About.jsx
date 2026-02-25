import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Award, Heart, Zap, Globe } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../../lib/animations';

export default function About() {
    const stats = [
        { number: '50K+', label: 'Active Users' },
        { number: '1M+', label: 'AI Generations' },
        { number: '99.9%', label: 'Uptime' },
        { number: '24/7', label: 'Support' }
    ];

    const values = [
        {
            icon: Target,
            title: 'Mission-Driven',
            description: 'We empower creators with cutting-edge AI tools to unlock their full potential.'
        },
        {
            icon: Heart,
            title: 'User-Centric',
            description: 'Every feature we build starts with understanding our users\' needs and challenges.'
        },
        {
            icon: Zap,
            title: 'Innovation First',
            description: 'We push the boundaries of what\'s possible with AI technology every day.'
        },
        {
            icon: Globe,
            title: 'Global Impact',
            description: 'Making AI accessible to creators worldwide, regardless of their background.'
        }
    ];

    const team = [
        { name: 'Sarah Chen', role: 'CEO & Co-Founder', image: '👩‍💼' },
        { name: 'Michael Rodriguez', role: 'CTO & Co-Founder', image: '👨‍💻' },
        { name: 'Emily Watson', role: 'Head of Product', image: '👩‍🎨' },
        { name: 'David Kim', role: 'Head of Engineering', image: '👨‍🔬' }
    ];

    return (
        <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-purple-50/20"
        >
            {/* Hero Section */}
            <motion.section variants={fadeInUp} className="py-20 lg:py-32">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                            Building the Future of{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                                AI-Powered Creation
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">
                            We're on a mission to democratize AI technology and empower creators worldwide to bring their ideas to life.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Story Section */}
            <motion.section variants={fadeInUp} className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Our Story</h2>
                        <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
                            <p>
                                Founded in 2024, AI-Base started with a simple observation: while AI technology was advancing rapidly,
                                it remained inaccessible to most creators who could benefit from it the most.
                            </p>
                            <p>
                                Our founders, a team of AI researchers and product designers, set out to change that. We built AI-Base
                                to be the bridge between cutting-edge AI capabilities and everyday creators—making powerful tools
                                simple, intuitive, and accessible to everyone.
                            </p>
                            <p>
                                Today, we're proud to serve over 50,000 creators worldwide, from solo entrepreneurs to large enterprises,
                                helping them generate millions of pieces of content and bring their creative visions to life.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Values Section */}
            <motion.section variants={fadeInUp} className="py-20">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, idx) => {
                            const Icon = value.icon;
                            return (
                                <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                                    <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                                    <p className="text-gray-600">{value.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </motion.section>

            {/* Team Section */}
            <motion.section variants={fadeInUp} className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Meet Our Team</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        {team.map((member, idx) => (
                            <div key={idx} className="text-center">
                                <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-6xl">
                                    {member.image}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                                <p className="text-gray-600">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section variants={fadeInUp} className="py-20">
                <div className="container mx-auto px-6">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
                        <h2 className="text-4xl font-bold mb-4">Join Us on Our Journey</h2>
                        <p className="text-xl mb-8 opacity-90">
                            We're always looking for talented people to join our team.
                        </p>
                        <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all">
                            View Open Positions
                        </button>
                    </div>
                </div>
            </motion.section>
        </motion.div>
    );
}
