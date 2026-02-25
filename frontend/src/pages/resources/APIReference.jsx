import React from 'react';
import { Code2, Terminal, Braces, FileCode, Zap, Book } from 'lucide-react';

export default function APIReference() {
    const endpoints = [
        {
            method: 'POST',
            path: '/v1/generate',
            description: 'Generate AI content using various models',
            color: 'green'
        },
        {
            method: 'GET',
            path: '/v1/models',
            description: 'List all available AI models',
            color: 'blue'
        },
        {
            method: 'POST',
            path: '/v1/images/generate',
            description: 'Generate images from text prompts',
            color: 'green'
        },
        {
            method: 'POST',
            path: '/v1/videos/generate',
            description: 'Create videos using AI',
            color: 'green'
        },
        {
            method: 'GET',
            path: '/v1/usage',
            description: 'Get API usage statistics',
            color: 'blue'
        },
        {
            method: 'DELETE',
            path: '/v1/generations/:id',
            description: 'Delete a generation',
            color: 'red'
        }
    ];

    const sdks = [
        { name: 'JavaScript/TypeScript', icon: '📦', command: 'npm install @ai-base/sdk' },
        { name: 'Python', icon: '🐍', command: 'pip install aibase' },
        { name: 'Ruby', icon: '💎', command: 'gem install aibase' },
        { name: 'Go', icon: '🔷', command: 'go get github.com/aibase/go-sdk' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-purple-50/20">
            {/* Hero Section */}
            <section className="py-20 lg:py-32">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Code2 className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">API Reference</h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Complete reference documentation for the AI-Base REST API.
                        </p>
                    </div>

                    {/* API Endpoints */}
                    <div className="max-w-5xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Endpoints</h2>
                        <div className="space-y-4">
                            {endpoints.map((endpoint, idx) => (
                                <div key={idx} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all">
                                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                                        <span className={`px-4 py-2 rounded-lg font-bold text-sm w-fit ${endpoint.color === 'green' ? 'bg-green-100 text-green-700' :
                                                endpoint.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-red-100 text-red-700'
                                            }`}>
                                            {endpoint.method}
                                        </span>
                                        <code className="text-lg font-mono text-gray-900 flex-1">{endpoint.path}</code>
                                    </div>
                                    <p className="text-gray-600 mt-3">{endpoint.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Code Example */}
                    <div className="max-w-5xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Example Request</h2>
                        <div className="bg-gray-900 rounded-2xl p-8 overflow-x-auto">
                            <pre className="text-green-400 font-mono text-sm">
                                {`curl https://api.ai-base.com/v1/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-4",
    "prompt": "Write a product description",
    "max_tokens": 500,
    "temperature": 0.7
  }'`}
                            </pre>
                        </div>
                    </div>

                    {/* Response Example */}
                    <div className="max-w-5xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Example Response</h2>
                        <div className="bg-gray-900 rounded-2xl p-8 overflow-x-auto">
                            <pre className="text-blue-400 font-mono text-sm">
                                {`{
  "id": "gen_abc123",
  "object": "generation",
  "created": 1707264000,
  "model": "gpt-4",
  "content": "Your generated content here...",
  "usage": {
    "prompt_tokens": 12,
    "completion_tokens": 150,
    "total_tokens": 162
  }
}`}
                            </pre>
                        </div>
                    </div>

                    {/* SDKs */}
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Official SDKs</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {sdks.map((sdk, idx) => (
                                <div key={idx} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-4xl">{sdk.icon}</span>
                                        <h3 className="text-xl font-bold text-gray-900">{sdk.name}</h3>
                                    </div>
                                    <div className="bg-gray-900 rounded-lg p-4">
                                        <code className="text-green-400 font-mono text-sm">{sdk.command}</code>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
                        <h2 className="text-4xl font-bold mb-4">Ready to Start Building?</h2>
                        <p className="text-xl mb-8 opacity-90">
                            Get your API key and start integrating AI-Base today.
                        </p>
                        <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all">
                            Get API Key
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
