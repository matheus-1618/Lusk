import React, { useEffect,useState } from "react";
import "./login.css";
import Bar from "../bar/bar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="Login">
      <header className="Login-header">
        <Bar home={true} user="ok"/> 
        <div className="login-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <h1 className="login-title">Credentials</h1>
            <div className="form-div">
              <h1 className="form-details">AWS ACCESS KEY</h1>
              <input
                className="login-input"
                type="password"
                placeholder="AWS ACCESS KEY"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-div">
              <h1 className="form-details">AWS SECRET KEY</h1>
              <input
                className="login-input"
                type="password"
                placeholder="AWS SECRET KEY"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="form-div">
              <h1 className="form-details">GITHUB TOKEN</h1>
              <input
                className="login-input"
                type="password"
                placeholder="GITHUB TOKEN"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="login-button" type="submit">
              SEND
            </button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default Login;
