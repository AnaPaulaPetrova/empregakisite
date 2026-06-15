"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cpf, cnpj } from "cpf-cnpj-validator";
import { IMaskInput } from "react-imask";

import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiLock,
  FiBriefcase,
} from "react-icons/fi";

import styles from "./cadastro.module.css";

export default function Registro() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    contato: "",
    endereco: "",
    documento: "",
    tipo: "empresa",
  });

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      documento: "",
    }));
  }, [formData.tipo]);

  const handleRegistro = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErro("");

    if (formData.senha !== formData.confirmarSenha) {
      setErro("As senhas não coincidem");
      setLoading(false);
      return;
    }

    try {
      const documentoLimpo = formData.documento.replace(/\D/g, "");

      if (formData.tipo === "candidato") {
        if (!cpf.isValid(documentoLimpo)) {
          setErro("CPF inválido");
          setLoading(false);
          return;
        }
      }

      if (formData.tipo === "empresa") {
        if (!cnpj.isValid(documentoLimpo)) {
          setErro("CNPJ inválido");
          setLoading(false);
          return;
        }
      }

      const resposta = await fetch("/api/auth/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          senha: formData.senha,
          contato: formData.contato,
          endereco: formData.endereco,
          documento: documentoLimpo,
          tipo: formData.tipo,
        }),
      });

      const data = await resposta.json();

      if (!resposta.ok) {
        setErro(data.error || "Erro ao cadastrar");
        setLoading(false);
        return;
      }

      alert("Cadastro realizado com sucesso!");
      router.push("/auth/login");
    } catch (error) {
      setErro("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.cadastroCandContainer}>
      <h2 className={styles.cadastroCandtitulo}>
        Criar Conta
      </h2>

      <p className={styles.cadastroCandSubtitulo}>
        Cadastre-se como candidato ou empresa para utilizar o EmpregaKi.
      </p>

      {erro && (
        <div className={styles.error}>
          {erro}
        </div>
      )}

      <form
        onSubmit={handleRegistro}
        className={styles.cadastroCandForm}
      >
        <div className={styles.cadastroGroup}>
          <div className={styles.cadastroItem}>
            <input
              type="radio"
              name="tipo"
              value="candidato"
              checked={formData.tipo === "candidato"}
              onChange={handleChange}
              disabled={loading}
            />

            <label>Candidato</label>
          </div>

          <div className={styles.cadastroItem}>
            <input
              type="radio"
              name="tipo"
              value="empresa"
              checked={formData.tipo === "empresa"}
              onChange={handleChange}
              disabled={loading}
            />

            <label>Empresa</label>
          </div>
        </div>

        <label>
          <FiUser /> Nome Completo
        </label>

        <input
          className={styles.input}
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
          disabled={loading}
        />

        <label>
          <FiMail /> Email
        </label>

        <input
          className={styles.input}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={loading}
        />

        <label>
          <FiPhone /> Contato
        </label>

        <input
          className={styles.input}
          name="contato"
          value={formData.contato}
          onChange={handleChange}
          required
          disabled={loading}
        />

        <label>
          <FiBriefcase />
          {formData.tipo === "empresa" ? " CNPJ" : " CPF"}
        </label>

        <IMaskInput
          className={styles.input}
          mask={
            formData.tipo === "empresa"
              ? "00.000.000/0000-00"
              : "000.000.000-00"
          }
          value={formData.documento}
          onAccept={(value) =>
            setFormData((prev) => ({
              ...prev,
              documento: value,
            }))
          }
          placeholder={
            formData.tipo === "empresa"
              ? "Digite o CNPJ"
              : "Digite o CPF"
          }
        />

        <label>
          <FiMapPin /> Endereço
        </label>

        <input
          className={styles.input}
          name="endereco"
          value={formData.endereco}
          onChange={handleChange}
          required
          disabled={loading}
        />

        <label>
          <FiLock /> Senha
        </label>

        <input
          className={styles.input}
          type="password"
          name="senha"
          value={formData.senha}
          onChange={handleChange}
          required
          disabled={loading}
        />

        <label>
          <FiLock /> Confirmar Senha
        </label>

        <input
          className={styles.input}
          type="password"
          name="confirmarSenha"
          value={formData.confirmarSenha}
          onChange={handleChange}
          required
          disabled={loading}
        />

        <button
          className={styles.enterButton}
          disabled={loading}
        >
          {loading ? "Cadastrando..." : "Criar Conta"}
        </button>
      </form>

      <a
        href="/auth/login"
        className={styles.cadastroCandForgot}
      >
        Já possui uma conta? Faça login
      </a>
    </div>
  );
}