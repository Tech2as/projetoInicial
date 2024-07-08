import React from 'react'
import { Link } from 'react-router-dom'
import Axios from "axios"

function Login({ onLogin }) {
  
    return (
      <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
        <div className="bg-white p-3 rounded w-25">
          <h2 className="d-flex justify-content-center align-items-center">Sistema de Login</h2>
            <form action="">
              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="Insira seu email" className="form-control rounded-0" name="email" />
              </div>
              <div className="mb-3">
                <label htmlFor="senha">Senha</label>
                <input type="password" placeholder="Insira sua senha" className="form-control rounded-0" name="senha" />
              </div>
              <div className="m-10">
                <button type="submit" className="btn btn-success w-100 mb-2">Login</button>
                <Link to="/cadastro" className="btn btn-default border w-100 text-decoration-none">Cadastre-se</Link>
              </div>
              </form>
        </div>
      </div>
    );
  }
  
  export default Login;