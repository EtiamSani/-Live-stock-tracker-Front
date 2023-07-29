import { motion } from "framer-motion";
import { Element } from "react-scroll";
import { useEffect, useState } from "react";

const Card = ({ cardData }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("cardSection");
      if (section) {
        const rect = section.getBoundingClientRect();
        setIsVisible(rect.top <= window.innerHeight && rect.bottom >= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Element id="cardSection">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
        transition={{
          ease: "easeInOut",
          duration: 1,
        }}
      >
        <div className="mb:flex-row m-auto flex flex-col justify-center lg:flex-row">
          {cardData.map((item, index) => (
            <div key={index} className="w-50 card m-10 bg-base-100  lg:w-96">
              <div className="card-body">
                <h2 className="card-title text-2xl text-[#6496e0]">
                  {item.title}
                </h2>
                <p>{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </Element>
  );
};

export default Card;
