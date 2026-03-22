"use client";


import { useState } from "react";
import Link from "next/link";
import style from"./empresasCard.module.css";

export default function EmpresasClient({ empresas }) {
  const [busca, setBusca] = useState("");

  const empresasFiltradas = empresas.filter((empresa) =>
    empresa.nome_da_empresa.toLowerCase().includes(busca.toLowerCase())
  );
  return (
    <section className={style.containerAll}>
      <div className={style.titulo}>
        <h1>Empresas Cadastradas</h1>

        <input
          type="text"
          className={style.buscarEmpresas}
          placeholder="Buscar empresa..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      <div className={style.empresasList}>
        {empresasFiltradas.length === 0 ? (
          <p>Nenhuma empresa encontrada</p>
        ) : (
         empresasFiltradas.map((empresa) => (
            <Link
              key={empresa.cnpj}
              href={`/empresas/${empresa.cnpj}`}
              className={style.cardEmpresas}
            >
              <div className={style.cardInfo}>
                <h3>{empresa.nome_da_empresa}</h3>
                <p> 📞{empresa.contato}</p>
                <p>📍{empresa.endereco}</p>
                <p>📝{empresa.sobre_a_empresa}</p>
              </div>
            </Link>
         ))
        )}
      </div>
    </section>
  );
}
