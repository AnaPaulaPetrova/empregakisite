import styles from "./candidatos.module.css"
async function getCandidatos(id) {
    const res = await fetch(`http://localhost:3000/api/empresas/vagas/${id}/candidatos`,
    {
      cache: "no-store",
    });
    if (!res.ok) {
        return []
    };
    return res.json();
}

import React from 'react'

export default async function CandidatoPage({ params }) {
    const { id } = await params;

    const candidatos = await getCandidatos(id);

  return (
  <div className={styles.container}>

    <h1 className={styles.titulo}>
       Candidatos Inscritos
    </h1>

    <p className={styles.subtitulo}>
      Lista de candidatos que se inscreveram nesta vaga.
    </p>

    {candidatos.length === 0 ? (

      <div className={styles.vazio}>
        Nenhum candidato inscrito.
      </div>

    ) : (

      <div className={styles.lista}>
        {candidatos.map((candidato) => (
          <div
            key={candidato.id}
            className={styles.card}
          >

            <h2 className={styles.nome}>
              {candidato.nome}
            </h2>

            <p className={styles.info}>
              <strong>Contato:</strong>{" "}
              {candidato.contato}
            </p>

            <p className={styles.info}>
              <strong>Endereço:</strong>{" "}
              {candidato.endereco}
            </p>

            <p className={styles.curriculoTitulo}>
              Currículo
            </p>

            <div className={styles.curriculo}>
              {candidato.curriculo}
            </div>

            <span className={styles.data}>
              📅 Inscrito em{" "}
              {new Date(
                candidato.data_candidatura
              ).toLocaleDateString("pt-BR")}
            </span>

          </div>
        ))}
      </div>

    )}

  </div>
);
}
