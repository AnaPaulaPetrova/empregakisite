import { database } from "@/database/database";

export async function GET(req, { params }) {
  try {

    const { id } = await params;

    const result = await database.query(
      `
      SELECT
        e.*,
        i.nome,
        i.contato,
        i.endereco,
        i.documento,
        COUNT(v.id) AS total_vagas
      FROM empresas e

      INNER JOIN info_usuarios i
        ON e.id_info_usuarios = i.id

      LEFT JOIN vagas_disponiveis v
        ON v.id_empresa = e.id
        AND v.ativo = true

      WHERE e.id = $1

      GROUP BY
        e.id,
        i.id
      `,
      [id]
    );

    const vagas = await database.query(
      `
      SELECT *
      FROM vagas_disponiveis
      WHERE id_empresa = $1
      AND ativo = true
      ORDER BY created_at DESC
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return Response.json(
        { error: "Empresa não encontrada" },
        { status: 404 }
      );
    }

    return Response.json({
      ...result.rows[0],
      vagas: vagas.rows
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Erro ao buscar empresa" },
      { status: 500 }
    );
  }
}