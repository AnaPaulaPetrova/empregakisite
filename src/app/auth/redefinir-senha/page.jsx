"use client"

import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';
import styles from "./redefinirSenha.module.css";


export default function RedefinirSenha() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const token = searchParams.get("token");

    useEffect(() => {
      console.log("TOKEN DA URL:", token);
    }, [token]);


    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    console.log("Token", token);
    

    async function handleSubmit(e) {
        e.preventDefault();

        if (novaSenha !== confirmarSenha) {
            alert("As senhas não coincidem.");
            return;
        }
        console.log({token, novaSenha, });
        

        try {
            const resposta = await fetch("/api/auth/redefinir-senha", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token,
                novaSenha,
            }),
            });

            const data = await resposta.json();

            if (!resposta.ok) {
            alert(data.error || "Erro ao redefinir senha.");
            return;
            }

            alert("Senha redefinida com sucesso!");

            router.push("/auth/login");
        } catch (error) {
            console.error(error);
            alert("Erro ao conectar com o servidor.");
        }
    }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Redefinir Senha</h1>

        <form onSubmit={handleSubmit}>
          <div className={styles.grupo}>
            <label>Nova senha</label>
            <input
              type="password"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              required
            />
          </div>

          <div className={styles.grupo}>
            <label>Confirmar nova senha</label>
            <input
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.botao}>
            Redefinir senha
          </button>
        </form>
      </div>
    </div>
  );
}
