import { FiBriefcase, FiTarget, FiEye, FiAward, FiUser, FiCode,} from "react-icons/fi";

import styles from "./quemSomos.module.css";
import Footer from "@/components/Footer/Footer";

export default function QuemSomosPage() {
  return ( <>
    <main className={styles.container}>
      {/* HERO */}
      <section className={styles.hero}>
        <h1>Sobre o EmpregAki</h1>

        <p>
          Conectando talentos e oportunidades de forma simples,
          acessível e eficiente.
        </p>
      </section>

      {/* SOBRE */}
      <section className={styles.card}>
        <h2>
          <FiBriefcase />
          Nossa História
        </h2>

        <p>
          O EmpregAki nasceu para solucionar um problema
          identificado em Jaguaruana: a dificuldade na
          divulgação de vagas de emprego e na conexão entre
          empresas e candidatos.
        </p>

        <p>
          Muitas oportunidades eram divulgadas por meios
          dispersos, dificultando o acesso às informações.
          Com isso, surgiu a ideia de criar uma plataforma
          capaz de centralizar vagas e aproximar profissionais
          e empregadores.
        </p>
      </section>

      {/* MISSÃO VISÃO VALORES */}
      <section className={styles.grid}>
        <div className={styles.infoCard}>
          <FiTarget />

          <h3>Missão</h3>

          <p>
            Facilitar a conexão entre empresas e candidatos,
            tornando o processo de recrutamento mais simples,
            rápido e acessível.
          </p>
        </div>

        <div className={styles.infoCard}>
          <FiEye />

          <h3>Visão</h3>

          <p>
            Ser referência regional na divulgação de vagas
            e recrutamento digital.
          </p>
        </div>

        <div className={styles.infoCard}>
          
          <FiAward />

          <h3>Valores</h3>

          <p>
            Transparência, inclusão, inovação,
            acessibilidade e compromisso com a comunidade.
          </p>
        </div>
      </section>

      {/* DESENVOLVEDORES */}
      <section className={styles.card}>
        <h2>
          <FiCode />
          Quem Desenvolveu o EmpregAki
        </h2>

        <p>
          O EmpregAki foi desenvolvido por jovens estudantes
          do curso de Análise e Desenvolvimento de Sistemas
          do Instituto Federal de Educação, Ciência e
          Tecnologia do Ceará (IFCE) - Campus Jaguaruana.
        </p>

        <p>
          O projeto foi criado como parte da disciplina de
          Projeto Integrador I e II e teve como objetivo aplicar
          conhecimentos de desenvolvimento web, banco de
          dados, engenharia de software e experiência do
          usuário para solucionar um problema real da região.
        </p>

        <div className={styles.devGrid}>
          <div className={styles.devCard}>
            <FiUser />
            <h3>Ana Paula da Silva Lopes</h3>
            <span>Desenvolvedora</span>
          </div>

          <div className={styles.devCard}>
            <FiUser />
            <h3>Guilherme Emanuel Rocha Silva</h3>
            <span>Desenvolvedor</span>
          </div>
        </div>

        <div className={styles.devCard}>
            <FiUser />
            <h3>Ramon Moreira</h3>
            <span>Desenvolvedor</span>
          </div>
        
      </section>

      {/* ENCERRAMENTO */}
      <section className={styles.finalCard}>
        <h2>Juntos construindo oportunidades.</h2>

        <p>
          Acreditamos que a tecnologia pode aproximar pessoas,
          fortalecer empresas e transformar carreiras.
        </p>
      </section>
    </main>
      <Footer />
    </>
  );
}