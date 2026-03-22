"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorVisualRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorVisual = cursorVisualRef.current;
    const textEl = textRef.current;
    if (!cursor || !cursorVisual || !textEl) return;

    let isHovering = false;
    let currentText = "";
    let currentEffect = "";

    const updateMousePosition = (e: MouseEvent) => {
      try {
        let scale = 1;
        if (currentEffect) scale = 7;
        else if (currentText) scale = 2.25;
        else if (isHovering) scale = 2;
        
        cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        cursorVisual.style.transform = `translate3d(-50%, -50%, 0) scale(${scale})`;
      } catch (err) {
        console.error("CustomCursor: mousemove error", err);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      try {
        const target = e.target as HTMLElement;
        
        if (!target || typeof target.closest !== 'function') {
          isHovering = false;
          currentText = "";
          currentEffect = "";
          setCursorText("");
          cursorVisual.style.backgroundColor = "rgba(255,255,255,0)";
          cursorVisual.style.border = "1px solid rgba(255,255,255,0.5)";
          cursorVisual.style.backdropFilter = "none";
          cursorVisual.style.setProperty('-webkit-backdrop-filter', 'none');
          return;
        }

        const cursorTextEl = target.closest("[data-cursor-text]") as HTMLElement;
        const cursorEffectEl = target.closest("[data-cursor-effect]") as HTMLElement;

        let scale = 1;

        if (cursorEffectEl) {
          currentText = "";
          currentEffect = cursorEffectEl.getAttribute("data-cursor-effect") || "true";
          setCursorText("");
          isHovering = true;
          cursorVisual.style.backgroundColor = "rgba(255,255,255,0.05)";
          cursorVisual.style.backdropFilter = "grayscale(100%)";
          cursorVisual.style.setProperty('-webkit-backdrop-filter', 'grayscale(100%)');
          cursorVisual.style.border = "1px solid rgba(255,255,255,0.3)";
          cursor.style.mixBlendMode = "normal";
          scale = 7;
        } else if (cursorTextEl) {
          currentText = cursorTextEl.getAttribute("data-cursor-text") || "";
          currentEffect = "";
          setCursorText(currentText);
          isHovering = true;
          cursorVisual.style.backgroundColor = "rgba(255,255,255,0)";
          cursorVisual.style.backdropFilter = "none";
          cursorVisual.style.setProperty('-webkit-backdrop-filter', 'none');
          cursorVisual.style.border = "1px solid rgba(255,255,255,0.5)";
          cursor.style.mixBlendMode = "difference";
          textEl.style.color = "#ffffff";
          scale = 2.25;
        } else {
          currentText = "";
          currentEffect = "";
          setCursorText("");
          const isClickable = 
            target.tagName?.toLowerCase() === "a" ||
            target.tagName?.toLowerCase() === "button" ||
            target.closest("a") ||
            target.closest("button");
            
          isHovering = !!isClickable;
          cursorVisual.style.backgroundColor = isHovering ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)";
          cursorVisual.style.backdropFilter = "none";
          cursorVisual.style.setProperty('-webkit-backdrop-filter', 'none');
          cursorVisual.style.border = isHovering ? "none" : "1px solid rgba(255,255,255,0.5)";
          cursor.style.mixBlendMode = "difference";
          textEl.style.color = "#000000";
          scale = isHovering ? 2 : 1;
        }
        
        cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        cursorVisual.style.transform = `translate3d(-50%, -50%, 0) scale(${scale})`;
      } catch (err) {
        console.error("CustomCursor: mouseover error", err);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[100] mix-blend-difference hidden md:block"
      style={{ willChange: "transform" }}
    >
      <div
        ref={cursorVisualRef}
        className="w-6 h-6 rounded-full border border-white/50 flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{ willChange: "transform, background-color, border-color, backdrop-filter", transform: "translate3d(-50%, -50%, 0) scale(1)" }}
      >
        <span 
          ref={textRef} 
          className="text-[4px] font-bold tracking-widest uppercase opacity-100 transition-opacity duration-150 absolute"
          style={{ opacity: cursorText ? 1 : 0 }}
        >
          {cursorText}
        </span>
      </div>
    </div>
  );
}
