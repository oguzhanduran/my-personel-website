'use client';
import { useEffect, useRef } from 'react';

const NetworkAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas'ı ekran boyutuna ayarla
    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Nokta sınıfı
    class Point {
      x: number;
      y: number;
      vx: number;
      vy: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
      }

      update(width: number, height: number) {
        this.x += this.vx;
        this.y += this.vy;

        // Sınırları kontrol et
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
    }

    // Noktaları oluştur
    const points: Point[] = [];
    const numPoints = 100;
    for (let i = 0; i < numPoints; i++) {
      points.push(new Point(canvas.width, canvas.height));
    }

    // Animasyon döngüsü
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 20, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Noktaları güncelle ve çiz
      points.forEach(point => {
        point.update(canvas.width, canvas.height);
      });

      // Noktalar arası bağlantıları çiz
      points.forEach((point, i) => {
        points.slice(i + 1).forEach(otherPoint => {
          const distance = Math.hypot(point.x - otherPoint.x, point.y - otherPoint.y);
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(otherPoint.x, otherPoint.y);
            
            // Mesafeye göre opaklık ayarla
            const opacity = 1 - (distance / 150);
            ctx.strokeStyle = `rgba(64, 196, 255, ${opacity * 0.5})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });

        // Noktaları çiz
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(64, 196, 255, 0.8)';
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ background: 'rgb(10, 10, 20)' }}
    />
  );
};

export default NetworkAnimation; 