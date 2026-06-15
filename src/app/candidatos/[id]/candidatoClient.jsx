"use client";

import { useState } from "react";
import styles from "./candidato.module.css";

export default function CandidatoClient({ candidato, id }) {
  const [curriculo, setCurriculo] = useState("");

  async function salvarCurriculo() {
    const res = await fetch("/api/candidatos/curriculo", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        candidatoId: id,
        curriculo,
      }),
    });

    if (res.ok) {
      alert("Currículo salvo!");
    } else {
      alert("Erro ao salvar currículo");
    }
  }

  if (!candidato) {
    return <p>Usuário não encontrado</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.cardPerfil}>
        <div className={styles.avatar}>
          {candidato.nome?.charAt(0)}
        </div>

        <div className={styles.info}>
          <h1>{candidato.nome}</h1>
          <p>{candidato.email}</p>
          <p className={styles.tipo}>{candidato.tipo}</p>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h3>📞 Contato</h3>
          <p>{candidato.contato || "Não informado"}</p>
        </div>

        <div className={styles.card}>
          <h3>📍 Endereço</h3>
          <p>{candidato.endereco || "Não informado"}</p>
        </div>

        <div className={styles.card}>
          <h3>🪪 Documento</h3>
          <p>{candidato.documento || "Não informado"}</p>
        </div>

        <div className={styles.actionsCard}>
          <h3>📄 Meu Currículo</h3>

          <textarea
            className={styles.textarea}
            value={curriculo}
            onChange={(e) => setCurriculo(e.target.value)}
            placeholder="Escreva seu currículo aqui..."
          />

          <button onClick={salvarCurriculo} className={styles.applyBtn}>
            💾 Salvar currículo
          </button>
        </div>
      </div>
    </div>
  );
}