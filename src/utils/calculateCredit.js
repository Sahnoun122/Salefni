export function calculerCredit(montant , duree , tauxAnnuel , fraisTotaux =0 , assurancePercent = 0 ){

    const p = Number(montant);
    const n = Number(duree);
    const r = Number(tauxAnnuel)/12/100;

    if(!p || !n){
        return null;
    }


    let mensualiteBase;

    if(r===0){
        mensualiteBase = p/n;
    }else{
        mensualiteBase = (p*r)/(1-Math.pow(1+r , -n));
    }

  const fraisMensuels = Number(fraisTotaux)/n;

  const assuranceMensuelle = (p*(Number(assurancePercent)/100))/12;

  const mensualiteTotale = mensualiteBase + fraisMensuels + assuranceMensuelle;
  const coutTotal  = mensualiteTotale *n;


  const tableau = [];

  let restant = p;

  for(let i = 1 ; i<= n ; i++){
    const interet = restant * r;
    
    const principal = mensualiteBase - interet;
    restant = Math.max(0 , restant - principal);
     tableau.push({
        mois: i,
        interet: Number(interet.toFixed(2)),
        principal: Number(principal.toFixed(2)),
        restant : Number(restant.toFixed(2))
     });

  }

  return{
    mensualite: Number(interet.toFixed(2)),
    coutTotal : Number(coutTotal.toFixed(2)),
    tableau
  }

}