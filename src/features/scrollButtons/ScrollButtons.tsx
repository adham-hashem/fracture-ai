import React, { useState, useEffect } from "react";
import "./ScrollButtons.css";

const ScrollButtons: React.FC<{ containerHeight: number; threshold?: number }> = ({ containerHeight, threshold = 800 }) => {
  const [showTopButton, setShowTopButton] = useState(false);
  const [showBottomButton, setShowBottomButton] = useState(false);

  useEffect(() => {
    if (containerHeight <= threshold) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      setShowTopButton(scrollTop > 0);
      setShowBottomButton(scrollTop + windowHeight < documentHeight);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [containerHeight, threshold]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
  };

  if (containerHeight <= threshold) return null;

  return (
    <div className="scroll-buttons">
      {showTopButton && (
        <button className="scroll-button scroll-to-top" onClick={scrollToTop}>
          ↑
        </button>
      )}
      {showBottomButton && (
        <button className="scroll-button scroll-to-bottom" onClick={scrollToBottom}>
          ↓
        </button>
      )}
    </div>
  );
};

export default ScrollButtons;