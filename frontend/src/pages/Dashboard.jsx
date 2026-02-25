import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { MessageSquare, Mic, Image as ImageIcon, Video, Box, ArrowRight, User } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../lib/animations';

import { getProfile } from '../lib/api';

export default function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/signin');
            return;
        }

        // Initial load from storage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        // Fetch fresh data
        getProfile().then(data => {
            setUser({
                fullName: data.fullName,
                email: data.email
            });
            // Update storage
            localStorage.setItem('user', JSON.stringify({
                fullName: data.fullName,
                email: data.email
            }));
        }).catch(err => console.error(err));

    }, [navigate]);

    const tools = [
        {
            title: 'AI Chatbot',
            description: 'Intelligent conversational AI assistant',
            icon: <MessageSquare className="w-8 h-8 text-blue-600" />,
            color: 'bg-blue-50',
            link: '/solutions/chat'
        },
        {
            title: 'Voice Assistant',
            description: 'Natural language voice interactions',
            icon: <Mic className="w-8 h-8 text-purple-600" />,
            color: 'bg-purple-50',
            link: '/solutions/voice'
        },
        {
            title: 'Image Generation',
            description: 'Create stunning images from text',
            icon: <ImageIcon className="w-8 h-8 text-pink-600" />,
            color: 'bg-pink-50',
            link: '/solutions/image'
        },
        {
            title: 'Video Generation',
            description: 'Turn ideas into compelling videos',
            icon: <Video className="w-8 h-8 text-orange-600" />,
            color: 'bg-orange-50',
            link: '/solutions/video'
        },
        {
            title: 'Logo Maker',
            description: 'Design professional logos in seconds',
            icon: <Box className="w-8 h-8 text-green-600" />,
            color: 'bg-green-50',
            link: '/solutions/logo'
        }
    ];

    if (!user) return null;

    return (
        <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-7xl mx-auto">
                {/* Welcome Section */}
                <motion.div variants={fadeInUp} className="mb-12">
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Welcome back, {user.fullName || 'Creator'}!
                            </h1>
                            <p className="text-gray-600 flex items-center gap-2">
                                <User className="w-4 h-4" />
                                {user.email}
                            </p>
                        </div>
                        <Link to="/profile" className="hidden sm:block">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold hover:opacity-90 transition-opacity cursor-pointer">
                                {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                            </div>
                        </Link>
                    </div>
                </motion.div>

                {/* Tools Grid */}
                <motion.div variants={fadeInUp} className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Tools</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tools.map((tool, index) => (
                                <Link to={tool.link} key={index}>
                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all h-full group relative overflow-hidden"
                                    >
                                        <div className={`${tool.color} w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                            {tool.icon}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{tool.title}</h3>
                                        <p className="text-gray-600 mb-4">{tool.description}</p>
                                        <div className="flex items-center font-semibold group-hover:gap-2 transition-all text-blue-600">
                                            Open Tool <ArrowRight className="w-4 h-4 ml-1" />
                                        </div>
                                    </motion.div>
                                </Link>
                            )
                        )}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
