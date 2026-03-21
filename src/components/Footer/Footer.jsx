import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        {/* Instituição */}
        <div className={styles.section}>
          <h3>Instituição</h3>
          <nav>
            <ul>
              <li>
                <Link href="/sobre-nos">Sobre nós</Link>
              </li>
              <li>Política de Privacidade</li>
              <li>Perguntas Frequentes</li>
            </ul>
          </nav>
        </div>

        {/* Suporte */}
        <div className={styles.section}>
          <h3>Suporte</h3>
          <nav>
            <ul>
              <li>Entre em contato</li>
              <li>Central de ajuda</li>
            </ul>
          </nav>
        </div>

        {/* Navegação */}
        <div className={styles.section}>
          <h3>Navegação</h3>
          <nav>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/vagas">Vagas</Link>
              </li>
              <li>Sou empresa</li>
            </ul>
          </nav>
        </div>

      </div>

      <div className={styles.copy}>
        EmpregAki © 2024 – Todos os direitos reservados
      </div>
    </footer>
  );
}