import React from "react";
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login"
import Cadastro from "./Cadastro";
import Habitos from "./Habitos";
import Hoje from "./Hoje";
import Historico from "./Historico";
//import UserContext from "./contexts/Usercontext";
// os hábitos precisam ser uma variável global
export default function App() {
    const [token, setToken] = useState("")
    const [fotoPerfil, setFotoPerfil] = useState("") 

    return (
        <BrowserRouter>
            
            <Routes>
                <Route path="/" element={<Login setToken={setToken} />} /> 
                <Route path="/cadastro" element={<Cadastro setFotoPerfil={setFotoPerfil} />} />
                <Route path="/habitos" element={<Habitos token={token} fotoPerfil={fotoPerfil} />} />
                <Route path="/hoje" element={<Hoje token={token} />} />
                <Route path="/historico" element={<Historico />} />
            </Routes>

        </BrowserRouter>
    )
}