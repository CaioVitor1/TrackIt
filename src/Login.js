import React from "react";
import logo from "./assets/logo.png"
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Login() {
    return (
        <BodyLogin>
            <img src={logo} />
            <InfosLogin>
                <input type="text" placeholder="email" />
                <input type="text" placeholder="senha" />
                <button> Entrar</button> 
               <Link to={`/cadastro`} >
                    <h3> Não tem uma conta? Cadastre-se</h3>
               </Link>
               

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