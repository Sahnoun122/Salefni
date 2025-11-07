
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PageCreationSimulation from "./pages/PageCreationSimulation";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
      
        <Route path="/new" element={<PageCreationSimulation />} />
      </Routes>
    </BrowserRouter>
  );
}
