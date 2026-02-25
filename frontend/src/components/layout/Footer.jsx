import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <a href="#" className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                                A
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                                Ai-base
                            </span>
                        </a>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Empowering creators with AI tools to build and grow their audience faster.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Product</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="#features" className="hover:text-blue-600">Features</a></li>
                            <li><a href="#pricing" className="hover:text-blue-600">Pricing</a></li>
                            <li><Link to="/integrations" className="hover:text-blue-600">Integrations</Link></li>
                            <li><Link to="/changelog" className="hover:text-blue-600">Changelog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><Link to="/about" className="hover:text-blue-600">About</Link></li>
                            <li><Link to="/careers" className="hover:text-blue-600">Careers</Link></li>
                            <li><Link to="/blog" className="hover:text-blue-600">Blog</Link></li>
                            <li><Link to="/contact" className="hover:text-blue-600">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><Link to="/privacy" className="hover:text-blue-600">Privacy</Link></li>
                            <li><Link to="/terms" className="hover:text-blue-600">Terms</Link></li>
                            <li><Link to="/security" className="hover:text-blue-600">Security</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
                    <div>
                        &copy; {new Date().getFullYear()} Ai-base. All rights reserved.
                    </div>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-gray-900">Twitter</a>
                        <a href="#" className="hover:text-gray-900">GitHub</a>
                        <a href="#" className="hover:text-gray-900">Discord</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
