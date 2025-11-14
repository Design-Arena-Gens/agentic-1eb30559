"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useCallback } from "react";

const MAX_TILT = 14;

function TiltedFrame() {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const xSpring = useSpring(rotateX, { stiffness: 220, damping: 24, mass: 0.8 });
  const ySpring = useSpring(rotateY, { stiffness: 220, damping: 24, mass: 0.8 });
  const shineOpacity = useTransform(xSpring, [-MAX_TILT, MAX_TILT], [0.15, 0.4]);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const bounds = event.currentTarget.getBoundingClientRect();
      const offsetX = event.clientX - bounds.left;
      const offsetY = event.clientY - bounds.top;
      const normalizedX = offsetX / bounds.width - 0.5;
      const normalizedY = offsetY / bounds.height - 0.5;

      rotateX.set(normalizedY * -MAX_TILT * 2);
      rotateY.set(normalizedX * MAX_TILT * 2);
    },
    [rotateX, rotateY]
  );

  const handlePointerLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      className="perspective-wrapper"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        rotateX: xSpring,
        rotateY: ySpring
      }}
    >
      <motion.div className="frame-glow" style={{ opacity: shineOpacity }} />
      <div className="frame-shell">
        <iframe
          title="Dream Board"
          src="https://assets.pinterest.com/ext/embed.html?id=140806234049081"
          height="593"
          width="345"
          frameBorder="0"
          scrolling="no"
          className="pinterest-frame"
        />
      </div>
    </motion.div>
  );
}

export default function Page() {
  return (
    <main className="page">
      <div className="stars" aria-hidden="true" />
      <div className="aurora" aria-hidden="true" />
      <section className="content">
        <div className="headline">
          <span className="badge">Dreamscape</span>
          <h1>Wear your mood, live the vision.</h1>
          <p>
            Immerse yourself in our curated universe of textures, silhouettes, and tones. Let every
            motion guide you deeper into the story behind the look.
          </p>
        </div>
        <TiltedFrame />
      </section>
    </main>
  );
}
