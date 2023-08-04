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
          <h1 className="mb-5 mt-10 text-center text-3xl font-bold text-[#6496e0] lg:m-auto lg:w-[600px] lg:text-left lg:text-4xl">
            {data.title}
          </h1>
          <div className="lg:mt-20">
            <div className="flex justify-center px-4">
              <div className="my-auto w-[600px]">
                <h3 className="mb-5 text-xl lg:text-3xl">{data.subtitle}</h3>
                <p ref={ref}>{data.value}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* <Element id="cardSection"> */}
      <motion.div animate={animation}>
        <img src={mockup} className="mb-20 mr-28 w-[620px]" alt="Mockup" />
      </motion.div>
      {/* </Element> */}
    </div>
  );
};

export default Presentation;
