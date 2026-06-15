import {database} from "@/database/database";


export default async function POST(req) {
    const usuario = await req.json();
    const {nome, email, senha} = usuario;

    const sql = `
        INSERT INTO login (nome, email, senha_hash) values ($1, $2, $3)
        RETURNING *
    `;

    const result = await database.query(sql, [nome, email, senha])

  return Response.json(result.rows[0])
}


export default async function GET() {
    const sql = ` SELECT * FROM login `;

    const result = await database.query(sql);

  return Response.json(result.rows);
}
