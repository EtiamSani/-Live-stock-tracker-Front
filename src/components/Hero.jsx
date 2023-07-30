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
          <div className="top-1 lg:w-[950px]">
            <div>
              <h1 className="text-gradient mb-5 w-full text-center text-4xl font-bold lg:text-9xl">
                Suivez vos actions avec précision.
              </h1>
              <h2 className="mb-5 text-center text-xl text-black">
                En enregistrant vos points d'entrée, vous serez mieux préparé
                pour saisir rapidement les bonnes occasions d'investissement et
                prendre des décisions plus éclairées dans votre parcours
                financier.
              </h2>
              <Link to="/auth/register-investor">
                <div className="ml-8 lg:ml-[300px]">
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
