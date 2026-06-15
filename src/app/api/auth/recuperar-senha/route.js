import { database } from "@/database/database";
import crypto from "crypto";

export async function POST(req) {
  try {
    const { email } = await req.json();

    // Verifica se o e-mail foi informado
    if (!email) {
      return Response.json(
        { error: "E-mail é obrigatório" },
        { status: 400 }
      );
    }

    // Procura o usuário pelo e-mail
    const result = await database.query(
      "SELECT id FROM login WHERE email = $1",
      [email]
    );

    // Por segurança, não informamos se o e-mail existe ou não
    if (result.rows.length === 0) {
      return Response.json({
        message:
          "Se existir uma conta com esse e-mail, um link de recuperação será enviado."
      });
    }

    // Gera um token aleatório
    const token = crypto.randomBytes(32).toString("hex");

    // Define validade de 1 hora
    const expira = new Date(Date.now() + 60 * 60 * 1000);

    // Salva o token no banco
    await database.query(
      `
      UPDATE login
      SET
        reset_token = $1,
        reset_token_expira = $2
      WHERE email = $3
      `,
      [token, expira, email]
    );

    // Por enquanto, apenas para teste
    console.log("Token gerado:", token);

    return Response.json({
      message:
        "Se existir uma conta com esse e-mail, um link de recuperação será enviado."
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Erro ao processar recuperação de senha" },
      { status: 500 }
    );
  }
}