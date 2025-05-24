import React, { useEffect, useState } from "react";

export const ScrollProgress = () => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const scrolled = (currentScroll / totalHeight) * 100;
      setScroll(scrolled);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className='fixed top-0 left-0 w-full h-1 z-50 bg-transparent'>
      <div
        className='h-full bg-green-600 transition-all duration-200 ease-out'
        style={{ width: `${scroll}%` }}
      />
    </div>
  );
};
