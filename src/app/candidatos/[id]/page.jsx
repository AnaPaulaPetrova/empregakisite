import CandidatoClient from "./candidatoClient";

async function buscarCandidato(id) {
  console.log("ID RECEBIDO:", id);
  const res = await fetch(`http://localhost:3000/api/candidatos/${id}`, {
    cache: "no-store",
  }
);
console.log("STATUS:", res.status);

  if (!res.ok) return null;

  return res.json();
}

export default async function CandidatoPage({ params }) {
  const { id } = await params;
  const candidato = await buscarCandidato(id);
  console.log("CANDIDATO:", candidato);

  return <CandidatoClient candidato={candidato} id={id} />;
}