import React from 'react'
import styles from "./cadastroCandidato.module.css"
export default function cadastroEmp() {



  return (
     <div className={styles.cadastroCandContainer}>
        <h2 className={styles.cadastroCandtitulo}>Crie sua conta</h2>
        <p className={styles.cadastroCandSubtitulo}>Preencha seus dados para começar a usar o Empregaki</p>

        <form  className={styles.cadastroCandForm}>
            <div className={styles.cadastroGrupo}>
                <div className={styles.cadastroItem}>
                    <input
                        className={styles.input}
                        type="radio"
                        id="souEmpresa"
                        name="cadastro"
                        required
                    />
                    <label className={styles.label} htmlFor="souEmpresa">Sou Empresa</label>
                    <input
                        className={styles.input}
                        type="radio" 
                        id="souCandidato"
                        name="cadastro"
                        required
                    />
                    <label className={styles.label} htmlFor="souCandidato">Sou Candidato</label>
                </div>
            </div>
            <label></label>
            <input
                className={styles.input}
                type="text"
                placeholder="Nome completo"
                required
            />
            <input
                className={styles.input}
                type="text"
                placeholder="CPF"
                required
            />
            <label></label>
            <input
                className={styles.input}
                type="email"
                placeholder="E-mail"
                required
            />

            <label></label>
            <input
                className={styles.input}
                type="password"
                placeholder="Sua senha"
                required
            />

            <label></label>
            <input
                className={styles.input}
                type="password"
                placeholder="Confirme sua senha"
                required
            />

            <button className={styles.enterButton} type="submit">Entrar</button>
        </form>

          <a className={styles.cadastroCandForgot} href="">Esqueceu sua senha?</a>
          
          <div className={styles.cadastroCandDivider}>
            <span></span> ou <span></span>
          </div>

           <button className={styles.googleButton} type="submit">
            <img src="" alt=""></img>Continuar com o Google
           </button>
        </div>
  );
}
