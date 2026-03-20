import styles from "./perfilEmp.module.css";

export default function PerfilEmpresa() {
  return (
    <main className={styles.perfilContainer}>

      <section className={styles.perfilCard}>

        <div className={styles.perfilTopo}>

          <div className={styles.empresaLogo}></div>

          <div className={styles.empresaInfo}>
            <h1>Nome da Empresa</h1>

            <p className={styles.info}>
              📞 Contato: (xx) x xxxx-xxxx
            </p>

            <p className={styles.info}>
              📍 Local: Rua sem saída em volta
            </p>

            <button className={styles.btnVaga}>
              Anunciar Vaga
            </button>
          </div>

        </div>

        <div className={styles.empresaDescricao}>

          <h2>Sobre a empresa</h2>
          <p>
            It is a long established fact that a reader will be distracted by the readable
            content of a page when looking at its layout. The point of using Lorem Ipsum
            is that it has a more-or-less normal distribution of letters.
          </p>

          <h2>Diferencias</h2>

          <p>
            <strong>Missão:</strong> combined with a handful of model sentence structures,
            to generate Lorem Ipsum which looks reasonable.
          </p>

          <p>
            <strong>Visão:</strong> combined with a handful of model sentence structures,
            to generate Lorem Ipsum which looks reasonable.
          </p>

          <p>
            <strong>Valores:</strong> combined with a handful of model sentence structures,
            to generate Lorem Ipsum which looks reasonable.
          </p>

        </div>

        <div className={styles.vagas}>

          <h2>Vagas disponíveis</h2>

          <div className={styles.vagasGrid}>

            <div className={styles.vagaCard}>
              <h3>Título da vaga</h3>
              <p>Número de inscritos 01</p>
            </div>

            <div className={styles.vagaCard}>
              <h3>Título da vaga</h3>
              <p>Número de inscritos 01</p>
            </div>

            <div className={styles.vagaCard}>
              <h3>Título da vaga</h3>
              <p>Número de inscritos 01</p>
            </div>

          </div>

        </div>

      </section>

    </main>
  );
}