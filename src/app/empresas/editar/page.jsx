"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiHome, FiPhone, FiMapPin, FiFileText, FiTarget, FiEye, FiAward, FiSave, } from "react-icons/fi";
import styles from "./editar.module.css"

export default function EditarEmpresa() {
  const [ empresa, setEmpresa] = useState({
    nome: "",
    contato: "",
    endereco: "",
    sobre_empresa: "",
    missao: "",
    visao: "",
    valores: "",
  });

  const router = useRouter();

  // BUSCAR DADOS
  useEffect(() => {
    async function carregarEmpresa() {
      const token = localStorage.getItem("token");

      const resposta = await fetch("/api/empresas/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

        const data = await resposta.json();

        setEmpresa({
        nome: data.nome || "",
        contato: data.contato || "",
        endereco: data.endereco || "",
        sobre_empresa: data.sobre_empresa || "",
        missao: data.missao || "",
        visao: data.visao || "",
        valores: data.valores || "",
        });
      }
      carregarEmpresa();
    }, []);

  // 🔵 ALTERAR CAMPOS
  const handleChange = (e) => {
    setEmpresa({
      ...empresa,
      [e.target.name]: e.target.value,
    });
  }
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    const resposta = await fetch("/api/empresas/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(empresa),
    });

    const data = await resposta.json();

    if (!resposta.ok) {
      alert(data.error || "Erro ao salvar");
      return;
    }

    router.push("/empresas");
    router.refresh();

  } catch (error) {
    console.error(error);
    alert("Erro ao salvar perfil");
  }
};

  return (
    <div className={styles.container}>
      <h1>Editar Perfil da Empresa</h1>
      <p className={styles.descricao}> Atualize as informações institucionais da sua empresa.
      </p>

      {/* <h2 className={styles.secao}> Informações Básicas </h2> */}

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}><FiHome />Nome da Empresa</label>
        <input
          name="nome"
          value={empresa.nome}
          onChange={handleChange}
        />

        <label className={styles.label}><FiPhone/> Contato</label>
        <input
          name="contato"
          value={empresa.contato}
          onChange={handleChange}
        />

        <label className={styles.label}><FiMapPin />Endereço</label>
        <input
          name="endereco"
          value={empresa.endereco}
          onChange={handleChange}
        />

        {/* <h2 className={styles.secao}> Sobre a Empresa </h2> */}

        <label className={styles.label}><FiFileText /> Sobre a Empresa</label>
        <textarea
          name="sobre_empresa"
          value={empresa.sobre_empresa}
          onChange={handleChange}
        />

        <label className={styles.label}><FiTarget /> Missão</label>
        <textarea
          name="missao"
          value={empresa.missao}
          onChange={handleChange}
        />
 
        <label className={styles.label}><FiEye /> Visão</label>
        <textarea
          name="visao"
          value={empresa.visao}
          onChange={handleChange}
        />

        <label className={styles.label}><FiAward /> Valores</label>
        <textarea
          name="valores"
          value={empresa.valores}
          onChange={handleChange}
        />

        <button className={styles.button} type="submit"> <FiSave />
          Salvar Alterações
        </button>
      </form>
    </div>
  );
}