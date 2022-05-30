import Topo from "./Topo";
import Footer from "./Footer";
import styled from 'styled-components';
export default function Historico() {
    return (
        <>
        <Topo />
        <Corpo>
            <h2> Histórico</h2>
            <h3> Em breve você poderá ver o histórico dos seus hábitos aqui</h3>
        </Corpo>
        <Footer />
        </>
    )
}

const Corpo = styled.div`
        margin-top: 100px;

        h2{
            font-family: 'Lexend Deca';
            font-style: normal;
            font-weight: 400;
            font-size: 22.976px;
            line-height: 29px;
            color: #126BA5;
        }

        h3{
            margin-top: 10px;
            font-family: 'Lexend Deca';
            font-style: normal;
            font-weight: 400;
            font-size: 17.976px;
            line-height: 22px;
            color: #666666;
        }
`