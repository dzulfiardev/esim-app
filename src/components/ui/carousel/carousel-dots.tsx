"use client";

import React from "react";
import { useEffect, useCallback, useState } from "react";

interface CarouselDotsProps {
  api: any;
  count: number;
  selectedIndex: number;
  onDotClick: (index: number) => void;
}

export function CarouselDots({
  api,
  count,
  selectedIndex,
  onDotClick,
}: CarouselDotsProps) {
  return (
    <div className="flex justify-center gap-2 mt-4">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          className={`h-2 transition-all ${
            index === selectedIndex
              ? "w-8 bg-white rounded-full" // Pill shape for active dot
              : "w-2 bg-gray-300 rounded-full" // Circle shape for inactive dots
          }`}
          onClick={() => onDotClick(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
}

// Create a hook for easier integration with Embla Carousel
export function useCarouselDots(api: any) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Handle slide changes to update the dots
  const onSelect = useCallback(() => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
  }, [api]);

  // Initialize and update the current slide when the API changes
  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  // Handle dot click to navigate to a slide
  const scrollTo = useCallback(
    (index: number) => {
      if (!api) return;
      api.scrollTo(index);
    },
    [api]
  );

  return {
    selectedIndex,
    scrollTo,
  };
}