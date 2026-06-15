"use client";

import React from 'react'
import styles from "./Header.module.css"
import Link from 'next/link';
import { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";

export default function Header() {
  const [logado, setLogado] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState("");

  function verificarLogin(){
    const token = localStorage.getItem("token");
    const tipo = localStorage.getItem("userTipo");

    if (token) {
      setLogado(true);
      setTipoUsuario(tipo || "");
    }else {
      setLogado(false);
      setTipoUsuario("")
    }
  }
  useEffect(() =>{
    verificarLogin();
    window.addEventListener("authChange", verificarLogin);
  
  return() =>{
    window.removeEventListener("authChange", verificarLogin);
  };
 }, []);

  const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  localStorage.removeItem("userTipo");

  // Atualiza o Header imediatamente
  window.dispatchEvent(new Event("authChange"))

  window.location.href = "/";
  
};
  const perfilLink = tipoUsuario === "empresa" ? "/empresas" : "/candidatos";

  return (
      <header className={styles.header}>
         <div className={styles.headerContent}>
        {/* Logo */}
        <div className={styles.logo}>
          <Link href={"/"}>EMPREG<span className={styles.aki}>AKI</span></Link>
        </div>

        {/* Menu */}
        <nav className={styles.menu}>
          <ul>
            <li><Link href={"/vagas"}>Vagas</Link></li>
            <li><Link href={"/todasEmpresas"}>Empresas</Link></li>
            <li><Link href={"/quem-somos"}>Quem Somos</Link></li>
            {logado ? (
          <>
            <li>
              <Link href={perfilLink} className={styles.profileLink}>
                 <FiUser />
                  Meu Perfil
              </Link>
            </li>

            <li>
              <button
                onClick={logout}
                className={styles.button}
              >
                Sair
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link href={"/auth/login"}
            className={styles.loginButton}>
              Login
            </Link>
          </li>
        )}
          </ul>
        </nav>
          {/* {!logado && (
            <Link href={"/auth/registro"}>
              <button className={styles.button}>
                Cadastre-se
              </button>
            </Link>
          )} */}
      </div>
    </header>
  );
}
