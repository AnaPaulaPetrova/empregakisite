"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiMapPin, FiDollarSign, FiBriefcase, FiArrowRight, FiFileText, FiSearch, FiHome} from "react-icons/fi";

import styles from "./vagas.module.css";

export default function VagasPage() {
  const [vagas, setVagas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    carregarVagas();
  }, []);

  async function carregarVagas() {
    try {
      const res = await fetch("/api/vagas", {
        cache: "no-store",
      });

      if (!res.ok) {
        setVagas([]);
        return;
      }

      const data = await res.json();
      setVagas(data);
    } catch (error) {
      console.error("Erro ao carregar vagas:", error);
    } finally {
      setLoading(false);
    }
  }

  const vagasFiltradas = vagas.filter((vaga) => {
    const termo = busca.toLowerCase();

    return (
      (vaga.titulo || "").toLowerCase().includes(termo) ||
      (vaga.empresa_nome || "").toLowerCase().includes(termo) ||
      (vaga.area_atuacao || "").toLowerCase().includes(termo) ||
      (vaga.localizacao || "").toLowerCase().includes(termo)
    );
  });

  if (loading) {
    return (
      <main className={styles.container}>
        <div className={styles.semVagas}>
          <h2>Carregando vagas...</h2>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1>
          <FiBriefcase />
          Vagas Disponíveis
        </h1>

        <p>
          Explore as oportunidades cadastradas pelas empresas e encontre a vaga ideal para o seu perfil.
        </p>
      </div>

      {/* Barra de pesquisa */}
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Pesquisar por cargo, empresa, área ou localização..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className={styles.searchInput}
        />

        <FiSearch className={styles.searchIcon} />
      </div>

      {vagasFiltradas.length === 0 ? (
        <div className={styles.semVagas}>
          <h2>Nenhuma vaga encontrada</h2>
          <p>Tente utilizar outro termo de pesquisa.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {vagasFiltradas.map((vaga) => (
            <div key={vaga.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <h2>
                  {/* <FiBriefcase /> */}
                   {vaga.titulo}
                </h2>
              </div>

              <p className={styles.empresa}>
               <FiHome /> {vaga.empresa_nome || "Empresa não informada"}
              </p>

              <div className={styles.info}>
                <span>
                  <FiFileText />
                  {vaga.descricao?.length > 120
                    ? vaga.descricao.substring(0, 120) + "..."
                    : vaga.descricao}
                </span>
              </div>

              <div className={styles.info}>
                <span>
                  <FiDollarSign />
                  {vaga.salario || "A combinar"}
                </span>
              </div>

              <div className={styles.info}>
                <span>
                  <FiMapPin />
                  {vaga.localizacao || "Não informado"}
                </span>
              </div>

              <Link
                href={`/vagas/${vaga.id}`}
                className={styles.botao}
              >
                Ver detalhes
                <FiArrowRight />
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}