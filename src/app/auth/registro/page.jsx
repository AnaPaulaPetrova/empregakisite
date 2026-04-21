"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./cadastroCandidato.module.css";
//import { redirect } from "next/navigation";

// export default function RegistroRedirect() {
//     redirect("/auth/registo");
// }
export default function Registro() {
    const [formData, setFormData] = useState({
        nome: "", 
        email: "", 
        senha: "",
        telefone: "",
        tipo: "candidato"
        });
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");
    const router = useRouter();

    const handleRegistro = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErro("");

        try {
            const resposta = await fetch("/api/auth/registro", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await resposta.json();

            if (!resposta.ok) {
                setErro(data.error);
                return;
            }
            // Redimencionar pro login após cadastro
            //window.location.href = "/dashboard";
            router.push("/auth/login");

        } catch (error) {
            setErro("Erro de conexão")
        } finally {
            setLoading(false)
        }
    };

    return (
    <div className={styles.cadastroCandContainer}>
      <h2 className={styles.cadastroCandtitulo}>Crie sua conta</h2>
      <p className={styles.cadastroCandSubtitulo}>
        Cadastre-se como candidato ou empresa
      </p>

      {erro && (
        <div className={styles.error}>
          {erro}
        </div>
      )}

      <form onSubmit={handleRegistro} className={styles.cadastroCandForm}>
        {/* Nome */}
        <label className={styles.label}>👤 Nome Completo</label>
        <input
          className={styles.input}
          type="text"
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          placeholder="Digite seu nome"
          required
          disabled={loading}
        />

        {/* Email */}
        <label className={styles.label}>📧 Email</label>
        <input
          className={styles.input}
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="seu@email.com"
          required
          disabled={loading}
        />

        {/* Telefone */}
        <label></label>
        <input
          className={styles.input}
          type="tel"
          value={formData.telefone}
          onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
          placeholder="(11) 99999-9999"
          required
          disabled={loading}
        />

        {/* Senha */}
        <label className={styles.label}>🔒 Senha</label>
        <input
          className={styles.input}
          type="password"
          value={formData.senha}
          onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
          placeholder="••••••••"
          required
          disabled={loading}
        />

        {/* Grupo Radio: Candidato/Empresa */}
        <div className={styles.cadastroGroup}>
          <div className={styles.cadastroItem}>
            <input
              type="radio"
              id="candidato"
              name="tipo"
              value="candidato"
              checked={formData.tipo === "candidato"}
              onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
              className={styles.cadastroRadio}
              disabled={loading}
            />
            <label htmlFor="candidato" className={styles.cadastroLabel}>
              👤 Candidato
            </label>
          </div>

          <div className={styles.cadastroItem}>
            <input
              type="radio"
              id="empresa"
              name="tipo"
              value="empresa"
              checked={formData.tipo === "empresa"}
              onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
              className={styles.cadastroRadio}
              disabled={loading}
            />
            <label htmlFor="empresa" className={styles.cadastroLabel}>
              🏢 Empresa
            </label>
          </div>
        </div>

        {/* Botão Entrar */}
        <button
          className={styles.enterButton}
          type="submit"
          disabled={loading}
        >
          {loading ? "Cadastrando..." : "Criar Conta"}
        </button>
      </form>

      <a className={styles.cadastroCandForgot} href={"/auth/login"}>
        Já tem conta? Faça login
      </a>

      {/* <div className={styles.cadastroCandDivider}>
        <span></span> ou <span></span>
      </div>

      <button className={styles.googleButton} type="button" disabled>
        <img src="/google-icon.svg" alt="Google" />
        Continuar com Google
      </button> */}
    </div>
  );
}
