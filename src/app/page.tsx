'use client';

import { useState, useEffect } from 'react';
import IntroVideo from '@/components/home/IntroVideo';
import Header from '@/components/layout/Header';
import Hero from '@/components/home/Hero';

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [shouldPlayVideo, setShouldPlayVideo] = useState(true);

  useEffect(() => {
    // Home link'inden gelindiyse videoyu gösterme
    const skipIntro = localStorage.getItem('skipIntro');
    
    if (skipIntro) {
      setShouldPlayVideo(false);
      setShowContent(true);
      // Home link'i için olan state'i temizle
      localStorage.removeItem('skipIntro');
    }
  }, []);

  const handleVideoEnd = () => {
    setShowContent(true);
  };

  return (
    <>
      {shouldPlayVideo && <IntroVideo onEnd={handleVideoEnd} />}
      {(showContent || !shouldPlayVideo) && (
        <>
          <Header />
          <main className="relative">
            <Hero />
          </main>
        </>
      )}
    </>
  );
}
