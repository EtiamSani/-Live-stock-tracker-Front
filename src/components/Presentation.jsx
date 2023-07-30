import mockup from "../public/images/iPhone.png";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { useAnimation } from "framer-motion";

const Presentation = ({ presentationData }) => {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  const { ref, inView } = useInView({ threshold: isMobile ? 0.1 : 0.7 });
  const animation = useAnimation();

  useEffect(() => {
    if (inView) {
      animation.start({
        x: 0,
        transition: {
          type: "spring",
          duration: 1,
          bounce: 0.3,
        },
      });
    }
    if (!inView) {
      animation.start({ x: "-100vw" });
    }
    console.log(inView);
  }, [inView, animation, isMobile]);

  return (
    <div className="justify-center lg:flex">
      {presentationData.map((data) => (
        <div key={data.title}>
          <h1 className="mt-10 text-center text-xl font-bold lg:ml-20 lg:w-[700px] lg:text-left lg:text-4xl">
            {data.title}
          </h1>
          <div ref={ref} className="lg:mt-20">
            <div className="flex justify-center px-4">
              <div className="my-auto w-[600px]">
                <h3 className="text-xl lg:text-3xl">{data.subtitle}</h3>
                <p>{data.value}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* <Element id="cardSection"> */}
      <motion.div animate={animation}>
        <img src={mockup} className="mr-28 w-[700px]" alt="Mockup" />
      </motion.div>
      {/* </Element> */}
    </div>
  );
};

export default Presentation;
