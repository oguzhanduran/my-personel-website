'use client';

import { useState } from 'react';
import IntroVideo from '@/components/home/IntroVideo';
import Header from '@/components/layout/Header';
import Hero from '@/components/home/Hero';

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  const handleVideoEnd = () => {
    console.log("Video ended, showing content"); // Debug için log
    setShowContent(true);
  };

  return (
    <>
      <IntroVideo onEnd={handleVideoEnd} />
      {showContent && (
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
