import { useEffect } from "react";
import axios from "axios";
import Topo from "./Topo";
import Footer from "./Footer";
import { useState } from "react";
import styled from 'styled-components';
import { ThreeDots } from  'react-loader-spinner';
import lixeira from "../src/assets/Vector.png"
import { useContext } from "react";
import UserContext from "../src/contexts/Usercontext";
import styledComponents from "styled-components";

function DatasCadastradas({dia, index, id, token1, habitosCadastrados, setHabitosCadastrados, diasCheck}) {
 
    const [diasPossiveis, setDiasPossiveis] = useState({0: "D", 1: "S",  2: "T", 3: "Q",  4: "Q",
    5: "S",  6: "S"} )
   

    function deletarHabito() {
        let confirmacao = prompt("Você tem certeza que deseja apagar esse hábito? digite 'sim' para confirmar")
        if(confirmacao =="sim" ) {
            console.log("vou deletar o Hábito de ID " + id);
        const config = {
            headers: {
                Authorization: `Bearer ${token1}`

            }
        }
            const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, config)
            promise
            .then(res =>{
                console.log(res.data);
               console.log("deletamos");
               setHabitosCadastrados(habitosCadastrados.filter(post => post.id !== id))
               
            })
            .catch(err => {
                
                console.log(err);
                console.log("não deletamos");
                alert("Você inseriu dados inválidos")
            })
        } 

    }
    
    return (
        <>
        <Itens>
            <h2> {dia}</h2>
            <img onClick={() => deletarHabito()} src={lixeira} />
        </Itens>
        <DiasCadastrados>
            {Object.keys(diasPossiveis).map(diaPossivel => {
               const diaNum = parseInt(diaPossivel)
                
                return(diasCheck.includes(diaNum)
                ? <Selecionada> {diasPossiveis[diaPossivel]}</Selecionada> 
                : <NaoSelecionada> {diasPossiveis[diaPossivel]}</NaoSelecionada> )
                

            })}
        
        </DiasCadastrados>
        </>
    )
}

function SelecionandoData({dia, status, index, days, setDays, carregando}) {
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
        {(carregando == true) && ((<button opacity={0.7} disabled onClick={() => alterandoEstado()}> {dia} </button>))}
     {(selecionado == false) && (carregando == false) && (<NaoSelecionada onClick={() => alterandoEstado()}> {dia} </NaoSelecionada>) }  
     {(selecionado == true) && (carregando == false) && (<Selecionada onClick={() => alterandoEstado2()} > {dia} </Selecionada>) }  

     </> 
    )
}

