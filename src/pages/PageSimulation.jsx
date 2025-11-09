import { useContexteSimulation } from "../context/SimulationContext";
import CarteSimulation from "../components/CarteSimulation";

export default function PageSimulation(){
    const { simulations , chargement , erreur , supprimer } = useContexteSimulation();

    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-7xl mx-auto p-6 space-y-8">
          <div className="text-center mb-8">
            <div className="inline-flex w-16 h-16 bg-orange-600 rounded-2xl items-center justify-center mb-6 shadow-lg shadow-orange-600/20">
              <span className="text-3xl">📊</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Mes Simulations
            </h1>
            <p className="text-orange-300 text-lg max-w-3xl mx-auto leading-relaxed">
              Consultez et gérez toutes vos simulations de crédit enregistrées
            </p>
          </div>

          {chargement && (
            <div className="text-center py-20">
              <div className="inline-flex w-16 h-16 bg-orange-600/20 border border-orange-500/30 rounded-2xl items-center justify-center mb-6 animate-pulse">
                <span className="text-3xl">⏳</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Chargement en cours...</h3>
              <p className="text-orange-300">Récupération de vos simulations</p>
            </div>
          )}

          {erreur && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-red-900/20 border border-red-500/40 rounded-xl p-8 backdrop-blur-sm text-center">
                <div className="text-6xl mb-6">❌</div>
                <h3 className="text-2xl font-bold text-red-400 mb-4">Erreur de chargement</h3>
                <p className="text-red-300 text-lg">
                  Une erreur est survenue : {erreur}
                </p>
              </div>
            </div>
          )}

          {!chargement && !erreur && (
            <>
              {simulations.length === 0 ? (
                <div className="text-center py-20">
                  <div className="inline-flex w-20 h-20 bg-orange-600/20 border border-orange-500/30 rounded-2xl items-center justify-center mb-8">
                    <span className="text-4xl">📭</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-6">Aucune simulation</h3>
                  <p className="text-orange-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                    Vous n'avez pas encore créé de simulation. Commencez par calculer votre premier crédit !
                  </p>
                  <a
                    href="/new"
                    className="inline-flex items-center gap-3 bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-orange-600/20"
                  >
                    <span>➕</span>
                    Créer ma première simulation
                  </a>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {simulations.length}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">
                          {simulations.length} simulation{simulations.length > 1 ? 's' : ''}
                        </h2>
                        <p className="text-orange-300">Gérez vos calculs de crédit</p>
                      </div>
                    </div>
                    
                    <a
                      href="/new"
                      className="inline-flex items-center gap-3 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-orange-600/20"
                    >
                      <span>➕</span>
                      Nouvelle simulation
                    </a>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {simulations.map(sim => (
                      <CarteSimulation key={sim.id} sim={sim} onSupprimer={supprimer} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
}