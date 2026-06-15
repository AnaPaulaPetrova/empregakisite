import { database } from "@/database/database";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { email, senha } = await req.json();

    const emailFormatado = email.toLowerCase().trim();

    const sql = `
      SELECT
        login.nome,
        login.email,
        login.senha_hash,
        usuario.id AS usuario_id,
        perfil.tipo,
        empresas.id AS empresa_id,
        candidatos.id AS candidato_id
      FROM login
      JOIN usuario ON usuario.id_login = login.id
      JOIN perfil ON perfil.id = usuario.id_perfil
      LEFT JOIN info_usuarios ON info_usuarios.id_usuario = usuario.id
      LEFT JOIN empresas ON empresas.id_info_usuarios = info_usuarios.id
      LEFT JOIN candidatos ON candidatos.id_info_usuarios = info_usuarios.id
      WHERE login.email = $1
    `;

    const result = await database.query(sql, [emailFormatado]);

    if (result.rows.length === 0) {
      return Response.json(
        { error: "Email ou senha inválido" },
        { status: 401 }
      );
    }

    const usuario = result.rows[0];

    const senhaValida = await bcrypt.compare(
      senha,
      usuario.senha_hash
    );

    if (!senhaValida) {
      return Response.json(
        { error: "Email ou senha inválido" },
        { status: 401 }
      );
    }

    // TOKEN
    const token = jwt.sign(
      {
        id: usuario.usuario_id,
        tipo: usuario.tipo,
        empresa_id: usuario.empresa_id,
        candidato_id: usuario.candidato_id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // SEM COOKIE: manda no JSON
    return Response.json({
      success: true,
      token,
      usuario: {
        id: usuario.usuario_id,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo,
        empresa_id: usuario.empresa_id,
        candidato_id: usuario.candidato_id,
      },
});

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Erro no servidor" },
      { status: 500 }
    );
  }
}