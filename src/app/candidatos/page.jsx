"use client";

import { useEffect, useState } from "react";
import { FiUser, FiBriefcase, FiFileText, FiUserCheck, FiBarChart, FiCalendar } from "react-icons/fi";
import styles from "./candidatos.module.css";

export default function CandidatoHome() {
  const [vagas, setVagas] = useState([]);
  const [candidaturas, setCandidaturas] = useState([]);
  const [nome, setNome] = useState("");

  useEffect(() => {
    carregarDados();
  }, []);

 async function carregarDados() {
  try {

    const token = localStorage.getItem("token");

    if (!token) return;

    // VAGAS NÃO CANDIDATADAS
    const vagasRes = await fetch(
      "/api/candidatos/vagas",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (vagasRes.ok) {
      const vagasData = await vagasRes.json();
      setVagas(vagasData);
    }

    // DADOS DO CANDIDATO
    const candidatoRes = await fetch(
      "/api/candidatos/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (candidatoRes.ok) {
      const candidatoData =
        await candidatoRes.json();

      setNome(candidatoData.nome);
    }

    // CANDIDATURAS
    const candidaturasRes = await fetch(
      "/api/candidatos/candidaturas",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (candidaturasRes.ok) {
      const candidaturasData =
        await candidaturasRes.json();

      setCandidaturas(candidaturasData);
    }

  } catch (error) {
    console.error(error);
  }
}
  return (
    <div className={styles.container}>

      {/* HEADER */}
      <div className={styles.profileHeader}>
        <div className={styles.avatar}><FiUserCheck /> </div>
        <div className={styles.header}>
          <h2><span>Bem-vindo(a), </span>{nome ? ` ${nome}` : ""}</h2>
          <p>
            Gerencie seu currículo e acompanhe suas candidaturas
          </p>
        </div>
      </div>

      {/* ESTATÍSTICAS */}
      <div className={styles.statsGrid}>

        <div className={styles.statCard}>
          <h3>{vagas.length}</h3>
          <span><FiBriefcase /> Vagas Disponíveis</span>
        </div>

        <div className={styles.statCard}>
          <h3>{candidaturas.length}</h3>
          <span><FiBarChart /> Candidaturas</span>
        </div>

      </div>

      {/* AÇÕES RÁPIDAS */}
      {/* <div className={styles.section}>
        <h2>Ações rápidas</h2>

        <div className={styles.actionCard}>
          <div className={styles.actionInfo}>
            <FiUser className={styles.icon} />

            <div>
              <h3>Meu Perfil</h3>
              <p>
                Atualize suas informações e currículo.
              </p>
            </div>
          </div>

          <a href="/candidatos/perfil">
            <button className={styles.button}>
              Editar Perfil
            </button>
          </a>
        </div>

        <div className={styles.actionCard}>
          <div className={styles.actionInfo}>
            <FiBriefcase className={styles.icon} />

            <div>
              <h3>Vagas Disponíveis</h3>
              <p>
                Explore as oportunidades disponíveis.
              </p>
            </div>
          </div> 

          <a href="/candidatos/vagas">
            <button className={styles.button}>
              Ver Vagas
            </button>
          </a>
        </div>
      </div>*/}

      {/* VAGAS RECENTES */}
      <div className={styles.section}>
        <h2>Vagas Recentes</h2>

        {vagas.length === 0 ? (
          <p className={styles.descricao}>Nenhuma vaga disponível.</p>
        ) : (
          vagas.slice(0, 5).map((vaga) => (
            <div
              key={vaga.id}
              className={styles.vagaCard}
            >
              <div className={styles.vagaHeader}>
                <FiBriefcase className={styles.iconSmall} />
                <h3>{vaga.titulo}</h3>
              </div>

              <p className={styles.descricao}>
                <FiFileText /> {vaga.descricao}
              </p>

              <a
                href={`/candidatos/vagas/${vaga.id}`}
              >
                <button
                  className={styles.buttonSecondary}
                >
                  Ver detalhes
                </button>
              </a>
            </div>
          ))
        )}
      </div>

      {/* CANDIDATURAS */}
      <div className={styles.section}>
        <h2>Minhas Candidaturas</h2>

        {candidaturas.length === 0 ? (
          <p>
            Você ainda não se candidatou a nenhuma vaga.
          </p>
        ) : (
          candidaturas.map((item) => (
            <div
              key={item.id}
              className={styles.vagaCard}
            >
              <div className={styles.vagaHeader}>
                <FiBriefcase />
                <h3>{item.titulo}</h3>
              </div>

              <p className={styles.descricao}>
                <FiFileText />  
                {/* {item.descricao} */}

                {item.descricao?.length > 120
                  ? item.descricao.substring(0, 120) + "..."
                  : item.descricao}
              </p>

              <small className={styles.dataCandidatura}>
                <FiCalendar /> Inscrito em{" "}
                {new Date(
                  item.data_candidatura
                ).toLocaleDateString("pt-BR")}
              </small>

              <p className={styles.status}>
                <strong>Status:</strong>{" "}
                {item.status}
              </p>
            </div>
          ))
        )}
      </div>

    </div>
  );
}