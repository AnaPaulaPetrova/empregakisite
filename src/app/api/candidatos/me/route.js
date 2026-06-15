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

    const decoded = jwt.verify( token, process.env.JWT_SECRET
    );
    console.log("decoded", decoded);

    const result = await database.query(`
      SELECT
        candidatos.id,
        candidatos.curriculo,
        info_usuarios.nome,
        info_usuarios.contato,
        info_usuarios.endereco,
        info_usuarios.documento
      FROM candidatos
      JOIN info_usuarios
        ON candidatos.id_info_usuarios = info_usuarios.id
      WHERE info_usuarios.id_usuario = $1
    `, [decoded.id]
    );

    if (result.rows.length === 0) {
        return Response.json(
            { error: "Candidato não encontrado" },
            { status: 404 }
        );
    }

    return Response.json(result.rows[0]);

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Token inválido" },
      { status: 401 }
    );
  }
}

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

    const {
      nome,
      contato,
      endereco
    } = await req.json();

    const candidatoResult = await database.query(`
      SELECT
        candidatos.id,
        candidatos.id_info_usuarios
      FROM candidatos
      JOIN info_usuarios
        ON candidatos.id_info_usuarios = info_usuarios.id
      WHERE info_usuarios.id_usuario = $1
    `, [decoded.id]);

    const candidato = candidatoResult.rows[0];

    await database.query(`
      UPDATE info_usuarios
      SET
        nome = $1,
        contato = $2,
        endereco = $3
      WHERE id = $4
    `, [
      nome,
      contato,
      endereco,
      candidato.id_info_usuarios
    ]);

    return Response.json({
      success: true
    });

  } catch (error) {

    console.error(error);

    return Response.json(
      { error: "Erro ao atualizar candidato" },
      { status: 500 }
    );
  }
}