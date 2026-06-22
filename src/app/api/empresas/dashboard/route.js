import { database } from "@/database/database";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return Response.json(
        { error: "Token não enviado" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const empresaResult = await database.query(
      `
      SELECT e.id
      FROM empresas e
      JOIN info_usuarios iu
        ON e.id_info_usuarios = iu.id
      WHERE iu.id_usuario = $1
      `,
      [decoded.id]
    );

    if (empresaResult.rows.length === 0) {
      return Response.json(
        { error: "Empresa não encontrada" },
        { status: 404 }
      );
    }

    const empresaId = empresaResult.rows[0].id;

    const dashboard = await database.query(
      `
      SELECT
        (
          SELECT COUNT(*)
          FROM vagas_disponiveis
          WHERE id_empresa = $1
          AND ativo = true
          AND data_limite >= CURRENT_DATE
        ) AS vagas_ativas,

        (
          SELECT COUNT(*)
          FROM vagas_disponiveis
          WHERE id_empresa = $1
        ) AS total_vagas,

        (
          SELECT COUNT(*)
          FROM candidato_vaga cv
          JOIN vagas_disponiveis vd
            ON cv.id_vaga = vd.id
          WHERE vd.id_empresa = $1
        ) AS candidatos
      `,
      [empresaId]
    );
    console.log(dashboard.rows[0]);

    return Response.json({
      vagasAtivas: Number(dashboard.rows[0].vagas_ativas),
      totalVagas: Number(dashboard.rows[0].total_vagas),
      candidatos: Number(dashboard.rows[0].candidatos),
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Erro ao carregar dashboard" },
      { status: 500 }
    );
  }
}