'use client';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import { FaMedium, FaCalendar } from 'react-icons/fa';

const blogPosts = [
  {
    title: "How I Learned English from Scratch",
    description: "A comprehensive guide (written in Turkish) on how I learned English without attending any courses. I share my personal journey, effective methods, and practical tips for self-studying English.",
    date: "2024-03-20",
    readTime: "14 min read",
    image: "/blog/english-learning.png",
    mediumUrl: "https://medium.com/@oguzhanduran/s%C4%B1f%C4%B1rdan-nas%C4%B1l-i%CC%87ngilizce-%C3%B6%C4%9Frendim-kursa-gitmeden-i%CC%87ngilizce-%C3%B6%C4%9Frenmek-m%C3%BCmk%C3%BCn-m%C3%BC-f1b0d1922b19",
    tags: ["English Learning", "Self-Study", "Language", "Turkish Content"]
  },
  {
    title: "Understanding React's Virtual DOM",
    description: "A deep dive into how React's Virtual DOM works and why it's important for performance optimization in modern web applications.",
    date: "2024-03-15",
    readTime: "5 min read",
    image: "/blog/react-virtual-dom.png",
    mediumUrl: "https://medium.com/@oguzhnduran",
    tags: ["React", "JavaScript", "Web Development"]
  },
  {
    title: "Getting Started with Next.js 14",
    description: "Explore the new features and improvements in Next.js 14, including the App Router, Server Components, and more.",
    date: "2024-02-28",
    readTime: "7 min read",
    image: "/blog/nextjs-14.png",
    mediumUrl: "https://medium.com/@oguzhnduran",
    tags: ["Next.js", "React", "Web Development"]
  },
  // Diğer blog yazılarınızı buraya ekleyebilirsiniz
];

export default function Blog() {
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 relative">
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent blur-xl opacity-50">
              Blog Posts
            </span>
            <span className="relative bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              Blog Posts
            </span>
          </h1>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {blogPosts.map((post, index) => (
              <motion.article
                key={index}
                variants={itemVariants}
                className="group relative bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20"
              >
                {/* Blog Post Image */}
                <div className="relative aspect-video overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-cyan-500/20 group-hover:opacity-75 transition-opacity duration-300" />
                  {post.image && (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div className="p-6">
                  {/* Meta Information */}
                  <div className="flex items-center gap-4 text-sm text-white/60 mb-3">
                    <span className="flex items-center gap-1">
                      <FaCalendar className="w-4 h-4" />
                      {post.date}
                    </span>
                    <span>{post.readTime}</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>

                  {/* Description */}
                  <p className="text-white/70 text-sm mb-4 line-clamp-3">
                    {post.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/70 border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read on Medium Link */}
                  <a
                    href={post.mediumUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
                  >
                    <FaMedium className="w-5 h-5" />
                    Read on Medium
                  </a>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </main>
    </>
  );
} 