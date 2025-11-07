import { useState } from "react";
import { useParams } from "react-router-dom";

import { creerApplication } from "../services/applicationService";
import Bouton from "../components/Button";
import ChampSaisie from "../components/ChampSaisie";


export default function PageDemandeCredit(){
    const { simulationId} = useParams();

    const [form, setForm] = useState({
      nom: "",
      email: "",
      telephone: "",
      revenuMensuel: "",
      situationPro: "",
      commentaire: "",
    });

    const [message , setMessage] = useState("");

    function gererChange(e){
        const{name , value} = e.target;
        setForm(prev => ({...prev , [name]:value}));
    }

    async function soumettreDemande(e) {
        e.preventDefault();

        try {
            const applications = {
                ...form,
                simulationId : Number(simulationId),
                status: "en cours",
                notes: [],
                createdAt : new Date().toISOString()

            };

            await creerApplication(applications);
            setMessage("votre demande en voyer");
            setForm({
                 nom: "",
                email: "",
                telephone: "",
                revenuMensuel: "",
                situationPro: "",
                commentaire: ""
            });


        } catch (error) {
            setMessage("erreure")
            
        }
    }

     return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Demande de crédit</h2>

      <form onSubmit={soumettreDemande}>
        <ChampSaisie label="Nom complet" name="nom" value={form.nom} onChange={gererChange} />
        <ChampSaisie label="Email" name="email" value={form.email} onChange={gererChange} type="email" />
        <ChampSaisie label="Téléphone" name="telephone" value={form.telephone} onChange={gererChange} />
        <ChampSaisie label="Revenu mensuel (DH)" name="revenuMensuel" value={form.revenuMensuel} onChange={gererChange} type="number" />
        <ChampSaisie label="Situation professionnelle" name="situationPro" value={form.situationPro} onChange={gererChange} />
        <ChampSaisie label="Commentaire" name="commentaire" value={form.commentaire} onChange={gererChange} />

        <Bouton type="submit" label="Envoyer la demande" />
      </form>

      {message && <p className="mt-4 text-green-600 font-semibold">{message}</p>}
    </div>
  );
}