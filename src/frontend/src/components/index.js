import React from "react";
import "./index.css";
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Bar from "./bar/bar";
import Infra from "../assets/manage.png"
import List from "../assets/list.png"
import Destroy from "../assets/destroy.png"
import Credentials from "../assets/credentials.png"
import AWSlogo from "../assets/aws.webp"
import Docs from "../assets/docs.png"


export default function Home(props) {
    const ref = useRef(null);
    const [progress, setProgress] = useState(null);
    const [usuario, setUsuario] = useState(null);

return (
    <div className="Index">
    <header className="Index-header">
        <Bar home={true} user="ok"/> 
     <div className="options-container">
        <Link to="/resources" className="options-item">
            <img className="options-img" src={Infra}></img>
            <h1 className="options-font">Manage Infrastructure</h1>
          </Link>
        <Link to="/resources" className="options-item">
            <img className="options-img" src={List}></img>
            <h1 className="options-font">List Resources</h1>
        </Link>
        <Link to="/" className="options-item">
            <img className="options-img" src={Destroy}></img>
            <h1 className="options-font">Destroy Resources</h1>
        </Link>
        <Link to="/login" className="options-item">
            <img className="options-img" src={Credentials}></img>
            <h1 className="options-font">Change credentials</h1>
        </Link>
        <Link to="https://us-east-1.console.aws.amazon.com/console/home?region=us-east-1" className="options-item">
            <img className="options-img" src={AWSlogo}></img>
            <h1 className="options-font">AWS Console</h1>
        </Link>
        <Link to="https://matheus-1618.github.io/Lusk-docs/" className="options-item">
            <img className="options-img" src={Docs}></img>
            <h1 className="options-font">Lusk Documentation</h1>
        </Link>
     </div>
    </header>
  </div>
  );
}