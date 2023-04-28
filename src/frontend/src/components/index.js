import React from "react";
import "./index.css";
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Bar from "./bar/bar";


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
            <img className="options-img" src="https://cdn-icons-png.flaticon.com/512/1624/1624176.png"></img>
            <h1 className="options-font">Manage Infrastructure</h1>
          </Link>
        <Link to="/resources" className="options-item">
            <img className="options-img" src="https://cdn-icons-png.flaticon.com/512/1617/1617460.png"></img>
            <h1 className="options-font">List Resources</h1>
        </Link>
        <Link to="/" className="options-item">
            <img className="options-img" src="https://cdn-icons-png.flaticon.com/512/860/860778.png"></img>
            <h1 className="options-font">Destroy Resources</h1>
        </Link>
        <Link to="https://matheus-1618.github.io/Lusk-docs/roadmap/" className="options-item">
            <img className="options-img" src="https://cdn-icons-png.flaticon.com/512/0/49.png"></img>
            <h1 className="options-font">Lusk Documentation</h1>
        </Link>
     </div>
    </header>
  </div>

  );
}