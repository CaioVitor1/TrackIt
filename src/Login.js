import React from "react";
import logo from "./assets/logo.png"
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ThreeDots } from  'react-loader-spinner';
import { useContext } from "react";
import UserContext from "../src/contexts/Usercontext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [carregando, setCarregando] = useState(false)
    const navigate = useNavigate(); 
    const { user, setUser } = useContext(UserContext);

    function logar2() {
        alert("Preencha todos os campos!")
    }
    function logar() {
        setCarregando(true)
        const body = {
                email: email,
                password: senha
            }
            const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", body);
            promise
            .then(res =>{
                console.log("deu bom")
                setCarregando(false)
                console.log(res.data);
               
               setUser(
                {   
                    image: res.data.image,
                    token1: res.data.token
                },
            );
               navigate('/hoje');

            })
            .catch(err => {
                setCarregando(false)
                console.log(err);
                console.log("deu ruim")
                alert("Você inseriu dados inválidos. Insira novamente!")
            })
    }

    return (
        <BodyLogin>
            <img src={logo} />
            <InfosLogin>
                {(carregando == false) && (
                <>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
                <input type="text" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="senha" />
                <button onClick={logar}> Entrar</button> 
               <Link to={`/cadastro`} >
                    <h3> Não tem uma conta? Cadastre-se</h3>
               </Link>
               </>)}

               {(carregando == true) && (
                <>
                <input disabled type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
                <input disabled type="text" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="senha" />
                <button opacity={0.7} disabled> {<ThreeDots  width={51} color={"#ffffff"} />}</button> 
                    <h3> Não tem uma conta? Cadastre-se</h3>
               
               </>)}
               

            </InfosLogin>
        </BodyLogin>
    )
}


const BodyLogin = styled.div`
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

img {
    width: 180px;
    height: 178.38px;
    margin: 68px auto 32px auto;
}
`
const InfosLogin = styled.div`
margin-bottom: 200px;

input {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    width: 303px;
    height: 45px;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #DBDBDB;
    padding-left: 10px;
}
button {
    width: 303px;
    height: 45px;
    background: #52B6FF;
    border-radius: 4.63636px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 20.976px;
    line-height: 26px;
    text-align: center;
    color: #FFFFFF;   
    margin-bottom: 25px; 
    display: flex;
    justify-content: center;
    align-items: center;
}

h3 {
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 13.976px;
    line-height: 17px;
    text-align: center;
    text-decoration-line: underline;
    color: #52B6FF;
}

`