"use client"

import Link from "next/link";
import { useEffect, useState } from "react";

const SlidingText = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 0); // Delay before the animation starts

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center space-y-12">
      <p
        className={`text-center text-6xl md:text-7xl lg:text-8xl font-bold ${
          visible ? "slide-up" : ""
        }`}
      >
        So you think you can type!
      </p>
      <Link href="/console">
        <button
          className={`bg-blue-700 py-2 px-6 rounded-full font-medium text-xl text-white ${
            visible ? "fade-in" : ""
          }`}
        >
          Let's find out
        </button>
      </Link>
    </div>
  );
};

export default SlidingText;
