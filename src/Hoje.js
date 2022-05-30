import dayjs from "dayjs"
import Footer from "./Footer"
import Topo from "./Topo";
import locale from  "dayjs/locale/pt-br"; 
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import ok from "../src/assets/ok.png"

function Lista({id, token, nome, sequenciaAtual, maiorSequencia, marcada, habitosHoje, setHabitosHoje}) {
    const [cartaMarcada,setCartaMarcada] = useState(marcada);

    function marcarHabito() {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`

            }
        }
            const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, null, config)
            promise
            .then(res =>{
                console.log(res.data);
               console.log("deu bom");
              
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
                Authorization: `Bearer ${token}`

            }
        }
            const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, null, config)
            promise
            .then(res =>{
                console.log(res.data);
               console.log("deu bom");
            
                
            })
            .catch(err => {
               
                console.log(err);
                console.log("deu ruim");
                alert("Você inseriu dados inválidos")
            })
    }
    


    return (
        <div className="descricao">
            <div>
                <h2> {nome}</h2>
                <h3> Sequência atual: {sequenciaAtual} dias</h3>
                <h3> Seu recorde: {maiorSequencia} dias</h3>
            </div>
           {(cartaMarcada == false) && ( <div onClick={() => marcarHabito()} className="marcacao1"><img src={ok} /> </div>)}
           {(cartaMarcada == true) && ( <div onClick={() => desmarcarHabito()} className="marcacao2"><img src={ok} /> </div>)}
                                            
    
        </div>
    )
}

export default function Hoje({token}) {
    const dataPortugues = dayjs().locale("pt-br");
    const dia = dataPortugues.format("dddd");
    const Dia = dia.charAt(0).toUpperCase() + dia.slice(1);

    const [ habitosConcluidos, setHabitosConcluidos] = useState(0);
    const [habitosHoje, setHabitosHoje] = useState([]);

    

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`

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
    
    const data = dayjs().date() + "/" + dayjs().month()
    return (
        <>
       <Topo />
       <div className="dataAtual" >
       <h1> {dia},  {data} </h1>
       {(habitosConcluidos == 0) && (<h3>Nenhum hábito concluído ainda</h3>)}    
       </div>
       <div className="listagemDeHabitos">
           {habitosHoje.map((habito, index) => <Lista token={token} habitosHoje={habitosHoje} setHabitosHoje={setHabitosHoje} id={habito.id} marcada={habito.done} nome={habito.name} sequenciaAtual={habito.currentSequence} maiorSequencia={habito.highestSequence} />)}
       </div>
        <Footer />
        </>
    )
}