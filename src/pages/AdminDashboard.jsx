import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import TableRow from "../components/TableRow";
import SearchInput from "../components/SearchInput";

export default function AdminDashboard() {
  const { demandes, searchTerm, setSearchTerm, filterStatus, setFilterStatus } =
    useContext(AdminContext);

 const filteredDemandes = demandes.filter((d) => {
   const nom = d.nom || ""; 
   const email = d.email || ""; 
   const matchesSearch =
     nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
     email.toLowerCase().includes(searchTerm.toLowerCase());

   const matchesStatus = filterStatus ? d.status === filterStatus : true;

   return matchesSearch && matchesStatus;
 });

  const stats = {
    total: demandes.length,
    pending: demandes.filter(d => d.status === 'en cours').length,
    approved: demandes.filter(d => d.status === 'acceptée').length,
    rejected: demandes.filter(d => d.status === 'refusée').length
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="group relative bg-gradient-to-br from-orange-600/10 to-black/40 border border-orange-500/40 rounded-2xl p-6 backdrop-blur-sm hover:from-orange-600/20 hover:border-orange-400/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-600/20">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative">
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-orange-600/40 transition-all duration-300">
                <span className="text-white text-2xl">📊</span>
              </div>
              <div className="text-right">
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div>
              <p className="text-orange-300/80 text-sm font-semibold mb-2 tracking-wide">TOTAL DEMANDES</p>
              <p className="text-4xl font-black text-white mb-1 group-hover:text-orange-100 transition-colors duration-300">{stats.total}</p>
              <p className="text-orange-400/70 text-xs font-medium">Toutes les demandes reçues</p>
            </div>
          </div>
        </div>

        <div className="group relative bg-gradient-to-br from-yellow-600/10 to-black/40 border border-yellow-500/40 rounded-2xl p-6 backdrop-blur-sm hover:from-yellow-600/20 hover:border-yellow-400/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-600/20">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative">
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-yellow-600/40 transition-all duration-300">
                <span className="text-white text-2xl animate-spin-slow">⏳</span>
              </div>
              <div className="text-right">
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div>
              <p className="text-yellow-300/80 text-sm font-semibold mb-2 tracking-wide">EN ATTENTE</p>
              <p className="text-4xl font-black text-white mb-1 group-hover:text-yellow-100 transition-colors duration-300">{stats.pending}</p>
              <p className="text-yellow-400/70 text-xs font-medium">Demandes à traiter</p>
            </div>
          </div>
        </div>

        <div className="group relative bg-gradient-to-br from-green-600/10 to-black/40 border border-green-500/40 rounded-2xl p-6 backdrop-blur-sm hover:from-green-600/20 hover:border-green-400/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-600/20">
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative">
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-green-600/40 transition-all duration-300">
                <span className="text-white text-2xl animate-bounce">✅</span>
              </div>
              <div className="text-right">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div>
              <p className="text-green-300/80 text-sm font-semibold mb-2 tracking-wide">APPROUVÉES</p>
              <p className="text-4xl font-black text-white mb-1 group-hover:text-green-100 transition-colors duration-300">{stats.approved}</p>
              <p className="text-green-400/70 text-xs font-medium">Demandes validées</p>
            </div>
          </div>
        </div>

        <div className="group relative bg-gradient-to-br from-red-600/10 to-black/40 border border-red-500/40 rounded-2xl p-6 backdrop-blur-sm hover:from-red-600/20 hover:border-red-400/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/20">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative">
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-red-600/40 transition-all duration-300">
                <span className="text-white text-2xl">❌</span>
              </div>
              <div className="text-right">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div>
              <p className="text-red-300/80 text-sm font-semibold mb-2 tracking-wide">REFUSÉES</p>
              <p className="text-4xl font-black text-white mb-1 group-hover:text-red-100 transition-colors duration-300">{stats.rejected}</p>
              <p className="text-red-400/70 text-xs font-medium">Demandes rejetées</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black/30 border border-orange-500/30 rounded-xl p-6 backdrop-blur-sm">
        <h2 className="text-3xl font-bold mb-6 text-white flex items-center gap-4">
          <span className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-orange-600/20">
            A
          </span>
          Dashboard Administrateur
        </h2>

        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="🔍 Rechercher par nom ou email..."
                className="w-full px-4 py-3 pl-12 bg-black/50 border border-orange-500/30 rounded-xl text-white placeholder-orange-300/60 focus:outline-none focus:border-orange-400 transition-all duration-300"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400">🔍</span>
            </div>
          </div>
          <div className="lg:w-64">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-3 bg-black/50 border border-orange-500/30 rounded-xl text-white focus:outline-none focus:border-orange-400 transition-all duration-300"
            >
              <option value="" className="bg-black text-white">📋 Tous les statuts</option>
              <option value="en cours" className="bg-black text-white">⏳ En cours</option>
              <option value="acceptée" className="bg-black text-white">✅ Acceptées</option>
              <option value="refusée" className="bg-black text-white">❌ Refusées</option>
            </select>
          </div>
        </div>

        <div className="bg-black/50 border border-orange-500/30 rounded-xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-orange-600/20 border-b border-orange-500/30">
                  <th className="text-left py-4 px-6 font-bold text-orange-200 text-sm uppercase tracking-wide">
                    👤 Client
                  </th>
                  <th className="text-left py-4 px-6 font-bold text-orange-200 text-sm uppercase tracking-wide hidden sm:table-cell">
                    📧 Email
                  </th>
                  <th className="text-left py-4 px-6 font-bold text-orange-200 text-sm uppercase tracking-wide">
                    💰 Montant
                  </th>
                  <th className="text-left py-4 px-6 font-bold text-orange-200 text-sm uppercase tracking-wide">
                    📊 Statut
                  </th>
                  <th className="text-center py-4 px-6 font-bold text-orange-200 text-sm uppercase tracking-wide">
                    ⚙️ Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredDemandes.length > 0 ? filteredDemandes.map((demande, index) => (
                  <tr 
                    key={demande.id} 
                    className={`border-b border-orange-500/10 hover:bg-orange-600/10 transition-all duration-300 ${
                      index % 2 === 0 ? 'bg-black/20' : 'bg-black/10'
                    }`}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {(demande.nom || 'N')[0].toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold text-white">{demande.nom || 'N/A'}</div>
                          <div className="text-sm text-orange-400/70 sm:hidden">{demande.email || 'N/A'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 hidden sm:table-cell">
                      <span className="text-orange-300">{demande.email || 'N/A'}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-bold text-white text-lg">
                        {demande.montant?.toLocaleString('fr-FR')} DH
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                        demande.status === 'en cours' 
                          ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                          : demande.status === 'acceptée'
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : demande.status === 'refusée'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                      }`}>
                        {demande.status === 'en cours' && '⏳ '}
                        {demande.status === 'acceptée' && '✅ '}
                        {demande.status === 'refusée' && '❌ '}
                        {demande.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => window.location.href = `/admin/demandes/${demande.id}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600/20 border border-orange-500/30 rounded-lg text-orange-300 hover:bg-orange-600/30 hover:border-orange-400 transition-all duration-200 text-sm font-medium"
                      >
                        👁️ Voir
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="5" className="py-16 text-center">
                      <div className="text-orange-400/60">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-white mb-2">Aucune demande trouvée</h3>
                        {searchTerm ? (
                          <p>Aucun résultat pour "{searchTerm}"</p>
                        ) : (
                          <p>Aucune demande de crédit soumise</p>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
