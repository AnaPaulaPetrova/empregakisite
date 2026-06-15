import { FiBriefcase, FiMapPin, FiPhone, FiFileText, FiUsers,
} from "react-icons/fi";

import styles from "./empresa.module.css";

async function getEmpresa(id) {
  const res = await fetch(
    `http://localhost:3000/api/todasEmpresas/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) return null;

  return res.json();
}

export default async function EmpresaPage({ params }) {
  const { id } = await params;

  const empresa = await getEmpresa(id);

  if (!empresa) {
    return (
      <main className={styles.container}>
        <div className={styles.header}>
          <h1>
            <FiBriefcase />
            Empresa não encontrada
          </h1>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1>
          <FiBriefcase />
          {empresa.nome}
        </h1>

        <p className={styles.subtitulo}>
          Conheça mais sobre esta empresa e suas oportunidades.
        </p>
      </div>

      <div className={styles.card}>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>  
            <FiPhone />
            {empresa.contato || "Não informado"}
          </div>

          <div className={styles.infoItem}>
            <FiMapPin />
            {empresa.endereco || "Não informado"}
          </div>

          <div className={styles.infoItem}>
            <FiUsers />
            Empresa ativa
          </div>

          <div className={styles.infoItem}>
            <FiBriefcase />
            {empresa.total_vagas || 0} vagas abertas
          </div>
        </div>

        <div className={styles.bloco}>
          <h3>
            <FiFileText />
            Sobre a Empresa
          </h3>

          <p>
            {empresa.sobre_empresa || "Nenhuma descrição cadastrada."}
          </p>
        </div>

        {empresa.missao && (
          <div className={styles.bloco}>
            <h3>
              <FiBriefcase />
              Missão
            </h3>

            <p>{empresa.missao}</p>
          </div>
        )}

        {empresa.visao && (
          <div className={styles.bloco}>
            <h3>
              <FiBriefcase />
              Visão
            </h3>

            <p>{empresa.visao}</p>
          </div>
        )}

        {empresa.valores && (
          <div className={styles.bloco}>
            <h3>
              <FiBriefcase />
              Valores
            </h3>

            <p>{empresa.valores}</p>
          </div>
        )}
        {empresa.vagas?.length > 0 && (
  <>
    <h2 className={styles.tituloSecao}>
      Vagas Disponíveis
    </h2>

    <div className={styles.gridVagas}>
      {empresa.vagas.map((vaga) => (
        <div
          key={vaga.id}
          className={styles.cardVaga}
        >
          <h3>{vaga.titulo}</h3>

          <p>{vaga.descricao}</p>

          <div className={styles.infoVaga}>
            <span>
              <FiMapPin />
              {vaga.localizacao}
            </span>

            {/* <span>
              <FiBriefcase />
              {vaga.numero_vagas} vaga(s)
            </span> */}
          </div>
        </div>
      ))}
    </div>
  </>
)}
      </div>
    </main>
  );
}