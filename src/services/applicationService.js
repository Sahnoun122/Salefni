const URL = "http://localhost:4000/applications";

export  async function creerApplication (application){
    const res = await fetch(URL , {
        method : "POST" ,
        headers: { "Content-Type" :"application/json" },
        body : JSON.stringify(application)
    });
    if(!res.ok) throw new Error("errore");
    return res.json();
};


export async function obtenirApplications(){
    const res = await fetch(URL);

    if(!res.ok) throw new Error("errore");

    return res.json();
};

export async function obtenirApplicationParId(id){
    const res = await fetch (`${URL}/${id}`);

    if(!res.ok) throw new Error("errore ");

    return res.json();
}