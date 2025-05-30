'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const IntroVideo = () => {
  const [showVideo, setShowVideo] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isTransparent, setIsTransparent] = useState(false);
  const [isEnding, setIsEnding] = useState(false);
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
    // 3 saniye sonra şeffaflığı başlat
    const transparencyTimer = setTimeout(() => {
      setIsTransparent(true);
    }, 3000);

    // Video bitişini garantilemek için bir safety timeout
    const safetyTimeout = setTimeout(() => {
      setShowVideo(false);
    }, 12000);

    return () => {
      clearTimeout(transparencyTimer);
      clearTimeout(safetyTimeout);
    };
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    const handleStalled = () => {
      if (attemptRef.current < 3) {
        attemptRef.current += 1;
        video.load();
        video.play().catch(console.error);
      } else {
        setShowVideo(false); // Çok fazla deneme sonrası ana siteye geç
      }
    };

    const handleEnded = () => {
      setShowVideo(false);
    };

    const handleTimeUpdate = () => {
      if (video.duration - video.currentTime <= 3) {
        setIsEnding(true);
      }
    };

    video.addEventListener('stalled', handleStalled);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('stalled', handleStalled);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('timeupdate', handleTimeUpdate);
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
          initial={{ 
            opacity: 1,
            backgroundColor: 'rgba(0, 0, 0, 1)' 
          }}
          animate={{ 
            opacity: 1,
            backgroundColor: isTransparent ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 1)'
          }}
          exit={{ 
            opacity: 0,
            transition: { duration: 1.5 }
          }}
          transition={{ 
            duration: 2,
            backgroundColor: {
              duration: 2.5,
              ease: "easeInOut"
            }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        >
          <motion.div 
            className="relative w-full h-full"
            initial={{ scale: 1 }}
            animate={{
              scale: 0.85
            }}
            transition={{
              duration: 9,
              ease: "linear"
            }}
          >
            <div className="relative w-full h-full">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted={isMuted}
                preload="auto"
                className="w-full h-full object-contain md:object-cover"
                onLoadedData={handleVideoLoaded}
                onError={handleVideoError}
                onEnded={() => {
                  setTimeout(() => setShowVideo(false), 1000);
                }}
              >
                <source src="/intro.mp4" type="video/mp4" />
              </video>
              
              <button
                onClick={toggleMute}
                className="absolute bottom-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors text-white z-10"
              >
                {isMuted ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroVideo; 