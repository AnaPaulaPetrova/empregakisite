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
    console.log("TOKEN DECODIFICADO:", decoded);

    const candidatoResult = await database.query(
      `
      SELECT c.id
      FROM candidatos c
      JOIN info_usuarios iu
        ON c.id_info_usuarios = iu.id
      WHERE iu.id_usuario = $1
      `,
      [decoded.id]
    );
      console.log(
      "CANDIDATO RESULT:",
      candidatoResult.rows
    );

    if (candidatoResult.rows.length === 0) {
      return Response.json(
        { error: "Candidato não encontrado" },
        { status: 404 }
      );
    }

    const candidatoId = candidatoResult.rows[0].id;

    console.log(
      "ID CANDIDATO:",
      candidatoId
    );

    const vagasResult = await database.query(
      `
      SELECT
        vd.*,
        iu.nome AS nome_empresa
      FROM vagas_disponiveis vd
      LEFT JOIN empresas e
        ON e.id = vd.id_empresa
      LEFT JOIN info_usuarios iu
        ON iu.id = e.id_info_usuarios
      WHERE NOT EXISTS (
        SELECT 1
        FROM candidato_vaga cv
        WHERE cv.id_vaga = vd.id
          AND cv.id_candidato = $1
  )
    AND vd.data_limite >= CURRENT_DATE
  ORDER BY vd.data_limite ASC NULLS LAST
      
      `,
      [candidatoId]
    );
    // ORDER BY vd.data_limite DESC NULLS LAST
    console.log(
      "VAGAS:",
      vagasResult.rows.length
    );

    return Response.json(vagasResult.rows);

    

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Erro ao buscar vagas" },
      { status: 500 }
    );
  }
}