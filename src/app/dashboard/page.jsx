"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from "./dashboard.module.css"

export default function Dashboard() {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const id = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

        if (id && token) {
          setUsuario(id);
          // Redireciona pro perfil em 1.5s 
          const timer = setTimeout(() => {
            router.push(`/perfil/${id}`);
          }, 1500);
          return () => clearTimeout(timer);
        } else {
            router.push("/auth/login");
        }
      }, [router] );
   
    if (loading) {
        return <h2> Carregando... </h2>
    }
    return (
        <main className={styles.dashboardContainer}>
            <div className={styles.welcomeCard}>
                <div className={styles.logoSection}>
                    <div className={styles.logo}>
                        <span className={styles.logoIcon}>🚀</span>
                        <h1 className={styles.logoText}>Empregaki</h1>
                    </div>
                </div>

                <div className={styles.content}>
                    <h2 className={styles.titulo}>Bem-vindo de volta!</h2>
                    <p className={styles.subtitulo}>
                        Preparando seu perfil personalizado...
                    </p>

                    <div className={styles.loadingSection}>
                        <div className={styles.spinner}></div>
                        <p className={styles.loadingText}>
                            Carregando perfil do usuário <strong>#{userId || '...'}</strong>
                        </p>
                        <div className={styles.progressBar}>
                            <div className={styles.progressFill}></div>
                        </div>
                    </div>

                    <div className={styles.stats}>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>2</span>
                            <span className={styles.statLabel}>segundos</span>
                        </div>
                        <div className={styles.statDivider}></div>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>100%</span>
                            <span className={styles.statLabel}>Seguro</span>
                        </div>
                    </div>
                </div>

                <div className={styles.footer}>
                    <p>Empregaki - Conectando talentos e empresas</p>
                </div>
            </div>
        </main>
    );
}
