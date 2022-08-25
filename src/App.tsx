import { Typography } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Details from "./pages/Details";
import Home from "./pages/Home";

const App = () => {
  return (
    <div className="App">
      <div style={{ marginBottom: "50px" }}>
        <Typography variant="h3">Welcome to My To Do List!</Typography>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="details/:id/:name" element={<Details />} />
      </Routes>
    </div>
  );
};

export default App;
