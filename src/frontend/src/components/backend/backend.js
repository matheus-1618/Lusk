import React from "react";
import "./backend.css";
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Bar from "../bar/bar";
import axios from 'axios';
import Gif from "../../assets/giphy.webp"
import { useNavigate } from 'react-router-dom';


export default function Backend(props) {
    const [lambdas, setLambdas] = useState([]);
    const [showModalLambda, setShowModalLambda] = useState(false);
    const [showModalDynamo, setShowModalDynamo] = useState(false);
    const [creating, setCreating] = useState(false);
    const [links, setLinks] = useState([]);
    const [table, setTable] = useState("");
    const navigate = useNavigate();

    const handleModalLambda = () => {
        get_lambdas();
        setShowModalLambda(!showModalLambda);
        setLinks([]);
    };

    const handleModalDynamo = () => {
        setShowModalDynamo(!showModalDynamo);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
      };


    useEffect(() => {
        if (navigator.platform === 'Win32'){
            var images = document.getElementsByClassName("resources-img");
            for (var i = 0; i < images.length; i++) {
                images[i].style.width="80px";
                images[i].style.height="80px";
            }
        }
      }, []);

      async function get_lambdas() {
        let res = await axios.get('http://localhost:5200/lambda');
        let data = res.data.response;
        setLambdas(data);
    };

      async function deploy_lambda(index) {
          setCreating(true);
          let payload = {
              "number": index
            };
          let res = await axios.post('http://localhost:5200/lambda',payload);
          let data = res.data;
          setCreating(false);
          let real_links = [];
          for (var link of data.link.split('\n')){
            if (link.length > 4){
              real_links.push(link);
            }
          }
          setLinks(real_links);
      };

        async function createTable() {
            setCreating(true);
            let payload = {
              "name": table
            };
            let res = await axios.post('http://localhost:5200/dynamo', payload);
            let data = res.data;
            console.log(data);
            setCreating(false);
            navigate("/resources");
        };

return (
    <div className="backend">
    <header className="backend-header">
        <Bar home={false} user="ok"/> 
     <div className="backend-container">

     {showModalLambda && (
                <div className="modal">
                <div className="modal-content">
                  {creating ? 
                  (<>
                  <div className="destroy">
                  <p>Deploying</p>
                  <img className="spin" src={Gif}></img>
                  </div>
                  </>)
                  :
                  (links.length !== 0 ? 
                    (<>
                      <h2>Your API's endpoints:</h2>
                      <div className="link-group">
                        {links.map((item, index) => (
                          <Link to={item.split('"')[1]+"/execution"} target="_blank">
                            <a target="_blank">{item.split('"')[1]+"/execution"}</a>
                          </Link>
                            ))}
                         
                      </div>
                      <div className="modal-buttons">
                        <button className="buttons" onClick={handleModalLambda}>Return</button>
                        <Link to="https://reqbin.com/" target="_blank">
                          <button className="buttons" onClick={null}>Test the API's POST methods here</button>
                        </Link>
                      </div>
                      </>)
                  :
                  (<>
                  <h2>Select the Lambda Function which you want to deploy</h2>
                  <div className="lambda-group">
                    {lambdas.map((item, index) => (
                        <div key={index} className="lambdas" onClick={() => deploy_lambda(index)}>
                            <img className="resources-img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Amazon_Lambda_architecture_logo.svg/1200px-Amazon_Lambda_architecture_logo.svg.png"></img>       
                            <h1 className="lambdas-font">{item}</h1> 
                        </div>
                        ))}
                  </div>
                  <div className="modal-buttons">
                    <button className="buttons" onClick={handleModalLambda}>Cancel</button>
                  </div>
                  </>)
                  )
                  }
                  
                </div>
              </div>
      )}

    {showModalDynamo && (
                    <div className="modal">
                    <div className="modal-content">
                    {creating ? 
                    (<>
                    <div className="destroy">
                    <p>Creating table</p>
                    <img className="spin" src={Gif}></img>
                    </div>
                    </>)
                    :
                    (<>
                    <h2>What is the name of the DynamoDB table?</h2>
                    <div className="form-div">
                        <input
                            className="login-input"
                            placeholder="Dynamo Table"
                            value={table}
                            onChange={(e) => setTable(e.target.value)}
                            required
                        />
                        </div>
                    <div className="modal-buttons">
                        <button className="buttons" onClick={handleModalDynamo}>Cancel</button>
                        <button className="buttons" onClick={createTable}>Create</button>
                    </div>
                    </>)}
                    
                    </div>
                </div>
        )}

        <Link to="/backend" className="backend-item" onClick={handleModalLambda}>
            <div className="backend-api">
                <img className="backend-img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Amazon_Lambda_architecture_logo.svg/1200px-Amazon_Lambda_architecture_logo.svg.png"></img> 
                <h1 className="plus" >+</h1>
                <img className="backend-img" src="https://seeklogo.com/images/A/aws-api-gateway-logo-368082D845-seeklogo.com.png"></img>     
            </div>
            <h1 >Create API Gateway integration<br></br> with Lambda Function</h1> 
         </Link>


        <Link to="/backend" className="backend-item" onClick={handleModalDynamo}>
            <img className="backend-img" src="https://amazon-dynamodb-labs.com/images/Amazon-DynamoDB.png"></img>
            <h1 >Create Dynamo DB Table</h1>
          </Link>
        
     </div>
    </header>
  </div>

  );
}