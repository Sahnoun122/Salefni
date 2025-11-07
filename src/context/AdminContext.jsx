import { createContext , useState , useEffect } from "react";

 export const AdminContext = createContext();

 export function AdminProvider ({children}){

    const [demandes , setDemandes] = useState([]);
    const [searchTerm , setSearchTerm]= useState("");
    const [filterStatus , setFilterStatus]= useState("");



const URL = "http://localhost:4000/applications";

const chargerDemandes = async ()=>{
    try {
        
        const res = await fetch(URL);
        const data = await res.json();
        setDemandes(data);
    } catch (error) {
        console.error("erreur");
    }
};


useEffect(()=>{
    chargerDemandes();
} , []);


const modifierStatus  = async (id, newStatus)=>{

    try {
        
        const res = await fetch(`${URL}/${id}`, {
            method : "PATCH",
            headers : {"Content-Type" : "application/json"},

            body : JSON.stringify({status : newStatus})
        });

        setDemandes((prev)=>
            prev.map((d)=>(d.id === id ? {...d, status: newStatus } : d))
        );
        
    } catch (error) {
        console.error(error);
    }
};


const ajouterNote = async (id, note)=>{

    try {
        
        const demande = demandes.find((d)=> d.id === id);
        const updatedNotes = [...demandes.note , note];
        await fetch (`${URL}/${id}` , {
            method : "PATCH", 
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({note : updatedNotes}),
        });
            
        setDemandes((prev)=> 
           prev.map((d)=> (d.id === d ? {...d, notes : updatedNotes} : d))
        );

    } catch (error) {
        console.error(error);
    }
};

  return (
    <AdminContext.Provider
      value={{
        demandes,
        searchTerm,
        setSearchTerm,
        filterStatus,
        setFilterStatus,
        modifierStatus,
        ajouterNote,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
 }