"use client";

import React, { useState } from 'react'
import "./vagaCard.css";

export default function BuscarVagas({ vagas }) {
    const [busca, setBusca] = useState("");

    const vagasFiltradas = vagas.filter((vagas) => vagas.title.toLowerCase().includes(busca.toLocaleLowerCase())
);
  return (
    <div className="container-all">
      <div className="title">
        <h1>Vagas Disponiveis</h1>

        <input
          type="text"
          className="buscar-vaga"
          placeholder="Buscar vagas..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

    
        <div className="vagas-list">
        {vagasFiltradas.length === 0 ? (<p> Nenhuma vaga encontrada</p>) : (
            vagasFiltradas.map((vaga) => (
                <div className="card-vagas" key={vaga.id}>
                    <div className="card-header">
                        <h3>{vaga.title}</h3>
                </div>
                <div className="card-body">
                    <p className="info">{vaga.location}</p>
                    <p className="info">{vaga.salary}</p>
                    <p className="info">{vaga.description}</p>
                </div>
                </div>
            ))
        )}
        </div>
    </div>
  )
}
