"use client";

import { useState } from "react";
import styles from "./recuperarSenha.module.css";

export default function RecuperarSenha() {
  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const resposta = await fetch("/api/auth/recuperar-senha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await resposta.json();

      if (!resposta.ok) {
        alert(data.error || "Erro ao solicitar recuperação de senha.");
        return;
      }

      alert(
        "Se existir uma conta com esse e-mail, um link de recuperação será enviado."
      );

      setEmail("");
    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com o servidor.");
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Recuperar Senha</h1>

        <p>
          Informe o e-mail cadastrado e enviaremos um link para redefinir sua senha.
        </p>

        <form onSubmit={handleSubmit}>
          <div className={styles.grupo}>
            <label>E-mail</label>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.botao}>
            Enviar link de recuperação
          </button>
        </form>
      </div>
    </div>
  );
}