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

export default function CriarVaga() {

  const router = useRouter()

  async function enviar(e) {
    e.preventDefault()

    const formData = new FormData(e.target)

    const dados = {
      cnpjEmpresa: formData.get("cnpjEmpresa"),
      titulo: formData.get("titulo"),
      descricao: formData.get("descricao"),
      requisitos: formData.get("requisitos"),
      areaAtuacao: formData.get("areaAtuacao"),
      salario: formData.get("salario"),
      localizacao: formData.get("localizacao"),
      cargaHoraria: formData.get("cargaHoraria"),
      numeroVagas: formData.get("numeroVagas"),
      contato: formData.get("contato"),
      dataLimite: formData.get("dataLimite")
    }

    await fetch("/api/vagas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    })

    router.push("/vagas")
  }

  return (
    <div className={styles.vagaContainer}>
      <h2 className={styles.vagaTitulo}>Publique sua vaga</h2>
      <p className={styles.vagaSubtitulo}>
        Encontre os candidatos certos para sua empresa
      </p>

      <form className={styles.vagaFormulario} onSubmit={enviar}>
        {/* CNPJ */}
        <div className={styles.inputGroup}>
          <div className={styles.labelRow}>
            <FiBriefcase className={styles.labelIcon} />
            <label>CNPJ</label>
          </div>
          <div className={styles.inputBox}>
            <input type="number" name="cnpjEmpresa" placeholder="14111222000125" />
          </div>
        </div>

        {/* TÍTULO */}
        <div className={styles.inputGroup}>
          <div className={styles.labelRow}>
            <FiBriefcase className={styles.labelIcon} />
            <label>Título da vaga</label>
          </div>
          <div className={styles.inputBox}>
            <input type="text" name="titulo" placeholder="Ex: Desenvolvedor Front-end" />
          </div>
        </div>

        {/* EMPRESA */}
        {/* <div className={styles.inputGroup}>
          <div className={styles.labelRow}>
            <FiBriefcase className={styles.labelIcon} />
            <label>Empresa</label>
          </div>
          <div className={styles.inputBox}>
            <input type="text" name="empresa" placeholder="Nome da empresa" />
          </div>
        </div> */}

        {/* DESCRIÇÃO */}
        <div className={styles.inputGroup}>
          <div className={styles.labelRow}>
            <FiFileText className={styles.labelIcon} />
            <label>Descrição detalhada</label>
          </div>
          <div className={styles.textareaBox}>
            <textarea name="descricao" rows="5" placeholder="Descreva a vaga..."></textarea>
          </div>
        </div>

        {/* REQUISITOS */}
        <div className={styles.inputGroup}>
          <div className={styles.labelRow}>
            <FiFileText className={styles.labelIcon} />
            <label>Requisitos</label>
          </div>
          <div className={styles.textareaBox}>
            <textarea name="requisitos" rows="5" placeholder="Liste os requisitos..."></textarea>
          </div>
        </div>

        {/* ÁREA */}
        <div className={styles.inputGroup}>
          <div className={styles.labelRow}>
            <FiBriefcase className={styles.labelIcon} />
            <label>Área de atuação</label>
          </div>
          <div className={styles.inputBox}>
            <input type="text" name="areaAtuacao" placeholder="Ex: Tecnologia" />
          </div>
        </div>

        {/* SALÁRIO */}
        <div className={styles.inputGroup}>
          <div className={styles.labelRow}>
            <FaRegMoneyBillAlt className={styles.labelIcon} />
            <label>Salário inicial</label>
          </div>
          <div className={styles.inputBox}>
            <input type="number" name="salario" placeholder="Ex: 2500" />
          </div>
        </div>

        {/* LOCALIZAÇÃO */}
        <div className={styles.inputGroup}>
          <div className={styles.labelRow}>
            <FiMapPin className={styles.labelIcon} />
            <label>Localização</label>
          </div>
          <div className={styles.inputBox}>
            <input type="text" name="localizacao" placeholder="Cidade / Estado" />
          </div>
        </div>

        {/* CARGA HORÁRIA */}
        <div className={styles.inputGroup}>
          <div className={styles.labelRow}>
            <FiClock className={styles.labelIcon} />
            <label>Carga horária</label>
          </div>
          <div className={styles.inputBox}>
            <input type="text" name="cargaHoraria" placeholder="Ex: 40h semanais" />
          </div>
        </div>

        {/* Nº VAGAS */}
        <div className={styles.inputGroup}>
          <div className={styles.labelRow}>
            <FiUsers className={styles.labelIcon} />
            <label>Nº de vagas</label>
          </div>
          <div className={styles.inputBox}>
            <input type="number" name="numeroVagas" placeholder="Ex: 3" />
          </div>
        </div>

        {/* CONTATO */}
        <div className={styles.inputGroup}>
          <div className={styles.labelRow}>
            <FiPhone className={styles.labelIcon} />
            <label>Contato</label>
          </div>
          <div className={styles.inputBox}>
            <input type="text" name="contato" placeholder="Email ou telefone" />
          </div>
        </div>

        {/* DATA */}
        <div className={styles.inputGroupFull}>
          <div className={styles.labelRow}>
            <FiClock className={styles.labelIcon} />
            <label>Data limite</label>
          </div>
          <input type="date" name="dataLimite" className={styles.dateInput} />
        </div>

        {/* BOTÕES */}
        <div className={styles.buttonsRowFull}>
          <button type="button" className={styles.btnDraft}>
            Salvar como rascunho
          </button>

          <button type="submit" className={styles.btnPublish}>
            Publicar vaga
          </button>
        </div>

      </form>
    </div>
  )
}