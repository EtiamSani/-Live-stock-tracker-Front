import gif from "../styles/App2.gif";

const Presentation = () => {
  return (
    <div>
      <h1 className=" mt-10 text-center text-lg font-bold">
        Lorem ipsum dolor sit amet.
      </h1>
      <div className="mockup-window mx-48 my-8 border bg-base-300">
        <div className="flex justify-center bg-base-200 px-4 py-16">
          <img src={gif} alt="GIF" />
        </div>
      </div>
      <div className="m-auto flex justify-center">
        <div className="card m-10 w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Lorem, ipsum dolor.</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
              quas, corrupti, quaerat iste ea nobis maiores deleniti ab, maxime
              facere rerum pariatur dolore eius eaque quasi voluptatem
              voluptates dolorum possimus!
            </p>
          </div>
        </div>
        <div className="card m-10 w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Lorem, ipsum dolor.</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
              quas, corrupti, quaerat iste ea nobis maiores deleniti ab, maxime
              facere rerum pariatur dolore eius eaque quasi voluptatem
              voluptates dolorum possimus!
            </p>
          </div>
        </div>
        <div className="card m-10 w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Lorem, ipsum dolor.</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
              quas, corrupti, quaerat iste ea nobis maiores deleniti ab, maxime
              facere rerum pariatur dolore eius eaque quasi voluptatem
              voluptates dolorum possimus!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Presentation;
