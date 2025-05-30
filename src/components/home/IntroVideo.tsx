'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

interface IntroVideoProps {
  onEnd: () => void;
}

const IntroVideo = ({ onEnd }: IntroVideoProps) => {
  const [showVideo, setShowVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isTransparent, setIsTransparent] = useState(false);
  const [isEnding, setIsEnding] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const attemptRef = useRef(0);
  const [canPlayVideo, setCanPlayVideo] = useState(false);

  useEffect(() => {
    const preloadVideo = () => {
      const video = new Audio('/intro.mp4');
      video.preload = 'auto';
    };

    preloadVideo();
  }, []);

  useEffect(() => {
    // 1 saniye sonra videoyu göster
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 1000);

    return () => clearTimeout(timer);
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

  useEffect(() => {
    // Animasyonların tamamlanması için 1 saniye bekle
    const startVideoTimer = setTimeout(() => {
      setCanPlayVideo(true);
    }, 500);

    return () => clearTimeout(startVideoTimer);
  }, []);

  useEffect(() => {
    if (canPlayVideo && videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  }, [canPlayVideo]);

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
        onEnd(); // Hata durumunda da içeriği göster
      });
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoEnded = () => {
    // Önce videoyu kapat
    setShowVideo(false);
    
    // 1.5 saniye neural network animasyonunu göster, sonra içeriği getir
    setTimeout(() => {
      onEnd();
    }, 1500);
  };

  if (hasError) {
    onEnd(); // Hata durumunda içeriği göster
    return null;
  }

  return (
    <AnimatePresence>
      {showVideo && (
        <motion.div
          initial={{ 
            opacity: 0,
            backgroundColor: 'rgba(0, 0, 0, 0)'
          }}
          animate={{ 
            opacity: 1,
            backgroundColor: isTransparent ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 1)'
          }}
          exit={{ 
            opacity: 0,
            filter: 'blur(10px)',
            transition: { 
              duration: 1.5,
              ease: "easeInOut"
            }
          }}
          transition={{ 
            duration: 1.5,
            backgroundColor: {
              duration: 2.5,
              ease: "easeInOut"
            }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        >
          <motion.div 
            className="relative w-full h-full"
            initial={{ 
              scale: 1,
              opacity: 0
            }}
            animate={{
              scale: 0.85,
              opacity: 1
            }}
            exit={{
              scale: 0.8,
              opacity: 0,
              rotate: 2,
              filter: 'blur(10px)'
            }}
            transition={{
              scale: {
                duration: 9,
                ease: "linear"
              },
              opacity: {
                duration: 1,
                ease: "easeOut"
              }
            }}
          >
            <div className="relative w-full h-full">
              <motion.video
                ref={videoRef}
                playsInline
                muted={isMuted}
                preload="auto"
                className="w-full h-full object-contain md:object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{
                  scale: 0.7,
                  rotate: 5,
                  filter: 'blur(15px) brightness(0)',
                  opacity: 0
                }}
                transition={{ 
                  duration: 1,
                  ease: "easeOut",
                  exit: {
                    duration: 1.2,
                    ease: "easeInOut"
                  }
                }}
                onLoadedData={handleVideoLoaded}
                onError={handleVideoError}
                onEnded={handleVideoEnded}
              >
                <source src="/intro.mp4" type="video/mp4" />
              </motion.video>

              <div className="absolute bottom-4 w-full flex items-center justify-between px-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-[#00A3FF] text-lg md:text-xl font-medium tracking-wide"
                  style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
                >
                  Redirecting to the website...
                </motion.div>

                <button
                  onClick={toggleMute}
                  className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors text-white"
                >
                  {isMuted ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroVideo; 