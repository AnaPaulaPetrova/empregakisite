"use client";

import { useState } from "react";
import "./empresasCard.css";

export default function EmpresasClient({ empresas }) {
  const [busca, setBusca] = useState("");

  const empresasFiltradas = empresas.filter((empresa) =>
    empresa.name.toLowerCase().includes(busca.toLowerCase())
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
                <h3>{empresa.name}</h3>
              </div>
              <div className="card-body">
                <p className="info">{empresa.contact}</p>
                <p className="info">{empresa.email}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
