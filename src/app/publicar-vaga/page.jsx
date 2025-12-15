"use client";

import React, { useState } from "react";
import "./publicar.css";

export default function PublicarVagaPage() {
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    requisitos: "",
    area: "",
    salario: "",
    localizacao: "",
    cargaHoraria: "",
    numeroVagas: "",
    contato: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function publicar() {
    const response = await fetch("/api/vagas");

    const result = await response.json();

    if (response.ok) {
      alert("Vaga publicada com sucesso!");
      setForm({
        titulo: "",
        descricao: "",
        requisitos: "",
        area: "",
        salario: "",
        localizacao: "",
        cargaHoraria: "",
        numeroVagas: "",
        contato: "",
      });
    } else {
      alert("Erro: " + result.error);
    }
  }

  return (
    <div className="container-pagina">
      <div className="box-form">
        <h2>Publique sua vaga</h2>

        <label>Título</label>
        <input name="titulo" value={form.titulo} onChange={handleChange} />

        <label>Descrição</label>
        <textarea name="descricao" value={form.descricao} onChange={handleChange} />

        <label>Requisitos</label>
        <textarea name="requisitos" value={form.requisitos} onChange={handleChange} />

        <label>Área</label>
        <input name="area" value={form.area} onChange={handleChange} />

        <label>Salário</label>
        <input name="salario" value={form.salario} onChange={handleChange} />

        <label>Localização</label>
        <input name="localizacao" value={form.localizacao} onChange={handleChange} />

        <label>Carga horária</label>
        <input name="cargaHoraria" value={form.cargaHoraria} onChange={handleChange} />

        <label>Nº de vagas</label>
        <input type="num" name="numeroVagas" value={form.numeroVagas} onChange={handleChange} />

        <label>Contato</label>
        <input name="contato" value={form.contato} onChange={handleChange} />

        <button onClick={publicar}>Publicar vaga</button>
      </div>
    </div>
  );
}
