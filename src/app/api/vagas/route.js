import database from "@/database/database";
import React from 'react'


export async function GET() {

    const sql = "SELECT * FROM vagasdisponiveis ORDER BY created_at DESC";

    const responseDB = await database.query(sql);
 
 console.log("Resultado do banco", responseDB.rows);
  return Response.json(responseDB.rows)
  // return <BuscarVagas vagas={responseDB.rows} />

}
export  async function POST(req) {
    const dados = await req.json()
    const sql = ` INSERT INTO vagasdisponiveis (titulo, empresa, descricao, salario, status)
    VALUES ($1,$2,$3,$4,$5) `;

    await database.query(sql, [
        dados.titulo,
        dados.empresa,
        dados.descricao,
        dados.salario,
        dados.status
    ])

    const body = await req.json();

    const titulo = body.titulo;
    const empresa = body.empresa;
    const salario = body.salario;
    
    const slug = criarSlug(titulo);
    

    await database.query(sql, [titulo, slug, empresa, salario]);
        return Response.json({message: "Vaga criada"})

}

function criarSlug(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

