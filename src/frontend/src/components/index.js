import React from "react";
import "./index.css";
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Bar from "./bar/bar";
import Infra from "../assets/manage.png"
import List from "../assets/list.png"
import Destroy from "../assets/destroy.png"
import Credentials from "../assets/credentials.png"
import AWSlogo from "../assets/aws.webp"
import Docs from "../assets/docs.png"
import Gif from "../assets/giphy.webp"


export default function Home(props) {
    const ref = useRef(null);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [destroy, setDestroy] = useState(false);

    const handleModal = () => {
      setShowModal(!showModal);
    };

    async function destroyResources() {
        setDestroy(true);
        let res = await axios.get('http://localhost:5200/destroy');
        let data = res.data;
        console.log(data);
        setShowModal(!showModal);
        setDestroy(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            let res = await axios.get('http://localhost:5200/credentials');
            let data = res.data;
            if (data == false){
                navigate("/login");
            }
        }
        fetchData().catch(console.error);
    }, []);

    useEffect(() => {
        if (navigator.platform === 'Win32'){
            var images = document.getElementsByClassName("options-img");
            for (var i = 0; i < images.length; i++) {
                images[i].style.width="90px";
                images[i].style.height="90px";
            }
        }
      }, []);

return (
    <div className="Index">
    <header className="Index-header">
        <Bar home={true} user="ok"/> 
    
     <div className="options-container">
     {showModal && (
                <div className="modal">
                <div className="modal-content">
                  <h2>Destroy Resources</h2>
                  {destroy ? 
                  (<>
                  <div className="destroy">
                  <p>Destroying...</p>
                  <img className="spin" src={Gif}></img>
                  </div>
                  </>)
                  :
                  (<>
                  <p>Are you sure you want to destroy the resources?</p>
                  <div className="modal-buttons">
                    <button className="buttons" onClick={handleModal}>Cancel</button>
                    <button className="buttons" onClick={destroyResources}>Destroy</button>
                  </div>
                  </>)}
                  
                </div>
              </div>
      )}
        <Link to="/infra" className="options-item">
            <img className="options-img" src={Infra}></img>
            <h1 className="options-font">Manage Infrastructure</h1>
          </Link>
        <Link to="/resources" className="options-item">
            <img className="options-img" src={List}></img>
            <h1 className="options-font">List Resources</h1>
        </Link>
        <Link to="/" className="options-item" onClick={handleModal}>
            <img className="options-img" src={Destroy}></img>
            <h1 className="options-font">Destroy Resources</h1>
        </Link>
        <Link to="/login" className="options-item">
            <img className="options-img" src={Credentials}></img>
            <h1 className="options-font">Change credentials</h1>
        </Link>
        <Link to="https://us-east-1.console.aws.amazon.com/console/home?region=us-east-1" target="_blank" className="options-item">
            <img className="options-img" src={AWSlogo}></img>
            <h1 className="options-font">AWS Console</h1>
        </Link>
        <Link to="https://matheus-1618.github.io/Lusk-docs/" target="_blank" className="options-item">
            <img className="options-img" src={Docs}></img>
            <h1 className="options-font">Lusk Documentation</h1>
        </Link>
     </div>
    </header>
  </div>
  );
}