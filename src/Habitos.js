import { useEffect } from "react";
import axios from "axios";
import Topo from "./Topo";
import Footer from "./Footer";
import { useState } from "react";
import styled from 'styled-components';
//import { useContext } from "react";
//import UserContext from "../src/contexts/Usercontext";

function SelecionandoData({dia, status, index, days, setDays}) {
    const [selecionado, setSelecionado] = useState(status);

   
    function alterandoEstado() {
        console.log("vou mudar para true");
        console.log(index)
        console.log(dia)
        setSelecionado(true);
        setDays([...days, index]);
        console.log(days)
    }
    function alterandoEstado2(){
        console.log("vou mudar para false")
    }

    return (
        <>
     {(selecionado == false) && (<button onClick={() => alterandoEstado()}> {dia} </button>) }  
     {(selecionado == true) && (<button onClick={() => alterandoEstado2()}> {dia} </button>) }  

     </> 
    )
}

export default function Habitos({token, fotoPerfil}) {
    const diasDaSemana = [{day: "D", status: false},
                            {day: "S", status: false},
                            {day: "T", status: false},
                            {day: "Q", status: false},
                            {day: "Q", status: false},
                            {day: "S", status: false},
                            {day: "S", status: false} ]
    
    const [days, setDays] = useState([]);
    const [name, setName] = useState("");
    const [novoHabito, setNovoHabito] = useState(false)
    const habito = {
        name: name,
        days: days
    }
   
console.log(habito)

console.log("o token é: " + token)

    function enviandoHabito() {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`

            }
        }
            const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", habito, config)
            promise
            .then(res =>{
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
                console.log("deu ruim")
            })
        
    }
  

    console.log(token)
    function adicionandoHabito() {
        setNovoHabito(true)
        console.log("atualizamos o estado")
    }

   /* useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`

            }
        }
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
        promise
        .then(res =>{
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
            console.log("deu ruim")
        })
    })
        */
    return(
        <>
            <Topo fotoPerfil={fotoPerfil} />
            <HabitosEstilo>
                <Header>
                    <h2>Meus hábitos</h2>
                    <div onClick={adicionandoHabito}> + </div>
                </Header>
                {(novoHabito == false) && ( <MeusHabitos>
                    <h3>Você não tem nenhum hábito cadastrado ainda, adicione algum hábito para começar a trackear</h3>
                </MeusHabitos>)}
                {(novoHabito == true) && ( 
                <MeusHabitos>
                    <FormularioNovoHabito>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="nome do Hábito" />
                        <Dias>
 {/*Fazer um ternario: se selecionado estiver true renderiza um botão, se tiver false renderiza outro botao*/}
                           {diasDaSemana.map( (dia, index) => <SelecionandoData days={days} setDays={setDays} index={index} dia={dia.day} status={dia.status} />)}
                          
                            
                        </Dias>
                        <FinalizarHabito> 
                            <h3>  Cancelar </h3> 
                            <div onClick={() => enviandoHabito()}> Salvar </div>
                        </FinalizarHabito>
                    </FormularioNovoHabito>
                    
                    <h3>Você não tem nenhum hábito cadastrado ainda, adicione algum hábito para começar a trackear</h3>
                </MeusHabitos>)
               
                }
               
               </HabitosEstilo>
            <Footer />
        </>
    )
}

const HabitosEstilo = styled.div`
    background: #E5E5E5;
    margin-top: 100px;

`
const Header = styled.div`
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        margin-bottom: 30px;

    h2{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }
    div {
        width: 40px;
        height: 35px;
        left: 317px;
        top: 92px;
        background: #52B6FF;
        border-radius: 4.63636px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 26.976px;
        line-height: 34px;
        text-align: center;
        color: #FFFFFF;
    }
`

const MeusHabitos = styled.div`


    h3{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        color: #666666;
}
`

const FormularioNovoHabito = styled.div`
        padding-top: 10px;
        background-color: white;
        margin-bottom: 20px;

    input {
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
        margin-left: 10px;
        }
`

const Dias = styled.div `
        display: flex;
        margin-top: 10px;
        margin-left: 10px;

    button {
        margin-right: 5px;
        width: 30px;
        height: 30px;
        left: 70px;
        top: 218px;
        background: red;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #DBDBDB;
        }
`

const FinalizarHabito = styled.div `
        margin-top: 30px;
        display: flex;
        justify-content: flex-end;
        align-items: center;

    div{
        margin-right: 35px;
        width: 84px;
        height: 35px;
        background: #52B6FF;
        border-radius: 4.63636px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 15.976px;
        line-height: 20px;
        text-align: center;
        color: #FFFFFF;
        display: flex;
        justify-content: center;
        align-items: center;
        }
    
    h3{
        margin-right: 35px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 15.976px;
        line-height: 20px;
        text-align: center; 
        color: #52B6FF;
    }
`