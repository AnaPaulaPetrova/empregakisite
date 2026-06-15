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

    const result = await database.query(
      `
      SELECT
        cv.id,
        cv.data_candidatura,
        cv.status,
        v.id AS vaga_id,
        v.titulo,
        v.descricao
      FROM candidato_vaga cv
      JOIN vagas_disponiveis v
        ON v.id = cv.id_vaga
      WHERE cv.id_candidato = $1
      ORDER BY cv.data_candidatura DESC
      `,
      [decoded.candidato_id]
    );

    return Response.json(result.rows);

  } catch (error) {

    console.error(error);

    return Response.json(
      { error: "Erro ao buscar candidaturas" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
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

    const { id_vaga } = await req.json();

    console.log("Candidato:", decoded.candidato_id);
    console.log("Vaga:", id_vaga);

    // Verifica se a vaga ainda está disponível
    const vaga = await database.query(
      `
      SELECT *
      FROM vagas_disponiveis
      WHERE id = $1
      AND ativo = true
      AND (
        data_limite IS NULL
        OR data_limite >= CURRENT_DATE
      )
      `,
      [id_vaga]
    );

    if (vaga.rows.length === 0) {
      return Response.json(
        {
          error: "Esta vaga não está mais disponível para candidatura."
        },
        { status: 400 }
      );
    }

    // Verifica candidatura duplicada
    const existe = await database.query(
      `
      SELECT *
      FROM candidato_vaga
      WHERE id_candidato = $1
      AND id_vaga = $2
      `,
      [decoded.candidato_id, id_vaga]
    );

    if (existe.rows.length > 0) {
      return Response.json(
        { error: "Você já se candidatou a esta vaga" },
        { status: 400 }
      );
    }

    await database.query(
      `
      INSERT INTO candidato_vaga (
        id_candidato,
        id_vaga
      )
      VALUES ($1, $2)
      `,
      [decoded.candidato_id, id_vaga]
    );

    return Response.json({
      success: true,
      message: "Candidatura realizada com sucesso"
    });

  } catch (error) {

    console.error("ERRO CANDIDATURA:");
    console.error(error);

    return Response.json(
      {
        error: error.message
      },
      { status: 500 }
    );
  }
}