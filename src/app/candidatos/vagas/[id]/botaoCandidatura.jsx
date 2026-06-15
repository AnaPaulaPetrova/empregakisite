"use client";

import { useRouter } from "next/navigation";
import styles from "./vaga.module.css"

export default function BotaoCandidatura({ idVaga }) {

  const router = useRouter();

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
        alert(data.error);
        return;
      }

      alert("Candidatura realizada com sucesso!");
      router.push("/candidatos");

    } catch (error) {

      console.error(error);

      alert("Erro ao realizar candidatura");
    }
  }

  return (
    <button
        onClick={candidatar}
        className={styles.buttonInscrever}
        >
      Inscreva-se
    </button>
  );
}