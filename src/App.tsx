import { Route, Routes } from "react-router-dom";
import Home from "./components/homepage";
import Meeting from "./components/meeting";

function App() {
  return (
    <Routes>
      <Route path="/" index element={<Home />} />
      <Route path="/meeting/:id" element={<Meeting />} />
    </Routes>
  );
}

export default App;
