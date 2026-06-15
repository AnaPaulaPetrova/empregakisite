"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiUser, FiMapPin, FiFileText, FiCalendar, FiDollarSign, FiBriefcase  } from "react-icons/fi";
import styles from "./vagas.module.css";

export default function MinhasVagas() {
  const [vagas, setVagas] = useState([]);
  const router = useRouter();

  async function carregarVagas() {
    const token = localStorage.getItem("token");
    
    const res = await fetch("/api/empresas/vagas", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      setVagas(data);
    }
  }

  function obterStatusVaga(vaga) {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  if (!vaga.ativo) {
    return {
      texto: "Encerrada",
      classe: "encerrada"
    };
  }

  if (vaga.data_limite) {
    const dataLimite = new Date(vaga.data_limite);

    if (dataLimite < hoje) {
      return {
        texto: "Expirada",
        classe: "expirada"
      };
    }
  }

  return {
    texto: "Ativa",
    classe: "ativa"
  };
}

  async function excluirVaga(id) {
    const confirmar = confirm("Tem certeza que deseja excluir esta vaga?");
    if (!confirmar) return;

    const token = localStorage.getItem("token");

    const res = await fetch(`/api/empresas/vagas/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      alert("Vaga excluída!");
      carregarVagas();
    } else {
      alert("Erro ao excluir vaga");
    }
  }

  useEffect(() => {
    carregarVagas();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Minhas Vagas</h1>
      
      <p className={styles.total}>
        Total de vagas: {vagas.length}
      </p>

      {vagas.length === 0 ? (
        <p>Nenhuma vaga cadastrada.</p>
      ) : (
        <div className={styles.lista}>
          {vagas.map((vaga) => {
            const status = obterStatusVaga(vaga);

            return (
            <div key={vaga.id} className={styles.card}>
              <div className={styles.headerVaga}>
                <h3>{vaga.titulo}</h3>

                <span className={styles[status.classe]}>
                  {status.texto}
                </span>
              </div>
              <p><FiFileText /> {vaga.descricao}</p>
              <p>
                <strong><FiMapPin /> Local:</strong> {vaga.localizacao}
              </p>

              <p>
                <strong><FiBriefcase /> Área:</strong>{" "} 
                {vaga.area_atuacao || "Não informada"}
              </p>
              <p>
                <strong><FiDollarSign /> Salário:</strong>{" "}
                {vaga.salario
                  ? `R$ ${Number(vaga.salario).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}`
                  : "A combinar"}
              </p>

             <p>
              <strong><FiCalendar /> Data Limite</strong>{" "}
             {vaga.data_limite
              ? new Date(
                vaga.data_limite
                ).toLocaleDateString("pt-BR")
              : "Não definida "}
            </p>
            {/* <p>
              <strong>Status:</strong>{" "}
              <span className={status[status.classe]}>
                {status.texto}
              </span>
            </p> */}

              <div className={styles.botoes}>
                <button
                  onClick={() => router.push(`/empresas/vagas/${vaga.id}`)}
                  className={styles.editar}
                >
                  ✏ Editar
                </button>

                <button
                  onClick={() => excluirVaga(vaga.id)}
                  className={styles.excluir}
                >
                  🗑 Excluir
                </button>
              </div>
            </div>
            );
          })}
        </div>
      )}
    </div>
  );
}