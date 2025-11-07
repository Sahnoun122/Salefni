
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PageCreationSimulation from "./pages/PageCreationSimulation";
import PageSimulation from "./pages/PageSimulation";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/new" element={<PageCreationSimulation />} />
        <Route path="/simulation" element={<PageSimulation />} />
      </Routes>
    </BrowserRouter>
  );
}
