"use client"

import { useRouter } from "next/navigation"
import { FaRegMoneyBillAlt } from "react-icons/fa"
import {
 FiBriefcase,
 FiFileText,
 FiMapPin,
 FiClock,
 FiUsers,
 FiPhone
} from "react-icons/fi"

import styles from "./criarVagas.module.css"

export default function CriarVaga(){

 const router = useRouter()

 async function enviar(e){

  e.preventDefault()

  const dados = {
   empresa:e.target.empresa.value,
   titulo:e.target.titulo.value,
   descricao:e.target.descricao.value,
   salario:e.target.salario.value,
   status:"aberta"
  }

 await fetch("/api/vagas",{
 method:"POST",
 headers:{
  "Content-Type":"application/json"
 },
 body:JSON.stringify(dados)
})

  router.push("/vagas")
 }

 return(
    <div className={styles.vaga-container}>
      <h2 className={styles.vaga-title}>Publique sua vaga</h2>
      <p className={styles.vaga-subtitle}>
        Encontre os candidatos certos para sua empresa de forma rápida e transparente
      </p>

      {/* Chama handlePublish */}
      <form className={styles.vaga-form} onSubmit={enviar}>
        {/* TÍTULO */}
        <div className={styles.input-group_full}>
          <label>Título da vaga</label>
          <div className={styles.input-box}>
            <FiBriefcase className={styles.icon} />
            <input
              type="text"
              name="titulo"
              placeholder="Ex: Desenvolvedor Front-end"
            />
          </div>
        </div>

        {/* DESCRIÇÃO */}
        <div className={styles.input-group}>
          <label>Descrição detalhada</label>
          <div className={styles.input-box_textarea-box}>
            <FiFileText className={styles.icon_top-icon} />
            <textarea
              name="descricao"
              rows="5"
              placeholder="Descreva a vaga..."
            ></textarea>
          </div>
        </div>

        {/* REQUISITOS */}
        <div className={styles.input-group}>
          <label>Requisitos</label>
          <div className={styles.input-box_textarea-box}>
            <FiFileText className={styles.icon_top-icon} />
            <textarea
              name="requisitos"
              rows="5"
              placeholder="Liste os requisitos..."
            ></textarea>
          </div>
        </div>

        {/* ÁREA */}
        <div className={styles.input-group}>
          <label>Área de atuação</label>
          <div className={styles.input-box}>
            <FiBriefcase className={styles.icon} />
            <input
              type="text"
              name="areaAtuacao"
              placeholder="Ex: Tecnologia"
            />
          </div>
        </div>

        {/* SALÁRIO */}
        <div className={styles.input-group}>
          <label>Salário inicial</label>
          <div className={styles.input-box}>
            <FaRegMoneyBillAlt className={styles.icon} />
            <input
              type="number"
              name="salario"
              placeholder="Ex: 2500"
            />
          </div>
        </div>

        {/* LOCALIZAÇÃO */}
        <div className={styles.input-group}>
          <label>Localização</label>
          <div className={styles.input-box}>
            <FiMapPin className={styles.icon} />
            <input
              type="text"
              name="localizacao"
              placeholder="Cidade / Estado"
            />
          </div>
        </div>

        {/* CARGA HORÁRIA */}
        <div className={styles.input-group}>
          <label>Carga horária</label>
          <div className={styles.input-box}>
            <FiClock className={styles.icon} />
            <input
              type="text"
              name="cargaHoraria"
              placeholder="Ex: 40h semanais"
            />
          </div>
        </div>

        {/* Nº VAGAS */}
        <div className={styles.input-group}>
          <label>Nº de vagas</label>
          <div className={styles.input-box}>
            <FiUsers className={styles.icon} />
            <input
              type="number"
              name="numeroVagas"
              placeholder="Ex: 3"
            />
          </div>
        </div>

        {/* CONTATO */}
        <div className={styles.input-group}>
          <label>Contato</label>
          <div className={styles.input-box}>
            <FiPhone className={styles.icon} />
            <input
              type="text"
              name="contato"
              placeholder="Email ou telefone"
            />
          </div>
        </div>

        {/* DATA */}
        <div className={styles.input-group_full}>
          <label>Data limite</label>
          <input
            type="date"
            name="dataLimite"
            className={styles.date-input}/>
        </div>

        {/* BOTÕES */}
        <div className={styles.buttons-row_full}>
          {/* Chama handleDraft */}
          <button
            type="button"
            className={styles.btn_draft}            
          >
            Salvar como rascunho
          </button>

          {/* Chama o onSubmit */}
          <button type="submit" className={styles.btn_publish}>
            Publicar vaga
          </button>
        </div>
      </form>
    </div>
  );
 
}