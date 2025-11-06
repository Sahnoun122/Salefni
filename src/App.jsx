// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import PageSimulation from "./pages/PageSimulation";
import PageCreationSimulation from "./pages/PageCreationSimulation";
// import PageDetailSimulation from "./pages/PageDetailSimulation";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/simulation" replace />} />
        <Route path="/simulation" element={<PageSimulation />} /> */}
        <Route path="/new" element={<PageCreationSimulation />} />
        {/* <Route path="/simulation/:id" element={<PageDetailSimulation />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
