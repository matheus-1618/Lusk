import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function App() {
  const [response, setResponse] = useState(null);

  async function doPostRequest() {
    let payload = { name: 'John Doe', occupation: 'gardener' };
    let res = await axios.post('https://hyot4kwofk.execute-api.us-east-1.amazonaws.com/prod/execution', payload);
    let data = res.data;
    console.log(data);
    setResponse(data);
};


  return (
    <div className="App">
      <header className="App-header">
        <div>
          <button onClick={doPostRequest}>Send POST request to Google</button>
          {response && <p>Response: {JSON.stringify(response)}</p>} 
        </div>
      </header>
    </div>
  );
}

export default App;
