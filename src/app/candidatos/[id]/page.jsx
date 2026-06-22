import { database } from "@/database/database";
import CandidatoClient from "./candidatoClient";

async function buscarCandidato(id) {
  const result = await database.query(
    `
    SELECT *
    FROM candidatos
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0] || null;
}

export default async function CandidatoPage({ params }) {
  const { id } = await params;

  const candidato = await buscarCandidato(id);

  return <CandidatoClient candidato={candidato} id={id} />;
}
