import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";

export default function TableRow({ demande }) {
  return (
    <tr className="border">
      <td className="border p-2">{demande.nom}</td>
      <td className="border p-2">{demande.email}</td>
      <td className="border p-2">{demande.montant}</td>
      <td className="border p-2">
        <StatusBadge status={demande.status} />
      </td>
      <td className="border p-2">
        <Link
          to={`/admin/demandes/${demande.id}`}
          className="text-orange-400 hover:text-orange-300 font-semibold transition-colors duration-200"
        >
          Voir Détails
        </Link>
      </td>
    </tr>
  );
}
