import React  from "react";

import { BrowserRouter as Router , Route , link , Switch } from "react-router-dom";

import './app.css';

import AdminDashboard from "./pages/AdminDashboard";
import AdminDemandDetail from "./pages/AdminDemandDetail";

import ApplicationPage from "./pages/ApplicationPage";

import SimulationPage from "./pages/SimulationPage";
import { application } from "express";
function App() {

 return(
  <Router>
    <Routes>
           <Route path = '/admin' element= {AdminDashboard} />
           <Route path = '/detail' element = {AdminDemandDetail} />
           <Route path = '/app' element = {ApplicationPage} />   
           <Route path = '/simulation' element = {SimulationPage} />

    </Routes>

  </Router>
 )
}

export default App
