import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Presentation from "../components/Presentation";
import TickerTape from "../components/TickerTape";

const HomePage = () => {
  return (
    <div>
      <TickerTape />
      <Hero />
      <Presentation />
      <Footer />
    </div>
  );
};

export default HomePage;
