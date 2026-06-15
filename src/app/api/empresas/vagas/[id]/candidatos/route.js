import { database } from "@/database/database";

export async function GET(req, { params }) {
  try {

    const { id } = await params;

    console.log("ID DA VAGA:", id);

    const result = await database.query(
      `
      SELECT
        cv.id,
        cv.data_candidatura,

        c.id AS candidato_id,

        iu.nome,
        iu.contato,
        iu.endereco,

        c.curriculo

      FROM candidato_vaga cv
      JOIN candidatos c
        ON c.id = cv.id_candidato
      JOIN info_usuarios iu
        ON iu.id = c.id_info_usuarios
      WHERE cv.id_vaga = $1
      ORDER BY cv.data_candidatura DESC
      `,
      [id]
    );

    console.log("CANDIDATOS:", result.rows);

    return Response.json(result.rows);

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Erro ao buscar candidatos" },
      { status: 500 }
    );
  }
}