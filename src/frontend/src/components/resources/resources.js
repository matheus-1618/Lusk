import React from "react";
import "./resources.css";
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Bar from "../bar/bar";
import axios from 'axios';
import Amplify from "../../assets/amplify.jpeg"
import Api from "../../assets/api.png"
import Dynamo from "../../assets/dynamo.png"
import Iam from "../../assets/iam.png"
import Lambda from "../../assets/lambda.png"
import Noresoc from "../../assets/noresources.png"


export default function Resources(props) {
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
        <Bar home={false} user="ok"/> 
     <div className="resources-container">

        {resources.length ? <></>
        :
        <div className="noresources-container">
            <h1 className="noresources">No Resources created</h1>
            <img className="nores-image" src={Noresoc}/>
        </div>
        }

        { resources.includes('lambda') ?
        <Link to="https://us-east-1.console.aws.amazon.com/lambda/home?region=us-east-1#/functions" target="_blank" className="resources-item">
            <img className="resources-img" src={Lambda}></img>       
            <h1 >Lambda functions</h1>
         </Link>
         : <></>
         }

         { resources.includes('dynamodb') ?
        <Link to="https://us-east-1.console.aws.amazon.com/dynamodbv2/home?region=us-east-1#tables" target="_blank" className="resources-item">
            <img className="resources-img" src={Dynamo}></img>
            <h1 >Dynamo DB Table</h1>
          </Link>
           : <></>
        }

        { resources.includes('amplify') ?
        <Link to="https://us-east-1.console.aws.amazon.com/amplify/home?region=us-east-1#/" target="_blank" className="resources-item">
            <img className="resources-img" src={Amplify}></img>
            <h1 >Amplify Hosting</h1>
        </Link>
         : <></>
        }

        { resources.includes('api') ?
        <Link to="https://us-east-1.console.aws.amazon.com/apigateway/home?region=us-east-1#/apis" target="_blank" className="resources-item">
            <img className="resources-img" src={Api}></img>
            <h1 >API Gateway</h1>
        </Link>
         : <></>
        }

        { resources.includes('iam') ?
        <Link to="https://us-east-1.console.aws.amazon.com/iamv2/home?region=us-east-1#/home" target="_blank" className="resources-item">
            <img className="resources-img" src={Iam}></img>
            <h1 >IAM roles</h1>
        </Link>
            : <></>
        }
        
     </div>
    </header>
  </div>

  );
}