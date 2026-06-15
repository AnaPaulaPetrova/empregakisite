"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./editarVaga.module.css";

export default function EditarVagaForm({ vaga }) {
  const [form, setForm] = useState({...vaga,
     data_limite: vaga.data_limite 
     ? new Date(vaga.data_limite).toISOString().split("T")[0] 
     : "",
  });

  const router = useRouter();

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  async function handleSubmit(e) {
  e.preventDefault();

  const token = localStorage.getItem("token");

  const resposta = await fetch(
    `/api/empresas/vagas/${form.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    }
  );

  const data = await resposta.json();

  if (!resposta.ok) {
    alert(data.error || "Erro ao atualizar vaga");
    return;
  }

  alert("Vaga atualizada com sucesso!");

  router.push("/empresas/vagas");
  router.refresh();
}

  return (
  <div className={styles.container}>
    <div className={styles.card}>

      <h1 className={styles.titulo}>
        Editar Vaga
      </h1>

      <p className={styles.subtitulo}>
        Atualize as informações da vaga.
      </p>

      <form onSubmit={handleSubmit}>

        <div className={styles.grupo}>
          <label>Título</label>

          <input
            className={styles.input}
            name="titulo"
            value={form.titulo || ""}
            onChange={handleChange}
          />
        </div>

        <div className={styles.grupo}>
          <label>Descrição</label>
          <textarea
            className={styles.textarea}
            name="descricao"
            value={form.descricao || ""}
            onChange={handleChange}
          />
        </div>
         <div className={styles.grupo}>
            <label>Requisitos</label>
            <textarea
              className={styles.textarea}
              name="requisitos"
              value={form.requisitos || ""}
              onChange={handleChange}
            />
          </div>

          <div className={styles.grupo}>
            <label>Responsabilidades</label>
            <textarea
              className={styles.textarea}
              name="responsabilidades"
              value={form.responsabilidades || ""}
              onChange={handleChange}
            />
          </div>

          <div className={styles.grupo}>
            <label>Diferenciais</label>
            <textarea
              className={styles.textarea}
              name="diferenciais"
              value={form.diferenciais || ""}
              onChange={handleChange}
            />
          </div>

          <div className={styles.grupo}>
            <label>Tipo de Contrato</label>
            <input
              className={styles.input}
              name="tipo_contrato"
              value={form.tipo_contrato || ""}
              onChange={handleChange}
            />
          </div>

          <div className={styles.grupo}>
            <label>Benefícios</label>
            <textarea
              className={styles.textarea}
              name="beneficios"
              value={form.beneficios || ""}
              onChange={handleChange}
            />
          </div>

          <div className={styles.grupo}>
            <label>Área de Atuação</label>
            <input
              className={styles.input}
              name="area_atuacao"
              value={form.area_atuacao || ""}
              onChange={handleChange}
            />
          </div>

          <div className={styles.grupo}>
            <label>Salário</label>
            <input
              className={styles.input}
              type="number"
              step="0.01"
              name="salario"
              value={form.salario || ""}
              onChange={handleChange}
            />
          </div>

          <div className={styles.grupo}>
            <label>Localização</label>
            <input
              className={styles.input}
              name="localizacao"
              value={form.localizacao || ""}
              onChange={handleChange}
            />
          </div>

          <div className={styles.grupo}>
            <label>Carga Horária</label>
            <input
              className={styles.input}
              type="number"
              name="carga_horaria"
              value={form.carga_horaria || ""}
              onChange={handleChange}
            />
          </div>

          <div className={styles.grupo}>
            <label>Número de Vagas</label>
            <input
              className={styles.input}
              type="number"
              name="numero_vagas"
              value={form.numero_vagas || ""}
              onChange={handleChange}
            />
          </div>

          <div className={styles.grupo}>
            <label>Contato</label>
            <input
              className={styles.input}
              name="contato"
              value={form.contato || ""}
              onChange={handleChange}
            />
          </div>

          <div className={styles.grupo}>
            <label>Data Limite</label>
            <input
              className={styles.input}
              type="date"
              name="data_limite"
              value={form.data_limite || ""}
              onChange={handleChange}
            />
          </div>

          <div className={styles.checkboxContainer}>
            <label>
              <input
                type="checkbox"
                name="ativo"
                checked={form.ativo ?? true}
                onChange={handleChange}
              />
              Vaga ativa
            </label>
          </div>

        <div className={styles.botoes}>

          <button
            type="submit"
            className={styles.salvar}
          >
            Salvar Alterações
          </button>

          <button
            type="button"
            className={styles.voltar}
            onClick={() => router.push("/empresas/vagas")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
);
}