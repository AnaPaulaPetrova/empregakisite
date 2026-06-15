import { database } from "@/database/database";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return Response.json({ error: "Não autorizado" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const usuario = jwt.verify(token, process.env.JWT_SECRET);

    const result = await database.query(
      `SELECT * FROM vagas_disponiveis
       WHERE id_empresa = $1
       ORDER BY created_at DESC`,
      [usuario.empresa_id]
    );

    return Response.json(result.rows);

  } catch (error) {
    return Response.json({ error: "Erro ao buscar vagas" }, { status: 500 });
  }
}