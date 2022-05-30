import styled from "styled-components";
import { Link,  useNavigate } from 'react-router-dom';
import { CircularProgressbar,  buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


export default function Footer () {
    return (
        <FooterEstilo>
            <Link style={{ textDecoration: 'none' }} to={`/habitos`} ><h3> Hábitos</h3></Link>
            <Link style={{ textDecoration: 'none' }} to={`/hoje`} >
            <ProgressBar>
                    <CircularProgressbar
                        /*value={user.percentage}*/
                        text="Hoje"
                        background
                        backgroundPadding={6}
                        styles={buildStyles({
                            backgroundColor: "#52B6FF",
                            textColor: "#fff",
                            pathColor: "#fff",
                            trailColor: "transparent"
                        })}
                    />
                </ProgressBar>
                </Link>
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
const ProgressBar = styled.div`
    width:91px;
    height: 91px;
    position: fixed;
    bottom: -40px;
    left:50%;
     margin: 0 auto; 
    font-family: 'Lexend Deca', sans-serif;
    cursor: pointer;
    transform: translate(-50%, -50%);
    
`