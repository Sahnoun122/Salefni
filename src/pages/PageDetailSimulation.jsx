import { useState , useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { obtenirSimulationParId } from "../services/simulationService";

export default function PageDetailSimulation(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [sim , setSim ] = useState(null);
    const [chargement , setChargement] = useState(true);

    useEffect(()=>{
        async function charger (){
            try {
                const data = await obtenirSimulationParId(id);
                setSim(data);
            } catch (error) {
                console.error(error)
            }finally{
                setChargement(false)
            }
        }
        charger();
    }, [id]);

    const getTypeIcon = (type) => {
        switch (type) {
            case 'Auto': return '🚗';
            case 'Immobilier': return '🏠';
            case 'Consommation': return '💳';
            default: return '💰';
        }
    };

    if(chargement) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-flex w-16 h-16 bg-orange-600/20 border border-orange-500/30 rounded-2xl items-center justify-center mb-6 animate-pulse">
                        <span className="text-3xl">⏳</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Chargement...</h3>
                    <p className="text-orange-300">Récupération des détails</p>
                </div>
            </div>
        );
    }

    if(!sim) {
        return (
            <div className="min-h-screen bg-black text-white p-6">
                <div className="max-w-2xl mx-auto text-center py-20">
                    <div className="text-6xl mb-6">❌</div>
                    <h2 className="text-3xl font-bold text-orange-400 mb-4">Simulation introuvable</h2>
                    <p className="text-orange-200 mb-8 text-lg">La simulation que vous recherchez n'existe pas.</p>
                    <button 
                        onClick={() => navigate('/simulations')}
                        className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
                    >
                        ← Retour aux simulations
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="max-w-4xl mx-auto p-6 space-y-8">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => navigate('/simulations')}
                            className="w-12 h-12 bg-orange-600 hover:bg-orange-700 rounded-xl flex items-center justify-center text-white font-bold transition-all duration-300 shadow-lg"
                        >
                            ←
                        </button>
                        <div>
                            <h1 className="text-3xl lg:text-4xl font-bold text-white">Détails de la simulation</h1>
                            <p className="text-orange-300 text-lg">ID: #{sim.id} • {sim.type}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3 px-6 py-3 bg-orange-600/20 border border-orange-500/40 rounded-xl">
                        <span className="text-3xl">{getTypeIcon(sim.type)}</span>
                        <span className="font-bold text-orange-400 text-lg">{sim.type}</span>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-black/40 border border-orange-500/30 rounded-xl p-8 backdrop-blur-sm">
                            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-4">
                                <span className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white text-lg shadow-md">📋</span>
                                Informations du crédit
                            </h2>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center py-4 px-6 bg-black/30 rounded-xl border border-orange-500/20">
                                        <span className="text-orange-300 font-semibold flex items-center gap-2">
                                            <span>{getTypeIcon(sim.type)}</span> Type
                                        </span>
                                        <span className="font-bold text-white text-lg">{sim.type}</span>
                                    </div>
                                    
                                    <div className="flex justify-between items-center py-4 px-6 bg-black/30 rounded-xl border border-orange-500/20">
                                        <span className="text-orange-300 font-semibold flex items-center gap-2">
                                            <span>👤</span> Métier
                                        </span>
                                        <span className="font-bold text-white text-lg">{sim.metier}</span>
                                    </div>
                                </div>
                                
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center py-4 px-6 bg-black/30 rounded-xl border border-orange-500/20">
                                        <span className="text-orange-300 font-semibold flex items-center gap-2">
                                            <span>💰</span> Montant
                                        </span>
                                        <span className="font-bold text-white text-lg">{Number(sim.montant)?.toLocaleString('fr-FR')} DH</span>
                                    </div>
                                    
                                    <div className="flex justify-between items-center py-4 px-6 bg-black/30 rounded-xl border border-orange-500/20">
                                        <span className="text-orange-300 font-semibold flex items-center gap-2">
                                            <span>📅</span> Durée
                                        </span>
                                        <span className="font-bold text-white text-lg">{sim.duree} mois</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-black/40 border border-orange-500/30 rounded-xl p-8 backdrop-blur-sm">
                            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-4">
                                <span className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-white text-lg shadow-md">💹</span>
                                Résultats financiers
                            </h2>

                            <div className="text-center mb-8 p-8 bg-orange-600/20 border border-orange-500/40 rounded-xl">
                                <p className="text-orange-300 text-lg mb-3 font-semibold">Mensualité</p>
                                <p className="text-5xl font-bold text-white mb-2">
                                    {Number(sim.mensualite)?.toLocaleString('fr-FR')}
                                </p>
                                <span className="text-xl text-orange-400 font-semibold">DH/mois</span>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-4 px-6 bg-black/30 rounded-xl border border-orange-500/20">
                                    <span className="text-orange-300 font-semibold">💵 Montant emprunté</span>
                                    <span className="font-bold text-white text-lg">
                                        {Number(sim.montant)?.toLocaleString('fr-FR')} DH
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-4 px-6 bg-black/30 rounded-xl border border-orange-500/20">
                                    <span className="text-orange-300 font-semibold">💰 Coût total</span>
                                    <span className="font-bold text-white text-lg">
                                        {Number(sim.coutTotal)?.toLocaleString('fr-FR')} DH
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-4 px-6 bg-black/30 rounded-xl border border-orange-500/20">
                                    <span className="text-orange-300 font-semibold">📈 Coût du crédit</span>
                                    <span className="font-bold text-orange-400 text-lg">
                                        +{(Number(sim.coutTotal) - Number(sim.montant))?.toLocaleString('fr-FR')} DH
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-black/40 border border-orange-500/30 rounded-xl p-8 backdrop-blur-sm">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white text-sm shadow-md">⚡</span>
                                Actions
                            </h3>

                            <div className="space-y-4">
                                <Link
                                    to="/new"
                                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg flex items-center gap-3"
                                >
                                    <span>➕</span> Nouvelle simulation
                                </Link>
                                <Link
                                    to={`/demande/${sim.id}`}
                                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg flex items-center gap-3"
                                >
                                    <span>📄</span> Faire une demande
                                </Link>
                            </div>
                        </div>

                        <div className="bg-black/40 border border-orange-500/30 rounded-xl p-8 backdrop-blur-sm">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white text-sm shadow-md">ℹ️</span>
                                Informations
                            </h3>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-orange-300">ID simulation:</span>
                                    <span className="text-white font-semibold">#{sim.id}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-orange-300">Date création:</span>
                                    <span className="text-white font-semibold">
                                        {new Date(sim.dateCreation || Date.now()).toLocaleDateString('fr-FR')}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-orange-300">Statut:</span>
                                    <span className="text-green-400 font-semibold">Active</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}