import {database} from "@/database/database";

export default async function PUT(req, {params}) {
    const { id } = params;
    const usuario = await req.json();

    const {nome, email, senha} = usuario;

    const sql = `
    UPDATE login SET nome = $1, email = $2, senha_hash = $3
    WHERE id = $4
    RETURNING *
    `;

    const result = await database.query(sql, [nome, email, senha, id]);

  return Response.json(result.rows[0]);
}

export async function DELETE(req, { params }) {
  const { id } = params;

  const sql = `DELETE FROM login WHERE id = $1`;

  await database.query(sql, [id]);

  return Response.json({ message: "Usuário deletado" });
} // função Admin