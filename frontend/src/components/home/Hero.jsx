import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Sparkles, ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
    return (
        <section className="relative w-full pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
                <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-blue-100/50 blur-3xl opacity-60 animate-blob" />
                <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-100/50 blur-3xl opacity-60 animate-blob animation-delay-2000" />
                <div className="absolute -bottom-[20%] right-[20%] w-[40%] h-[40%] rounded-full bg-purple-100/50 blur-3xl opacity-60 animate-blob animation-delay-4000" />
            </div>

            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Text Content */}
                    <div className="flex-1 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold mb-6"
                        >
                            <Sparkles size={16} />
                            <span>The #1 AI Platform for Creators</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1] mb-6"
                        >
                            Create Amazing Content <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                with 5 AI Tools
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg lg:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0"
                        >
                            AI Chatbox, Voice Assistant, Video & Image Generation, and Logo Maker—all in one platform.
                            Join 10,000+ creators using Ai-base to transform their workflow.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                        >
                            <Link to="/signup">
                                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 h-14 text-lg shadow-lg shadow-blue-600/20">
                                    Start Creating Free <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                            <Link to="/tutorials">
                                <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg border-2">
                                    <Play className="mr-2 w-5 h-5 fill-current" /> Watch Demo
                                </Button>
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="mt-10 flex items-center justify-center lg:justify-start gap-8"
                        >
                            <div className="flex -space-x-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className={`w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500 overflow-hidden`}>
                                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="User" />
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm text-gray-600">
                                <span className="font-bold text-gray-900">4.9/5</span> from 2,000+ reviews
                            </div>
                        </motion.div>
                    </div>

                    {/* Hero Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex-1 w-full max-w-lg lg:max-w-none"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-3xl blur-2xl opacity-20 transform rotate-6 scale-95" />
                            <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 p-4 aspect-square lg:aspect-[4/3] flex items-center justify-center overflow-hidden">
                                {/* Abstract UI Mockup */}
                                <div className="w-full h-full relative p-6 flex flex-col gap-4">
                                    <motion.div
                                        className="w-full h-8 bg-gray-100 rounded-full flex items-center px-4"
                                        initial={{ width: "20%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                                    >
                                        <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                    </motion.div>
                                    <div className="flex gap-4 flex-1">
                                        <motion.div
                                            className="w-1/4 bg-blue-50 rounded-2xl p-4 flex flex-col gap-3"
                                            animate={{ y: [0, -10, 0] }}
                                            transition={{ duration: 4, repeat: Infinity }}
                                        >
                                            <div className="w-full aspect-square bg-blue-200 rounded-xl opacity-50"></div>
                                            <div className="w-full h-2 bg-blue-200 rounded-full"></div>
                                            <div className="w-3/4 h-2 bg-blue-200 rounded-full"></div>
                                        </motion.div>
                                        <div className="flex-1 bg-gray-50 rounded-2xl p-4 flex flex-col gap-4 border border-dashed border-gray-200">
                                            <motion.div
                                                className="w-full h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl relative overflow-hidden"
                                                whileHover={{ scale: 1.02 }}
                                            >
                                                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold shadow-sm">AI Generated</div>
                                            </motion.div>
                                            <div className="space-y-2">
                                                <div className="w-full h-3 bg-gray-200 rounded-full"></div>
                                                <div className="w-full h-3 bg-gray-200 rounded-full"></div>
                                                <div className="w-2/3 h-3 bg-gray-200 rounded-full"></div>
                                            </div>
                                            <div className="mt-auto flex justify-end">
                                                <Button size="sm" className="bg-blue-600 rounded-full">Publish</Button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Floating Elements */}
                                    <motion.div
                                        className="absolute -right-6 top-20 bg-white p-4 rounded-xl shadow-xl border border-gray-50 flex items-center gap-3"
                                        animate={{ y: [0, -20, 0] }}
                                        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                                    >
                                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                            <Sparkles size={20} />
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500">Efficiency</div>
                                            <div className="text-sm font-bold text-gray-900">+128%</div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
