import { Link } from "react-router-dom";

export default function CarteSimulation({sim , onSupprimer}){
    return (
      <div className="p-3 border rounded-md bg-white shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold">
              {sim.typeCredit} - {sim.metier}
            </h3>
            <p className="text-sm text-gray-600">
              Montant: {sim.montant} DH | Durée: {sim.dureeMois} mois
            </p>
            <p className="mt-1">
              Mensualité: <strong>{sim.mensualite}</strong> DH
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              to={`/selfni/simulation/${sim.id}`}
              className="text-sm px-3 py-1 border rounded"
            >
              Voir
            </Link>

            <button
              onClick={() => onSupprimer(sim.id)}
              className="text-sm px-3 py-1 border rounded text-red-600"
            > supprimer</button>
          </div>
        </div>
      </div>
    );
}