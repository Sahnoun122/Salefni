import { useContexteSimulation } from "../context/SimulationContext";
import CarteSimulation from "../components/CarteSimulation";


export default function PageSimulation(){
    const { simulations , chargement , erreur , supprimer } = useContexteSimulation();

    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">simulations</h1>

        {chargement && <p>chargement</p>}
        {erreur && <p className="text-red-600">erreur{erreur} </p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {simulations.length === 0 && 
            <p className="text-gray-600">il n'a pas aucune simulations</p>}

            {simulations.map(sim=>(
                <CarteSimulation key={sim.id} sim={sim} onSupprimer={supprimer} />
            ))}
        </div>
      </div>
    );
}