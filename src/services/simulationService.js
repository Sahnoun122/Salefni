const URL = "http://localhost:4000/simulation";


export async function obtenirSimulations(){
    const res = await fetch(URL);

    if(!res.ok)
        throw new Error("erreur lecture de simulations")
    return res.json()
}

export async function obtenirSimulationParId(id){
    const res = await fetch(`${URL}/${id}`);
    if(!res.ok)
        throw new Error("simulations non trouvee ")


    return res.json();
}

export async function creerSimulation(simulation) {

    const res = await fetch(URL,{
        method: "POST",
        headers : {"Content-Type" :"application/json"},
        body : JSON.stringify(simulation)
    });

    if(!res.ok)
        throw new Error("erreur de la creations")

    return res.json()
}

export async function modifierSimulation(id , donnes){

    const res = await fetch (`${URL}/${id}`,{
        method : "PATCH",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(donnes)
    });
  if(!res.ok)
    throw new Error ("errore lors de la modifications")
     return res.json()
}

export async function supprimerSimulation(id) {
    const res = await fetch(`${URL}/${id}`,{
        method : "delete"
    })

    if(!res.ok)
        throw new Error("erreur lors de la supprission")
      return res.json()
}