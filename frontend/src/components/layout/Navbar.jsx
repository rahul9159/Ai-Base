import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Button } from '../ui/Button';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';

const solutionsMenu = [
    { name: 'AI Chatbox', href: '/solutions/chatbot', isRoute: true },
    { name: 'Voice Assistant', href: '/solutions/voice', isRoute: true },
    { name: 'Video Generation', href: '/solutions/video', isRoute: true },
    { name: 'Image Generation', href: '/solutions/image', isRoute: true },
    { name: 'Logo Maker AI', href: '/solutions/logo', isRoute: true },
];

const resourcesMenu = [
    { name: 'Documentation', href: '/docs', isRoute: true },
    { name: 'API Reference', href: '/api', isRoute: true },
    { name: 'Tutorials', href: '/tutorials', isRoute: true },
    { name: 'Blog', href: '/blog', isRoute: true },
    { name: 'Community', href: '/community', isRoute: true },
    { name: 'Integrations', href: '/integrations', isRoute: true },
    { name: 'Changelog', href: '/changelog', isRoute: true },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [solutionsOpen, setSolutionsOpen] = useState(false);
    const [resourcesOpen, setResourcesOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    });

    return (
        <motion.nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-white/90 backdrop-blur-md shadow-md"
                    : "bg-transparent"
            )}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
                    >
                        AI-Base
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {/* Solutions Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setSolutionsOpen(true)}
                            onMouseLeave={() => setSolutionsOpen(false)}
                        >
                            <button className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium transition-colors">
                                Solutions
                                <ChevronDown className={`w-4 h-4 transition-transform ${solutionsOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {solutionsOpen && (
                                <motion.div
                                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 overflow-hidden"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {solutionsMenu.map((item, index) => (
                                        <Link
                                            key={index}
                                            to={item.href}
                                            className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </motion.div>
                            )}
                        </div>

                        {/* Resources Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setResourcesOpen(true)}
                            onMouseLeave={() => setResourcesOpen(false)}
                        >
                            <button className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium transition-colors">
                                Resources
                                <ChevronDown className={`w-4 h-4 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {resourcesOpen && (
                                <motion.div
                                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 overflow-hidden"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {resourcesMenu.map((item, index) => (
                                        <a
                                            key={index}
                                            href={item.href}
                                            className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </motion.div>
                            )}
                        </div>

                        <a href="#pricing" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                            Pricing
                        </a>
                        <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                            About
                        </a>
                    </div>

                    {/* CTA Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link to="/signin">
                            <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                                Sign In
                            </Button>
                        </Link>
                        <Link to="/signup">
                            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-md">
                                Get Started
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-700"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <motion.div
                        className="md:hidden py-4 border-t border-gray-200"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <div className="flex flex-col gap-4">
                            {/* Mobile Solutions */}
                            <div>
                                <button
                                    onClick={() => setSolutionsOpen(!solutionsOpen)}
                                    className="flex items-center justify-between w-full text-gray-700 font-medium py-2"
                                >
                                    Solutions
                                    <ChevronDown className={`w-4 h-4 transition-transform ${solutionsOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {solutionsOpen && (
                                    <div className="pl-4 mt-2 space-y-2">
                                        {solutionsMenu.map((item, index) => (
                                            <a
                                                key={index}
                                                href={item.href}
                                                className="block text-gray-600 hover:text-blue-600 py-1"
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Mobile Resources */}
                            <div>
                                <button
                                    onClick={() => setResourcesOpen(!resourcesOpen)}
                                    className="flex items-center justify-between w-full text-gray-700 font-medium py-2"
                                >
                                    Resources
                                    <ChevronDown className={`w-4 h-4 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {resourcesOpen && (
                                    <div className="pl-4 mt-2 space-y-2">
                                        {resourcesMenu.map((item, index) => (
                                            item.isRoute ? (
                                                <Link
                                                    key={index}
                                                    to={item.href}
                                                    className="block text-gray-600 hover:text-blue-600 py-1"
                                                >
                                                    {item.name}
                                                </Link>
                                            ) : (
                                                <a
                                                    key={index}
                                                    href={item.href}
                                                    className="block text-gray-600 hover:text-blue-600 py-1"
                                                >
                                                    {item.name}
                                                </a>
                                            )
                                        ))}
                                    </div>
                                )}
                            </div>

                            <a href="#pricing" className="text-gray-700 hover:text-blue-600 font-medium py-2">
                                Pricing
                            </a>
                            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium py-2">
                                About
                            </a>
                            <div className="flex flex-col gap-2 pt-4 border-t border-gray-200">
                                <Link to="/signin" className="w-full">
                                    <Button variant="ghost" className="text-gray-700 hover:text-blue-600 w-full">
                                        Sign In
                                    </Button>
                                </Link>
                                <Link to="/signup" className="w-full">
                                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-full shadow-md">
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.nav>
    );
}
