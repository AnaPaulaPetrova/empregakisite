import { database } from "@/database/database";
import bcrypt from "bcryptjs";


export async function POST(req) {
  try {
    const { email, senha } = await req.json();
    console.log("Login attempt:", email);

    const sql = `SELECT * FROM usuarios WHERE email = $1`;
    const result = await database.query(sql, [email]);

    console.log("DB result:", result.rows.length);  

    if (result.rows.length === 0) {
        return Response.json({ error: "Email ou senha inválido "}, { status: 401 });
    }
    const usuario = result.rows[0];
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
        return Response.json({ error: "Email ou senha inválido"}, { status: 401 })
    }
    // Token simples (sem JWT_SECRET por agora)
    const token = `empregaki-${usuario.id}-${Date.now()}`

    return Response.json( {
        token,
        usuario: {id: usuario.id, nome: usuario.nome, email: usuario.email }
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return Response.json({ error: "Erro no servidor" },
         { status: 500 });
  }
}
