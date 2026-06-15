import { database } from "@/database/database";

// LISTAR EMPRESAS
export async function GET() {
  try {
    const result = await database.query(`
      SELECT
  e.id,
  i.nome,
  i.contato,
  i.endereco,
  e.sobre_empresa,
  COUNT(v.id) AS total_vagas
FROM empresas e
INNER JOIN info_usuarios i
  ON e.id_info_usuarios = i.id
LEFT JOIN vagas_disponiveis v
  ON v.id_empresa = e.id
  AND v.ativo = true
GROUP BY
  e.id,
  i.nome,
  i.contato,
  i.endereco,
  e.sobre_empresa
ORDER BY i.nome;
    `);

    return Response.json(result.rows);

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Erro ao buscar empresas" },
      { status: 500 }
    );
  }
}