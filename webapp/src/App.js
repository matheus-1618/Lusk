import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function App() {
  const [response, setResponse] = useState(null);
  const [values, setValues] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }
  

  async function doPostRequest() {
    let payload = { 'id':Math.floor(Math.random() * 10000).toString(), name: inputValue, occupation: 'gardener' };
    let res = await axios.post('https://40bc3edjdd.execute-api.us-east-1.amazonaws.com/prod/execution', payload);
    let data = res.data;
    console.log(data);
    setResponse(data);
};

async function doGetRequest() {
  let payload = {};
  let res = await axios.post('https://tm6tofxgqc.execute-api.us-east-1.amazonaws.com/prod/execution', payload);
  let data = res.data;
  console.log(data);
  setValues(data);
};


  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>Lusk</h1>
        <input type="text" value={inputValue} onChange={handleInputChange} />
          <button onClick={doPostRequest}>Send POST request to Dynamo</button>
          {response && <p>Response: {JSON.stringify(response)}</p>} 
          <button onClick={doGetRequest}>Send GET request to Dynamo</button>
          {values && <p>Response: {JSON.stringify(values)}</p>} 
        </div>
      </header>
    </div>
  );
}

export default App;
