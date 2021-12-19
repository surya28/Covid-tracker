import "./App.css";
import Home from "./pages/home";
import StateDetails from "./pages/stateDetails";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:state" element={<StateDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
