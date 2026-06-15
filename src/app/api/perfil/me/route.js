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

    const token = authHeader.replace("Bearer ", "");

    const usuario = jwt.verify(token, process.env.JWT_SECRET);

    const result = await database.query(
      `SELECT 
        login.nome,
        info_usuarios.contato,
        info_usuarios.endereco,
        info_usuarios.documento
       FROM usuario
       JOIN login ON login.id = usuario.id_login
       JOIN info_usuarios ON info_usuarios.id_usuario = usuario.id
       WHERE usuario.id = $1`,
      [usuario.id]
    );

    if (result.rows.length === 0) {
      return Response.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    return Response.json(result.rows[0]);

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Erro no servidor" },
      { status: 500 }
    );
  }
}