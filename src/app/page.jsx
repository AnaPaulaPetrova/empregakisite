import Beneficios from "@/components/Beneficios/Beneficios";
import styles from "./page.module.css";
import React from 'react'
import VagasCard from "@/components/VagasCard/VagasCard";
import Image from "next/image";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";

export default async function Home() {
  const resposta = await fetch("http://localhost:3000/api/vagas", {
  cache: "no-store",
});

if (!resposta.ok) {
  throw new Error("Erro ao buscar vagas");
}

  const vagas = await resposta.json();

  return (
    <>
      {/* <h1 className={styles.logo}>EMPREGAKI</h1>
      <p className={styles.slogan}>
        Conectando pessoas a oportunidades
      </p> */}
   
       {/* Banner */}
       <section className={styles.bannerContainer}>
         <div className={styles.bannerText}>
           <h2>Encontre o trabalho certo, sem complicação</h2>
           <p>
             O lugar onde você encontra oportunidades que se encaixam no seu perfil.
           </p>

           <Link href={"./vagas"}>
            <button className={styles.btnVerVagas}>Ver vagas</button>
            </Link>

         </div>
   
         <div className={styles.logoImage}>
          <Image
            src="/banner.png"
            alt="Banner principal"
            fill
            priority
          />
           {/* Aqui você pode colocar uma imagem depois */}
        </div>

       </section>
   
       {/* Cards das principais vagas */}
      <section className={styles.vagasSection}>
        <div className={styles.vagasHeader}>
          <h2>Vagas em destaque</h2> 
          <Link href={"./vagas"}>
            <button className={styles.bntVerTodas}>Ver todas</button>
          </Link>
        </div>
   
          <div className={styles.vagasCards}>
            {vagas.slice(0, 4).map((vaga) => (
              <VagasCard
                key={vaga.id}
                id={vaga.id}
                titulo={vaga.titulo}
                localizacao={vaga.localizacao}
                descricao={vaga.descricao}
              />
            ))}     
          </div>
      </section>

      <Beneficios />
      <Footer />    
    </>
  );
}
