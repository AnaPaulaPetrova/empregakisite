import Link from "next/link";
import { FiHome, FiFileText, FiPlusCircle, FiUsers, FiEdit, } from "react-icons/fi";
import styles from "./layout.module.css";

export default function EmpresaLayout({ children }) {
  return (
    <div className={styles.layout}>

      <aside className={styles.sidebar}>

        <div className={styles.logo}>
          <h2><FiHome /> EmpregaKi</h2>
          <span>Área da Empresa</span>
        </div>

        <nav className={styles.nav}>
          <Link 
            href="/empresas/" 
            className={styles.link}
          >
            <FiHome />
            <span>Início</span>
          </Link>

          <Link
            href="/empresas/vagas"
            className={styles.link}
          >
            <FiFileText />
            <span>Minhas Vagas</span>
          </Link>

          <Link
            href="/empresas/vagas/criar"
            className={styles.link}
          >
            <FiPlusCircle />
            <span>Criar Vaga</span>
          </Link>

          <Link
            href="/empresas/candidatos"
            className={styles.link}
          >
            <FiUsers />
            <span>Candidatos</span>
          </Link>

          <Link
            href="/empresas/editar"
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