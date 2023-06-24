import mockup from "../../public/images/Mockup.png";

const Presentation = () => {
  return (
    <div>
      <h1 className=" mt-10 text-center text-5xl font-bold">
        Lorem ipsum dolor sit amet.
      </h1>
      <div className="mx-48">
        <div className="flex justify-center px-4 ">
          <img src={mockup} className="w-50" alt="Mockup" />
        </div>
      </div>
    </div>
  );
};

export default Presentation;
