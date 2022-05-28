import React from "react";
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login"
import Cadastro from "./Cadastro";
import Habitos from "./Habitos";
import Hoje from "./Hoje";
import Historico from "./Historico";


export default function App() {
    const [token, setToken] = useState("")

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login setToken={setToken}/>} /> 
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/habitos" element={<Habitos token={token} />} />
                <Route path="/hoje" element={<Hoje />} />
                <Route path="/historico" element={<Historico />} />

            </Routes>
        </BrowserRouter>
    )
}