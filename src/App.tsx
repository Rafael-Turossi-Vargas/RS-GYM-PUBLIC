import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Plans from "./routes/Plans";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/planos" element={<Plans />} />
    </Routes>
  );
}