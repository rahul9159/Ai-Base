import React from 'react';
import { Image, Palette, Download, Layers, Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function ImageGeneration() {
    return (
        <div className="min-h-screen bg-white font-sans">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-teal-50/50 to-emerald-50/50 -z-10" />
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-teal-500/20">
                            <Image className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
                            Imagine <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-500">Anything</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
                            Create stunning, photorealistic images from text descriptions in seconds.
                            From concept art to marketing materials, visuals are now just a prompt away.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/solutions/image/create">
                                <button className="px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-all shadow-xl shadow-gray-900/10 hover:shadow-2xl hover:-translate-y-1">
                                    Start Creating
                                </button>
                            </Link>
                            <Link to="/contact">
                                <button className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-full font-semibold hover:bg-gray-50 transition-all">
                                    Explore Gallery
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Gallery Grid (Static Representation) */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[600px]">

                        {/* Column 1 */}
                        <div className="space-y-4 translate-y-8">
                            <div className="h-64 bg-gray-100 rounded-2xl overflow-hidden relative group">
                                <img
                                    src="https://images.unsplash.com/photo-1518837695005-2083093ee35b"
                                    alt="Cyberpunk city"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                    <p className="text-white text-xs font-medium truncate">
                                        Cyberpunk city street at night...
                                    </p>
                                </div>
                            </div>

                            <div className="h-48 bg-gray-100 rounded-2xl overflow-hidden relative group">
                                <img
                                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2"
                                    alt="Futuristic warrior"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                    <p className="text-white text-xs font-medium truncate">
                                        Portrait of a futuristic warrior...
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Column 2 */}
                        <div className="space-y-4">
                            <div className="h-48 bg-gray-100 rounded-2xl overflow-hidden relative group">
                                <img
                                    src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429"
                                    alt="Abstract oil painting"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                    <p className="text-white text-xs font-medium truncate">
                                        Abstract oil painting texture...
                                    </p>
                                </div>
                            </div>

                            <div className="h-64 bg-gray-100 rounded-2xl overflow-hidden relative group">
                                <img
                                    src="https://cdn.dribbble.com/userupload/9440215/file/original-c69a5c08177cff15c671693ef64bdae7.jpg?resize=400x0"
                                    alt="Minimalist logo"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                    <p className="text-white text-xs font-medium truncate">
                                        Minimalist logo design...
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Column 3 */}
                        <div className="space-y-4 translate-y-12">
                            <div className="h-56 bg-gray-100 rounded-2xl overflow-hidden relative group">
                                <img
                                    src="https://images.unsplash.com/photo-1605379399642-870262d3d051"
                                    alt="Cute robot"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                    <p className="text-white text-xs font-medium truncate">
                                        3D render of a cute robot...
                                    </p>
                                </div>
                            </div>

                            <div className="h-56 bg-gray-100 rounded-2xl overflow-hidden relative group">
                                <img
                                    src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
                                    alt="Mountain landscape"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                    <p className="text-white text-xs font-medium truncate">
                                        Landscape with mountains...
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Column 4 */}
                        <div className="space-y-4 translate-y-4">
                            <div className="h-48 bg-gray-100 rounded-2xl overflow-hidden relative group">
                                <img
                                    src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead"
                                    alt="Pixel art"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                    <p className="text-white text-xs font-medium truncate">
                                        Pixel art character...
                                    </p>
                                </div>
                            </div>

                            <div className="h-64 bg-gray-100 rounded-2xl overflow-hidden relative group">
                                <img
                                    src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6"
                                    alt="Watercolor flowers"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                    <p className="text-white text-xs font-medium truncate">
                                        Watercolor flowers...
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>


            {/* Features Grid */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            {
                                icon: Palette,
                                title: "Style Control",
                                description: "Choose from dozens of preset styles including photorealistic, anime, oil painting, and 3D render."
                            },
                            {
                                icon: Download,
                                title: "High Resolution",
                                description: "Upscale your generations to 4K resolution without losing details or quality."
                            },
                            {
                                icon: Layers,
                                title: "Inpainting",
                                description: "Edit specific parts of an image by simply brushing over them and describing the change."
                            }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group p-8 rounded-3xl border border-gray-100 hover:border-teal-100 hover:shadow-xl hover:shadow-teal-500/5 transition-all"
                            >
                                <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <feature.icon className="w-6 h-6 text-teal-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
