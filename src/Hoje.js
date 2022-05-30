import dayjs from "dayjs"
import Footer from "./Footer"
import Topo from "./Topo";
import locale from  "dayjs/locale/pt-br"; 
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import ok from "../src/assets/ok.png"
import { useContext } from "react";
import UserContext from "../src/contexts/Usercontext";
import styled from 'styled-components';


function Lista({porcentagem, habitosConcluidos, setHabitosConcluidos, setPorcentagem, id, token1, nome, sequenciaAtual, maiorSequencia, marcada, habitosHoje, setHabitosHoje}) {
    const [cartaMarcada,setCartaMarcada] = useState(marcada);
    const { user, setUser } = useContext(UserContext);
    

    useEffect(() => {
        if(marcada == true) {
            setHabitosConcluidos(habitosConcluidos + 1);
            const porcentagem = ((habitosConcluidos/habitosHoje.length) * 100)
               setUser(prevState => ({...prevState, porcentagem}))
        }
    }, [])
    console.log("habitos concluidos = " + habitosConcluidos);
       
    

    function atualizar() {
        const config = {
            headers: {
                Authorization: `Bearer ${token1}`

            }
        }
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config)
        promise
        .then(res =>{
            console.log(res.data);
            setHabitosHoje(res.data)
            console.log("atualizamos")
        })
        .catch(err => {
            console.log(err);
            console.log("deu ruim")
        })
    }

    function marcarHabito() {
        const config = {
            headers: {
                Authorization: `Bearer ${token1}`

            }
        }
            const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, null, config)
            promise
            .then(res =>{
               
               atualizar()
               setCartaMarcada(true)
            })
            .catch(err => {
               
                console.log(err);
                console.log("deu ruim");
                alert("Você inseriu dados inválidos")
                
            })
    }

    function desmarcarHabito() {
       
        const config = {
            headers: {
                Authorization: `Bearer ${token1}`

            }
        }
            const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, null, config)
            promise
            .then(res =>{
        
                atualizar()
                setCartaMarcada(false)
            })
            .catch(err => {
               
                console.log(err);
                console.log("deu ruim");
                alert("Você inseriu dados inválidos")
            })
    }
    


    return (
        <Descricao>
            <div>
                <h2> {nome}</h2>
                <h3> Sequência atual: {sequenciaAtual} dias</h3>
                <h3> Seu recorde: {maiorSequencia} dias</h3>
            </div>
           {(cartaMarcada == false) && ( <Marcacao1 onClick={() => marcarHabito()}><img src={ok} /> </Marcacao1>)}
           {(cartaMarcada == true) && ( <Marcacao2 onClick={() => desmarcarHabito()}><img src={ok} /> </Marcacao2>)}
                                            
    
        </Descricao>
    )
}

export default function Hoje() {
    const dataPortugues = dayjs().locale("pt-br");
    const dia = dataPortugues.format("dddd");
    const Dia = dia.charAt(0).toUpperCase() + dia.slice(1);
    const { user, setUser } = useContext(UserContext);
    const {token1, porcentagem} = user;
    const [ habitosConcluidos, setHabitosConcluidos] = useState(0);
    
    const [habitosHoje, setHabitosHoje] = useState([]);
    const setPorcentagem = () => 0
    
    useEffect(() => {
        const habitosHojeDone = habitosHoje.filter(habitoHoje => habitoHoje.done === true);
        if(habitosHoje.length){
            const newPorcentagem = ((habitosHojeDone.length/habitosHoje.length) *100)
            
            setUser(prevState => ({...prevState, porcentagem: newPorcentagem.toFixed(0)}) )
        }
       

    }, [habitosHoje])

       
    

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token1}`

            }
        }
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config)
        promise
        .then(res =>{
            console.log(res.data);
            setHabitosHoje(res.data)
        })
        .catch(err => {
            console.log(err);
            console.log("deu ruim")
        })
    }, [])
    
    const data = dayjs().date() + "/" + dayjs().month();
    
    return (
        <>
       <Topo />

       <DataAtual>
            <h1> {dia},  {data} </h1>
            {(habitosConcluidos == 0) && (<h3>Nenhum hábito concluído ainda</h3>)}  
            {(habitosConcluidos !== 0) && (<h4>{`${porcentagem}% dos hábitos concluídos`} </h4>)}   
       </DataAtual>

       <div className="listagemDeHabitos">
           {habitosHoje.map((habito, index) => <Lista habitosConcluidos={habitosConcluidos} setHabitosConcluidos={setHabitosConcluidos} porcentagem={porcentagem} setPorcentagem={setPorcentagem}  token1={token1} habitosHoje={habitosHoje} setHabitosHoje={setHabitosHoje} id={habito.id} marcada={habito.done} nome={habito.name} sequenciaAtual={habito.currentSequence} maiorSequencia={habito.highestSequence} />)}
       </div>
        <Footer />
        </>
    )
}

const DataAtual = styled.div `
        margin-top: 100px;

        h1{
            font-family: 'Lexend Deca';
            font-style: normal;
            font-weight: 400;
            font-size: 22.976px;
            line-height: 29px;
            color: #126BA5;
        }

        h3{
            margin-top: 5px;
            font-family: 'Lexend Deca';
            font-style: normal;
            font-weight: 400;
            font-size: 17.976px;
            line-height: 22px;
            color: #BABABA; 
        }
        h4{
            margin-top: 5px;
            font-family: 'Lexend Deca';
            font-style: normal;
            font-weight: 400;
            font-size: 17.976px;
            line-height: 22px;
            color: #8FC549;
        }
`

const Descricao = styled.div`
            background-color: white;
            margin-top: 10px;
            padding: 15px;
            display: flex;
            justify-content: space-between;

            h2{
                font-family: 'Lexend Deca';
                font-style: normal;
                font-weight: 400;
                font-size: 22px;
                line-height: 25px;
                color: #666666;
                margin-bottom: 7px;
            }
            h3{
                font-family: 'Lexend Deca';
                font-style: normal;
                font-weight: 400;
                font-size: 12.976px;
                line-height: 16px;
                color: #666666;
            }
    
`

const Marcacao1 = styled.div`
        width: 69px;
        height: 69px;
        background: #EBEBEB;
        border: 1px solid #E7E7E7;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
`
const Marcacao2 = styled.div`
        width: 69px;
        height: 69px;
        background: #8FC549;
        border: 1px solid #E7E7E7;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
`