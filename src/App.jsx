
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PageCreationSimulation from "./pages/PageCreationSimulation";
import PageSimulation from "./pages/PageSimulation";
import PageDetailSimulation from "./pages/PageDetailSimulation";

import PageDemandeCredit from "./pages/PageDemandeCredit";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/new" element={<PageCreationSimulation />} />
        <Route path="/simulation" element={<PageSimulation />} />

        <Route  path = "/simulation/:id"  element= {<PageDetailSimulation/>} />
        < Route path ="/demande/:simulationId"  element = { < PageDemandeCredit /> } />
      </Routes>
    </BrowserRouter>
  );
}
