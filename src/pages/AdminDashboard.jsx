import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import TableRow from "../components/TableRow";
import SearchInput from "../components/SearchInput";

export default function AdminDashboard() {
  const { demandes, searchTerm, setSearchTerm, filterStatus, setFilterStatus } =
    useContext(AdminContext);

 const filteredDemandes = demandes.filter((d) => {
   const nom = d.nom || ""; 
   const email = d.email || ""; 
   const matchesSearch =
     nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
     email.toLowerCase().includes(searchTerm.toLowerCase());

   const matchesStatus = filterStatus ? d.status === filterStatus : true;

   return matchesSearch && matchesStatus;
 });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard Admin</h2>

      <div className="flex gap-4 mb-4">
        <SearchInput
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border px-2 py-1"
        >
          <option value="">Tous les statuts</option>
          <option value="en cours">En cours</option>
          <option value="acceptée">Acceptée</option>
          <option value="refusée">Refusée</option>
        </select>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Nom</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Montant</th>
            <th className="border p-2">Statut</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDemandes.map((d) => (
            <TableRow key={d.id} demande={d} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
