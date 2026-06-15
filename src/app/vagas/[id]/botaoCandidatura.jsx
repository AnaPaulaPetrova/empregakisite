"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./../vagas.module.css";

export default function BotaoCandidatura({ idVaga }) {
  const router = useRouter();

  const [carregando, setCarregando] = useState(true);
  const [mostrarBotao, setMostrarBotao] = useState(false);
  const [jaCandidatado, setJaCandidatado] = useState(false);

  useEffect(() => {
    verificarUsuario();
  }, []);

  async function verificarUsuario() {
    const token = localStorage.getItem("token");

    // Não logado -> mostra botão para ir ao login
    if (!token) {
      setMostrarBotao(true);
      setCarregando(false);
      return;
    }

    try {
      // Decodifica o payload do JWT
      const payload = JSON.parse(
        atob(token.split(".")[1])
      );

      // Se for empresa, não mostra botão
      if (payload.tipo === "empresa") {
        setMostrarBotao(false);
        setCarregando(false);
        return;
      }

      // Se for candidato, verifica se já se candidatou
      const response = await fetch(
        "/api/candidatos/candidaturas",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const candidaturas = await response.json();

        const existe = candidaturas.some(
          (item) => item.vaga_id === idVaga
        );

        setJaCandidatado(existe);
      }

      setMostrarBotao(true);

    } catch (error) {
      console.error(error);
      setMostrarBotao(true);
    }

    setCarregando(false);
  }

  async function candidatar() {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/auth/login");
      return;
    }

    try {
      const response = await fetch(
        "/api/candidatos/candidaturas",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id_vaga: idVaga,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erro ao realizar candidatura.");
        return;
      }

      alert("Candidatura realizada com sucesso!");
      setJaCandidatado(true);

    } catch (error) {
      console.error(error);
      alert("Erro ao realizar candidatura.");
    }
  }

  if (carregando) return null;

  // Usuário é empresa
  if (!mostrarBotao) return null;

  // Candidato já inscrito
  if (jaCandidatado) {
    return (
      <button
        className={styles.botao}
        disabled
        style={{
          opacity: 0.7,
          cursor: "not-allowed",
        }}
      >
        ✓ Você já se candidatou
      </button>
    );
  }

  return (
    <button
      onClick={candidatar}
      className={styles.botao}
    >
      Candidatar-se
    </button>
  );
}