import React from 'react';
import { MessageSquare, Bot, Zap, Shield, Globe, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function AIChatbot() {
    return (
        <div className="min-h-screen bg-white font-sans">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-purple-50/50 -z-10" />
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="w-20 h-20 bg-linear-to-r from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-blue-500/20">
                            <MessageSquare className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
                            Intelligent <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">Conversations</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
                            Engage your users with a chatbot that understands context, nuance, and intent.
                            Powered by our most advanced language models.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/solutions/chat">
                                <button className="px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-all shadow-xl shadow-gray-900/10 hover:shadow-2xl hover:-translate-y-1">
                                    Start Building Free
                                </button>
                            </Link>
                            <Link to="/contact">
                                <button className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-full font-semibold hover:bg-gray-50 transition-all">
                                    Contact Sales
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            {
                                icon: Bot,
                                title: "Context Aware",
                                description: "Remembers previous turns in the conversation to provide relevant and coherent responses."
                            },
                            {
                                icon: Globe,
                                title: "Multi-language",
                                description: "Support for over 95 languages with native-level fluency and cultural understanding."
                            },
                            {
                                icon: Zap,
                                title: "Low Latency",
                                description: "Lightning fast responses averaging under 100ms for real-time interaction."
                            }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group p-8 rounded-3xl border border-gray-100 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-500/5 transition-all"
                            >
                                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <feature.icon className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use Case Demo Section */}
            <section className="py-32 bg-gray-900 text-white overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold mb-6">Designed for real-world impact</h2>
                            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                                From customer support to personal assistants, our Chat API adapts to your specific use case. Fine-tune on your own data for maximum accuracy.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Customer Support Automation",
                                    "Interactive Educational Tutors",
                                    "Shopping Assistants",
                                    "Internal Knowledge Base Search"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400">✓</div>
                                        <span className="text-gray-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 blur-[100px] opacity-20" />
                            <div className="relative bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-2xl">
                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">U</div>
                                        <div className="bg-gray-700/50 rounded-2xl rounded-tl-none p-4 text-sm text-gray-300">
                                            How do I integrate the API?
                                        </div>
                                    </div>
                                    <div className="flex gap-4 flex-row-reverse">
                                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">AI</div>
                                        <div className="bg-blue-600/20 text-blue-100 rounded-2xl rounded-tr-none p-4 text-sm">
                                            It's simple. Install our SDK, grab your API key, and you can make your first request in just 3 lines of code. Check our documentation for a quickstart guide!
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
