"use client";

import { useState } from "react";
import { FiUser, FiPhone, FiMapPin, FiFileText, FiSave, FiEdit3 } from "react-icons/fi";
import styles from "./perfil.module.css";

export default function PerfilForm({ dados }) {
  const [editandoCurriculo, setEditandoCurriculo] = useState (false);

  const [curriculo, setCurriculo] = useState(dados?.curriculo || "" );

  async function salvarCurriculo() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "/api/candidatos/curriculo",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ curriculo }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erro ao atualizar currículo");
        return;
      }

      alert("Currículo atualizado!");

      setEditandoCurriculo(false);

    } catch (error) {
      console.error(error);
      alert("Erro de conexão com o servidor");
    }
  }

  const [form, setForm] = useState({
    nome: dados?.nome || "",
    contato: dados?.contato || "",
    endereco: dados?.endereco || "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleUpdate(e) {
    e.preventDefault();
    setLoading(true);

    try {
      // 🔥 PEGANDO TOKEN DO LOCALSTORAGE
      const token = localStorage.getItem("token");

      const response = await fetch("/api/candidatos/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 🔥 IMPORTANTE
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erro ao atualizar perfil");
        return;
      }

      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro de conexão com o servidor");
    } finally {
      setLoading(false);
    }
  }

  return (
  <div className={styles.container}>

    <div className={styles.header}>
      <h1>Meu Perfil</h1>
      <p>
        Atualize seus dados e mantenha seu currículo sempre atualizado.
      </p>
    </div>

    {/* DADOS PESSOAIS */}
    <div className={styles.card}>

      <div className={styles.cardTitle}>
        <FiUser />
        <h2>Dados Pessoais</h2>
      </div>

      <form
        onSubmit={handleUpdate}
        className={styles.form}
      >

        <label>
          <FiUser />
          Nome
        </label>

        <input
          className={styles.input}
          type="text"
          name="nome"
          value={form.nome}
          onChange={handleChange}
        />

        <label>
          <FiPhone />
          Contato
        </label>

        <input
          className={styles.input}
          type="text"
          name="contato"
          value={form.contato}
          onChange={handleChange}
        />

        <label>
          <FiMapPin />
          Endereço
        </label>

        <input
          className={styles.input}
          type="text"
          name="endereco"
          value={form.endereco}
          onChange={handleChange}
        />

        <button
          className={styles.button}
          type="submit"
          disabled={loading}
        >
          <FiSave />

          {loading
            ? "Salvando..."
            : "Salvar Alterações"}
        </button>

      </form>

    </div>

    {/* CURRÍCULO */}
    <div className={styles.cardCurriculo}>

      <div className={styles.cardTitle}>
        <FiFileText />
        <h2>Currículo</h2>
      </div>

      {!editandoCurriculo ? (
        <>
          <div className={styles.curriculoPreview}>
            {curriculo ||
              "Nenhum currículo cadastrado."}
          </div>

          <button
            type="button"
            onClick={() =>
              setEditandoCurriculo(true)
            }
            className={styles.button}
          >
            <FiEdit3 />
            Editar Currículo
          </button>
        </>
      ) : (
        <>
          <textarea
            className={styles.textarea}
            value={curriculo}
            onChange={(e) =>
              setCurriculo(e.target.value)
            }
            placeholder="Escreva seu currículo aqui..."
          />

          <div className={styles.actions}>
            <button
              type="button"
              onClick={salvarCurriculo}
              className={styles.button}
            >
              <FiSave />
              Salvar Currículo
            </button>

            <button
              type="button"
              onClick={() =>
                setEditandoCurriculo(false)
              }
              className={styles.buttonSecondary}
            >
              Cancelar
            </button>
          </div>
        </>
      )}

    </div>

  </div>
);
}