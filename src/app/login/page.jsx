"use client";
import styles from"./login.module.css"
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
    <div className={styles.loginContainer}>
        <h2 className={styles.loginTitulo}>Acesse sua conta</h2>
        <p className={styles.loginSubtitulo}>Entre com seus dados para continuar</p>

        <form onSubmit={formularioEnviado} className={styles.loginForm}>
            
            <label></label>
            <input
                className={styles.input}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
                required
            />

            <label></label>
            <input
                className={styles.input}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha"
                required
            />

            <button className={styles.enterButton} type="submit">Entrar</button>
        </form>

          <a className={styles.loginForgot} href="">Esqueceu sua senha?</a>
          
          <div className={styles.loginDivider}>
            <span></span> ou <span></span>
          </div>

           <button className={styles.googleButton} type="submit">
            <img src="" alt=""></img>Continuar com o Google
           </button>
        </div>
  );
}

