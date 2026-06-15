"use client";

import { useState, useEffect } from "react";

export default function EmpresaPerfil({ empresa }) {
  const [editando, setEditando] = useState(false);

  //  proteção contra empresa undefined
  const [form, setForm] = useState({
    missao: "",
    visao: "",
    valores: "",
  });

  //  garante que os dados só sejam carregados quando empresa existir
  useEffect(() => {
    if (empresa) {
      setForm({
        missao: empresa.missao || "",
        visao: empresa.visao || "",
        valores: empresa.valores || "",
      });
    }
  }, [empresa]);

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function salvarAlteracoes() {
    const res = await fetch(`/api/empresas/${empresa.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Atualizado com sucesso!");
      setEditando(false);
    } else {
      alert("Erro ao atualizar");
    }
  }

  // 🛡️ proteção principal
  if (!empresa) {
    return <p>Carregando dados da empresa...</p>;
  }

  return (
    <div>
      <h2>Perfil da Empresa</h2>

      {!editando ? (
        <>
          <p><strong>Missão:</strong> {empresa.missao || "-"}</p>
          <p><strong>Visão:</strong> {empresa.visao || "-"}</p>
          <p><strong>Valores:</strong> {empresa.valores || "-"}</p>

          <button onClick={() => setEditando(true)}>
            Editar
          </button>
        </>
      ) : (
        <>
          <label>Missão</label>
          <textarea
            name="missao"
            value={form.missao}
            onChange={handleChange}
          />

          <label>Visão</label>
          <textarea
            name="visao"
            value={form.visao}
            onChange={handleChange}
          />

          <label>Valores</label>
          <textarea
            name="valores"
            value={form.valores}
            onChange={handleChange}
          />

          <button onClick={salvarAlteracoes}>
            Salvar
          </button>

          <button onClick={() => setEditando(false)}>
            Cancelar
          </button>
        </>
      )}
    </div>
  );
}