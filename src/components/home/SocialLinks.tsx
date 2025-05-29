'use client';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const socialLinks = [
  {
    name: 'GitHub',
    icon: FaGithub,
    url: 'https://github.com/yourusername',
  },
  {
    name: 'LinkedIn',
    icon: FaLinkedin,
    url: 'https://linkedin.com/in/yourusername',
  },
  {
    name: 'Twitter',
    icon: FaTwitter,
    url: 'https://twitter.com/yourusername',
  },
];

const SocialLinks = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="flex justify-center space-x-6"
    >
      {socialLinks.map((social, index) => (
        <motion.a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-blue-600 hover:text-purple-600 transition-colors"
        >
          <social.icon className="w-7 h-7" />
          <span className="sr-only">{social.name}</span>
        </motion.a>
      ))}
    </motion.div>
  );
};

export default SocialLinks; 