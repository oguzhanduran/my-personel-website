'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaMedium } from 'react-icons/fa';

const socialLinks = [
  {
    name: 'GitHub',
    icon: FaGithub,
    url: 'https://github.com/oguzhanduran',
    gradient: 'from-blue-400 via-cyan-400 to-purple-400'
  },
  {
    name: 'LinkedIn',
    icon: FaLinkedin,
    url: 'https://www.linkedin.com/in/oguzhnduran/',
    gradient: 'from-cyan-400 via-blue-400 to-purple-400'
  },
  {
    name: 'Twitter',
    icon: FaTwitter,
    url: 'https://twitter.com/oguzhnduran',
    gradient: 'from-purple-400 via-cyan-400 to-blue-400'
  },
  {
    name: 'Instagram',
    icon: FaInstagram,
    url: 'https://www.instagram.com/ogzhndrn',
    gradient: 'from-blue-400 via-purple-400 to-cyan-400'
  },
  {
    name: 'Medium',
    icon: FaMedium,
    url: 'https://medium.com/@oguzhanduran',
    gradient: 'from-cyan-400 via-purple-400 to-blue-400'
  },
];

const Hero = () => {
  const [showSocials, setShowSocials] = useState(false);
  const [text, setText] = useState('');
  const fullText = 'AI-Powered Solutions';
  const typingSpeed = 100;

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, []);

  const iconVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    }),
    hover: {
      scale: 1.2,
      rotate: [0, -10, 10, -10, 0],
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      }
    },
    tap: {
      scale: 0.9,
      rotate: 0,
    }
  };

  return (
    <section className="min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center md:items-start text-center md:text-left backdrop-blur-sm bg-white/5 rounded-2xl p-4 md:p-8 shadow-lg order-2 md:order-1"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent animate-shine">
              {text}
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block ml-1"
              >
                |
              </motion.span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl font-medium bg-gradient-to-r from-blue-300 via-cyan-300 to-purple-400 bg-clip-text text-transparent animate-shine mb-4 md:mb-8 max-w-2xl">
              Building innovative solutions at the intersection of AI and web technology.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-600 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 w-full sm:w-auto text-sm md:text-base"
                onClick={() => setShowSocials(!showSocials)}
              >
                Get in Touch
              </motion.button>
              <AnimatePresence>
                {showSocials && (
                  <div className="flex flex-wrap justify-center gap-4 md:gap-6 backdrop-blur-sm bg-white/5 p-3 md:p-4 rounded-xl w-full sm:w-auto">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        variants={iconVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        whileTap="tap"
                        exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
                        custom={index}
                        className="relative group"
                      >
                        <div className={`absolute -inset-1.5 md:-inset-2 bg-gradient-to-r ${social.gradient} rounded-lg blur opacity-0 group-hover:opacity-50 transition duration-300`}></div>
                        <div className="relative">
                          <social.icon className="w-5 h-5 md:w-7 md:h-7 text-blue-400 group-hover:text-cyan-400 transition-colors duration-300" />
                          <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileHover={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute -bottom-4 md:-bottom-6 left-1/2 transform -translate-x-1/2 text-[10px] md:text-xs text-blue-400 group-hover:text-cyan-400 whitespace-nowrap transition-colors duration-300"
                          >
                            {social.name}
                          </motion.span>
                        </div>
                        <span className="sr-only">{social.name}</span>
                      </motion.a>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative order-1 md:order-2 backdrop-blur-sm bg-white/5 rounded-2xl p-4 md:p-8 mb-4 md:mb-0"
          >
            <div className="aspect-square relative rounded-full overflow-hidden border-4 border-transparent bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-600 p-1 shadow-xl max-w-[200px] sm:max-w-[280px] md:max-w-md mx-auto group transition-all duration-300 hover:shadow-blue-500/25">
              <div className="rounded-full overflow-hidden">
                <Image
                  src="/profile.png"
                  alt="Oguzhan Duran"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 