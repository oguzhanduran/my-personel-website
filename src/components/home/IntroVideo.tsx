'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const IntroVideo = () => {
  const [showVideo, setShowVideo] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const attemptRef = useRef(0);

  useEffect(() => {
    const preloadVideo = () => {
      const video = new Audio('/intro.mp4');
      video.preload = 'auto';
    };

    preloadVideo();
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    const handleStalled = () => {
      if (attemptRef.current < 3) {
        attemptRef.current += 1;
        video.load();
        video.play().catch(console.error);
      }
    };

    video.addEventListener('stalled', handleStalled);

    const timer = setTimeout(() => {
      setShowVideo(false);
    }, 10000);

    return () => {
      video.removeEventListener('stalled', handleStalled);
      clearTimeout(timer);
    };
  }, []);

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('Video error:', e);
    setHasError(true);
    setShowVideo(false);
  };

  const handleVideoLoaded = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error('Video playback failed:', error);
        setHasError(true);
        setShowVideo(false);
      });
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  if (hasError) return null;

  return (
    <AnimatePresence>
      {showVideo && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-50 bg-black"
        >
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted={isMuted}
            preload="auto"
            className="w-full h-full object-cover"
            onLoadedData={handleVideoLoaded}
            onError={handleVideoError}
            onEnded={() => setShowVideo(false)}
          >
            <source src="/intro.mp4" type="video/mp4" />
          </video>
          
          <button
            onClick={toggleMute}
            className="absolute bottom-4 right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroVideo; 