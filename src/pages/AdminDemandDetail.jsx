import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";

export default function AdminDemandDetail() {
  const { id } = useParams();
  const { demandes, modifierStatus, ajouterNote } = useContext(AdminContext);
  const demande = demandes.find((d) => d.id === Number(id));
  const [noteText, setNoteText] = useState("");

  if (!demande) return <p>Demande introuvable</p>;

  const handleAddNote = async () => {
    const note = {
      id: demande.notes.length + 1,
      content: noteText,
      date: new Date().toISOString(),
    };
    await ajouterNote(demande.id, note);
    setNoteText("");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Détails de la demande</h2>

      <div className="mb-4">
        <p>
          <strong>Nom:</strong> {demande.nom}
        </p>
        <p>
          <strong>Email:</strong> {demande.email}
        </p>
        <p>
          <strong>Téléphone:</strong> {demande.telephone}
        </p>
        <p>
          <strong>Revenu:</strong> {demande.revenuMensuel} DH
        </p>
      </div>

      <div className="mb-4">
        <label className="mr-2">Changer statut:</label>
        <select
          value={demande.status}
          onChange={async (e) =>
            await modifierStatus(demande.id, e.target.value)
          }
        >
          <option value="en cours">En cours</option>
          <option value="acceptée">Acceptée</option>
          <option value="refusée">Refusée</option>
        </select>
      </div>

      <div className="mb-4">
        <label>Ajouter note:</label>
        <textarea
          className="border w-full p-2"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        />
        <button
          onClick={handleAddNote}
          className="bg-blue-600 text-white px-4 py-2 mt-2 rounded"
        >
          Ajouter
        </button>
      </div>

      <div>
        <h3 className="font-bold mb-2">Notes:</h3>
        {demande.notes.map((note) => (
          <p key={note.id}>
            - {note.content} ({new Date(note.date).toLocaleDateString()})
          </p>
        ))}
      </div>
    </div>
  );
}
