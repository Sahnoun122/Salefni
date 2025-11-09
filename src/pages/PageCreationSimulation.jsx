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
            alert("Veuillez calculer d'abord")
            return
        }

        setCours(true);

        try {
            const payload = {
              montant: Number(form.montant),
              dureeMois: Number(form.dureeMois),
              tauxAnnuel: Number(form.tauxAnnuel),
              fraisFixes: Number(form.fraisFixes),
              assurance: Number(form.assurance),
              mensualite: resultat.mensualite,
              coutTotal: resultat.coutTotal,
              createdAt: new Date().toISOString(),
            };

            await ajouterSimulation(payload);
            alert("Simulation créée avec succès!");

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
            alert("Erreur: " + e.message)
        }finally{
            setCours(false);
        }
    }

    return (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <div className="inline-flex w-16 h-16 bg-orange-600 rounded-2xl items-center justify-center mb-6 shadow-lg shadow-orange-600/20">
            <span className="text-3xl">🧮</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Simulateur de Crédit
          </h2>
          <p className="text-orange-300 text-lg max-w-3xl mx-auto leading-relaxed">
            Calculez votre capacité d'emprunt et obtenez une estimation précise de vos mensualités
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-black/40 border border-orange-500/30 rounded-xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-4">
              <span className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white text-lg shadow-md">📋</span>
              Informations du crédit
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-orange-200 font-semibold mb-3 text-lg">Type de crédit</label>
                <select
                  name="typeCredit"
                  value={form.typeCredit}
                  onChange={gererChange}
                  className="w-full px-4 py-4 bg-black/50 border border-orange-500/30 rounded-xl text-white text-lg focus:outline-none focus:border-orange-400 transition-all duration-300"
                >
                  <option value="" className="bg-black text-white">-- Sélectionner le type de crédit --</option>
                  <option value="Auto" className="bg-black text-white">🚗 Crédit Auto</option>
                  <option value="Immobilier" className="bg-black text-white">🏠 Crédit Immobilier</option>
                  <option value="Consommation" className="bg-black text-white">💳 Crédit Consommation</option>
                </select>
              </div>

              <ChampSaisie
                label="Métier"
                name="metier"
                value={form.metier}
                onChange={gererChange}
                placeholder="Ex: Ingénieur, Médecin, Enseignant..."
              />

              <div className="grid sm:grid-cols-2 gap-6">
                <ChampSaisie
                  label="Montant (DH)"
                  name="montant"
                  value={form.montant}
                  onChange={gererChange}
                  type="number"
                  placeholder="50000"
                />

                <ChampSaisie
                  label="Durée (mois)"
                  name="dureeMois"
                  value={form.dureeMois}
                  onChange={gererChange}
                  type="number"
                  placeholder="12"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <ChampSaisie
                  label="Taux annuel (%)"
                  name="tauxAnnuel"
                  value={form.tauxAnnuel}
                  onChange={gererChange}
                  type="number"
                  step="0.01"
                  placeholder="5.5"
                />

                <ChampSaisie
                  label="Frais fixes (DH)"
                  name="fraisFixes"
                  value={form.fraisFixes}
                  onChange={gererChange}
                  type="number"
                  placeholder="1000"
                />
              </div>

              <ChampSaisie
                label="Assurance (%)"
                name="assurance"
                value={form.assurance}
                onChange={gererChange}
                type="number"
                step="0.01"
                placeholder="0.5"
              />

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Bouton 
                  label="🧮 Calculer" 
                  onClick={actionCalculer}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-orange-600/20 text-lg"
                />
                <Bouton
                  label={enCours ? "⏳ Enregistrement..." : "💾 Enregistrer"}
                  onClick={actionEnregistrer}
                  disabled={enCours || !resultat}
                  className="flex-1 bg-black hover:bg-gray-800 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 border border-orange-500/30 text-lg"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {resultat ? (
              <div className="bg-black/40 border border-orange-500/30 rounded-xl p-8 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-4">
                  <span className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-white text-lg shadow-md">✅</span>
                  Résultats de simulation
                </h3>

                <div className="text-center mb-8 p-8 bg-orange-600/20 border border-orange-500/40 rounded-xl">
                  <p className="text-orange-300 text-lg mb-3 font-semibold">Mensualité</p>
                  <p className="text-5xl font-bold text-white mb-2">
                    {resultat.mensualite?.toLocaleString('fr-FR')}
                  </p>
                  <span className="text-xl text-orange-400 font-semibold">DH/mois</span>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-4 px-6 bg-black/30 rounded-xl border border-orange-500/20">
                    <span className="text-orange-300 font-semibold">💰 Coût total</span>
                    <span className="font-bold text-white text-lg">
                      {resultat.coutTotal?.toLocaleString('fr-FR')} DH
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-4 px-6 bg-black/30 rounded-xl border border-orange-500/20">
                    <span className="text-orange-300 font-semibold">💵 Montant emprunté</span>
                    <span className="font-bold text-white text-lg">
                      {Number(form.montant)?.toLocaleString('fr-FR')} DH
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-4 px-6 bg-black/30 rounded-xl border border-orange-500/20">
                    <span className="text-orange-300 font-semibold">📈 Coût du crédit</span>
                    <span className="font-bold text-orange-400 text-lg">
                      +{(resultat.coutTotal - Number(form.montant))?.toLocaleString('fr-FR')} DH
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-black/40 border border-orange-500/30 rounded-xl p-12 backdrop-blur-sm text-center">
                <div className="text-6xl mb-6">📊</div>
                <h3 className="font-bold text-white text-xl mb-4">En attente de calcul</h3>
                <p className="text-orange-300 text-lg leading-relaxed">
                  Remplissez le formulaire et cliquez sur "Calculer" pour voir vos résultats
                </p>
              </div>
            )}

            <div className="bg-black/40 border border-orange-500/30 rounded-xl p-8 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <span className="text-4xl">💡</span>
                <div>
                  <h4 className="font-bold text-white text-lg mb-3">Information importante</h4>
                  <p className="text-orange-300 leading-relaxed">
                    Cette simulation est fournie à titre indicatif. Les conditions réelles peuvent varier selon votre profil et l'établissement financier.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}