import { database } from "@/database/database";
import jwt from "jsonwebtoken";

export async function PUT(req) {
  try {
    // pega token do header (localStorage no front envia isso)
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return Response.json(
        { error: "Token não enviado" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return Response.json(
        { error: "Token inválido" },
        { status: 401 }
      );
    }

    // valida token
    const usuario = jwt.verify(token, process.env.JWT_SECRET);

    const { nome, contato, endereco } = await req.json();

    // atualiza login (nome)
    await database.query(
      `
      UPDATE login
      SET nome = $1
      WHERE id = (
        SELECT id_login FROM usuario WHERE id = $2
      )
      `,
      [nome, usuario.id]
    );

    // atualiza info_usuarios
    const result = await database.query(
      `
      UPDATE info_usuarios
      SET contato = $1,
          endereco = $2,
          updated_at = NOW()
      WHERE id_usuario = $3
      `,
      [contato, endereco, usuario.id]
    );

    return Response.json({
      message: "Perfil atualizado com sucesso",
      rows: result.rowCount
    });

  } catch (error) {
    console.error("ERRO UPDATE PERFIL:", error);

    return Response.json(
      { error: error.message || "Erro ao atualizar perfil" },
      { status: 500 }
    );
  }
}