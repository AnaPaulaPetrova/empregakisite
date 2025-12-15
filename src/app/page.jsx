import styles from "./page.module.css";

export default function Home() {
  return (
    <>
    <main className={styles.container}>
      <h1 className={styles.logo}>EMPREGAKI</h1>
      <p className={styles.slogan}>
        Conectando pessoas a oportunidades
      </p>
    </main>
    </>
  );
}
