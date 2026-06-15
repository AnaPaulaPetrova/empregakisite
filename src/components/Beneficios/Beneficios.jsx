import Link from "next/link";
import styles from "./Beneficios.module.css";

export default function Beneficios() {
  return (
    <section className={styles.beneficios}>
      <h2>Por que escolher o EmpregAki?</h2>

      <div className={styles.beneficiosGrid}>

        <div>
          <h3>Transparência</h3>
          <p>
            Informações claras sobre vagas, empresas e processos seletivos.
          </p>
        </div>

        <div>
          <h3>Agilidade</h3>
          <p>
            Divulgue oportunidades e encontre candidatos rapidamente.
          </p>
        </div>

        <div>
          <h3>Visibilidade</h3>
          <p>
            Sua empresa ganha destaque para profissionais qualificados.
          </p>
        </div>

        <div>
          <h3>Talentos Qualificados</h3>
          <p>
            Conecte-se com candidatos que realmente atendem aos requisitos da vaga.
          </p>
        </div>

        <div>
          <h3>Gestão Simplificada</h3>
          <p>
            Centralize vagas, candidaturas e informações da empresa em um só lugar.
          </p>
        </div>

        <div>
          <h3>Conexão Local</h3>
          <p>
            Alcance profissionais da sua região e fortaleça o mercado local.
          </p>
        </div>

        <div className={styles.publicarBox}>
          <h3>Publique suas Vagas</h3>

          <p>
            Atraia candidatos qualificados e encontre o talento certo para sua equipe.
          </p>

          <button className={styles.btnEmpresa}>
            <Link href="/auth/registro">
             
                Cadastrar Empresa
              
            </Link>
          </button>
        </div>

      </div>
    </section>
  );
}