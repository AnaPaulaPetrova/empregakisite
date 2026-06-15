import { database } from "@/database/database";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { token, novaSenha } = await req.json();

    if (!token || !novaSenha) {
      return Response.json(
        { error: "Dados inválidos." },
        { status: 400 }
      );
    }

    // Procura um usuário com esse token
    const result = await database.query(
      `
      SELECT id, reset_token_expira
      FROM login
      WHERE reset_token = $1
      `,
      [token]
    );

    if (result.rows.length === 0) {
      return Response.json(
        { error: "Token inválido." },
        { status: 400 }
      );
    }

    const usuario = result.rows[0];

    // Verifica se o token expirou
    if (new Date(usuario.reset_token_expira) < new Date()) {
      return Response.json(
        { error: "Token expirado." },
        { status: 400 }
      );
    }

    // Criptografa a nova senha
    const senhaHash = await bcrypt.hash(novaSenha, 10);

    // Atualiza a senha e limpa os dados de recuperação
    await database.query(
      `
      UPDATE login
      SET
        senha_hash = $1,
        reset_token = NULL,
        reset_token_expira = NULL
      WHERE id = $2
      `,
      [senhaHash, usuario.id]
    );

    return Response.json({
      message: "Senha redefinida com sucesso!"
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Erro ao redefinir senha." },
      { status: 500 }
    );
  }
}