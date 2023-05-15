import React from "react";
import "./resources.css";
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Bar from "../bar/bar";
import axios from 'axios';


export default function Resources(props) {
    const ref = useRef(null);
    const [progress, setProgress] = useState(null);
    const [usuario, setUsuario] = useState(null);
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
    <div className="Resources">
    <header className="Resources-header">
        <Bar home={true} user="ok"/> 
     <div className="resources-container">

        {resources.length ? <></>
        :
        <div className="noresources-container">
            <h1 className="noresources">No Resources created</h1>
            <img className="nores-image" src="https://static.thenounproject.com/png/203873-200.png"/>
        </div>
        }

        { resources.includes('lambda') ?
        <Link to="/records" className="resources-item">
            <img className="resources-img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Amazon_Lambda_architecture_logo.svg/1200px-Amazon_Lambda_architecture_logo.svg.png"></img>       
            <h1 >Lambda functions</h1>
         </Link>
         : <></>
         }

         { resources.includes('dynamodb') ?
        <Link to="/records" className="resources-item">
            <img className="resources-img" src="https://amazon-dynamodb-labs.com/images/Amazon-DynamoDB.png"></img>
            <h1 >Dynamo DB Table</h1>
          </Link>
           : <></>
        }

        { resources.includes('amplify') ?
        <Link to="/transcripts" className="resources-item">
            <img className="resources-img" src="https://res.cloudinary.com/practicaldev/image/fetch/s--05bptNnM--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://day-journal.com/memo/images/logo/aws/amplify.png"></img>
            <h1 >Amplify Hosting</h1>
        </Link>
         : <></>
        }

        { resources.includes('api') ?
        <Link to="/bot" className="resources-item">
            <img className="resources-img" src="https://seeklogo.com/images/A/aws-api-gateway-logo-368082D845-seeklogo.com.png"></img>
            <h1 >API Gateway</h1>
        </Link>
         : <></>
        }

        { resources.includes('iam') ?
        <Link to="/bot" className="resources-item">
            <img className="resources-img" src="https://storage.googleapis.com/xebia-blog/1/2021/09/iam.png"></img>
            <h1 >IAM roles</h1>
        </Link>
            : <></>
        }
        
     </div>
    </header>
  </div>

  );
}