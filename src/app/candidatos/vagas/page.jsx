"use client";

import { useEffect, useState } from "react";
// import Link from "next/link";
// import { FiBriefcase, FiDollarSign, FiArrowRight, } from "react-icons/fi";
import ListaVagas from "./listaVagas";
import styles from "./vagas.module.css";

export default function VagasPage() {
  const [vagas, setVagas] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    carregarVagas();
  }, []);

  async function carregarVagas() {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "/api/candidatos/vagas",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>
          Carregando vagas...
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>

      <div className={styles.header}>
        <h1>Vagas Disponíveis</h1>

        <p>
          Encontre oportunidades e candidate-se.
        </p>
      </div>

      {vagas.length === 0 ? (
        <div className={styles.empty}>
          Nenhuma vaga disponível no momento.
        </div>
      ) : (
        // <div className={styles.grid}>

        //   {vagas.map((vaga) => (
        //     <div
        //       key={vaga.id}
        //       className={styles.card}
        //     >
        //       <div className={styles.cardHeader}>
        //         <FiBriefcase />
        //         <h2>{vaga.titulo}</h2>
        //       </div>

        //       <div className={styles.infoLine}>
        //         <span>
        //           {vaga.empresa ||
        //             "Empresa não informada"}
        //         </span>
        //       </div>

        //       <p className={styles.desc}>
        //         {vaga.descricao?.length > 180
        //           ? `${vaga.descricao.substring(
        //               0,
        //               180
        //             )}...`
        //           : vaga.descricao ||
        //             "Sem descrição"}
        //       </p>

        //       <div className={styles.infoLine}>
        //         <FiDollarSign />

        //         <span>
        //           {vaga.salario || "A combinar"}
        //         </span>
        //       </div>

        //       <Link
        //         href={`/candidatos/vagas/${vaga.id}`}
        //       >
        //         <button
        //           className={styles.button}
        //         >
        //           Ver Detalhes

        //           <FiArrowRight />
        //         </button>
        //       </Link>
        //     </div>
        //   ))}

        // </div>
        <ListaVagas vagas={vagas} />
      )}
    </div>
  );
}