import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const logos = [
  "/images/Berkshire.png",
  "/images/blackrock.png",
  "/images/fundsmith.png",
  "/images/Vanguard.png",
  "/images/jp.png",
];

function LogoSlider() {
  const controls = useAnimation();

  useEffect(() => {
    const animation = async () => {
      await controls.start({
        x: [-150 * logos.length, window.innerWidth],
        transition: {
          duration: 30,
          ease: "linear",
          repeat: Infinity,
        },
      });
    };

    animation();
  }, [controls]);

  return (
    <div className="mx-auto mt-10 w-full overflow-hidden">
      <motion.div
        style={{
          display: "flex",
        }}
        initial={{ x: -150 * logos.length }}
        animate={controls}
      >
        {logos.map((logo, index) => (
          <motion.img
            key={index}
            src={logo}
            width={"150px"}
            alt={`Logo ${index + 1}`}
            style={{ marginRight: "100px" }}
            className="h-12"
          />
        ))}
      </motion.div>
    </div>
  );
}

export default LogoSlider;
