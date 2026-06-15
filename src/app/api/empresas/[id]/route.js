import { database } from "@/database/database";

/* =========================
   GET - Buscar empresa
========================= */
export async function GET(req, { params }) {
  try {
    const { id } = params;

    const sql = `
      SELECT 
        empresas.id,
        info_usuarios.nome,
        info_usuarios.contato,
        info_usuarios.endereco,

        empresas.sobre_empresa,
        empresas.missao,
        empresas.visao,
        empresas.valores

      FROM empresas
      JOIN info_usuarios
        ON info_usuarios.id = empresas.id_info_usuarios

      WHERE empresas.id = $1
    `;

    const result = await database.query(sql, [id]);

    if (result.rows.length === 0) {
      return Response.json(
        { error: "Empresa não encontrada" },
        { status: 404 }
      );
    }

    return Response.json(result.rows[0]);

  } catch (error) {
    console.error("GET empresa error:", error);

    return Response.json(
      { error: "Erro no servidor" },
      { status: 500 }
    );
  }
}

/* =========================
   PUT - Atualizar empresa
========================= */
export async function PUT(req, { params }) {
  try {
    const { id } = params;

    const {
      sobre_empresa,
      missao,
      visao,
      valores
    } = await req.json();

    const sql = `
      UPDATE empresas
      SET 
        sobre_empresa = $1,
        missao = $2,
        visao = $3,
        valores = $4,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $5
      RETURNING *
    `;

    const result = await database.query(sql, [
      sobre_empresa,
      missao,
      visao,
      valores,
      id
    ]);

    if (result.rowCount === 0) {
      return Response.json(
        { error: "Empresa não encontrada para atualizar" },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      empresa: result.rows[0]
    });

  } catch (error) {
    console.error("PUT empresa error:", error);

    return Response.json(
      { error: "Erro ao atualizar empresa" },
      { status: 500 }
    );
  }
}