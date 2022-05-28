import imageTopo from "./assets/imageTopo.png"
import styled from "styled-components";

export default function Topo() {
    return (
        <TopoEstilo>
            <h2>TrackIt</h2>
            <img src={imageTopo} />
        </TopoEstilo>
    )
}

const TopoEstilo =  styled.div`
        box-sizing: border-box;
        position: fixed;
        top:0px;
        width: 375px;
        margin: 0 auto;
        height: 70px;
        background: #126BA5;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
    h2{
        font-family: 'Playball';
        font-style: normal;
        font-weight: 400;
        font-size: 38.982px;
        line-height: 49px;
        color: #FFFFFF;
    }

    img{
        width: 51px;
        height: 51px;
        border-radius: 98.5px;
    }
    }
`