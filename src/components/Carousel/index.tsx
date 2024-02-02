"use client";

import {
  FunctionComponent,
  ReactNode,
  useState,
  Children,
  useEffect,
} from "react";
import { NextArrow, PrevArrow } from "./Arrow";

const Carousel: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const childrenArray = Children.toArray(children);

  const handleNextActiveIndex = () => {
    setActiveIndex((prev) => {
      if (prev >= childrenArray.length - 1) return 0;
      return prev + 1;
    });
  };

  const handlePrevActiveIndex = () => {
    setActiveIndex((prev) => {
      if (prev < 1) return childrenArray.length - 1;
      return prev - 1;
    });
  };

  useEffect(() => {
    const intervalId = setInterval(handleNextActiveIndex, 5000);
    return () => clearInterval(intervalId);
  }, [activeIndex, handleNextActiveIndex]);

  return (
    <div className="w-full h-auto relative">
      {childrenArray[activeIndex]}
      <div className="absolute z-[3] bottom-[21rem] right-3 md:bottom-10 md:right-6">
        <div className="flex flex-col gap-y-2 md:gap-y-3">
          <PrevArrow onClick={handlePrevActiveIndex} />
          <NextArrow onClick={handleNextActiveIndex} />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
