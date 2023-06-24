import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{ backgroundImage: 'url("/images/hero-image.jpg")' }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">
            Lorem ipsum dolor sit amet.
          </h1>
          <p className="mb-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
            voluptatem nostrum accusamus ipsum sint ut officia, veniam soluta
            aliquid totam.
          </p>
          <Link to="/auth/register-investor">
            <button className="btn-primary btn">Commencer ! </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
