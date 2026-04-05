"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"
import styles from"./vagaEditar.module.css";
import { FiBriefcase, FiFileText, FiMapPin, FiClock, FiUsers, FiPhone } from "react-icons/fi";
import { FaRegMoneyBillAlt } from "react-icons/fa";

export default function EditarVaga({ vaga }) {
  const[cnpj, setCNPJ] = useState(vaga?.cnpj_empresa)
  const [titulo, setTitulo] = useState(vaga?.titulo || "");
  const [descricao, setDescricao] = useState(vaga?.descricao || "");
  const [requisitos, setRequisitos] = useState(vaga?.requisitos || "");
  const [salario, setSalario] = useState(vaga?.salario || "");
  const [areaAtuacao, setAreaAtuacao] = useState(vaga?.area_atuacao || "");
  const [localizacao, setLocalizacao] = useState(vaga?.localizacao || "");
  const [cargaHoraria, setCargaHoraria] = useState(vaga?.carga_horaria || "");
  const [numeroVagas, setNumeroVagas] = useState(vaga?.numero_vagas || "");
  const [contato, setContato] = useState(vaga?.contato || "");
  const [dataLimite, setDataLimite] = useState(vaga?.data_limite || "");

  const router = useRouter();

  const vagaUpdate = async (e) => {
    e.preventDefault();

      const resposta = await fetch(`/api/vagas/${vaga.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo,
          descricao,
          requisitos,
          salario,
          areaAtuacao,
          localizacao,
          cargaHoraria,
          numeroVagas,
          contato,
          dataLimite,
        }),
      });

      if(resposta.ok){
        alert("Atualizado!");
        router.push("/vagas");
      } else {
        alert("Erro ao atualizar");
      }
      router.push(`/vagas/${vaga.id}`)
  }
  
   return (
    <div className={styles.vagaContainer}>
      <h2 className={styles.vagaTitulo}>Publique sua vaga</h2>
      <p className={styles.vagaSubtitulo}>
        Encontre os candidatos certos para sua empresa
      </p>

      <form className={styles.vagaFormulario} onSubmit={vagaUpdate}>
        {/* CNPJ */}
        <div className={styles.inputGroup}>
          <div className={styles.labelRow}>
            <FiBriefcase className={styles.labelIcon} />
            <label>CNPJ</label>
          </div>
          <div className={styles.inputBox}>
            <input 
              type="number" 
              name="cnpjEmpresa"
              value={cnpj} 
              readOnly
            />
          </div>
        </div>

        {/* TÍTULO */}
        <div className={styles.inputGroup}>
          <div className={styles.labelRow}>
            <FiBriefcase className={styles.labelIcon} />
            <label>Título da vaga</label>
          </div>
          <div className={styles.inputBox}>
            <input 
              type="text" 
              name="titulo" 
              value={titulo}
              placeholder="Ex: Desenvolvedor Front-end"
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>
        </div>

        {/* DESCRIÇÃO */}
        <div className={styles.inputGroup}>
          <div className={styles.labelRow}>
            <FiFileText className={styles.labelIcon} />
            <label>Descrição detalhada</label>
          </div>
          <div className={styles.textareaBox}>
            <textarea 
              name="descricao"
              rows="5"
              value={descricao}  
              onChange={(e) => setDescricao(e.target.value)}>
            </textarea>
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
              rows="5" 
              value={requisitos}
              onChange={(e) => setRequisitos(e.target.value)}
            >
            </textarea>
          </div>
        </div>

        {/* ÁREA */}
        <div className={styles.inputGroup}>
          <div className={styles.labelRow}>
            <FiBriefcase className={styles.labelIcon} />
            <label>Área de atuação</label>
          </div>
          <div className={styles.inputBox}>
            <input 
            type="text" 
            name="areaAtuacao"
            value={areaAtuacao} 
            onChange={(e) => setAreaAtuacao(e.target.value)}
            />
          </div>
        </div>

        {/* SALÁRIO */}
        <div className={styles.inputGroup}>
          <div className={styles.labelRow}>
            <FaRegMoneyBillAlt className={styles.labelIcon} />
            <label>Salário inicial</label>
          </div>
          <div className={styles.inputBox}>
            <input 
              type="number" 
              name="salario" 
              value={salario}
              onChange={(e) => setSalario(e.target.value)}
            />
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
              type="text" 
              name="localizacao" 
              value={localizacao}
              onChange={(e) => setLocalizacao(e.target.value)}
              />
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
              type="text" 
              name="cargaHoraria" 
              value={cargaHoraria}
              onChange={(e) => setCargaHoraria(e.target.value)} 
            />
          </div>
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
              name="numeroVagas" 
              value={numeroVagas} 
              onChange={(e) => setNumeroVagas(e.target.value)}
              />
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
              type="text" 
              name="contato" 
              value={contato} 
              onChange={(e) => setContato(e.target.value)}
            />
          </div>
        </div>

        {/* DATA */}
        <div className={styles.inputGroupFull}>
          <div className={styles.labelRow}>
            <FiClock className={styles.labelIcon} />
            <label>Data limite</label>
          </div>
          <input 
            type="date"
            name="dataLimite"
            className={styles.dateInput}
            value={dataLimite}
            onChange={(e) => setDataLimite(e.target.value)}
          />
        </div>

        {/* BOTÕES */}
        <div className={styles.buttonsRowFull}>
          {/* <button type="button" className={styles.btnDraft}>
            Salvar como rascunho
          </button> */}

          <button type="submit" className={styles.btnSalvar}>
            Salvar Vaga
          </button>
        </div>

      </form>
    </div>
  );
}