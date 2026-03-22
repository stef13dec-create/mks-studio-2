"use client";
import { useEffect, useState } from "react";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(onComplete, 1600);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + Math.floor(Math.random() * 15) + 1;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const displayProgress = Math.min(progress, 100);

  return (
    <div
      className="fixed inset-0 z-[90] flex flex-col justify-end bg-[#141414] text-[#E4E3E0] p-8 md:p-16 uppercase font-sans transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] delay-500"
      style={{ transform: progress >= 100 ? "translateY(-100%)" : "translateY(0%)" }}
    >
      <div className="flex justify-end text-6xl md:text-8xl lg:text-[10vw] font-light mb-8 overflow-hidden leading-none tracking-tighter">
        <div className="flex items-baseline transition-transform duration-1000 ease-out">
          <span>{displayProgress}</span>
          <span className="text-2xl md:text-4xl ml-2">%</span>
        </div>
      </div>
      <div className="w-full h-[1px] bg-[#E4E3E0]/20 relative overflow-hidden mb-8 md:mb-16">
        <div
          className="absolute top-0 left-0 h-full bg-[#E4E3E0] transition-all duration-100"
          style={{ width: `${displayProgress}%` }}
        />
      </div>
      <div className="overflow-hidden">
        <p className="text-xs md:text-sm tracking-widest opacity-70 transition-transform duration-1000 ease-out delay-200">
          MKS Studio &copy; 2026
        </p>
      </div>
    </div>
  );
}
