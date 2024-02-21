'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export const Header = () => {
  // Choose at what point the image opacity becomes 0
  // E.G: 50px from the top
  const offsetHeight = 50;
  // Vertical scroll distance in pixels.
  const { scrollY } = useScroll();
  // Transforms scroll and image height values to opacity values
  const yRange = useTransform(scrollY, [500 - offsetHeight, 0], [0, 1]);
  const opacity = useSpring(yRange, { stiffness: 400, damping: 40 });

  const target = useRef(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: target,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [1, 0], [0, dimension.height / 4]);

  useEffect(() => {
    const raf = () => {
      requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', resize);
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <header className="relative min-h-screen">
      <motion.div
        style={{ opacity }}
        className="fixed top-0 left-0 w-screen h-screen"
      >
        <div
          style={{
            backgroundImage: `url("/bg.png"), linear-gradient(rgba(0,0,0,0.9),rgba(0,0,0,0.75),rgba(0,0,0,0.7))`,
            backgroundBlendMode: 'overlay',
          }}
          className=" bg-cover bg-center h-full w-full absolute top-0 right-0 left-0 bottom-0"
        ></div>
      </motion.div>
      <div className="relative" ref={target}>
        <div className="h-full flex items-center justify-end pr-4">
          <h1 className="text-white w-[90%] font-medium text-right text-[clamp(3rem,15cqi,12rem)] leading-[1.2]">
            &#9679;POPCORN TIME
          </h1>
        </div>
        <div className="pt-[30%] md:pt-0">
          <motion.p
            style={{
              y,
            }}
            className="text-[#FE531D] font-[300] text-[clamp(1rem,3cqi,26px)] mt-6 ml-[27%]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            variants={{
              visible: { opacity: 1 },
              hidden: { opacity: 0 },
            }}
          >
            BROWSE OUR SELECTION
            <br />
            CHOOSE YOUR COMFORT
          </motion.p>
        </div>
      </div>
    </header>
  );
};
