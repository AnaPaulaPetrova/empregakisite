import { database } from "@/database/database";
import jwt from "jsonwebtoken";

export async function GET(req) {
  console.log("HEADERS:");
  console.log(req.headers);

    try {

    const authHeader = req.headers.get("authorization");
    console.log("AUTH HEADER:", authHeader);

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

        c.id AS candidato_id,
        c.curriculo,

        iu.nome,
        iu.contato,
        iu.endereco,

        v.id AS vaga_id,
        v.titulo

      FROM candidato_vaga cv

      JOIN candidatos c
        ON c.id = cv.id_candidato

      JOIN info_usuarios iu
        ON iu.id = c.id_info_usuarios

      JOIN vagas_disponiveis v
        ON v.id = cv.id_vaga

      WHERE v.id_empresa = $1

      ORDER BY cv.data_candidatura DESC
      `,
      [decoded.empresa_id]
    );

    return Response.json(result.rows);

  } catch (error) {

    console.error(error);

    return Response.json(
      { error: "Erro ao buscar candidatos" },
      { status: 500 }
    );
  }
}