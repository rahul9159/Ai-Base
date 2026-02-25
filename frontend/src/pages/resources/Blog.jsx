import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../../lib/animations';

export default function Blog() {
    const featured = {
        title: 'The Future of AI-Powered Content Creation',
        excerpt: 'Exploring how artificial intelligence is transforming the way creators work and what it means for the future of digital content.',
        author: 'Sarah Chen',
        date: 'February 6, 2026',
        readTime: '8 min read',
        category: 'AI & Technology',
        image: '🚀'
    };

    const posts = [
        {
            title: '10 Tips for Better AI-Generated Images',
            excerpt: 'Learn how to craft the perfect prompts and get stunning results from our Image Generation tool.',
            author: 'Emily Watson',
            date: 'February 4, 2026',
            readTime: '5 min read',
            category: 'Tutorials',
            image: '🎨'
        },
        {
            title: 'How We Built Our Voice Assistant',
            excerpt: 'A deep dive into the technology and design decisions behind our AI Voice Assistant feature.',
            author: 'Michael Rodriguez',
            date: 'February 1, 2026',
            readTime: '12 min read',
            category: 'Engineering',
            image: '🎙️'
        },
        {
            title: 'Customer Spotlight: Creative Agency Success',
            excerpt: 'How a small creative agency scaled their content production 10x using AI-Base tools.',
            author: 'David Kim',
            date: 'January 28, 2026',
            readTime: '6 min read',
            category: 'Case Studies',
            image: '⭐'
        },
        {
            title: 'The Ethics of AI in Content Creation',
            excerpt: 'Our perspective on responsible AI development and the importance of human creativity.',
            author: 'Sarah Chen',
            date: 'January 25, 2026',
            readTime: '10 min read',
            category: 'AI & Technology',
            image: '🤔'
        },
        {
            title: 'New Feature: 4K Video Generation',
            excerpt: 'Announcing our latest update that brings professional-quality video generation to all Pro users.',
            author: 'Emily Watson',
            date: 'January 20, 2026',
            readTime: '4 min read',
            category: 'Product Updates',
            image: '🎬'
        },
        {
            title: 'Integrating AI-Base with Your Workflow',
            excerpt: 'Best practices for incorporating AI tools into your existing content creation process.',
            author: 'David Kim',
            date: 'January 15, 2026',
            readTime: '7 min read',
            category: 'Tutorials',
            image: '⚙️'
        }
    ];

    const categories = ['All', 'AI & Technology', 'Tutorials', 'Product Updates', 'Case Studies', 'Engineering'];

    return (
        <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-purple-50/20"
        >
            {/* Hero Section */}
            <section className="py-20 lg:py-32">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                            Our{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                Blog
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Insights, tutorials, and updates from the AI-Base team.
                        </p>
                    </div>

                    {/* Categories */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {categories.map((category, idx) => (
                            <button
                                key={idx}
                                className={`px-6 py-2 rounded-full font-semibold transition-all ${idx === 0
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                                    : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Featured Post */}
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-16 hover:shadow-2xl transition-shadow">
                        <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
                            <div className="flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl text-8xl">
                                {featured.image}
                            </div>
                            <div className="flex flex-col justify-center">
                                <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold w-fit mb-4">
                                    {featured.category}
                                </span>
                                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                                    {featured.title}
                                </h2>
                                <p className="text-gray-600 mb-6 text-lg">
                                    {featured.excerpt}
                                </p>
                                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                                    <span className="flex items-center gap-1">
                                        <User className="w-4 h-4" />
                                        {featured.author}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {featured.date}
                                    </span>
                                    <span>{featured.readTime}</span>
                                </div>
                                <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-all w-fit">
                                    Read Article
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Blog Posts Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post, idx) => (
                            <div key={idx} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all">
                                <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-6xl">
                                    {post.image}
                                </div>
                                <div className="p-6">
                                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                                        {post.category}
                                    </span>
                                    <h3 className="text-xl font-bold text-gray-900 mt-4 mb-3">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4 line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                                        <span className="flex items-center gap-1">
                                            <User className="w-3 h-3" />
                                            {post.author}
                                        </span>
                                        <span>{post.readTime}</span>
                                    </div>
                                    <button className="text-blue-600 font-semibold hover:text-purple-600 transition-colors flex items-center gap-1">
                                        Read More
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
                        <h2 className="text-4xl font-bold mb-4">Subscribe to Our Newsletter</h2>
                        <p className="text-xl mb-8 opacity-90">
                            Get the latest articles, tutorials, and product updates delivered to your inbox.
                        </p>
                        <div className="flex gap-2 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                            />
                            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </motion.div>
    );
}
