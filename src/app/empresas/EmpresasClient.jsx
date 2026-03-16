"use client";

import { useState } from "react";
import "./empresasCard.css";

export default function EmpresasClient({ empresas }) {
  const [busca, setBusca] = useState("");

  const empresasFiltradas = empresas.filter((empresa) =>
    empresa.nome_da_empresa.toLowerCase().includes(busca.toLowerCase())
  );
  return (
    <div className="container-all">
      <div className="title">
        <h1>Empresas Cadastradas</h1>

        <input
          type="text"
          className="buscar-empresas"
          placeholder="Buscar empresa..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>
      <div className="empresas-list">
        {empresasFiltradas.length === 0 ? (
          <p>Nenhuma empresa encontrada</p>
        ) : (
          empresasFiltradas.map((empresa) => (
            <div className="card-empresas" key={empresa.cnpj}>
              <div className="card-header">
                <h3>{empresa.nome_da_empresa}</h3>
              </div>
              <div className="card-body">
                <span className="info">{empresa.contato}</span>
                <span className="info">{empresa.endereco}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
