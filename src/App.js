import React from "react";
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login"
import Cadastro from "./Cadastro";
import Habitos from "./Habitos";
import Hoje from "./Hoje";
import Historico from "./Historico";
import UserContext from "./contexts/Usercontext";

export default function App() {
    
    const [user, setUser] = useState({
        image: "",
        token1: "",
        porcentagem:0
    })
    
    return (
        <UserContext.Provider value={{ user, setUser }}>
         
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} /> 
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/habitos" element={<Habitos />} />
                <Route path="/hoje" element={<Hoje />} />
                <Route path="/historico" element={<Historico />} />
            </Routes>
        </BrowserRouter>
        </UserContext.Provider>
        
    )
}