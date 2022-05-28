//import { useEffect } from "react";
//import axios from "axios";
import Topo from "./Topo";
import Footer from "./Footer";
import { useState } from "react";

export default function Habitos({token}) {
    const [novoHabito, setNovoHabito] = useState(false);
    const [nome, setNome] = useState("")

    console.log(token)
    function adicionandoHabito() {
        setNovoHabito(true)
        console.log("atualizamos o estado")
    }

    /*useEffect(() => {
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
    })*/

    return(
        <>
            <Topo />
            <div className="habitosEstilo">
                <div className="header">
                    <h2>Meus hábitos</h2>
                    <div onClick={adicionandoHabito}> + </div>
                </div>
                {(novoHabito == false) && ( <div className="meusHabitos">
                    <h3>Você não tem nenhum hábito cadastrado ainda, adicione algum hábito para começar a trackear</h3>
                </div>)}
                {(novoHabito == true) && ( 
                <div className="meusHabitos">
                    <div className="formularioNovoHabito">
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="nome do Hábito" />
                        <div className="dias">
                            <button> D </button>
                            <button> S </button>
                            <button> T </button>
                            <button> Q </button>
                            <button> Q </button>
                            <button> S </button>
                            <button> S </button>
                        </div>
                        <div className="finalizarHabito"> 
                            <h3>  Cancelar </h3> 
                            <div> Salvar </div>
                        </div>
                    </div>
                    
                    <h3>Você não tem nenhum hábito cadastrado ainda, adicione algum hábito para começar a trackear</h3>
                </div>)
               
                }
               
            </div>
            <Footer />
        </>
    )
}