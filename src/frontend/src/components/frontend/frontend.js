import React from "react";
import "./frontend.css";
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Bar from "../bar/bar";
import axios from 'axios';
import Gif from "../../assets/giphy.webp"
import { useNavigate } from 'react-router-dom';



export default function Frontend(props) {
    const [resources, setResources] = useState([]);
    const [showModalAmplify, setShowModalAmplify] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [creating, setCreating] = useState(false);
    const [app, setApp] = useState("");
    const [link, setLink] = useState("");

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
        const fetchData = async () => {
            let res = await axios.get('http://localhost:5200/credentials');
            let data = res.data;
        }
        fetchData().catch(console.error);
    }, []);

      const handleModalAmplify = () => {
        setShowModalAmplify(!showModalAmplify);
    };

    const handleModalUpdate = () => {
        setShowModalUpdate(!showModalUpdate);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
      };

    
    async function createApp() {
        setCreating(true);
        let payload = {
          "name": app
        };
        let res = await axios.post('http://localhost:5200/amplify', payload);
        let data = res.data;
        console.log(data);
        setLink(data.link)
        setCreating(false);
        //navigate("/resources");
    };

    async function updateApp() {
        setCreating(true);
        let payload = {};
        let res = await axios.post('http://localhost:5200/update', payload);
        let data = res.data;
        console.log(data);
        setCreating(false);
        handleModalUpdate();
        //navigate("/frontend");
    };
return (
    <div className="frontend">
    <header className="frontend-header">
        <Bar home={false} user="ok"/> 
     <div className="frontend-container">

     {showModalUpdate && (
                <div className="modal">
                <div className="modal-content">
                  <h2>Update App</h2>
                  {creating ? 
                  (<>
                  <div className="destroy">
                  <p>Updating...</p>
                  <img className="spin" src={Gif}></img>
                  </div>
                  </>)
                  :
                  (<>
                  <p>Do you want to update the Web App?</p>
                  <div className="modal-buttons">
                    <button className="buttons" onClick={handleModalUpdate}>Return</button>
                    <button className="buttons" onClick={updateApp}>Update</button>
                  </div>
                  </>)}
                  
                </div>
              </div>
      )}

     {showModalAmplify && (
                    <div className="modal">
                    <div className="modal-content">
                    {creating ? 
                    (<>
                    <div className="destroy">
                    <p>Creating app</p>
                    <img className="spin" src={Gif}></img>
                    </div>
                    </>)
                    :
                    (link.length !== 0 ? 
                        <>
                        <h2>Your app link:</h2>
                        <Link to={link}>
                            <a>{link}</a>
                        </Link>
                         <div className="modal-buttons">
                            <button className="buttons" onClick={handleModalAmplify}>Return</button>
                        </div>
                        </> 
                    :
                    (<>
                    <h2>What is the name of the Application?</h2>
                    <div className="form-div">
                        <input
                            className="login-input"
                            placeholder="Application name"
                            value={app}
                            onChange={(e) => setApp(e.target.value)}
                            required
                        />
                        </div>
                    <div className="modal-buttons">
                        <button className="buttons" onClick={handleModalAmplify}>Cancel</button>
                        <button className="buttons" onClick={createApp}>Create</button>
                    </div>
                    </>)
                    )
                    }
                    
                    </div>
                </div>
        )}

        <Link to="/frontend" className="frontend-item" onClick={handleModalAmplify}>
            <div className="frontend-api">
            <img className="frontend-img" src="https://res.cloudinary.com/practicaldev/image/fetch/s--05bptNnM--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://day-journal.com/memo/images/logo/aws/amplify.png"></img> 
            </div>
            <h1 >Create Amplify Web App</h1> 
         </Link>

        <Link to="/frontend" className="frontend-item" onClick={handleModalUpdate}>
            <img className="frontend-img" src="https://static.thenounproject.com/png/3639045-200.png"></img>
            <h1 >Update Web App</h1>
          </Link>
        
     </div>
    </header>
  </div>

  );
}