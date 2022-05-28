import styled from "styled-components";
import { Link,  useNavigate } from 'react-router-dom';

export default function Footer () {
    return (
        <FooterEstilo>
            <Link style={{ textDecoration: 'none' }} to={`/habitos`} ><h3> Hábitos</h3></Link>
            <Link style={{ textDecoration: 'none' }} to={`/hoje`} ><h3> Hoje</h3></Link>
            <Link style={{ textDecoration: 'none' }} to={`/historico`} ><h3> Histórico </h3></Link>
        </FooterEstilo>
    )
}

const FooterEstilo =  styled.div`
        box-sizing: border-box;
        position: fixed;
        bottom: 0px;
        display:flex;
        justify-content: space-between;
        align-items: center;
        width: 375px;  
        height: 70px;  
        background-color: white;
        padding: 0 10px;

    h3{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        text-align: center;
        color: #52B6FF;
    }

`