import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Mic, Video, Image, Palette, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { staggerContainer, fadeInUp } from '../../lib/animations';

const aiTools = [
    {
        icon: MessageSquare,
        title: "AI Chatbox",
        description: "Intelligent conversation assistant powered by advanced AI. Get instant answers, creative ideas, and smart suggestions.",
        gradient: "from-blue-500 to-cyan-500",
        bgGradient: "from-blue-50 to-cyan-50",
        iconColor: "text-blue-600"
    },
    {
        icon: Mic,
        title: "Voice Assistant",
        description: "Voice-powered AI interactions that understand natural language. Control your workflow hands-free with voice commands.",
        gradient: "from-purple-500 to-pink-500",
        bgGradient: "from-purple-50 to-pink-50",
        iconColor: "text-purple-600"
    },
    {
        icon: Video,
        title: "Video Generation",
        description: "Create stunning videos from text prompts. AI-powered video editing, effects, and professional-quality output in minutes.",
        gradient: "from-orange-500 to-red-500",
        bgGradient: "from-orange-50 to-red-50",
        iconColor: "text-orange-600"
    },
    {
        icon: Image,
        title: "Image Generation",
        description: "Transform your ideas into beautiful images. Create custom visuals, illustrations, and graphics with AI magic.",
        gradient: "from-green-500 to-emerald-500",
        bgGradient: "from-green-50 to-emerald-50",
        iconColor: "text-green-600"
    },
    {
        icon: Palette,
        title: "Logo Maker AI",
        description: "Design professional logos in seconds. AI-powered branding tool that creates unique, memorable logos for your business.",
        gradient: "from-indigo-500 to-violet-500",
        bgGradient: "from-indigo-50 to-violet-50",
        iconColor: "text-indigo-600"
    }
];

const item = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

export default function Features() {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <section id="features" className="py-20 lg:py-32 bg-gradient-to-b from-white via-blue-50/30 to-purple-50/30 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-blob" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-blob animation-delay-2000" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 text-blue-700 text-sm font-semibold mb-6">
                        <Sparkles size={16} className="animate-pulse" />
                        <span>5 Powerful AI Tools</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        AI Tools That <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient">Transform</span> Your Work
                    </h2>
                    <p className="text-lg lg:text-xl text-gray-600">
                        Experience the future of content creation with our suite of cutting-edge AI-powered tools designed to boost your productivity.
                    </p>
                </motion.div>

                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {aiTools.map((tool, index) => {
                        const Icon = tool.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={item}
                                className={`group relative bg-gradient-to-br ${tool.bgGradient} p-8 rounded-3xl border-2 border-white shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden ${index === 2 ? 'md:col-span-2 lg:col-span-1' : ''
                                    }`}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                whileHover={{
                                    y: -8,
                                    scale: 1.02,
                                    transition: { duration: 0.3 }
                                }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {/* Gradient overlay on hover */}
                                <motion.div
                                    className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                                />

                                {/* Icon container with animation */}
                                <motion.div
                                    className={`relative w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center mb-6 group-hover:shadow-xl transition-shadow duration-300`}
                                    animate={hoveredIndex === index ? { rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] } : {}}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Icon className={`w-8 h-8 ${tool.iconColor}`} />
                                </motion.div>

                                {/* Content */}
                                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                                    {tool.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    {tool.description}
                                </p>

                                {/* CTA Button */}
                                <Button
                                    size="sm"
                                    className={`bg-gradient-to-r ${tool.gradient} text-white rounded-full px-6 shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105`}
                                >
                                    Try Now
                                    <motion.div
                                        animate={hoveredIndex === index ? { x: [0, 5, 0] } : {}}
                                        transition={{ duration: 0.5, repeat: Infinity }}
                                    >
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </motion.div>
                                </Button>

                                {/* Floating sparkle effect */}
                                {hoveredIndex === index && (
                                    <motion.div
                                        className="absolute top-4 right-4"
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0 }}
                                    >
                                        <Sparkles className={`w-6 h-6 ${tool.iconColor} animate-pulse`} />
                                    </motion.div>
                                )}
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
