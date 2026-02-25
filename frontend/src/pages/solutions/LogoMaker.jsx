import React from 'react';
import { PenTool, Layout, Type, MousePointer, Download, Palette } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function LogoMaker() {
    return (
        <div className="min-h-screen bg-white font-sans">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-violet-50/50 -z-10" />
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="w-20 h-20 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-indigo-500/20">
                            <PenTool className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
                            Brand Identity <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Instantly</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
                            Create professional logos and brand kits in seconds.
                            Our AI understands design principles to generate unique, memorable brands.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/signup">
                                <button className="px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-all shadow-xl shadow-gray-900/10 hover:shadow-2xl hover:-translate-y-1">
                                    Create My Logo
                                </button>
                            </Link>
                            <Link to="/contact">
                                <button className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-full font-semibold hover:bg-gray-50 transition-all">
                                    See Examples
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Logo Grid */}
            <section className="py-24 bg-gray-50 border-y border-gray-200">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                        {[
                            "https://cdn.aptoide.com/imgs/5/e/3/5e3ededaee1b4c7aec56e300e3776654_icon.png",
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjQAQZSXMDJbx8EmSRbTWnu9mmfG-_pl59NQ&s",
                            "https://www.designfreelogoonline.com/wp-content/uploads/2021/07/3D-colorful-tech-logo-maker.jpg",
                            "https://template.canva.com/EAE1YAgPM_U/1/0/400w-R-Meu_EcnME.jpg",
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ584acfWMPuHP7nRm1z5_Yt5zLmKyGrANsQ&s",
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiQEn-vDFQ6XzkI92ATYVDIhbndGRzZKFDNw&s",
                            "https://template.canva.com/EAGJy4uB6xQ/1/0/1600w-A9ARWpzo3xk.jpg",
                            "https://www.pngplay.com/wp-content/uploads/13/Symbol-Logo-Transparent-Image.png",
                            "https://thumbs.dreamstime.com/b/simple-eagle-logo-design-template-eagle-logo-design-letter-s-logo-simple-eagle-logo-design-template-130927413.jpg",
                            "https://cdn.vectorstock.com/i/500p/90/17/q-creative-logo-smoke-ink-vector-22529017.jpg",
                        ].map((logo, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -5 }}
                                className="aspect-square bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center p-8 transition-shadow hover:shadow-lg"
                            >
                                <img
                                    src={logo}
                                    alt="AI generated logo"
                                    className="max-w-full max-h-full object-contain opacity-80"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Features Grid */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            {
                                icon: Layout,
                                title: "Full Brand Kits",
                                description: "Get more than just a logo. We generate color palettes, typography pairs, and social media assets."
                            },
                            {
                                icon: MousePointer,
                                title: "Fully Editable",
                                description: "Customize every aspect of your logo in our intuitive editor. Change colors, fonts, and icons easily."
                            },
                            {
                                icon: Download,
                                title: "Vector SVG Export",
                                description: "Download your logo in infinite-resolution SVG format, perfect for print and web use."
                            }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group p-8 rounded-3xl border border-gray-100 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all"
                            >
                                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <feature.icon className="w-6 h-6 text-indigo-600" />
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
