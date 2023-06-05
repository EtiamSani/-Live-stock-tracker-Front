import gif from "../styles/App2.gif";

const Presentation = () => {
  return (
    <div>
      <h1 className=" mt-10 text-center text-3xl font-bold">
        Lorem ipsum dolor sit amet.
      </h1>
      <div className="mockup-window mx-48 my-8 border bg-base-300">
        <div className="flex justify-center bg-base-200 px-4 py-16">
          <img src={gif} alt="GIF" />
        </div>
      </div>
    </div>
  );
};

export default Presentation;
