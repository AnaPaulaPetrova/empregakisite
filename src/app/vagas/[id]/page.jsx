import BotaoCandidatura from "./botaoCandidatura";
import { FiMapPin, FiDollarSign, FiBriefcase, FiFileText, FiCheckCircle, FiAward} from "react-icons/fi";

import styles from "./vaga.module.css";

async function getVaga(id) {
  const res = await fetch(`http://localhost:3000/api/vagas/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
}

export default async function VagaDetalhe({ params }) {
  const { id } = await params;

  const vaga = await getVaga(id);
  console.log("VAGA RECEBIDA:", vaga);

  if (!vaga) {
    return (
      <div className={styles.container}>
        <h2>Vaga não encontrada</h2>
        <p>Essa oportunidade pode ter sido removida.</p>
      </div>
    );
  }

  return (
    <main className={styles.container}>
      {/* HEADER DA VAGA */}
      <div className={styles.header}>
        <h1>
          {/* <FiBriefcase /> */}
          {vaga.titulo}
        </h1>

        <p className={styles.subtitulo}>
          Detalhes completos da oportunidade
        </p>
      </div>

      {/* CARD PRINCIPAL */}
      <div className={styles.card}>
        <div className={styles.bloco}>
          <h3> {vaga.nome_empresa || "Empresa não encontrada"}</h3>
          <h3>
            <FiFileText />
            Descrição
          </h3>
          <p>{vaga.descricao}</p>
        </div>

        <div className={styles.bloco}>
          <h3>
            <FiCheckCircle />
            Requisitos
          </h3>
          <p>{vaga.requisitos}</p>
        </div>

        <div className={styles.bloco}>
          <h3>
            <FiCheckCircle />
            Responsabilidades
          </h3>
          <p>{vaga.responsabilidades || "Não informado"}</p>
        </div>

        <div className={styles.bloco}>
          <h3>
            <FiAward />
            Diferenciais
          </h3>
          <p>{vaga.diferenciais || "Não informado"}</p>
        </div>

        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <FiDollarSign />
            <span> <strong>Salário: </strong>
              {vaga.salario ? `R$ ${vaga.salario}` : "A combinar"}
            </span>
          </div>

          <div className={styles.infoItem}>
            <FiMapPin />
            <span><strong>Localização: </strong>{vaga.localizacao || "Não informado"}</span>
          </div>

          <div className={styles.infoItem}>
            <FiBriefcase />
            <span><strong>Área de atuação: </strong>{vaga.area_atuacao || "Geral"}</span>
          </div>

          <div className={styles.infoItem}>
            <FiBriefcase />
            <span><strong>Tipo de contrato: </strong>{vaga.tipo_contrato || "Não informado"}</span>
          </div>
        </div>
        <div className={styles.bloco}>
          <h3>
            <FiAward />
            Benefícios
          </h3>
          <p>{vaga.beneficios || "Não informado"}</p>
        </div>

        {/* BOTÃO */}
        <div className={styles.acao}>
          <BotaoCandidatura idVaga={vaga.id}/>
        </div>
      </div>
    </main>
  );
}