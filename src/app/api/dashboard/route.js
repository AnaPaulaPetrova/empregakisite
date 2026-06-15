import { database } from "@/database/database";

export async function GET() {
  try {
    const vagas = await database.query(`
      SELECT COUNT(*) as total
      FROM vagas_disponiveis
      WHERE ativo = true
    `);

    const empresas = await database.query(`
      SELECT COUNT(*) as total
      FROM empresas
      WHERE ativo = true
    `);

    const candidatos = await database.query(`
      SELECT COUNT(*) as total
      FROM candidatos
    `);

    return Response.json({
      vagas: Number(vagas.rows[0].total),
      empresas: Number(empresas.rows[0].total),
      candidatos: Number(candidatos.rows[0].total),
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Erro ao buscar estatísticas" },
      { status: 500 }
    );
  }
}