"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiLock } from "react-icons/fi";
import styles from "./redefinirSenha.module.css";

export default function RedefinirSenhaClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (novaSenha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

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
      alert(data.error);
      return;
    }

    alert("Senha redefinida com sucesso!");
    router.push("/auth/login");
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Redefinir Senha</h1>

        <form onSubmit={handleSubmit}>
          <div className={styles.grupo}>
            <label><FiLock /> Nova senha</label>
            <input
              type="password"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              required
            />
          </div>

          <div className={styles.grupo}>
            <label><FiLock /> Confirmar nova senha</label>
            <input
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
            />

            { confirmarSenha && (
              <span
                className={novaSenha === confirmarSenha ? styles.sucesso : styles.erro }>
                  { novaSenha === confirmarSenha
                   ? "✓ As senhas coincidem"
                    : "✗ As senhas não coincidem" }
              </span>
            )}
          </div>

          <button 
            type="submit" 
            className={styles.botao}
            disabled={!novaSenha || !confirmarSenha || novaSenha !== confirmarSenha }
          >
            Redefinir senha
          </button>
        </form>
      </div>
    </div>
  );
}