"use client";

import React, { useState } from "react";
import styles from "./cadastroEmpresa.module.css";

export default function Cadastro() {

    const [nome, setNome] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [tipo, setTipo] = useState("");
    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCadastro = async (e) => {
        e.preventDefault();
        setErro("");

        // Validar senha
        if (senha !== confirmarSenha) {
            setErro("As senhas não coincidem");
            return;
        }

        // Validar tipo
        if (!tipo) {
            setErro("Selecione um tipo de conta");
            return;
        }

        try {
            setLoading(true);
            const resposta = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome,
                    email,
                    senha,
                    tipo
                })
            });

            const data = await resposta.json();

            if (!resposta.ok) {
                setErro(data.error || "Erro ao cadastrar");
                return;
            }

            console.log("✅ Usuário criado:", data);
            alert("Cadastro realizado com sucesso!");

        } catch (error) {
            console.error(error);
            setErro("Erro de conexão");

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.cadastroEmpContainer}>
            <h2 className={styles.cadastroEmpTitulo}> Crie sua conta </h2>

            <p className={styles.cadastroEmpSubtitulo}>
                Preencha seus dados para começar a usar o Empregaki
            </p>

            {erro && (
                <div className={styles.error}>
                    {erro}
                </div>
            )}

            <form
                className={styles.cadastroEmpForm}
                onSubmit={handleCadastro}
            >

                {/* Tipo */}
                <div className={styles.cadastroGrupo}>

                    <div className={styles.cadastroItem}>

                        <input
                            type="radio"
                            id="souEmpresa"
                            name="cadastro"
                            value="empresa"
                            checked={tipo === "empresa"}
                            onChange={(e) => setTipo(e.target.value)}
                        />

                        <label htmlFor="souEmpresa">
                            Sou Empresa
                        </label>

                        <input
                            type="radio"
                            id="souCandidato"
                            name="cadastro"
                            value="candidato"
                            checked={tipo === "candidato"}
                            onChange={(e) => setTipo(e.target.value)}
                        />

                        <label htmlFor="souCandidato">
                            Sou Candidato
                        </label>

                    </div>

                </div>

                {/* Nome */}
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Nome completo"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />

                {/* CNPJ */}
                {tipo === "empresa" && (
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="CNPJ"
                        value={cnpj}
                        onChange={(e) => setCnpj(e.target.value)}
                    />
                )}

                {/* Email */}
                <input
                    className={styles.input}
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                {/* Senha */}
                <input
                    className={styles.input}
                    type="password"
                    placeholder="Sua senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />

                {/* Confirmar senha */}
                <input
                    className={styles.input}
                    type="password"
                    placeholder="Confirme sua senha"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    required
                />

                <button
                    className={styles.enterButton}
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Criando conta..."
                        : "Criar conta"
                    }
                </button>
            </form>
        </div>
    );
}