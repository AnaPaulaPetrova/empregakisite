import React from 'react'
import styles from "./Header.module.css"
import Link from 'next/link';
export default function Header() {
  return (
      <header className={styles.header}>
        {/* Logo */}
        <div className={styles.logo}>
          <a href={"/"}>EMPREG<span className={styles.aki}>AKI</span></a>
        </div>

        {/* Menu */}
        <nav className={styles.menu}>
          <ul>
            <li>
              <Link href={"/vagas"}>Vagas</Link>
            </li>
            <li>
              <Link href={"/empresas"}>Empresas</Link>
            </li>
            <li>Blog</li>
          </ul>
        </nav>
        <Link href={"/cadastroEmpresa"}>
        <button className={styles.button}>Cadastro</button></Link>
      </header>
  );
}
