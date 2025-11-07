import jsPDF from "jspdf";

export function genererPDF(demande, simulation) {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Demande de Crédit", 20, 20);
  doc.setFontSize(12);

  doc.text(`Nom : ${demande.nom}`, 20, 40);
  doc.text(`Email : ${demande.email}`, 20, 50);
  doc.text(`Téléphone : ${demande.telephone}`, 20, 60);
  doc.text(`Revenu Mensuel : ${demande.revenuMensuel} DH`, 20, 70);
  doc.text(`Situation Professionnelle : ${demande.situationPro}`, 20, 80);
  doc.text(`Commentaire : ${demande.commentaire}`, 20, 90);

  doc.line(20, 100, 190, 100);

  doc.text(`Type de Crédit : ${simulation.typeCredit}`, 20, 110);
  doc.text(`Montant : ${simulation.montant} DH`, 20, 120);
  doc.text(`Durée : ${simulation.duree} mois`, 20, 130);
  doc.text(`Taux : ${simulation.taux}%`, 20, 140);
  doc.text(`Mensualité : ${simulation.mensualite} DH`, 20, 150);
  doc.text(`Coût total : ${simulation.coutTotal} DH`, 20, 160);

  doc.save("demande_credit.pdf");
}
