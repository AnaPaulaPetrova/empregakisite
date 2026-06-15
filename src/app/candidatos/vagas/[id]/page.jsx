import { database } from "@/database/database";
import Link from "next/link";

import BotaoCandidatura from "./botaoCandidatura";

import { FiMapPin, FiPhone, FiUsers, FiDollarSign, FiClock, FiBriefcase, FiArrowLeft, FiHome, FiCheckCircle, FiFileText, FiCalendar } from "react-icons/fi";

import styles from "./vaga.module.css";

export default async function VagaDetalhe({ params }) {
  const { id } = await params;

  try {
    const sql = `
      SELECT
        vd.*,
        iu.nome AS nome_empresa
      FROM vagas_disponiveis vd
      LEFT JOIN empresas e
        ON e.id = vd.id_empresa
      LEFT JOIN info_usuarios iu
        ON iu.id = e.id_info_usuarios
      WHERE vd.id = $1
    `;

    const resultado = await database.query(sql, [id]);

    const vaga = resultado.rows[0];

    console.log("VAGA COMPLETA:", vaga);
console.log("NOME EMPRESA:", vaga?.nome_empresa);

    if (!vaga) {
      return (
        <div className={styles.notFound}>
          <h1>Vaga não encontrada</h1>

          <Link href="/candidatos/vagas">
            Voltar para vagas
          </Link>
        </div>
      );
    }

    console.log("VAGA:", vaga);

    return (
      <div className={styles.container}>
        {/* HEADER */}
        <div className={styles.header}>
          <h1 className={styles.titulo}>
           <FiBriefcase /> {vaga.titulo}
          </h1>

          <p className={styles.empresa}>
            <FiHome /> {vaga.nome_empresa || "Empresa não encontrada"}
          </p>

          <div className={styles.actions}>
            <Link
              href="/candidatos/vagas"
              className={styles.voltarBtn}
            >
              <FiArrowLeft />
              Voltar
            </Link>
          </div>
        </div>

        {/* INFORMAÇÕES */}
        <div className={styles.infoVaga}>
          <div className={styles.infoItem}>
            <FiDollarSign />
            <span>
              <strong>Salário:</strong>{" "}
              {vaga.salario
                ? `R$ ${vaga.salario}`
                : "A combinar"}
            </span>
          </div>

          <div className={styles.infoItem}>
            <FiUsers />
            <span>
              <strong>Vagas:</strong>{" "}
              {vaga.numero_vagas}
            </span>
          </div>

          <div className={styles.infoItem}>
            <FiMapPin />
            <span>
              <strong>Localização:</strong>{" "}
              {vaga.localizacao}
            </span>
          </div>

          <div className={styles.infoItem}>
            <FiClock />
            <span>
              <strong>Carga horária:</strong>{" "}
              {vaga.carga_horaria}
            </span>
          </div>

          <div className={styles.infoItem}>
            <FiBriefcase />
            <span>
              <strong>Área:</strong>{" "}
              {vaga.area_atuacao}
            </span>
          </div>

          <div className={styles.infoItem}>
            <FiPhone />
            <span>
              <strong>Contato:</strong>{" "}
              {vaga.contato}
            </span>
          </div>
        </div>

        {/* DESCRIÇÃO */}
        <div className={styles.section}>
          <h2><FiFileText /> Descrição da vaga</h2>
          <p>
            {vaga.descricao || "Nenhuma descrição informada."}
          </p>
        </div>

        {/* REQUISITOS */}
        <div className={styles.section}>
          <h2><FiCheckCircle /> Requisitos</h2>
          <p>
            {vaga.requisitos || "Nenhum requisito informado."}
          </p>
        </div>

        {/* DATA LIMITE */}
        <div className={styles.section}>
          <h2> <FiCalendar /> Data limite para candidatura</h2>

          <p>
            {new Date(
              vaga.data_limite
            ).toLocaleDateString("pt-BR")}
          </p>
        </div>

        {/* AÇÕES */}
        <div className={styles.actions}>
          <a
            href={`https://www.google.com/maps/search/${encodeURIComponent(
              vaga.localizacao || ""
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className={styles.buttonSecondary}>
              Ver localização
            </button>
          </a>

          <BotaoCandidatura idVaga={vaga.id} />
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);

    return (
      <div className={styles.erro}>
        <h1>Erro ao carregar vaga</h1>

        <p>
          Ocorreu um erro ao buscar os dados da vaga.
        </p>
      </div>
    );
  }
}