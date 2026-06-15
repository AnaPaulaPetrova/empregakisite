"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PerfilForm from "./perfilForm";

export default function PerfilPage() {
  const router = useRouter();
  const [dados, setDados] = useState(null);

  useEffect(() => {
    async function carregarPerfil() {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/auth/login");
        return;
      }

      const res = await fetch("/api/candidatos/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      console.log("PERFIL:", data);
      setDados(data);
    }

    carregarPerfil();
  }, []);

  if (!dados) return <p>Carregando...</p>;

  return <PerfilForm dados={dados} />;
}