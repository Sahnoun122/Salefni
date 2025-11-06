import React , { createContext , use, useContext , useEffect , useState } from "react";

import * as service from "../services/simulationService";

const ContexteSimulation  = createContext();

export function useContexteSimulation(){
    return useContext(ContexteSimulation);
}

export function FournisseurSimulation ({children}){

    const [simulations , setSimulations]= useState([]);
    const [chargement , setChargement]= useState(false);
    const [erreur , setErreur]= useState(null);

    async function chargerSimulations (){
        setChargement(true);

        try {
            
            const data = await service.obtenirSimulations();

            setSimulations(Array.isArray(data) ? data.reverse() : []);
        } catch (e) {
            setErreur(e.message)
        }finally{
            setChargement(false)
        }
    }

    async function ajouterSimulation(sim){

        setChargement(true);

        try {
            const cree = await service.creerSimulation(sim);
            setSimulations(prev=> [prev , ...cree]);
            return cree
            
        } catch (e) {
            setErreur(e.message)
            throw e;
        }finally{
            setChargement(false)
        }
    }

    async function supprimer(id) {

        setChargement(true);

        try {
            
            await service.supprimerSimulation(id);

            setSimulations(prev => prev.filter(s=> s.id !== id))
        } catch (e) {
            setErreur(e.message)
        }finally{

            setChargement(false);
        }
    }

    useEffect(()=>{
        chargerSimulations();
    }, []);

     return(

        <ContexteSimulation.Provider value = {{
           simulations , chargement , erreur , chargerSimulations , ajouterSimulation ,supprimer
        }}>

{children}
        </ContexteSimulation.Provider>
     )
}