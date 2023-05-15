import React, { useEffect,useState } from "react";
import "./login.css";
import Bar from "../bar/bar";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [accesskey, setAccesskey] = useState("");
  const [secretkey, setSecretKey] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  async function sendCredentials() {
    let payload = {
      "aws_access_key": accesskey,
      "aws_secret_key": secretkey,
      "github_key": token
    };
    let res = await axios.post('http://localhost:5200/credentials', payload);
    let data = res.data;
    console.log(data);
    navigate("/");
};

  return (
    <div className="Login">
      <header className="Login-header">
        <Bar home={false} user="ok"/> 
        <div className="login-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <h1 className="login-title">Credentials</h1>
            <div className="form-div">
              <h1 className="form-details">AWS ACCESS KEY</h1>
              <input
                className="login-input"
                type="password"
                placeholder="AWS ACCESS KEY"
                value={accesskey}
                onChange={(e) => setAccesskey(e.target.value)}
                required
              />
            </div>

            <div className="form-div">
              <h1 className="form-details">AWS SECRET KEY</h1>
              <input
                className="login-input"
                type="password"
                placeholder="AWS SECRET KEY"
                value={secretkey}
                onChange={(e) => setSecretKey(e.target.value)}
                required
              />
            </div>
            
            <div className="form-div">
              <h1 className="form-details">GITHUB TOKEN</h1>
              <input
                className="login-input"
                type="password"
                placeholder="GITHUB TOKEN"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
              />
            </div>
            <button className="login-button" type="submit" onClick={sendCredentials}>
              SEND
            </button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default Login;
