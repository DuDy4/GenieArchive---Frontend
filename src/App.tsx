import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/homepage";
import Meeting from "./components/meeting";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/:id" element={<Meeting />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
