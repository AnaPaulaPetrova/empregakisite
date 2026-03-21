"use client";

import React, { useState } from 'react'
import "./vagaCard.css";

export default function BuscarVagas({ vagas }) {
    const [busca, setBusca] = useState("");

    const vagasFiltradas = vagas.filter((vaga) => vaga.titulo.toLowerCase().includes(busca.toLocaleLowerCase())
);
  return(

    <div className="container-all">
      <div className="title">
        <h1>Vagas disponíveis</h1>

      <input
          type="text"
          className="buscarVaga"
          placeholder="Buscar vagas..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

    <div className="vagas-list">
      {vagasFiltradas.length === 0 ?(<p>Nenhuma vaga encontrada</p>) : (vagasFiltradas.map((vaga) => (

      <Link
        key={vaga.id}
        href={`/vagas/${vaga.id}`}
        className="cardVaga"
      >

        <h3>{vaga.titulo}</h3>
        <h4>{vaga.empresa}</h4>

        <div className="infoVaga">
          <span>📍 {vaga.localizacao}</span>
          <span>R$ {vaga.salario}</span>
        </div>

        <p>{vaga.descricao}</p>
      </Link>

    ))
  )}
   </div>
  </div>
 );
}
