import { database } from "@/database/database";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return Response.json({ error: "Token não enviado" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const result = await database.query(`
      SELECT 
        empresas.*,
          info_usuarios.nome,
          info_usuarios.contato,
          info_usuarios.endereco,
          info_usuarios.documento
      FROM empresas
      JOIN info_usuarios 
        ON empresas.id_info_usuarios = info_usuarios.id
      WHERE info_usuarios.id_usuario = $1
    `, [decoded.id]);
    console.log(result.rows);

    return Response.json(result.rows[0]);

  } catch (error) {
    return Response.json({ error: "Token inválido" }, { status: 401 });
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
    const { nome, contato, endereco, sobre_empresa, missao, visao, valores, } = await req.json();

    const empresaResult = await database.query(`
      SELECT empresas.id,
            empresas.id_info_usuarios
      FROM empresas
      JOIN info_usuarios
        ON empresas.id_info_usuarios = info_usuarios.id
      WHERE info_usuarios.id_usuario = $1
      `, [decoded.id]
    );

    const empresa = empresaResult.rows[0];
    await database.query(`
      UPDATE info_usuarios
      SET
        nome = $1,
        contato = $2,
        endereco = $3
      WHERE id = $4
      `, [nome, contato, endereco, empresa.id_info_usuarios ]
    );

    await database.query(`
      UPDATE empresas
      SET
        sobre_empresa = $1,
        missao = $2,
        visao = $3,
        valores = $4
      WHERE id = $5
      `, [sobre_empresa, missao, visao, valores, empresa.id]
    );
    return Response.json({
      success: true,
    });
    
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Erro ao atualizar empresa" },
      { status: 500 }
    );
  }
  
}