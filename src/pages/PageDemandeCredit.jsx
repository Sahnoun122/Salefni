import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { genererPDF } from "../services/pdfService";
import { creerApplication } from "../services/applicationService";
import Bouton from "../components/Button";
import ChampSaisie from "../components/ChampSaisie";

export default function PageDemandeCredit() {
  const { simulationId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nom: "",
    email: "",
    telephone: "",
    revenuMensuel: "",
    situationPro: "",
    commentaire: "",
  });

  const [message, setMessage] = useState("");
  const [enCours, setEnCours] = useState(false);

  function gererChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function soumettreDemande(e) {
    e.preventDefault();
    setEnCours(true);

    try {
      const nouvelleApplication = {
        ...form,
        simulationId: Number(simulationId),
        status: "en cours",
        notes: [],
        createdAt: new Date().toISOString(),
      };

      await creerApplication(nouvelleApplication);
      setMessage("Votre demande a bien été envoyée !");
      setForm({
        nom: "",
        email: "",
        telephone: "",
        revenuMensuel: "",
        situationPro: "",
        commentaire: "",
      });
    } catch (error) {
      setMessage("Erreur lors de l'envoi de la demande.");
    } finally {
      setEnCours(false);
    }
  }

  function telechargerPdf() {
    const demande = { ...form };
    const simulation = {
      typeCredit: "Auto",
      montant: 100000,
      duree: 36,
      taux: 4.5,
      mensualite: 3400,
      coutTotal: 122400,
    };

    genererPDF(demande, simulation);
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="w-12 h-12 bg-orange-600 hover:bg-orange-700 rounded-xl flex items-center justify-center text-white font-bold transition-all duration-300 shadow-lg"
            >
              ←
            </button>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white">Demande de crédit</h1>
              <p className="text-orange-300 text-lg">Simulation #{simulationId} • Finaliser votre demande</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 px-6 py-3 bg-green-600/20 border border-green-500/40 rounded-xl">
            <span className="text-2xl">📄</span>
            <span className="font-bold text-green-400 text-lg">Nouvelle demande</span>
          </div>
        </div>

        {message && (
          <div className={`p-6 rounded-xl border ${message.includes('Erreur') 
            ? 'bg-red-900/20 border-red-500/40 text-red-300' 
            : 'bg-green-900/20 border-green-500/40 text-green-300'
          }`}>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{message.includes('Erreur') ? '❌' : '✅'}</span>
              <span className="font-semibold text-lg">{message}</span>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-black/40 border border-orange-500/30 rounded-xl p-8 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-4">
                <span className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white text-lg shadow-md">👤</span>
                Informations personnelles
              </h2>

              <form onSubmit={soumettreDemande} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <ChampSaisie
                    label="Nom complet"
                    name="nom"
                    value={form.nom}
                    onChange={gererChange}
                    required
                    placeholder="Ex: Ahmed Ben Ali"
                  />
                  <ChampSaisie
                    label="Email"
                    name="email"
                    value={form.email}
                    onChange={gererChange}
                    type="email"
                    required
                    placeholder="ahmed@example.com"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <ChampSaisie
                    label="Téléphone"
                    name="telephone"
                    value={form.telephone}
                    onChange={gererChange}
                    required
                    placeholder="06 12 34 56 78"
                  />
                  <ChampSaisie
                    label="Revenu mensuel (DH)"
                    name="revenuMensuel"
                    value={form.revenuMensuel}
                    onChange={gererChange}
                    type="number"
                    required
                    placeholder="15000"
                  />
                </div>

                <ChampSaisie
                  label="Situation professionnelle"
                  name="situationPro"
                  value={form.situationPro}
                  onChange={gererChange}
                  required
                  placeholder="Ex: Ingénieur en CDI, Médecin libéral..."
                />

                <div>
                  <label className="block text-orange-200 font-semibold mb-3 text-lg">
                    Commentaire (optionnel)
                  </label>
                  <textarea
                    name="commentaire"
                    value={form.commentaire}
                    onChange={gererChange}
                    placeholder="Informations complémentaires sur votre demande..."
                    className="w-full px-6 py-4 bg-black/50 border border-orange-500/30 rounded-xl text-white text-lg placeholder-orange-300/50 focus:outline-none focus:border-orange-400 transition-all duration-300 min-h-[120px]"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Bouton 
                    type="submit" 
                    label={enCours ? "⏳ Envoi en cours..." : "📤 Envoyer la demande"}
                    disabled={enCours}
                    className="flex-1 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-orange-600/20 text-lg"
                  />
                </div>
              </form>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-black/40 border border-orange-500/30 rounded-xl p-8 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white text-sm shadow-md">📋</span>
                Documents
              </h3>

              <div className="space-y-4">
                <button
                  onClick={telechargerPdf}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg flex items-center gap-3"
                >
                  <span>📄</span> Télécharger le PDF
                </button>
                <div className="text-sm text-orange-300/70">
                  Générez un PDF de votre demande pour vos records personnels
                </div>
              </div>
            </div>

            <div className="bg-black/40 border border-orange-500/30 rounded-xl p-8 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white text-sm shadow-md">ℹ️</span>
                À savoir
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-green-400">✓</span>
                  <span className="text-orange-300">Traitement dans les 24h</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400">✓</span>
                  <span className="text-orange-300">Réponse par email et SMS</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400">✓</span>
                  <span className="text-orange-300">Documents requis envoyés après</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-orange-400">ℹ️</span>
                  <span className="text-orange-300">Aucun frais de dossier avant accord</span>
                </div>
              </div>
            </div>

            <div className="bg-black/40 border border-orange-500/30 rounded-xl p-8 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white text-sm shadow-md">💬</span>
                Besoin d'aide ?
              </h3>

              <div className="space-y-4">
                <div className="text-sm text-orange-300">
                  Notre équipe est disponible pour vous accompagner dans votre demande.
                </div>
                <div className="space-y-2 text-sm">
                  <div className="text-orange-400 font-semibold">📞 Support téléphone</div>
                  <div className="text-orange-300">05 22 XX XX XX</div>
                  <div className="text-orange-400 font-semibold">📧 Support email</div>
                  <div className="text-orange-300">support@salefni.ma</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
