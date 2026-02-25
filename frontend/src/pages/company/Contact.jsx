import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../../lib/animations';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const contactInfo = [
        {
            icon: Mail,
            title: 'Email Us',
            content: 'support@ai-base.com',
            description: 'We typically respond within 24 hours'
        },
        {
            icon: MessageSquare,
            title: 'Live Chat',
            content: 'Available 24/7',
            description: 'Get instant help from our support team'
        },
        {
            icon: Phone,
            title: 'Call Us',
            content: '+1 (555) 123-4567',
            description: 'Mon-Fri, 9AM-6PM PST'
        },
        {
            icon: MapPin,
            title: 'Visit Us',
            content: 'San Francisco, CA',
            description: '123 AI Street, Suite 100'
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

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
                    <div className="text-center mb-16">
                        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                            Get in{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                Touch
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Have a question or feedback? We'd love to hear from you. Our team is here to help!
                        </p>
                    </div>

                    {/* Contact Info Cards */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {contactInfo.map((info, idx) => {
                            const Icon = info.icon;
                            return (
                                <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow">
                                    <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{info.title}</h3>
                                    <p className="text-blue-600 font-semibold mb-1">{info.content}</p>
                                    <p className="text-sm text-gray-500">{info.description}</p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Contact Form */}
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 lg:p-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Send Us a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Your Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="How can we help?"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="6"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                        placeholder="Tell us more about your inquiry..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
                                >
                                    <Send className="w-5 h-5" />
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* FAQ Section */}
            <motion.section variants={fadeInUp} className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                        <p className="text-gray-600 mb-8">
                            Looking for quick answers? Check out our{' '}
                            <a href="#" className="text-blue-600 font-semibold hover:text-purple-600">
                                Help Center
                            </a>{' '}
                            or browse our{' '}
                            <a href="#" className="text-blue-600 font-semibold hover:text-purple-600">
                                Documentation
                            </a>
                            .
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-6 py-3 bg-blue-100 text-blue-700 rounded-full font-semibold hover:bg-blue-200 transition-colors">
                                Visit Help Center
                            </button>
                            <button className="px-6 py-3 bg-purple-100 text-purple-700 rounded-full font-semibold hover:bg-purple-200 transition-colors">
                                View Documentation
                            </button>
                        </div>
                    </div>
                </div>
            </motion.section>
        </motion.div>
    );
}
