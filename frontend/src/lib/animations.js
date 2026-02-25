// Centralized animation variants for framer-motion

export const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

export const fadeInScale = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

export const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
};

export const slideInLeft = {
    hidden: { opacity: 0, x: -60 },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

export const slideInRight = {
    hidden: { opacity: 0, x: 60 },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

export const hoverScale = {
    scale: 1.05,
    transition: {
        duration: 0.3,
        ease: "easeOut"
    }
};

export const clickPulse = {
    scale: [1, 0.95, 1.02, 1],
    transition: {
        duration: 0.4,
        ease: "easeInOut"
    }
};

export const floatAnimation = {
    y: [0, -20, 0],
    transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
    }
};

export const rotateAnimation = {
    rotate: [0, 360],
    transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
    }
};

export const shimmerAnimation = {
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear"
    }
};
