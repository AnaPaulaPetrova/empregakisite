import { database } from "@/database/database";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const { nome, email, senha } = await req.json();

        if (!nome || !email || !senha) {
            return Response.json({ error: "Todos os campos são obrigatório" }, { status: 400 });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const sql = `
            INSERT INTO usuarios (nome, email, senha)
            VALUES ($1, $2, $3)
            RETURNING id, nome, email
        `;

        const result = await database.query(sql, [nome, email, senhaHash]);
        return Response.json(result.rows[0], { status: 201 });
    } catch (error) {
        if (error.code == "23505"){
            return Response.json({ error: "Email já cadastrado "}, { status: 409 });
        }
        return Response.json({ error: "Erro no servidor "}, { status: 500 });
    }
}
