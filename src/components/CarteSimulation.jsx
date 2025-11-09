import { Link } from "react-router-dom";

export default function CarteSimulation({ sim, onSupprimer }) {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'Auto': return '🚗';
      case 'Immobilier': return '🏠';
      case 'Consommation': return '💳';
      default: return '💰';
    }
  };

  const getMetierIcon = (metier) => {
    switch (metier?.toLowerCase()) {
      case 'médecin': return '👨‍⚕️';
      case 'ingénieur': return '👨‍💼';
      case 'étudiant': return '👨‍🎓';
      default: return '👤';
    }
  };

  return (
    <div className="group bg-black/40 border border-orange-500/30 rounded-xl p-6 backdrop-blur-sm hover:bg-black/50 hover:border-orange-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-600/10">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-orange-600/20 border border-orange-500/30 rounded-xl flex items-center justify-center group-hover:bg-orange-600/30 transition-all duration-300">
            <span className="text-2xl">{getTypeIcon(sim.type)}</span>
          </div>
          <div>
            <h3 className="font-bold text-white text-lg mb-1 group-hover:text-orange-100 transition-colors duration-300">
              {sim.type}
            </h3>
            <p className="text-orange-300 text-sm flex items-center gap-2">
              <span>{getMetierIcon(sim.metier)}</span>
              {sim.metier}
            </p>
          </div>
        </div>
        
        <div className="bg-orange-600/20 border border-orange-500/40 rounded-lg px-3 py-1">
          <span className="text-orange-400 text-xs font-semibold">
            {sim.duree} mois
          </span>
        </div>
      </div>

=      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center py-3 px-4 bg-black/30 rounded-xl border border-orange-500/20">
          <span className="text-orange-300 font-medium flex items-center gap-2">
            <span>💰</span> Montant
          </span>
          <span className="font-bold text-white text-lg">
            {Number(sim.montant)?.toLocaleString('fr-FR')} DH
          </span>
        </div>

        <div className="bg-orange-600/20 border border-orange-500/40 rounded-xl p-4 text-center">
          <p className="text-orange-300 text-sm font-semibold mb-2">Mensualité</p>
          <p className="text-3xl font-black text-white group-hover:text-orange-100 transition-colors duration-300">
            {Number(sim.mensualite)?.toLocaleString('fr-FR')}
          </p>
          <span className="text-orange-400 text-sm font-bold">DH/mois</span>
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          to={`/simulation/${sim.id}`}
          className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 text-center shadow-lg hover:shadow-orange-600/20 flex items-center justify-center gap-2"
        >
          <span>👁️</span>
          Voir
        </Link>
        <button
          onClick={() => onSupprimer(sim.id)}
          className="bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 hover:border-red-400/60 text-red-400 hover:text-red-300 font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
          title="Supprimer cette simulation"
        >
          <span>🗑️</span>
          Suppr
        </button>
      </div>

      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="border-t border-orange-500/20 pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-orange-300/70">Coût total:</span>
            <span className="text-orange-400 font-semibold">
              {sim.coutTotal ? Number(sim.coutTotal)?.toLocaleString('fr-FR') : 'N/A'} DH
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
