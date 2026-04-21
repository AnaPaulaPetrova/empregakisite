import Link from "next/link"
import styles from "./impresaDetalhes.module.css"

import React from 'react'

export async function buscarEmpresa(cnpj) {
  try {
    const resposta = await fetch(`http://localhost:3000/api/empresas/${cnpj}`, {
        cache: "no-store",
    });
    if (!resposta.ok) {
    return <div>empresa não encontrada</div>;
  }
  return await resposta.json();    
  } catch (error) {
    console.error('Erro ao buscar empresa:', error);
    return null;
  }
}

export default async function empresaDetalhes( {params} ) {
    const { cnpj } = await params;
    const empresa = await buscarEmpresa(cnpj);

    if(!empresa) {
      return (
        <div className={styles.notFound}>
          <h1>Empresa não encontrada</h1>
          <Link href="/empresas" className={styles.voltarLink}> Voltar para Empresas
          </Link>
        </div>
      );
    }     

  return (
    <main className={styles.perfilContainer}>
      <section className={styles.perfilCard}>

        <div className={styles.perfilTopo}>

          <div className={styles.empresaLogo}></div>

          <div className={styles.empresaInfo}>
            <h1>{empresa.nome_da_empresa}</h1>

            <p className={styles.info}>
              📞 {empresa.contato}
            </p>

            <p className={styles.info}>
              📍 {empresa.endereco}
            </p>

            {/* <Link href={"/vagas/criar"}><button className={styles.btnVaga}>
                Anunciar Vaga
              </button>
            </Link> */}
          </div>

        </div>

        <div className={styles.empresaDescricao}>

          <h2>Sobre a empresa</h2>
          <p>
            {empresa.sobre_a_empresa}
          </p>

          <h2>Diferências</h2>

          <p>
            <strong>Missão:</strong> {empresa.missao}
          </p>

          <p>
            <strong>Visão:</strong> {empresa.visao}
          </p>

          <p>
            <strong>Valores:</strong> {empresa.valor}
          </p>

        </div>

        {/* <div className={styles.vagas}>

          <h2>Vagas disponíveis</h2>

          <div className={styles.vagasGrid}>
            {vagas.map((vaga) => (
              <div key={vaga.id} className={styles.vagaCard}>
                <h3>{vaga.titulo}</h3>
                <p>Número de inscritos: {vaga.inscritos || 0}</p>
              </div>
            ))}
          </div>
        </div> */}

      </section>
    </main>
  );
}