import React from 'react';
import { Book, Code, FileText, Search, Zap, Lightbulb } from 'lucide-react';

export default function Documentation() {
    const sections = [
        {
            icon: Zap,
            title: 'Getting Started',
            description: 'Quick start guide to get up and running with AI-Base in minutes.',
            link: '#getting-started'
        },
        {
            icon: Code,
            title: 'API Documentation',
            description: 'Complete reference for our REST API and SDKs.',
            link: '#api'
        },
        {
            icon: Book,
            title: 'Guides & Tutorials',
            description: 'Step-by-step guides for common use cases and workflows.',
            link: '#guides'
        },
        {
            icon: Lightbulb,
            title: 'Best Practices',
            description: 'Learn how to get the most out of AI-Base tools.',
            link: '#best-practices'
        }
    ];

    const quickLinks = [
        { title: 'Authentication', href: '#auth' },
        { title: 'AI Models', href: '#models' },
        { title: 'Rate Limits', href: '#limits' },
        { title: 'Webhooks', href: '#webhooks' },
        { title: 'Error Handling', href: '#errors' },
        { title: 'SDKs & Libraries', href: '#sdks' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-purple-50/20">
            {/* Hero Section */}
            <section className="py-20 lg:py-32">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Book className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">Documentation</h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                            Everything you need to build amazing applications with AI-Base.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search documentation..."
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-lg"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Main Sections */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        {sections.map((section, idx) => {
                            const Icon = section.icon;
                            return (
                                <a
                                    key={idx}
                                    href={section.link}
                                    className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all group"
                                >
                                    <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{section.title}</h3>
                                    <p className="text-gray-600">{section.description}</p>
                                </a>
                            );
                        })}
                    </div>

                    {/* Quick Links */}
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Quick Links</h2>
                        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {quickLinks.map((link, idx) => (
                                    <a
                                        key={idx}
                                        href={link.href}
                                        className="flex items-center gap-2 p-4 rounded-xl hover:bg-blue-50 transition-colors group"
                                    >
                                        <div className="w-2 h-2 bg-blue-600 rounded-full group-hover:scale-150 transition-transform"></div>
                                        <span className="text-gray-700 font-medium group-hover:text-blue-600">{link.title}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Code Example */}
                    <div className="max-w-4xl mx-auto mt-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Quick Example</h2>
                        <div className="bg-gray-900 rounded-2xl p-8 overflow-x-auto">
                            <pre className="text-green-400 font-mono text-sm">
                                {`// Install the AI-Base SDK
npm install @ai-base/sdk

// Initialize the client
import { AIBase } from '@ai-base/sdk';

const client = new AIBase({
  apiKey: 'your-api-key'
});

// Generate content
const response = await client.generate({
  model: 'gpt-4',
  prompt: 'Create a blog post about AI',
  maxTokens: 1000
});

console.log(response.content);`}
                            </pre>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
                        <h2 className="text-4xl font-bold mb-4">Need Help?</h2>
                        <p className="text-xl mb-8 opacity-90">
                            Can't find what you're looking for? Our support team is here to help.
                        </p>
                        <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all">
                            Contact Support
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
