import React from "react";
import "./infra.css";
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Bar from "../bar/bar";
import Backend from "../../assets/backend.png"
import Frontend from "../../assets/frontend.png"

export default function Infra(props) {
    const ref = useRef(null);
    const [progress, setProgress] = useState(null);
    const [usuario, setUsuario] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (navigator.platform === 'Win32'){
            var images = document.getElementsByClassName("infra-img");
            for (var i = 0; i < images.length; i++) {
                images[i].style.width="10rem";
                images[i].style.height="10rem";
            }
        }
      }, []);

return (
    <div className="Infra">
    <header className="Infra-header">
        <Bar home={true} user="ok"/> 
     <div className="infra-container">
        <Link to="/resources" className="infra-item">
            <img className="infra-img" src={Backend}></img>
            <h1 className="infra-font">Backend</h1>
          </Link>
        <Link to="/resources" className="infra-item">
            <img className="infra-img" src={Frontend}></img>
            <h1 className="infra-font">Frontend</h1>
        </Link>
     </div>
    </header>
  </div>
  );
}