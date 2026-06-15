"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiUser, FiMapPin, FiFileText, FiPhone, FiUsers, FiBarChart, FiCheck, FiEye, FiTarget, FiAward, FiHome } from "react-icons/fi";
import styles from "./empresa.module.css";

export default function EmpresaPainel() {
  const [empresa, setEmpresa] = useState(null);
  const [stats, setStats] = useState({
  vagasAtivas: 0,
  candidatos: 0,
  totalVagas: 0
});
  const router = useRouter();

  useEffect(() => {
    async function buscarEmpresa() {
      const token = localStorage.getItem("token");

      const res = await fetch("/api/empresas/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setEmpresa(data);
      console.log("dados", data);
    }

    
    async function buscarEstatisticas() {
      try {
    const token = localStorage.getItem("token");

    const res = await fetch("/api/empresas/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    setStats(data);

  } catch (error) {
    console.error(error);
  }
    }

    buscarEmpresa();
    buscarEstatisticas();
  }, []);
  console.log("EMPRESA:", empresa);

  if (!empresa) return <p>Carregando...</p>;

  return (
    <div className={styles.container}>
        {/* BOTÃO EDITAR CORRIGIDO */}
        {/* <button
          className={styles.editButton}
          onClick={() => router.push("/empresas/editar")}
        >
          Editar
        </button> */}
      <div className={styles.profileHeader}>
        <div className={styles.avatar}> <FiHome /></div>

        <div className={styles.companyInfo}>
          <h2><span>Bem vindo(a), </span> {empresa.nome}</h2>

          <div className={styles.infoGrid}>
            <span><FiPhone /> {empresa.contato || "Não informado"}</span>
            <span><FiMapPin /> {empresa.endereco || "Não informado"}</span>
            <span><FiFileText /> {empresa.documento || "Não informado"}</span>
          </div>
        </div>
      </div>

      {/* <div className={styles.header}>
               
      </div> */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3><FiCheck /> Vagas Ativas</h3>
          <span>{stats.vagasAtivas}</span>
        </div>

        <div className={styles.statCard}>
          <h3><FiUsers /> Candidatos</h3>
          <span>{stats.candidatos}</span>
        </div>

        <div className={styles.statCard}>
         <h3><FiBarChart /> Total de Vagas</h3>
         <span>{stats.totalVagas}</span>
        </div>
      </div>

      <div className={styles.grid}>

        <div className={styles.card}>
          <h2><FiFileText /> Sobre</h2>
          <p> {empresa.sobre_empresa || "Não informado."}</p>
        </div>

        <div className={styles.card}>
          <h2><FiTarget /> Missão</h2>
          <p>{empresa.missao || "Não informado."}</p>
        </div>

        <div className={styles.card}>
          <h2><FiEye /> Visão</h2>
          <p>{empresa.visao || "Não informado."}</p>
        </div>

        <div className={styles.card}>
          <h2><FiAward /> Valores</h2>
          <p>{empresa.valores || "Não informado."}</p>
        </div>

      </div>

    </div>
  );
}