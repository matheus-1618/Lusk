import React from "react";
import "./bar.css";
import { Link } from 'react-router-dom';
import {BsFillArrowLeftCircleFill} from 'react-icons/bs';
import Imagem from "../../assets/Lusk.png"

export default function Bar(props) {
    let isHome = props.home;

    
  return (
    <div className="bar">
        { isHome ? 
        (<div className="bar-itens">
            <img className="logos" src={Imagem}/>
        </div>) 
        :
        (<div className="bar-itens">
          <Link to="/" className="arrow">
          <h1><BsFillArrowLeftCircleFill/></h1>
          </Link>
            <img className="logos" src={Imagem}/>
        </div>) 
        }
    </div>
   
  );
}