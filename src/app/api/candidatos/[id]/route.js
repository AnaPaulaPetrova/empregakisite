import { database } from "@/database/database";

export async function GET(req, { params }) {

  try {

    const { id } = await params;

    console.log("ID DA API:", id);

    const sql = `
      SELECT
        c.id AS id_candidato,
        u.id AS id_usuario,
        iu.nome,
        iu.contato,
        iu.endereco,
        iu.documento,
        c.curriculo,
        p.tipo

      FROM candidatos c
      JOIN info_usuarios iu
        ON iu.id = c.id_info_usuarios
      JOIN usuario u
        ON u.id = iu.id_usuario
      JOIN perfil p
        ON p.id = u.id_perfil
      WHERE c.id = $1
    `;

    const result = await database.query(sql, [id]);

    console.log("RESULTADO:", result.rows);

    if (result.rows.length === 0) {
      return Response.json(
        { error: "Candidato não encontrado" },
        { status: 404 }
      );
    }

    return Response.json(result.rows[0]);

  } catch (error) {
    console.error("Erro api candidato", error);

    return Response.json(
      { error: "Erro no servidor" },
      { status: 500 }
    );
  }
}