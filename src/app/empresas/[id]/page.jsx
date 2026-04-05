import React from 'react'
import styles from "./impresaDetalhes.module.css"

export default async function perfilEmpresaCnpj( {params} ) {

    const resolvedParams = await params;
    const { cnpj } = resolvedParams;

    const resposta = await fetch(`http://localhost:3000/api/empresas/${cnpj}`, {
        cache: "no-store",
    });

       if (!resposta.ok) {
    return <div>empresa não encontrada</div>;
  }
    const empresa = await resposta.json();

  return (
    <section className={styles.container}> 
        <h1>{empresa.nome_da_empresa}</h1>

        <p><strong>CNPJ: </strong>{empresa.cnpj}</p>
        <p><strong>Contato: </strong>{empresa.contato}</p>
        <p><strong>Endereço: </strong>{empresa.endereco}</p>

        <h3>Sobre</h3>
        <p>{empresa.sobre_a_empresa}</p>

        <h3>Missão</h3>
        <p>{empresa.missao}</p>

        <h3>Visão</h3>
        <p>{empresa.visao}</p>

        <h3>Valores</h3>
        <p>{empresa.valor}</p>

    </section>
  )
}
