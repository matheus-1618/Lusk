import React from "react";
import "./bar.css";
import { Link } from 'react-router-dom';
import {BsFillArrowLeftCircleFill} from 'react-icons/bs';
import { FaUserCircle } from "react-icons/fa";
import { BiLogInCircle } from "react-icons/bi";
import Imagem from "../../assets/Lusk.png"

export default function Bar(props) {
    let isHome = props.home;
    let user = props.user;
    let signOut = props.signOut;
    
  return (
    <div className="bar">
        {
        (<div className="bar-itens">
            <img className="logos" src={Imagem}/>
        </div>) 
        }
    </div>
   
  );
}