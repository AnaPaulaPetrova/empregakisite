import Link from "next/link";
import {
  FiBriefcase,
  FiUsers,
  FiMail,
  FiMapPin,
} from "react-icons/fi";

import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        {/* Marca */}
        <div className={styles.brand}>
          <h2>
            EMPREG<span>AKI</span>
          </h2>

          <p>
            Conectando talentos e oportunidades em
            Jaguaruana e região.
          </p>
        </div>

        {/* Instituição */}
        <div className={styles.section}>
          <h3>
            <FiUsers />
            Instituição
          </h3>

          <ul>
            <li>
              <Link href="/quem-somos">
                Sobre Nós
              </Link>
            </li>

            <li>
              <Link href="/politica-de-privacidade">
                Política de Privacidade
              </Link>
            </li>

            <li>
              <Link href="#">
                Perguntas Frequentes
              </Link>
            </li>
          </ul>
        </div>

        {/* Navegação */}
        <div className={styles.section}>
          <h3>
            <FiBriefcase />
            Navegação
          </h3>

          <ul>
            <li>
              <Link href="/">
                Home
              </Link>
            </li>

            <li>
              <Link href="/vagas">
                Vagas
              </Link>
            </li>

            <li>
              <Link href="/todasEmpresas">
                Empresas
              </Link>
            </li>
          </ul>
        </div>

        {/* Contato */}
        <div className={styles.section}>
          <h3>
            <FiMail />
            Contato
          </h3>

          <ul>
            <li>
              <FiMapPin />
              Jaguaruana - CE
            </li>

            <li>
              contato@empregaki.com
            </li>
          </ul>
        </div>

      </div>

      <div className={styles.copy}>
        <p>
          © 2026 EmpregAki • Desenvolvido por estudantes de
          Análise e Desenvolvimento de Sistemas do IFCE
          Campus Jaguaruana.
        </p>
      </div>
    </footer>
  );
}