import { database } from "@/database/database";
import EditarVagaForm from "./editarVagaForm";

export default async function EditarVaga({ params }) {
  const { id } = await params;

  const result = await database.query(
    `
    SELECT *
    FROM vagas_disponiveis
    WHERE id = $1
    `,
    [id]
  );

  const vaga = result.rows[0];

  if (!vaga) {
    return <p>Vaga não encontrada.</p>;
  }

  return <EditarVagaForm vaga={vaga} />;
}