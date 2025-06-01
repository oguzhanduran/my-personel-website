'use client';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { SiNextdotjs, SiReact, SiTailwindcss, SiTypescript, SiRedux } from 'react-icons/si';

// Proje verilerini burada tutuyoruz
const projects = [
  {
    title: "Spend Elon Musk's Money",
    description: "An interactive web application that lets users virtually spend Elon Musk's fortune by purchasing various items. Built with React and Redux for state management.",
    image: "/projects/spend-money.png",
    tags: ["React", "Redux", "React-Bootstrap", "Redux-toolkit"],
    github: "https://github.com/oguzhanduran/Redux-Spend-Elon-Musk-Money",
    live: "https://spend-elon-musk-money.netlify.app/",
    icons: [SiReact, SiRedux]
  },
  {
    title: "Personal Portfolio",
    description: "Modern and responsive personal portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features smooth animations and a clean design.",
    image: "/projects/portfolio.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/Oguzhan-Duran",
    live: "https://oguzhan-duran.vercel.app",
    icons: [SiNextdotjs, SiTypescript, SiTailwindcss]
  },
  {
    title: "AI Chat Application",
    description: "Real-time chat application powered by AI. Features include message streaming, code highlighting, and responsive design.",
    image: "/projects/chat-app.png",
    tags: ["React", "TypeScript", "AI", "WebSocket"],
    github: "https://github.com/Oguzhan-Duran",
    live: "https://oguzhan-duran.vercel.app",
    icons: [SiReact, SiTypescript]
  },
  {
    title: "E-Commerce Dashboard",
    description: "Comprehensive admin dashboard for e-commerce platforms with real-time analytics, inventory management, and order tracking.",
    image: "/projects/dashboard.png",
    tags: ["Next.js", "TypeScript", "Redux", "Chart.js"],
    github: "https://github.com/Oguzhan-Duran",
    live: "https://oguzhan-duran.vercel.app",
    icons: [SiNextdotjs, SiTypescript, SiReact]
  },
  {
    title: "Weather Forecast App",
    description: "Modern weather application with detailed forecasts, interactive maps, and location-based weather alerts.",
    image: "/projects/weather-app.png",
    tags: ["React", "TypeScript", "API Integration", "Geolocation"],
    github: "https://github.com/Oguzhan-Duran",
    live: "https://oguzhan-duran.vercel.app",
    icons: [SiReact, SiTypescript]
  }
];

export default function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <>
      <Header />
      <main className="pt-24 min-h-screen container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 relative inline-block">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-md rounded-lg -z-10" />
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent blur-xl opacity-50">
              Projects
            </span>
            <span className="relative bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] px-4 py-2">
              Projects
            </span>
          </h1>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                {/* Proje Resmi */}
                <div className="relative aspect-video mb-4 overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-cyan-500/20 group-hover:opacity-75 transition-opacity duration-300" />
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Proje Başlığı */}
                <h3 className="text-xl font-semibold text-white mb-2">
                  {project.title}
                </h3>

                {/* Proje Açıklaması */}
                <p className="text-white/70 mb-4 text-sm">
                  {project.description}
                </p>

                {/* Teknoloji İkonları */}
                <div className="flex gap-3 mb-4">
                  {project.icons.map((Icon, iconIndex) => (
                    <Icon 
                      key={iconIndex} 
                      className="w-6 h-6 text-white/50 hover:text-white/90 transition-colors" 
                    />
                  ))}
                </div>

                {/* Etiketler */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/70 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Linkler */}
                <div className="flex gap-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
                    >
                      <FaGithub className="w-4 h-4" />
                      GitHub
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
                    >
                      <FaExternalLinkAlt className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </main>
    </>
  );
} 