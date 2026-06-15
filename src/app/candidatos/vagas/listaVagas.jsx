"use client";

import { useState } from "react";
import Link from "next/link";
import { FiSearch, FiHome, FiDollarSign, FiBriefcase, FiFileText } from "react-icons/fi";
import styles from "./vagas.module.css";

export default function ListaVagas({ vagas }) {
  const [busca, setBusca] = useState("");

  const vagasFiltradas = vagas.filter((vaga) => {
    const termo = busca.toLowerCase();

    return (
      (vaga.titulo || "").toLowerCase().includes(termo) ||
      (vaga.nome_empresa || "").toLowerCase().includes(termo) ||
      (vaga.area_atuacao || "").toLowerCase().includes(termo) ||
      (vaga.localizacao || "").toLowerCase().includes(termo)
    );
  });

  return (
    <>
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

      <div className={styles.grid}>
        {vagasFiltradas.length === 0 ? (
          <p>Nenhuma vaga encontrada.</p>
        ) : (
          vagasFiltradas.map((vaga) => (
            <div
              key={vaga.id}
              className={styles.card}
            >
              <h2><FiBriefcase /> {vaga.titulo}</h2>

              <p className={styles.empresa}>
                <FiHome /> {vaga.nome_empresa || "Empresa"}
              </p>

              <p className={styles.desc}>
                <FiFileText />
                {vaga.descricao?.length > 120
                  ? vaga.descricao.substring(0, 120) + "..."
                  : vaga.descricao}
              </p>

              <div className={styles.info}>
                <span>
                   <FiDollarSign />
                   {vaga.salario || "A combinar"}
                </span>
              </div>

              <Link
                href={`/candidatos/vagas/${vaga.id}`}
              >
                <button className={styles.button}>
                  Ver detalhes
                </button>
              </Link>
            </div>
          ))
        )}
      </div>
    </>
  );
}