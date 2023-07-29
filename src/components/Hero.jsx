import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Propriétés initiales avant l'animation
      animate={{ opacity: 1, y: 0 }} // Propriétés finales après l'animation
      transition={{
        ease: "easeIn", // Courbe d'animation "ease in"
        duration: 1, // Durée de l'animation (en secondes)
      }}
      className="hero min-h-screen"
    >
      <div className="hero min-h-screen">
        <div className="hero-content ">
          <div className="lg:w-[750px]">
            <div>
              <h1 className="text-gradient mb-5 w-full text-center text-7xl font-bold">
                Lorem ipsum dolor sit amet.
              </h1>
              <p className="mb-5 text-center text-black">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
                voluptatem nostrum accusamus ipsum sint ut officia, veniam
                soluta aliquid totam. Lorem ipsum dolor sit amet consectetur
                adipisicing elit
              </p>
              <Link to="/auth/register-investor">
                <div className="ml-8 lg:ml-60">
                  <button className="btn-primary btn mx-auto rounded-3xl border-none bg-[#0a192f]">
                    Commencer !{" "}
                  </button>
                  <button className="border-sky-[#0a192f] btn-primary btn mx-auto ml-5 rounded-3xl bg-white text-black">
                    En savoir plus{" "}
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
