import { database } from "@/database/database";
import jwt from "jsonwebtoken";

export async function PUT(req) {
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

    const { curriculo } = await req.json();

    await database.query(
      `
      UPDATE candidatos
      SET curriculo = $1
      WHERE id = $2
      `,
      [
        curriculo,
        decoded.candidato_id
      ]
    );

    return Response.json({
      success: true
    });

  } catch (error) {

    console.error(error);

    return Response.json(
      { error: "Erro ao atualizar currículo" },
      { status: 500 }
    );
  }
}