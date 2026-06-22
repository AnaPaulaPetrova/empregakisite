"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { FiMail, FiLock, } from "react-icons/fi";

import styles from "./login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErro("");

    try {
      const resposta = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await resposta.json();

      if (!resposta.ok) {
        setErro(data.error || "Erro no login");
        return;
      }

      if (!data.token) {
        setErro("Token não encontrado");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.usuario.id.toString());
      localStorage.setItem("userName", data.usuario.nome);
      localStorage.setItem("userTipo", data.usuario.tipo);

      // AVISA A APLICAÇÃO QUE O ESTADO DE LOGIN MUDOU
      window.dispatchEvent(new Event("authChange"));

      await new Promise((resolve) =>
        setTimeout(resolve, 100)
      );

      router.refresh();

      if (data.usuario.tipo === "admin") {
        router.push("/admin");
      } else if (data.usuario.tipo === "empresa") {
        router.push("/empresas");
      } else if (data.usuario.tipo === "candidato") {
        router.push("/candidatos");
      } else {
        router.push("/dashboard");
      }

    } catch (error) {
      console.error(error);
      setErro("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.loginTitulo}>
        Entrar no EmpregaKi
      </h2>

      <p className={styles.loginSubtitulo}>
        Acesse sua conta para continuar
      </p>

      {erro && (
        <div className={styles.error}>
          {erro}
        </div>
      )}

      <form
        onSubmit={handleLogin}
        className={styles.loginForm}
      >
        <label> <FiMail /> E-mail </label>

        <input
          className={styles.input}
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          placeholder="Digite seu e-mail"
          required
          disabled={loading}
        />

        <label> <FiLock /> Senha </label>

        <input
          className={styles.input}
          type="password"
          value={senha}
          onChange={(e) =>
            setSenha(e.target.value)
          }
          placeholder="Digite sua senha"
          required
          disabled={loading}
        />

        <button
          className={styles.enterButton}
          type="submit"
          disabled={
            loading ||
            !email ||
            !senha
          }
        >
          { loading ? "Entrando..." : "Entrar" }
        </button>
      </form>

      <p className={styles.semConta}>
        Não possui conta?{" "}
        <Link
          href="/auth/registro"
          className={styles.cadastro}
        >
          Cadastre-se
        </Link>
      </p>

      <Link
        href="/auth/recuperar-senha"
        className={styles.loginForgot}
      >
        Esqueceu sua senha?
      </Link>
    </div>
  );
}