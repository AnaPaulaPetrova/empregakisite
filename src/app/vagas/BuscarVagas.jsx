"use client";

import { useState } from "react";
import style from"./vagaCard.module.css";
import Link from "next/link";

export default function BuscarVagas({ vagas }) {
  const [busca, setBusca] = useState("");

  const vagasFiltradas = vagas.filter((vaga) =>
    vaga.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className={style.containerAll}>
      <div className={style.titulo}>
        <h1>Vagas Disponíveis</h1>

        <input
          type="text"
          className={style.buscarVaga}
          placeholder="Buscar vagas..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>
      <div className={style.vagasList}>
        {vagasFiltradas.length === 0 ?(
          <p>Nenhuma vaga encontrada</p>
        ) : (
          vagasFiltradas.map((vaga) => (
            <Link 
              key={vaga.id} 
              href={`/vagas/${vaga.id}`}
              className={style.vagaCard}
            >
               <div className={style.cardInfo}>   
                  <h3>{vaga.titulo}</h3>
                  <span>📍{vaga.localizacao}</span>
                  <span>R$ {vaga.salario}</span>
                  <p>📝 {vaga.descricao}</p>
                </div> 
            </Link>
        ))
      )}
      </div>
    </div>
  );
}