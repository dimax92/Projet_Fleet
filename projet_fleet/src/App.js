import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil.js";

const App=()=>{
    return(
      <BrowserRouter>
      <Routes>
        <Route exact path="/Accueil" element={<Accueil/>}/>
      </Routes>
   </BrowserRouter>
    );
};
export default App;
