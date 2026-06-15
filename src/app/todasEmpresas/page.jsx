import Link from "next/link";
import { FiMapPin, FiDollarSign, FiFileText, FiBriefcase, FiArrowRight, FiPhone,} from "react-icons/fi";
import styles from "./empresas.module.css";

async function getEmpresas() {
  const res = await fetch("http://localhost:3000/api/todasEmpresas", {
    cache: "no-store",
  });

  if (!res.ok) return [];

  return res.json();
}

export default async function EmpresasPage() {
  const empresas = await getEmpresas();

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1>
          <FiBriefcase />
          Empresas Parceiras
        </h1>

        <p>
          Conheça as empresas cadastradas no EmpregAki.
        </p>
      </div>

      {empresas.length === 0 ? (
        <div className={styles.empty}>
          <h2>Nenhuma empresa encontrada</h2>
        </div>
      ) : (
        <div className={styles.grid}>
          {empresas.map((empresa) => (
            <div
              key={empresa.id}
              className={styles.card}
            >
              <h2> {empresa.nome} </h2>

              <p className={styles.sobre}>
                <FiFileText />
                {empresa.sobre_empresa ||
                  "Empresa sem descrição."}
              </p>

              <div className={styles.info}>
                <span>
                  <FiPhone />
                  {empresa.contato || "Não informado"}
                </span>

                <span>
                  <FiMapPin />
                  {empresa.endereco || "Não informado"}
                </span>

                <h3 className={styles.tituloSecao}>
                    Vagas Disponíveis
                </h3>
                
                <span>
                  <FiBriefcase />
                  {empresa.total_vagas} vagas abertas
                </span>

              </div>

              <Link
                href={`/todasEmpresas/${empresa.id}`}
                className={styles.botao}
              >
                Ver empresa
                <FiArrowRight />
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}