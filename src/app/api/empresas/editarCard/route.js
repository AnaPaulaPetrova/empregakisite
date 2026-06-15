import { database } from "@/database/database";

export async function PATCH(req) {
  try {
    const { missao } = await req.json();

    const sql = `
      UPDATE empresas
      SET missao = $1
      WHERE id = $2
    `;

    // aqui você pega o id da empresa do token (ideal)
    const empresaId = "ID_DA_EMPRESA";

    await database.query(sql, [missao, empresaId]);

    return Response.json({ success: true });
  } catch (err) {
    return Response.json(
      { error: "Erro ao atualizar missão" },
      { status: 500 }
    );
  }
}