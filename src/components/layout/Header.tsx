'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Header = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      localStorage.removeItem('skipIntro');
      window.location.href = '/';
    }, 1000);
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-sm border-b border-white/10"
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="group relative" onClick={handleLogoClick}>
            <motion.div
              className="flex items-center space-x-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={isAnimating ? {
                rotateY: [0, 360],
                scale: [1, 1.2, 1],
              } : {}}
              transition={isAnimating ? {
                duration: 1,
                ease: "easeInOut",
              } : {}}
            >
              <motion.div
                className="relative"
                initial={{ rotate: 0 }}
                animate={isAnimating ? {
                  rotate: [0, 720],
                  scale: [1, 1.2, 1],
                } : { rotate: 360 }}
                transition={isAnimating ? {
                  duration: 1,
                  ease: "easeInOut",
                } : {
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-600 p-[2px]">
                  <div className="w-full h-full rounded-lg bg-[rgb(10,10,20)] flex items-center justify-center">
                    <span className="text-lg font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
                      O
                    </span>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="relative"
                initial={{ rotate: 0 }}
                animate={isAnimating ? {
                  rotate: [0, -720],
                  scale: [1, 1.2, 1],
                } : { rotate: -360 }}
                transition={isAnimating ? {
                  duration: 1,
                  ease: "easeInOut",
                } : {
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-600 via-cyan-500 to-blue-500 p-[2px]">
                  <div className="w-full h-full rounded-lg bg-[rgb(10,10,20)] flex items-center justify-center">
                    <span className="text-lg font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      D
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            <motion.div
              className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-600"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              animate={isAnimating ? { scaleX: [0, 1, 0] } : {}}
              transition={isAnimating ? {
                duration: 1,
                ease: "easeInOut",
              } : { duration: 0.3 }}
            />
          </Link>
          <div className="space-x-8 max-sm:space-x-3">
            <Link 
              href="/" 
              onClick={() => localStorage.setItem('skipIntro', 'true')}
              className="text-lg font-medium text-white/80 hover:text-white transition-colors max-sm:text-sm"
            >
              Home
            </Link>
            <Link 
              href="/projects" 
              className="text-lg font-medium text-white/80 hover:text-white transition-colors max-sm:text-sm"
            >
              Projects
            </Link>
            <Link 
              href="/blog" 
              className="text-lg font-medium text-white/80 hover:text-white transition-colors max-sm:text-sm"
            >
              Blog
            </Link>
            <Link 
              href="/contact" 
              className="text-lg font-medium text-white/80 hover:text-white transition-colors max-sm:text-sm"
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header; 