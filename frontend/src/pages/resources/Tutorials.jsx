import React from 'react';
import { Play, BookOpen, Code, Palette, Rocket, CheckCircle } from 'lucide-react';

export default function Tutorials() {
    const categories = [
        { name: 'Getting Started', count: 5, icon: Rocket },
        { name: 'AI Models', count: 12, icon: Code },
        { name: 'Image Generation', count: 8, icon: Palette },
        { name: 'Advanced Topics', count: 15, icon: BookOpen }
    ];

    const tutorials = [
        {
            title: 'Getting Started with AI-Base',
            description: 'Learn the basics of AI-Base and create your first AI-generated content in under 5 minutes.',
            duration: '5 min',
            level: 'Beginner',
            category: 'Getting Started'
        },
        {
            title: 'Building a Chatbot with AI-Base',
            description: 'Step-by-step guide to creating an intelligent chatbot using our AI models.',
            duration: '15 min',
            level: 'Intermediate',
            category: 'AI Models'
        },
        {
            title: 'Advanced Prompt Engineering',
            description: 'Master the art of crafting effective prompts to get the best results from AI models.',
            duration: '20 min',
            level: 'Advanced',
            category: 'Advanced Topics'
        },
        {
            title: 'Generating High-Quality Images',
            description: 'Learn techniques for creating stunning AI-generated images with detailed prompts.',
            duration: '12 min',
            level: 'Intermediate',
            category: 'Image Generation'
        },
        {
            title: 'Integrating AI-Base API',
            description: 'Complete guide to integrating AI-Base into your application using our REST API.',
            duration: '25 min',
            level: 'Intermediate',
            category: 'Advanced Topics'
        },
        {
            title: 'Video Generation Basics',
            description: 'Create your first AI-generated video from text descriptions.',
            duration: '10 min',
            level: 'Beginner',
            category: 'Getting Started'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-purple-50/20">
            {/* Hero Section */}
            <section className="py-20 lg:py-32">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Play className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">Tutorials</h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Step-by-step guides to help you master AI-Base and build amazing projects.
                        </p>
                    </div>

                    {/* Categories */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {categories.map((category, idx) => {
                            const Icon = category.icon;
                            return (
                                <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all cursor-pointer group">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">{category.name}</h3>
                                    <p className="text-gray-600 text-sm">{category.count} tutorials</p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Tutorials Grid */}
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Tutorials</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {tutorials.map((tutorial, idx) => (
                                <div key={idx} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all group">
                                    <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                                        <Play className="w-16 h-16 text-blue-600 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${tutorial.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                                                    tutorial.level === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
                                                        'bg-purple-100 text-purple-700'
                                                }`}>
                                                {tutorial.level}
                                            </span>
                                            <span className="text-xs text-gray-500">{tutorial.duration}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{tutorial.title}</h3>
                                        <p className="text-gray-600 mb-4 line-clamp-2">{tutorial.description}</p>
                                        <button className="text-blue-600 font-semibold hover:text-purple-600 transition-colors flex items-center gap-1">
                                            Start Tutorial
                                            <Play className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Learning Path */}
                    <div className="max-w-4xl mx-auto mt-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Recommended Learning Path</h2>
                        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
                            <div className="space-y-6">
                                {['Complete Getting Started tutorials', 'Learn AI model basics', 'Practice with image generation', 'Build your first project', 'Explore advanced features'].map((step, idx) => (
                                    <div key={idx} className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-white font-bold">{idx + 1}</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-gray-900 font-medium">{step}</p>
                                        </div>
                                        <CheckCircle className="w-6 h-6 text-gray-300" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
                        <h2 className="text-4xl font-bold mb-4">Can't Find What You're Looking For?</h2>
                        <p className="text-xl mb-8 opacity-90">
                            Request a tutorial or suggest a topic you'd like us to cover.
                        </p>
                        <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all">
                            Request Tutorial
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
