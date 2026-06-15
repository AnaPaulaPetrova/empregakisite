"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiBriefcase, FiFileText, FiMapPin, FiClock, FiUsers, FiPhone, FiDollarSign } from "react-icons/fi"

import styles from "./criarVagas.module.css"

export default function CriarVaga() {
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    requisitos: "",
    responsabilidades: "",
    tipo_contrato: "",
    diferenciais: "",
    beneficios: "",
    area_atuacao: "",
    salario: "",
    localizacao: "",
    carga_horaria: "",
    numero_vagas: "",
    contato: "",
    data_limite: ""
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");

    const res = await fetch("/api/vagas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      setLoading(false);
      return;
    } else {
      //alert("Vaga publicada com sucesso!");
      router.push("/empresas/vagas"); // ou "/empresas/vagas"
      //router.push("/empresas/vagas?created=true");
    }

  }

  return (
    <div className={styles.vagaContainer}>
      <h1 className={styles.vagaTitulo}>Criar Nova Vaga</h1>
      <p className={styles.vagaSubtitulo}>
        Encontre os candidatos certos para sua empresa
      </p>

        <form className={styles.vagaFormulario} onSubmit={handleSubmit} >

        {/* Infomações Principais */}
          <div className={styles.sectionTitle}>
            Informações principais
          </div>

          {/* Título */}
          <div className={styles.inputGroup}>
            <div className={styles.labelRow}>
              <FiBriefcase className={styles.labelIcon} />
              <label> Titulo da vaga </label>
            </div>
            <div className={styles.textareaBox}>
              <textarea
                name="titulo"
                placeholder="Título..." 
                value={form.titulo} 
                onChange={handleChange} required />
            </div>
          </div>

          {/* Descrição */}
          <div className={styles.inputGroup}>
            <div className={styles.labelRow}>
            <FiFileText className={styles.labelIcon} />
            <label>Descrição detalhada</label>
          </div>
            <div className={styles.textareaBox}>
              <textarea 
                name="descricao" 
                placeholder="Descreva a vaga..." 
                value={form.descricao} 
                onChange={handleChange} required />
            </div>
          </div>
        
        {/* REQUISITOS */}
        <div className={styles.inputGroup}>
          <div className={styles.labelRow}>
            <FiFileText className={styles.labelIcon} />
            <label>Requisitos</label>
          </div>
            <div className={styles.textareaBox}>
              <textarea 
                name="requisitos"
                rows={5}
                placeholder="Descreva os Requisitos da vaga..." 
                value={form.requisitos} 
                onChange={handleChange} >
              </textarea>
              </div>
            </div>
            {/* RESPONSABILIDADES */}
            <div className={styles.inputGroup}>
              <div className={styles.labelRow}>
                <FiFileText className={styles.labelIcon} />
                <label>Responsabilidades</label>
              </div>
              <div className={styles.textareaBox}>
                <textarea
                  name="responsabilidades"
                  rows={5}
                  placeholder="Descreva as principais responsabilidades da vaga..."
                  value={form.responsabilidades}
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* DIFERENCIAIS */}
            <div className={styles.inputGroup}>
              <div className={styles.labelRow}>
                <FiFileText className={styles.labelIcon} />
                <label>Diferenciais</label>
              </div>
              <div className={styles.textareaBox}>
                <textarea
                  name="diferenciais"
                  rows={5}
                  placeholder="Informe os diferenciais desejáveis para a vaga..."
                  value={form.diferenciais}
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* BENEFÍCIOS */}
            <div className={styles.inputGroup}>
              <div className={styles.labelRow}>
                <FiFileText className={styles.labelIcon} />
                <label>Benefícios</label>
              </div>
              <div className={styles.textareaBox}>
                <textarea
                  name="beneficios"
                  rows={5}
                  placeholder="Descreva os benefícios oferecidos pela empresa..."
                  value={form.beneficios}
                  onChange={handleChange}
                />
              </div>
            </div>
        <div className={styles.sectionTitle}>
          Detalhes da vaga
        </div>

        {/* ÁREA */}
        <div className={styles.inputGroup}>
          <div className={styles.labelRow}>
            <FiBriefcase className={styles.labelIcon} />
            <label>Área de atuação</label>
          </div>

          <div className={styles.inputBox}>
            <input
            name="area_atuacao" 
            placeholder="Saúde e Bem-Estar, Tecnologia e Informação" 
            value={form.area_atuacao} 
            onChange={handleChange} />
          </div>
        </div>
        {/* TIPO DE CONTRATO */}
        <div className={styles.inputGroup}>
          <div className={styles.labelRow}>
            <FiBriefcase className={styles.labelIcon} />
            <label>Tipo de contrato</label>
          </div>

          <div className={styles.inputBox}>
            <input
              name="tipo_contrato"
              placeholder="Ex: CLT, PJ, Estágio..."
              value={form.tipo_contrato}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* SALÁRIO */}
        <div className={styles.inputGroup}>
          <div className={styles.labelRow}>
            <FiDollarSign className={styles.labelIcon} />
            <label>Salário inicial</label>
          </div>

          <div className={styles.inputBox}>
            <input 
              type="number" 
              name="salario" 
              placeholder="Ex.: 2.500,00" 
              value={form.salario} 
              onChange={handleChange} />
          </div>
        </div>

        {/* LOCALIZAÇÃO */}
        <div className={styles.inputGroup}>
          <div className={styles.labelRow}>
            <FiMapPin className={styles.labelIcon} />
            <label>Localização</label>
          </div>

          <div className={styles.inputBox}>
            <input 
              name="localizacao" 
              placeholder="Rua... N°..." 
              value={form.localizacao} 
              onChange={handleChange} 
              required />
          </div>
        </div>
        
        {/* CARGA HORÁRIA */}
        <div className={styles.inputGroup}>
          <div className={styles.labelRow}>
            <FiClock className={styles.labelIcon} />
            <label>Carga horária</label>
          </div>

          <div className={styles.inputBox}>
            <input 
              type="number" 
              name="carga_horaria" 
              placeholder="Ex.: 20h" 
              value={form.carga_horaria} 
              onChange={handleChange} />
          </div>
        </div>
        <div className={styles.sectionTitle}>
          Processo seletivo
        </div>
        
        {/* Nº VAGAS */}
        <div className={styles.inputGroup}>
          <div className={styles.labelRow}>
            <FiUsers className={styles.labelIcon} />
            <label>Nº de vagas</label>
          </div>

          <div className={styles.inputBox}>
            <input 
            type="number"
            name="numero_vagas" 
            placeholder="Ex.: 9" 
            value={form.numero_vagas} 
            onChange={handleChange} min={1} />
          </div>
        </div>

        {/* CONTATO */}
        <div className={styles.inputGroup}>
          <div className={styles.labelRow}>
            <FiPhone className={styles.labelIcon} />
            <label>Contato</label>
          </div>

          <div className={styles.inputBox}>
            <input 
              name="contato" 
              placeholder="88 9 ****-****" 
              value={form.contato} 
              onChange={handleChange} required />
          </div>
        </div>

        {/* DATA LIMITE */}
        <div className={styles.inputGroupFull}>
          <div className={styles.labelRow}>
            <FiClock className={styles.labelIcon} />
            <label>Data limite</label>
          </div>

          <input 
            className={styles.data}
            type="date" 
            name="data_limite" 
            value={form.data_limite} 
            onChange={handleChange} />
        </div>
        
        {/* BOTÕES */}
        <div className={styles.buttonsRowFull}>

          {/* <button
            type="button"
            className={styles.btnDraft}
            // onClick={() => alert("Função de rascunho em desenvolvimento")}
          >  Salvar rascunho
          </button> */}

        <button 
        type="submit"
        className={styles.btnPublish} 
        disabled={loading}>
          {loading ? "Publicando..." : "Publicar Vaga"}
        </button>
      </div>
    </form>
  </div>
  );
}