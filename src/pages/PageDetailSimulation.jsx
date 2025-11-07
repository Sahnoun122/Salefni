import { useState , useEffect } from "react";

import { useParams, Link } from "react-router-dom";
import { obtenirSimulationParId } from "../services/simulationService";




export default function PageDetailSimulation(){
    const {id} = useParams();

    const [sim , setSim ] = useState(null);
    const [chargement , setChargement] = useState(true);


    useEffect(()=>{
        
async function charger (){
        try {
            const data = await obtenirSimulationParId(id);
            setSim(data);
        } catch (error) {
            console.error(error)
        }finally{
            setChargement(false)
        }
        }

        charger();
    }, [id]);

    if(chargement) return <div className="p-4">chargement</div>;
    if(!sim) return <div className="p-4">il n'a pas aucune simulations</div>;


    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-3">Détails de la simulation</h2>
        <ul className="space-y-2">
          <li>
            <strong>Type :</strong> {sim.type}
          </li>
          <li>
            <strong>Métier :</strong> {sim.metier}
          </li>
          <li>
            <strong>Montant :</strong> {sim.montant} DH
          </li>
          <li>
            <strong>Durée :</strong> {sim.duree} mois
          </li>
          <li>
            <strong>Mensualité :</strong> {sim.mensualite} DH
          </li>
          <li>
            <strong>Coût total :</strong> {sim.coutTotal} DH
          </li>
        </ul>
        <div className="mt-4">
          <Link to="/new" className="text-blue-600">
            Créer une nouvelle simulation
          </Link>
        </div>
        <div className="mt-4 flex gap-3">
          <Link
            to={`/demande/${sim.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Faire une demande
          </Link>
        </div>
      </div>
    );
}