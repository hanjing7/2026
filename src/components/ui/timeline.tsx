"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full font-sans"
      ref={containerRef}
    >
      <div className="mx-auto max-w-7xl py-10">
        <div ref={ref} className="relative pb-20">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex justify-start gap-10 pt-5 md:pt-20"
            >
              {/* Title Column - 30% width */}
              <div className="sticky top-40 z-40 flex w-[30%] flex-col items-start self-start">
                <div className="absolute left-0 flex h-6 w-6 items-center justify-center border border-neutral-300 bg-white">
                  <div className="h-3 w-3 border border-neutral-300 bg-neutral-200" />
                </div>
                <h3 className="pl-10 text-sm sm:text-base md:text-lg lg:text-xl text-stone-500">
                  {item.title}
                </h3>
              </div>

              {/* Content Column - 70% width */}
              <div className="relative w-[70%] pr-4">
                {item.content}
              </div>
            </div>
          ))}
          <div
            style={{
              height: height + "px",
            }}
            className="absolute left-3 top-0 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
          >
            <motion.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-orange-500 via-orange-500 to-transparent from-[0%] via-[10%]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};