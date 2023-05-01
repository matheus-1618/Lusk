import React, { useState } from "react";
import "./login.css";
import Bar from "../bar/bar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Adicione aqui a lógica para fazer a autenticação do usuário
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
                placeholder="E-mail"
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
                placeholder="Senha"
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
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="login-button" type="submit">
              Entrar
            </button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default Login;
