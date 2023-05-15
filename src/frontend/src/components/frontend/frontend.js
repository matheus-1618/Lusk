import React from "react";
import "./frontend.css";
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Bar from "../bar/bar";
import axios from 'axios';


export default function Frontend(props) {
    const [resources, setResources] = useState([]);

    useEffect(() => {
        if (navigator.platform === 'Win32'){
            var images = document.getElementsByClassName("resources-img");
            for (var i = 0; i < images.length; i++) {
                images[i].style.width="80px";
                images[i].style.height="80px";
            }
        }
      }, []);

      useEffect(() => {
        async function getResources() {
            let res = await axios.get('http://localhost:5200/resources');
            let data = res.data;
            let resources_received = [];
            for (var resource of data.response){
                resources_received.push(resource.split('_')[1])
            }
            let uniqueResource = [...new Set(resources_received)];
            setResources(uniqueResource);
        };
        getResources();
    }, []);

return (
    <div className="frontend">
    <header className="frontend-header">
        <Bar home={false} user="ok"/> 
     <div className="frontend-container">

        <Link to="/records" className="frontend-item">
            <div className="frontend-api">
            <img className="frontend-img" src="https://res.cloudinary.com/practicaldev/image/fetch/s--05bptNnM--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://day-journal.com/memo/images/logo/aws/amplify.png"></img> 
            </div>
            <h1 >Create Amplify Web App</h1> 
         </Link>


        <Link to="/records" className="frontend-item">
            <img className="frontend-img" src="https://static.thenounproject.com/png/3639045-200.png"></img>
            <h1 >Update Web App</h1>
          </Link>
        
     </div>
    </header>
  </div>

  );
}