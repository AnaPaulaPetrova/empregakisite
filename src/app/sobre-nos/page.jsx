import Footer from "@/components/Footer/Footer";
import styles from "./sobre-nos.module.css";

export default function SobreNos() {
  return (<>
    <div className={styles.container}>
      <h1 className={styles.titulo}>Sobre Nós</h1>

      <p className={styles.intro}>
        O Empregaki nasceu com um propósito simples: facilitar a conexão entre pessoas e oportunidades.

        Sabemos que encontrar um emprego pode ser desafiador, assim como para empresas encontrar profissionais qualificados. Pensando nisso, criamos uma plataforma acessível, prática e eficiente para aproximar esses dois mundos.
      </p>

      <section className={styles.section}>
        <h2>Nossa História</h2>
        <p>
          O projeto surgiu como uma iniciativa acadêmica com o objetivo de resolver problemas reais do mercado de trabalho. Com o tempo, evoluiu para uma plataforma completa, focada em oferecer uma experiência simples tanto para candidatos quanto para empresas.
        </p>
      </section>

      <section className={styles.section}>
        <h2>O que nos motiva</h2>
        <p>
          Acreditamos que oportunidades podem transformar vidas. Por isso, buscamos desenvolver soluções que tornem o acesso ao mercado de trabalho mais justo, rápido e acessível.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Quem está por trás</h2>
        <p>
          O Empregaki foi desenvolvido por estudantes apaixonados por tecnologia, com o objetivo de aplicar conhecimentos em um projeto real e impactar positivamente a vida das pessoas.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Nosso futuro</h2>
        <p>
          Continuamos evoluindo a plataforma para oferecer cada vez mais valor aos usuários.
        </p>
      </section>
    </div>
    <Footer />
    </>
  );
  
}