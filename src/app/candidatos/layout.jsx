import Link from "next/link";
import { FiHome,  FiBriefcase, FiEdit,  FiUser } from "react-icons/fi";

import styles from "./layout.module.css";

export default function CandidatoLayout({ children }) {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>

        <div className={styles.logo}>
          <h2><FiHome /> EmpregaKi</h2>
          <span>Área do Candidato</span>
        </div>

        <nav className={styles.nav}>

          <Link
            href="/candidatos"
            className={styles.link}
          >
            <FiHome />
            <span>Início</span>
          </Link>

          <Link
            href="/candidatos/vagas"
            className={styles.link}
          >
            <FiBriefcase />
            <span>Vagas</span>
          </Link>

          <Link
            href="/candidatos/editar"
            className={styles.link}
          >
            <FiEdit />
            <span>Editar Perfil</span>
          </Link>

        </nav>
      </aside>

      <main className={styles.main}>
        {children}
      </main>

    </div>
  );
}