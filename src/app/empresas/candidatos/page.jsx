"use client";

import React, { useEffect, useState } from 'react'
import styles from "./candidato.module.css"
export default function CandidatoEmpresa() {

    const [candidatos, setCandidatos ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
        carregarCandidatos();
    }, []);

    async function atualizarStatus(id, status) {

  try {

    const response = await fetch(
      `/api/empresas/candidatos/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    carregarCandidatos();

  } catch (error) {

    console.error(error);

  }
}    

    async function carregarCandidatos() {
        try {
            const token = localStorage.getItem("token");
            console.log("TOKEN:", token);

            const response = await fetch("/api/empresas/candidatos", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();

            console.log("Candidatos:", data);
            setCandidatos(data);
            
        } catch (error) {
            console.error(error)
        } finally{
            setLoading(false);
        }
    }

    function getStatusClass(status) {
  switch (status) {
    case "Pendente":
      return styles.pendente;

    case "Em análise":
      return styles.analise;

    case "Aprovado":
      return styles.aprovado;

    case "Rejeitado":
      return styles.rejeitado;

    default:
      return "";
  }
}   
    if (loading) {
  return (
    <p className={styles.loading}>
      Carregando candidatos...
    </p>
  );
}

   return (
   <div className={styles.container}>

      <h1 className={styles.titulo}> Candidatos das minhas vagas </h1>

      {candidatos.length === 0 ? (
        <p>Nenhum candidato encontrado.</p>
      ) : (
        candidatos.map((candidato) => (
          <div
            key={candidato.id}
            className={styles.card}
          >
            <h2 className={styles.nome}>{candidato.nome}</h2>

            <p>
              <strong>Vaga:</strong>{" "}
              {candidato.titulo}
            </p>

            <p>
              <strong>Contato:</strong>{" "}
              {candidato.contato}
            </p>

            <p>
              <strong>Endereço:</strong>{" "}
                {candidato.endereco}
            </p>

            <p>
              <strong>Currículo:</strong>
            </p>

            <div className={styles.curriculo}> 
                {candidato.curriculo}
            </div>

            <p>
              <strong>Data da candidatura:</strong>{" "}
              {new Date(
                candidato.data_candidatura
              ).toLocaleDateString("pt-BR")}
            </p>

            <p>
                <strong>Status:</strong>{" "}
                <span
                    className={`${styles.status} ${getStatusClass(
                    candidato.status
                    )}`}
                >
                    {candidato.status}
                </span>
            </p>

        <div className={styles.botoes}>
            <button
                className={`
                ${styles.botao}
                ${styles.aprovarBtn}
                ${
                    candidato.status === "Aprovado"
                    ? styles.ativo
                    : ""
                }
                `}
                onClick={() =>
                atualizarStatus(
                    candidato.id,
                    "Aprovado"
                )
                }
            >
                Aprovar
            </button>

            <button
                className={`
                ${styles.botao}
                ${styles.rejeitarBtn}
                ${
                    candidato.status === "Rejeitado"
                    ? styles.ativo
                    : ""
                }
                `}
                onClick={() =>
                atualizarStatus(
                    candidato.id,
                    "Rejeitado"
                )
                }
            >
                Rejeitar
            </button>

            <button
                className={`
                ${styles.botao}
                ${styles.analiseBtn}
                ${ candidato.status === "Em análise"
                    ? styles.ativo : ""
                }
                `}
                onClick={() =>
                atualizarStatus(
                    candidato.id,
                    "Em análise"
                )
                }
            >
                Em análise
            </button>
        </div>

          </div>
        ))
      )}

    </div>
  );
}
