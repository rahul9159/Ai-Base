import React from 'react';
import { Mic, Volume2, Radio, Headphones, Music, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function VoiceAssistant() {
    return (
        <div className="min-h-screen bg-white font-sans">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-50/50 to-pink-50/50 -z-10" />
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-purple-500/20">
                            <Mic className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
                            Voice that sounds <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Human</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
                            Generate lifelike speech in any voice, style, and language.
                            Our neural audio synthesis delivers human-quality results instantly.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/signup">
                                <button className="px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-all shadow-xl shadow-gray-900/10 hover:shadow-2xl hover:-translate-y-1">
                                    Try Text to Speech
                                </button>
                            </Link>
                            <Link to="/contact">
                                <button className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-full font-semibold hover:bg-gray-50 transition-all">
                                    Enterprise API
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Audio Waveform Animation (Simulated) */}
            <div className="w-full h-24 bg-gray-50 flex items-center justify-center overflow-hidden gap-1">
                {[...Array(40)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="w-1 bg-purple-500/50 rounded-full"
                        animate={{
                            height: [20, Math.random() * 60 + 20, 20]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.05
                        }}
                    />
                ))}
            </div>

            {/* Features Grid */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            {
                                icon: Volume2,
                                title: "Ultra Realistic",
                                description: "Indistinguishable from human speech, capturing breathing, intonation, and emotion."
                            },
                            {
                                icon: Radio,
                                title: "Voice Cloning",
                                description: "Clone any voice with just 3 seconds of audio. Perfect for personalized content."
                            },
                            {
                                icon: Headphones,
                                title: "Real-time Support",
                                description: "Streaming API allows for real-time conversation with less than 200ms latency."
                            }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group p-8 rounded-3xl border border-gray-100 hover:border-purple-100 hover:shadow-xl hover:shadow-purple-500/5 transition-all"
                            >
                                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <feature.icon className="w-6 h-6 text-purple-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Interactive Demo Section */}
            <section className="py-32 bg-gray-900 text-white overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 blur-[100px] opacity-20" />
                            <div className="relative bg-gray-800 border border-gray-700 rounded-3xl p-8 shadow-2xl">
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between border-b border-gray-700 pb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                                                <PlayCircle className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <div className="font-bold">Narrator Voice</div>
                                                <div className="text-sm text-gray-400">Deep American Male</div>
                                            </div>
                                        </div>
                                        <div className="text-purple-400 font-mono text-sm">0:00 / 1:24</div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                            <div className="h-full w-1/3 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-500 font-mono">
                                            <span>SPEED: 1.0x</span>
                                            <span>PITCH: NORMAL</span>
                                            <span>EMOTION: NEUTRAL</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <h2 className="text-4xl font-bold mb-6">Voice AI for every application</h2>
                            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                                Whether you're building a podcast, an audiobook, or a video game character, our Voice AI adapts to your needs.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Audiobook Narration",
                                    "Video Voiceovers",
                                    "Game Character Voices",
                                    "Accessibility Features"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400">✓</div>
                                        <span className="text-gray-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
