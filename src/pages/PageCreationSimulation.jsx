import { useState } from "react";

import ChampSaisie from "../components/ChampSaisie";
import Bouton from "../components/Button";
import { calculerCredit } from "../utils/calculateCredit";

import { useContexteSimulation } from "../context/SimulationContext";

export default function PageCreationSimulation(){
    const { ajouterSimulation } = useContexteSimulation();

    const [form, setForm] = useState({
      typeCredit: "",
      metier: "",
      montant: "",
      dureeMois: "",
      tauxAnnuel: "",
      fraisFixes: "",
      assurance: "",
    });

    const [resultat , setResultat] = useState(null);
    const [enCours , setCours]= useState(false);

    function gererChange(e){
        const {name , value }= e.target;
        setForm(prev=> ({ ...prev , [name]:value}))
    }

    function actionCalculer(){

        const res = calculerCredit(
          form.montant,
          form.dureeMois,
          form.tauxAnnuel,
          form.fraisFixes,
          form.assurance
        );
        setResultat(res);
    }

    async function actionEnregistrer(){
        if(!resultat){
            alert("calcule")
            return
        }

        setCours(true);

        try {
            
            const payload = {
              montant: Number(form.montant),
              dureeMois: Number(form.dureeMois),
              tauxAnnuel: Number(form.tauxAnnuel),
              fraisFixes: Number(form.fraisFixes),
              assurance: Number(form.fraisFixes),
              mensualite: resultat.mensualite,
              coutTotal: resultat.coutTotal,
              createdAt: new Date().toISOString(),
            };

            await ajouterSimulation(payload);
            alert("simulations cree avec suces ");

            setForm({
              typeCredit: "",
              metier: "",
              montant: "",
              dureeMois: "",
              tauxAnnuel: "",
              fraisFixes: "",
              assurance: "",
            });
            setResultat(null)
        } catch (e) {
            alert("bien" + e.message)
            
        }finally{
            setCours(false);
        }
    }

    return (
      <div className="max-w-xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">
          Créer une simulation de crédit
        </h2>

        <select
          name="typeCredit"
          value={form.typeCredit}
          onChange={gererChange}
          className="w-full mb-3 p-2 border rounded"
        >
          <option value="">-- Sélectionner le type de crédit --</option>
          <option>Auto</option>
          <option>Immobilier</option>
          <option>Consommation</option>
        </select>

        <ChampSaisie
          label="Métier"
          name="metier"
          value={form.metier}
          onChange={gererChange}
        />

        <ChampSaisie
          label="Montant (DH)"
          name="montant"
          value={form.montant}
          onChange={gererChange}
          type="number"
        />

        <ChampSaisie
          label="Durée (mois)"
          name="dureeMois"
          value={form.dureeMois}
          onChange={gererChange}
          type="number"
        />

        <ChampSaisie
          label="Taux annuel (%)"
          name="tauxAnnuel"
          value={form.tauxAnnuel}
          onChange={gererChange}
          type="number"
        />

        <ChampSaisie
          label="Frais fixes (DH)"
          name="fraisFixes"
          value={form.fraisFixes}
          onChange={gererChange}
          type="number"
        />

        <ChampSaisie
          label="Assurance (%)"
          name="assurance"
          value={form.assurance}
          onChange={gererChange}
          type="number"
        />

        <div className="flex gap-3 mt-3">
          <Bouton label="Calculer" onClick={actionCalculer} />
          <Bouton
            label="Enregistrer"
            onClick={actionEnregistrer}
            disabled={enCours}
          />
        </div>

        {resultat && (
          <div className="mt-4 p-3 bg-gray-50 rounded">
            <p>
              Mensualité : <strong>{resultat.mensualite} DH</strong>
            </p>
            <p>
              Coût total : <strong>{resultat.coutTotal} DH</strong>
            </p>
          </div>
        )}
      </div>
    );

}