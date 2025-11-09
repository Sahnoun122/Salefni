
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import PageCreationSimulation from "./pages/PageCreationSimulation";
import PageSimulation from "./pages/PageSimulation";
import PageDetailSimulation from "./pages/PageDetailSimulation";
import PageDemandeCredit from "./pages/PageDemandeCredit";
import AdminDashboard from "./pages/AdminDashboard";
import AdminDemandDetail from "./pages/AdminDemandDetail";
import { AdminProvider } from "./context/AdminContext";

function AppWrapper({ children }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isAdminRoute 
        ? 'bg-gradient-to-br from-black via-gray-900 to-orange-900' 
        : 'bg-gradient-to-br from-orange-900 via-black to-gray-900'
    }`}>
      <header className={`sticky top-0 z-50 backdrop-blur-lg border-b transition-all duration-300 ${
        isAdminRoute 
          ? 'bg-black/80 border-orange-800/30' 
          : 'bg-orange-950/80 border-orange-800/30'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isAdminRoute 
                  ? 'bg-orange-600 shadow-lg shadow-orange-600/20' 
                  : 'bg-orange-600 shadow-lg shadow-orange-600/20'
              }`}>
                <span className="text-white font-bold text-xl">
                  {isAdminRoute ? 'A' : 'S'}
                </span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-white font-bold text-xl">
                  {isAdminRoute ? 'Admin Panel' : 'Salefni'}
                </h1>
                <p className={`text-xs transition-all duration-300 ${
                  isAdminRoute ? 'text-orange-400' : 'text-orange-400'
                }`}>
                  {isAdminRoute ? 'Gestion administrative' : 'Simulation de crédit'}
                </p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              {isAdminRoute ? (
                <>
                  <a href="/admin" className="text-orange-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-orange-800/20">
                    Dashboard
                  </a>
                  <a href="/admin/settings" className="text-orange-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-orange-800/20">
                    Paramètres
                  </a>
                </>
              ) : (
                <>
                  <a href="/" className="text-orange-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-orange-800/20">
                    Accueil
                  </a>
                  <a href="/simulation" className="text-orange-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-orange-800/20">
                    Simulations
                  </a>
                </>
              )}
            </nav>

            <div className={`hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all duration-300 ${
              isAdminRoute 
                ? 'bg-orange-600/20 border border-orange-500/30 text-orange-300' 
                : 'bg-orange-600/20 border border-orange-500/30 text-orange-300'
            }`}>
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              {isAdminRoute ? 'Mode Admin' : 'Service actif'}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className={`border-t backdrop-blur-lg mt-16 transition-all duration-300 ${
        isAdminRoute 
          ? 'bg-black/50 border-orange-800/30' 
          : 'bg-orange-950/50 border-orange-800/30'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className={`text-sm transition-all duration-300 ${
              isAdminRoute ? 'text-orange-400' : 'text-orange-400'
            }`}>
              © 2026 Salefni {isAdminRoute ? '- Interface Admin' : '- Simulation de crédit'}
            </p>
            <div className={`flex items-center gap-4 text-sm transition-all duration-300 ${
              isAdminRoute ? 'text-orange-300' : 'text-orange-300'
            }`}>
              {isAdminRoute ? (
                <>
                  <span>Sécurisé</span>
                  <span>•</span>
                  <span>Accès restreint</span>
                </>
              ) : (
                <>
                  <span>Gratuit</span>
                  <span>•</span>
                  <span>Sans engagement</span>
                </>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AdminProvider>
        <AppWrapper>
          <Routes>
            <Route path="/" element={<PageCreationSimulation />} />
            <Route path="/simulation" element={<PageSimulation />} />
            <Route path="/simulation/:id" element={<PageDetailSimulation />} />
            <Route
              path="/demande/:simulationId"
              element={<PageDemandeCredit />}
            />

            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/demandes/:id" element={<AdminDemandDetail />} />
          </Routes>
        </AppWrapper>
      </AdminProvider>
    </BrowserRouter>
  );
}

