import React from 'react';
import { Video, Film, Clapperboard, Wand2, Layers, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function VideoGeneration() {
    return (
        <div className="min-h-screen bg-white font-sans">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-orange-50/50 to-red-50/50 -z-10" />
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-orange-500/20">
                            <Video className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
                            Text to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Video</span> Magic
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
                            Turn your scripts into cinematic videos instantly.
                            Create marketing videos, social media content, and more with simple text prompts.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/signup">
                                <button className="px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-all shadow-xl shadow-gray-900/10 hover:shadow-2xl hover:-translate-y-1">
                                    Generate Video
                                </button>
                            </Link>
                            <Link to="/contact">
                                <button className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-full font-semibold hover:bg-gray-50 transition-all">
                                    View Showcase
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Video Showcase Grid (Placeholder Images) */}


            {/* Features Grid */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            {
                                video: "https://www.w3schools.com/html/mov_bbb.mp4",
                                title: "Text to Video",
                                description:
                                    "Describe your scene in natural language and watch as our AI generates high-quality video footage."
                            },
                            {
                                video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
                                title: "Consistent Characters",
                                description:
                                    "Maintain character consistency across different scenes and shots for storytelling."
                            },
                            {
                                video: "https://media.w3.org/2010/05/sintel/trailer.mp4",
                                title: "Cinematic Control",
                                description:
                                    "Control camera angles, lighting, and style with professional director-level tools."
                            }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group p-8 rounded-3xl border border-gray-100 hover:border-orange-100 hover:shadow-xl hover:shadow-orange-500/5 transition-all"
                            >
                                {/* Network Video */}
                                <div className="w-full h-40 rounded-xl overflow-hidden mb-6">
                                    <video
                                        src={feature.video}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        preload="metadata"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                    />
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}
