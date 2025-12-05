"use client";
import "./login.css"
import React from 'react';
import {useState} from "react";
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();

    // controlar os campos e erro

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // função que roda quanfo o formulário é enviado

    function formularioEnviado(e){
        //e.preventDefault(); // não deixa a página recarregar

        if(email === "ana@gmail.com" && password ==="123"){
            router.push("sucessofully");
        } else {
      // mostra mensagem de erro
      setError("Email ou senha inválidos. Tente: ana@gmail.com / 123");
      }
    }

  return (
    <div className="login-container">
        <h2 className="title-login">Acesse sua conta</h2>
        <p className="login-subtitle">Entre com seus dados para continuar</p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={formularioEnviado} className="login-form">
            
            <label></label>
            <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
                required
            />

            <label></label>
            <input
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha"
                required
            />

            <button className="enter-button" type="submit">Entrar</button>
        </form>

          <a className="login-forgot" href="">Esqueceu sua senha?</a>
          
          <div className="login-divider">
            <span></span> ou <span></span>
          </div>

           <button className="google-button" type="submit">
            <img src="" alt=""></img>Continuar com o Google
           </button>
        </div>
  );
}

