
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PageCreationSimulation from "./pages/PageCreationSimulation";
import PageSimulation from "./pages/PageSimulation";
import PageDetailSimulation from "./pages/PageDetailSimulation";
import PageDemandeCredit from "./pages/PageDemandeCredit";
 import AdminDashboard from "./pages/AdminDashboard";
 import AdminDemandDetail from "./pages/AdminDemandDetail";
 import { AdminProvider } from "./context/AdminContext";

export default function App() {
  return (
    <BrowserRouter>
      <AdminProvider>
        <Routes>
          <Route path="/new" element={<PageCreationSimulation />} />
          <Route path="/simulation" element={<PageSimulation />} />
          <Route path="/simulation/:id" element={<PageDetailSimulation />} />
          <Route
            path="/demande/:simulationId"
            element={<PageDemandeCredit />}
          />

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/demandes/:id" element={<AdminDemandDetail />} />
        </Routes>
      </AdminProvider>
    </BrowserRouter>
  );
}

