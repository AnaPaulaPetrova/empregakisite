import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        <div className={styles.section}>
          <h3>Instituição</h3>
          <p>Sobre nós</p>
          <p>Política de Privacidade</p>
          <p>Perguntas Frequentes</p>
        </div>

        <div className={styles.section}>
          <h3>Suporte</h3>
          <p>Entre em contato</p>
          <p>Central de ajuda</p>
        </div>

        <div className={styles.section}>
          <h3>Navegação</h3>
          <p>Home</p>
          <p>Vagas</p>
          <p>Sou empresa</p>
        </div>

      </div>

      <div className={styles.copy}>
        EmpregAki © 2024 – Todos os direitos reservados
      </div>
    </footer>
  );
}
