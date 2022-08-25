import { Route, Routes } from "react-router-dom";
import Details from "./pages/Details";
import Home from "./pages/Home";

const App = () => {
  return (
    <div className="App">
      <h1>Welcome to My To Do List!</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="details/:id/:name" element={<Details />} />
      </Routes>
    </div>
  );
};

export default App;
