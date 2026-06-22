import Beneficios from "@/components/Beneficios/Beneficios";
import styles from "./page.module.css";
import React from "react";
import VagasCard from "@/components/VagasCard/VagasCard";
import Image from "next/image";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";
import CarrosselVagas from "@/components/CarrosselVagas/CarrosselVagas";

export default async function Home() {
  const resposta = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/vagas`,
    {
      cache: "no-store",
    }
  );
  
  const vagas = await resposta.json();
  const respostaStats = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/dashboard`,
    {
      cache: "no-store",
    }
  );
  
  const stats = await respostaStats.json();

  if (!resposta.ok) {
    throw new Error("Erro ao buscar vagas");
  }
  
  return (
    <>
      {/* HERO */}
      <section className={styles.bannerContainer}>
        <div className={styles.bannerText}>
          <span className={styles.badge}>
            Plataforma de Empregos
          </span>

          <h2>
            Conectando talentos às melhores oportunidades
          </h2>

          <p>
            Encontre vagas, descubra empresas e dê o próximo
            passo na sua carreira com o EmpregAki.
          </p>

          <div className={styles.heroButtons}>
            <Link href="/vagas">
              <button className={styles.btnPrincipal}>
                Explorar vagas
              </button>
            </Link>

            <Link href="/empresas">
              <button className={styles.btnSecundario}>
                Ver empresas
              </button>
            </Link>
          </div>
        </div>

        <div className={styles.logoImage}>
          <Image
            src="/banner.png"
            alt="Banner principal"
            fill
            priority
          />
        </div>
      </section>

      {/* ESTATÍSTICAS */}
      <section className={styles.stats}>
        <div className={styles.stat}>
          <h3>{vagas.length}+</h3>
          <span>Vagas disponíveis</span>
        </div>

        <div className={styles.stat}>
          <h3>{stats.candidatos}</h3>
          <span>Candidatos</span>
        </div>

        <div className={styles.stat}>
          <h3>{stats.empresas}</h3>
          <span>Empresas</span>
        </div>
      </section>

      {/* VAGAS */}
      <CarrosselVagas vagas={vagas.slice(0, 5)} />

      <Beneficios />

      {/* CTA FINAL */}
      <section className={styles.cta}>
        <h2>
          Pronto para encontrar sua próxima oportunidade?
        </h2>

        <p>
          Explore vagas e conecte-se às empresas que estão
          procurando talentos como você.
        </p>

        <Link href="/vagas">
          <button className={styles.btnPrincipal}>
            Ver vagas
          </button>
        </Link>
      </section>

      <Footer />
    </>
  );
}