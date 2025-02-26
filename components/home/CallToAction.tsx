'use client';

import helixImage from '../assets/images/helix2.png';
import emojiStarImage from '../assets/images/emojistar.png';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

export const CallToAction = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <div className="bg-black text-white py-[72px] sm:py-24 text-center" ref={containerRef}>
      <div className="container max-w-xl relative">
        <motion.div style={{ translateY }}>
          <Image
            src={helixImage}
            alt=""
            className="absolute top-6 left-[calc(100%+36px)]"
          />
        </motion.div>
        <motion.div style={{ translateY }}>
          <Image
            src={emojiStarImage}
            alt=""
            className="absolute -top-[120px] right-[calc(100%+24px)]"
          />
        </motion.div>
        <h2 className="font-bold text-5xl sm:text-6xl tracking-tighter">
          Let&apos;s connect
        </h2>
        <p className="text-xl text-white/70 mt-5">
          Have a question, idea, or just want to chat?
          Feel free to <span className="text-white font-semibold">reach out</span>—I’d love to hear from you!
        </p>

        <div className="mt-10 flex flex-col gap-2.5 max-w-sm mx-auto">

          <Link
            href="mailto:dedhiaparshav@gmail.com?subject=Let's%20Connect&body=Hi%20Parshav,"
          >
            <button className="bg-white text-black h-12 align-center rounded-lg px-5 font-medium">
              Send a mail
            </button>
          </Link>
          {/* <div className="relative"> */}
          {/* <span className="absolute top-1/2 -translate-y-1/2 left-2 text-white">
              or
            </span> */}
          {/* <input
              type="email"
              placeholder="your@email.com"
              className="h-12 w-full bg-white/20 rounded-lg px-5 font-medium placeholder:text-[#9CA3AF] text-white"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-black px-4 h-9 rounded-md text-sm font-medium">
              Notify Me
            </button> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};
