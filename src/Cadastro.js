import styled from "styled-components";
import logo from "./assets/logo.png";
import react from "react";
import { Link,  useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ThreeDots } from  'react-loader-spinner';

export default function Cadastro() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nome, setNome] = useState("");
    const [foto, setFoto] = useState("");
    const [carregando, setCarregando] = useState(false)
   
    const navigate = useNavigate(); 

    function cadastrar2() {
        alert("Preencha todos os campos!")
    }
    function cadastrar() {
        setCarregando(true)
        const body = {
            email: email,
            name: nome,
            image: foto,
            password: senha
        }

        
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", body);
        promise
        .then(res =>{
            setCarregando(false)
            
            console.log(res.data);
            navigate('/');
        })
        .catch(err => {
            setCarregando(false)
            console.log(err);
            console.log("deu ruim")
            alert("Você inseriu dados inválidos ou já cadastrados. Insira novamente!")
        })
        
    }

    return (
        <BodyCadastro>
            <img src={logo} />
            <InfosCadastro>
                {(carregando === true) && (<>
                    <input disabled type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
                    <input disabled type="text" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="senha" />
                    <input disabled type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="nome" />
                    <input disabled type="text" value={foto} onChange={(e) => setFoto(e.target.value)} placeholder="foto" />
                    <button disabled opacity={0.7} type='submit'>{<ThreeDots  width={51} color={"#ffffff"} />} </button>
                    </>
                     )}
                {(carregando === false) && (nome.length === 0 || email.length === 0 || foto.length === 0 || senha.length === 0 ) &&
                (<>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
                <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="senha" />
                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="nome" />
                <input type="text" value={foto} onChange={(e) => setFoto(e.target.value)} placeholder="foto" />
                <button onClick={cadastrar2} type='submit'> Cadastrar </button>
                </>)}
                {(carregando === false) && (nome.length !== 0 && email.length !== 0 && foto.length !== 0 && senha.length !== 0) &&
                (<>
                 <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
                <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="senha" />
                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="nome" />
                <input type="text" value={foto} onChange={(e) => setFoto(e.target.value)} placeholder="foto" />
                <button onClick={cadastrar} type='submit'> Cadastrar </button>
                </>)
                } 
        
                <Link to={`/`} >
                    <h3> Já tem uma conta? Faça login</h3>
               </Link>

             </InfosCadastro>
        </BodyCadastro>
    )
}

const BodyCadastro =  styled.div`
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
const InfosCadastro = styled.div`
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
    color: black;
    padding-left: 10px;
    ::placeholder{
    color:black;
}
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