import { createRoot } from "react-dom/client";
import Nav from "./components/Nav";

const App = () => {
  return (
    <div>
      <h1>HelloWorld</h1>
      <Nav />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
