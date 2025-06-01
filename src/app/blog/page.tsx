'use client';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';

export default function Blog() {
  return (
    <>
      <Header />
      <main className="pt-24 min-h-screen container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="prose prose-invert max-w-none"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent mb-8">
            Blog
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Blog post kartları buraya gelecek */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-2">Blog Post 1</h2>
              <p className="text-white/80">Blog post preview will be here...</p>
              <div className="mt-4 text-sm text-white/60">
                Published on: January 1, 2024
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </>
  );
} 