import database from "@/database/database";
import React from 'react'


export async function GET() {

    const sql = "SELECT * FROM vagasdisponiveis ORDER BY created_at DESC";

    const responseDB = await database.query(sql);
 
 //console.log("Resultado do banco", responseDB.rows);
  return Response.json(responseDB.rows)
  // return <BuscarVagas vagas={responseDB.rows} />

}
// alimentar o banco de dados
export  async function POST(req) {
    const dados = await req.json()

    const sql = ` INSERT INTO vagasdisponiveis (empresa, titulo, descricao, requisitos, areaatuacao, salario,  Localizacao, cargahoraria, numerovagas, contato )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) `;

    await database.query(sql, [
        dados.empresa,
        dados.titulo,
        dados.descricao,
        dados.requisitos,
        dados.areaatuacao,
        dados.salario,
        dados.localizacao,
        dados.cargahoraria,
        dados.numerovagas,
        dados.contato
    ])
    
    return Response.json({message: "Vaga criada"})

}