export default function Habitos() {
    const [carregando, setCarregando] = useState(false);
    const [habitosCadastrados, setHabitosCadastrados] = useState([]);

    const { user } = useContext(UserContext);
    const {token1} = user;

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

console.log("o token é: " + token1)

    function atualizar() {
        const config = {
            headers: {
                Authorization: `Bearer ${token1}`

            }
        }
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
        promise
        .then(res =>{
            console.log(res.data);
            setHabitosCadastrados(res.data)
          console.log(habitosCadastrados)
        })
        .catch(err => {
            console.log(err);
            console.log("deu ruim")
        })
    }

    function enviandoHabito() {
        setCarregando(true)
        const config = {
            headers: {
                Authorization: `Bearer ${token1}`

            }
        }
            const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", habito, config)
            promise
            .then(res =>{
                console.log(res.data);
                setCarregando(false);
                setName("");
                setDays("");
                setNovoHabito(false);
                atualizar()
            })
            .catch(err => {
                setCarregando(false)
                console.log(err);
                console.log("deu ruim");
                alert("Você inseriu dados inválidos")
            })
        
    }
  

    console.log(token1)
    function adicionandoHabito() {
        setNovoHabito(true)
        console.log("atualizamos o estado")
    }
    function retirandoHabito() {
        setNovoHabito(false)
    }

    
    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token1}`

            }
        }
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
        promise
        .then(res =>{
            console.log(res.data);
            setHabitosCadastrados(res.data)
          console.log(habitosCadastrados)
        })
        .catch(err => {
            console.log(err);
            console.log("deu ruim")
        })
    }, [])

        
    return(
        <>
        {(habitosCadastrados.length == 0) && ( <>
            <Topo />
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
                        {(carregando == false) && ( <input opacity={0.7} type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="nome do Hábito" />)}
                        {(carregando == true) && ( <input disabled opacity={0.7} type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="nome do Hábito" />)}
                        <Dias>
 {/*Fazer um ternario: se selecionado estiver true renderiza um botão, se tiver false renderiza outro botao*/}
                           {diasDaSemana.map( (dia, index) => <SelecionandoData carregando={carregando} days={days} setDays={setDays} index={index} dia={dia.day} status={dia.status} />)}
                          
                            
                        </Dias>
                        <FinalizarHabito> 
                            
                         {(carregando == false) && ( <><h3 onClick={() => retirandoHabito()}>  Cancelar </h3><div onClick={() => enviandoHabito()}> Salvar </div></>)}   
                         {(carregando == true) && (<><h3 opacity={0.7}>  Cancelar </h3><div disabled opacity={0.7}> {<ThreeDots  width={51} color={"#ffffff"} />} </div></>)} 
                        </FinalizarHabito>
                    </FormularioNovoHabito>
                    
                    <h3>Você não tem nenhum hábito cadastrado ainda, adicione algum hábito para começar a trackear</h3>
                </MeusHabitos>)
               
                }
               
               </HabitosEstilo>
            <Footer />
        </>)}
       
        {(habitosCadastrados.length !== 0) && (<>
            <Topo />
            <HabitosEstilo>
                <Header>
                    <h2>Meus hábitos</h2>
                    <div onClick={adicionandoHabito}> + </div>
                </Header>
                <ListandoMeusHabitos>
                    {habitosCadastrados.map((dia, index) => <DatasCadastradas habitosCadastrados={habitosCadastrados} setHabitosCadastrados={setHabitosCadastrados} token1={token1} id={dia.id} dia={dia.name} index={index} diasCheck={dia.days} />)}
                </ListandoMeusHabitos>
                


                {(novoHabito == true) && (
                    <FormularioNovoHabito>
                    {(carregando == false) && ( <input opacity={0.7} type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="nome do Hábito" />)}
                    {(carregando == true) && ( <input disabled opacity={0.7} type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="nome do Hábito" />)}
                    <Dias>

                       {diasDaSemana.map( (dia, index) => <SelecionandoData carregando={carregando} days={days} setDays={setDays} index={index} dia={dia.day} status={dia.status} />)}
                      
                        
                    </Dias>
                    <FinalizarHabito> 
                        
                     {(carregando == false) && ( <><h3 onClick={() => retirandoHabito()}>  Cancelar </h3><div onClick={() => enviandoHabito()}> Salvar </div></>)}   
                     {(carregando == true) && (<><h3 opacity={0.7}>  Cancelar </h3><div disabled opacity={0.7}> {<ThreeDots  width={51} color={"#ffffff"} />} </div></>)} 
                    </FinalizarHabito>
                </FormularioNovoHabito>
                )}
                
            </HabitosEstilo>

            <Footer />
        </>)}
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

const Itens = styled.div `
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        margin-left: 10px;

    img {
        width: 13px;
        height: 15px;
        margin-top: 10px;
        margin-right: 10px;
    }
`

const Selecionada = styled.button`
    margin-right: 5px;
    width: 30px;
    height: 30px;
    left: 70px;
    top: 218px;
    background: #CFCFCF;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #FFFFFF;;
`

const NaoSelecionada = styled.button `
    margin-right: 5px;
    width: 30px;
    height: 30px;
    left: 70px;
    top: 218px;
    background: #FFFFFF;;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #DBDBDB;
`
const DiasCadastrados = styled.div `
        display: flex;
        margin-top: 10px;
        margin-left: 10px;

`

const ListandoMeusHabitos = styledComponents.div`
        background-color: white;
        padding-bottom: 20px;

    h2{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #666666;
    }
`