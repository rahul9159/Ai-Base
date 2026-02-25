import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Briefcase, TrendingUp, Heart, Code } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../../lib/animations';

export default function Careers() {
    const benefits = [
        { icon: Heart, title: 'Health & Wellness', description: 'Comprehensive health, dental, and vision insurance' },
        { icon: TrendingUp, title: 'Growth', description: 'Professional development budget and learning opportunities' },
        { icon: Clock, title: 'Flexibility', description: 'Remote-first culture with flexible working hours' },
        { icon: Briefcase, title: 'Equipment', description: 'Top-tier equipment and tools to do your best work' }
    ];

    const openings = [
        {
            title: 'Senior Frontend Engineer',
            department: 'Engineering',
            location: 'Remote',
            type: 'Full-time',
            description: 'Build beautiful, performant user interfaces for our AI-powered platform.'
        },
        {
            title: 'Machine Learning Engineer',
            department: 'AI/ML',
            location: 'San Francisco, CA',
            type: 'Full-time',
            description: 'Develop and optimize AI models that power our content generation tools.'
        },
        {
            title: 'Product Designer',
            department: 'Design',
            location: 'Remote',
            type: 'Full-time',
            description: 'Design intuitive experiences that make AI accessible to everyone.'
        },
        {
            title: 'Developer Advocate',
            department: 'Marketing',
            location: 'Remote',
            type: 'Full-time',
            description: 'Help developers build amazing things with our API and platform.'
        },
        {
            title: 'Customer Success Manager',
            department: 'Customer Success',
            location: 'New York, NY',
            type: 'Full-time',
            description: 'Ensure our customers achieve their goals and get maximum value from AI-Base.'
        },
        {
            title: 'Content Marketing Manager',
            department: 'Marketing',
            location: 'Remote',
            type: 'Full-time',
            description: 'Create compelling content that showcases the power of AI for creators.'
        }
    ];

    return (
        <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-purple-50/20"
        >
            {/* Hero Section */}
            <section className="py-20 lg:py-32">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                        Join Our{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            Mission
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        Help us build the future of AI-powered creativity. We're looking for talented, passionate people to join our growing team.
                    </p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Why Join AI-Base?</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((benefit, idx) => {
                            const Icon = benefit.icon;
                            return (
                                <div key={idx} className="text-center p-6">
                                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                                    <p className="text-gray-600">{benefit.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Open Positions */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Open Positions</h2>
                    <div className="max-w-4xl mx-auto space-y-6">
                        {openings.map((job, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h3>
                                        <p className="text-gray-600 mb-4">{job.description}</p>
                                        <div className="flex flex-wrap gap-3">
                                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                                                {job.department}
                                            </span>
                                            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold flex items-center gap-1">
                                                <MapPin className="w-3 h-3" />
                                                {job.location}
                                            </span>
                                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                                                {job.type}
                                            </span>
                                        </div>
                                    </div>
                                    <button className="mt-4 md:mt-0 md:ml-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-all whitespace-nowrap">
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
                        <h2 className="text-4xl font-bold mb-4">Don't See a Perfect Fit?</h2>
                        <p className="text-xl mb-8 opacity-90">
                            We're always interested in hearing from talented people. Send us your resume!
                        </p>
                        <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all">
                            Send General Application
                        </button>
                    </div>
                </div>
            </section>
        </motion.div>
    );
}
