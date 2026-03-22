import database from "@/database/database";
import styles from "./perfilEmp.module.css";
import Link from "next/link";

export default async function PerfilEmpresa({ params}) {
  
   const empresaResponse = await database.query(
    "SELECT * FROM empresas LIMIT 1"
  );

  const empresa = empresaResponse.rows[0];

  if (!empresa) {
    return <p>Empresa não encontrada</p>;
  }

  const vagasResponse = await database.query(
    "SELECT * FROM vagasdisponiveis WHERE cnpj_empresa = $1",
    [empresa.nome_da_empresa]
  );

  const vagas = vagasResponse.rows; 

  return (
    <main className={styles.perfilContainer}>

      <section className={styles.perfilCard}>

        <div className={styles.perfilTopo}>

          <div className={styles.empresaLogo}></div>

          <div className={styles.empresaInfo}>
            <h1>{empresa.nome_da_empresa}</h1>

            <p className={styles.info}>
              📞 {empresa.contato}
            </p>

            <p className={styles.info}>
              📍 {empresa.endereco}
            </p>

            <Link href={"./vagas/criar"}><button className={styles.btnVaga}>
              Anunciar Vaga
            </button></Link>
          </div>

        </div>

        <div className={styles.empresaDescricao}>

          <h2>Sobre a empresa</h2>
          <p>
            {empresa.sobre_a_empresa}
          </p>

          <h2>Diferencias</h2>

          <p>
            <strong>Missão:</strong> {empresa.missao}
          </p>

          <p>
            <strong>Visão:</strong> {empresa.visao}
          </p>

          <p>
            <strong>Valores:</strong> {empresa.valor}
          </p>

        </div>

        <div className={styles.vagas}>

          <h2>Vagas disponíveis</h2>

          <div className={styles.vagasGrid}>
            {vagas.map((vaga) => (
              <div key={vaga.id} className={styles.vagaCard}>
                <h3>{vaga.titulo}</h3>
                <p>Número de inscritos: {vaga.inscritos || 0}</p>
              </div>
            ))}
          </div>
        </div>

      </section>
    </main>
  );
}
