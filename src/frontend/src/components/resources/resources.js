import React from "react";
import "./resources.css";
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Bar from "../bar/bar";


export default function Resources(props) {
    const ref = useRef(null);
    const [progress, setProgress] = useState(null);
    const [usuario, setUsuario] = useState(null);

return (
    <div className="Resources">
    <header className="Resources-header">
        <Bar home={true} user="ok"/> 
     <div className="resources-container">
        <div className="resources-item">
            <input className="input" ref={ref} type="file" />
            <img className="resources-img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Amazon_Lambda_architecture_logo.svg/1200px-Amazon_Lambda_architecture_logo.svg.png"></img>       
            { progress === null ?
            (<h1 >Lambda functions</h1>)  
            :
            (<h1> {progress}</h1>)
            }
        </div>
        <Link to="/records" className="resources-item">
            <img className="resources-img" src="https://amazon-dynamodb-labs.com/images/Amazon-DynamoDB.png"></img>
            <h1 >Dynamo DB Table</h1>
          </Link>
        <Link to="/transcripts" className="resources-item">
            <img className="resources-img" src="https://res.cloudinary.com/practicaldev/image/fetch/s--05bptNnM--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://day-journal.com/memo/images/logo/aws/amplify.png"></img>
            <h1 >Amplify Hosting</h1>
        </Link>
        <Link to="/bot" className="resources-item">
            <img className="resources-img" src="https://connectoricons-prod.azureedge.net/u/laborbol/releases/ase-v3/1.0.1622.3200/amazons3/icon.png"></img>
            <h1 >S3 buckets</h1>
        </Link>
        <Link to="/bot" className="resources-item">
            <img className="resources-img" src="https://seeklogo.com/images/A/aws-api-gateway-logo-368082D845-seeklogo.com.png"></img>
            <h1 >API Gateway</h1>
        </Link>
        
     </div>
    </header>
  </div>

  );
}