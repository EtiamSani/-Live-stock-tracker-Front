import { testimonialsData } from "../utils/testimonialsData";
import LogoSlider from "./LogoSlider";

const Testimonial = () => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <span key={i} className="mr-1 text-yellow-500">
          &#9733;
        </span>
      );
    }
    return stars;
  };

  return (
    <div>
      <h2 className="mb-4 text-center text-3xl font-bold text-[#6496e0] sm:text-5xl">
        Utilisé par les meilleurs investisseurs du monde.
      </h2>
      <p className="mb-6 text-center text-lg sm:text-2xl md:mb-14">
        Les avis sont unanimes...!
      </p>

      <div className="flex flex-wrap justify-center">
        {testimonialsData.map((testimonial) => (
          <div
            key={testimonial.id}
            className="mx-2 mb-6 max-w-md rounded-lg bg-white p-4 shadow-2xl"
          >
            <div className="mb-4 flex items-center">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="mr-2 h-10 w-10 rounded-full"
              />
              <h3 className="mb-2 text-lg font-bold">{testimonial.name}</h3>
            </div>
            <p className="text-gray-700">{testimonial.comment}</p>
            <div className="mt-4 flex items-center">
              {renderStars(testimonial.rating)}
            </div>
          </div>
        ))}
        <LogoSlider />
      </div>
    </div>
  );
};

export default Testimonial;
