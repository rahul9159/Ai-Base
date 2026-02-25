import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            setProgress(latest);
        });
        return () => unsubscribe();
    }, [scrollYProgress]);

    const circumference = 2 * Math.PI * 20; // radius = 20
    const offset = circumference - progress * circumference;

    return (
        <div className="fixed bottom-8 right-8 z-50">
            <svg width="60" height="60" className="transform -rotate-90">
                {/* Background circle */}
                <circle
                    cx="30"
                    cy="30"
                    r="20"
                    stroke="#e5e7eb"
                    strokeWidth="4"
                    fill="white"
                    className="drop-shadow-lg"
                />
                {/* Progress circle */}
                <circle
                    cx="30"
                    cy="30"
                    r="20"
                    stroke="url(#gradient)"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="transition-all duration-150"
                />
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                </defs>
            </svg>
            {/* Percentage text */}
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-gray-700">
                    {Math.round(progress * 100)}%
                </span>
            </div>
        </div>
    );
}
