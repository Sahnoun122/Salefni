import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";

export default function AdminDemandDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { demandes, modifierStatus, ajouterNote } = useContext(AdminContext);
  const demande = demandes.find((d) => d.id === Number(id));
  const [noteText, setNoteText] = useState("");

  if (!demande) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-2xl mx-auto text-center py-20">
          <div className="text-6xl mb-6">❌</div>
          <h2 className="text-3xl font-bold text-orange-400 mb-4">Demande introuvable</h2>
          <p className="text-orange-200 mb-8">La demande que vous recherchez n'existe pas.</p>
          <button 
            onClick={() => navigate('/admin')}
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
          >
            ← Retour au dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleAddNote = async () => {
    if (!noteText.trim()) return;
    
    const note = {
      id: demande.notes.length + 1,
      content: noteText,
      date: new Date().toISOString(),
    };
    await ajouterNote(demande.id, note);
    setNoteText("");
  };

  const getStatusEmoji = (status) => {
    switch (status) {
      case 'acceptée': return '✅';
      case 'refusée': return '❌';
      default: return '⏳';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'acceptée': return 'text-green-400 bg-green-900/30 border-green-500/40';
      case 'refusée': return 'text-red-400 bg-red-900/30 border-red-500/40';
      default: return 'text-orange-400 bg-orange-900/30 border-orange-500/40';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/admin')}
              className="w-12 h-12 bg-orange-600 hover:bg-orange-700 rounded-xl flex items-center justify-center text-white font-bold transition-all duration-300 shadow-lg"
            >
              ←
            </button>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white">Détails de la demande</h1>
              <p className="text-orange-300 text-lg">ID: #{demande.id} • {demande.nom}</p>
            </div>
          </div>
          
          <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl border ${getStatusColor(demande.status)}`}>
            <span className="text-2xl">{getStatusEmoji(demande.status)}</span>
            <span className="font-bold text-lg capitalize">{demande.status}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            
            <div className="bg-black/40 border border-orange-500/30 rounded-xl p-8 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-4">
                <span className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white text-lg shadow-md">👤</span>
                Informations du client
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="flex justify-between items-center py-4 px-6 bg-black/30 rounded-xl border border-orange-500/20">
                    <span className="text-orange-300 font-semibold flex items-center gap-2">
                      <span>📝</span> Nom complet
                    </span>
                    <span className="font-bold text-white text-lg">{demande.nom}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-4 px-6 bg-black/30 rounded-xl border border-orange-500/20">
                    <span className="text-orange-300 font-semibold flex items-center gap-2">
                      <span>📧</span> Email
                    </span>
                    <span className="font-bold text-white text-lg break-all">{demande.email}</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex justify-between items-center py-4 px-6 bg-black/30 rounded-xl border border-orange-500/20">
                    <span className="text-orange-300 font-semibold flex items-center gap-2">
                      <span>📱</span> Téléphone
                    </span>
                    <span className="font-bold text-white text-lg">{demande.telephone}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-4 px-6 bg-black/30 rounded-xl border border-orange-500/20">
                    <span className="text-orange-300 font-semibold flex items-center gap-2">
                      <span>💰</span> Revenu mensuel
                    </span>
                    <span className="font-bold text-orange-400 text-lg">{demande.revenuMensuel?.toLocaleString('fr-FR')} DH</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black/40 border border-orange-500/30 rounded-xl p-8 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-4">
                <span className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white text-lg shadow-md">📝</span>
                Notes et historique
              </h2>

              <div className="space-y-4 mb-8">
                {demande.notes && demande.notes.length > 0 ? (
                  demande.notes.map((note) => (
                    <div key={note.id} className="bg-black/30 rounded-xl p-6 border border-orange-500/20">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-orange-400 font-semibold text-sm">
                          📅 {new Date(note.date).toLocaleDateString('fr-FR', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <p className="text-white text-lg leading-relaxed">{note.content}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-orange-300">
                    <div className="text-4xl mb-4">📭</div>
                    <p className="text-lg">Aucune note ajoutée pour cette demande</p>
                  </div>
                )}
              </div>

              <div className="border-t border-orange-500/20 pt-8">
                <label className="block text-orange-200 font-bold mb-4 text-lg">
                  ✍️ Ajouter une nouvelle note
                </label>
                <textarea
                  className="w-full px-6 py-4 bg-black/50 border border-orange-500/30 rounded-xl text-white text-lg placeholder-orange-300/50 focus:outline-none focus:border-orange-400 transition-all duration-300 min-h-[120px]"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Tapez votre note ici..."
                />
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleAddNote}
                    disabled={!noteText.trim()}
                    className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-orange-600/20"
                  >
                    💾 Ajouter la note
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            
            <div className="bg-black/40 border border-orange-500/30 rounded-xl p-8 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white text-sm shadow-md">⚙️</span>
                Gestion du statut
              </h3>

              <div className="space-y-4">
                <label className="block text-orange-200 font-semibold mb-3">
                  Modifier le statut :
                </label>
                <select
                  value={demande.status}
                  onChange={async (e) => await modifierStatus(demande.id, e.target.value)}
                  className="w-full px-4 py-4 bg-black/50 border border-orange-500/30 rounded-xl text-white text-lg focus:outline-none focus:border-orange-400 transition-all duration-300"
                >
                  <option value="en cours" className="bg-black text-white">⏳ En cours</option>
                  <option value="acceptée" className="bg-black text-white">✅ Acceptée</option>
                  <option value="refusée" className="bg-black text-white">❌ Refusée</option>
                </select>
              </div>
            </div>

            <div className="bg-black/40 border border-orange-500/30 rounded-xl p-8 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white text-sm shadow-md">⚡</span>
                Actions rapides
              </h3>

              <div className="space-y-4">
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg flex items-center gap-3">
                  <span>📞</span> Appeler le client
                </button>
                <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg flex items-center gap-3">
                  <span>📧</span> Envoyer un email
                </button>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg flex items-center gap-3">
                  <span>📄</span> Générer rapport
                </button>
              </div>
            </div>

            <div className="bg-black/40 border border-orange-500/30 rounded-xl p-8 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white text-sm shadow-md">ℹ️</span>
                Informations système
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-orange-300">ID demande:</span>
                  <span className="text-white font-semibold">#{demande.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-300">Date création:</span>
                  <span className="text-white font-semibold">
                    {new Date(demande.dateCreation || Date.now()).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-300">Notes:</span>
                  <span className="text-white font-semibold">
                    {demande.notes?.length || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
