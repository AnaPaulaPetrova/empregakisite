import database from "@/database/database";

import React from 'react'

export default async function PUT(req, {params}) {
    const dados = await req.json()

    const sql = `
    UPDATE vagasDisponiveis SET empresa= $1, titulo= $2, declaracao = $3, salario= $4, status= $5 WHERE id= $6
    `
    await database.query(sql, [
      dados.empresa,
      dados.titulo,
      dados.descricao,
      dados.salario,
      params.id
    ])
    return Response.json({message: "Vagas atualizada"})
  return (
    <div></div>
  )
}

import React from 'react'

export default async function Delete(req, {params}) {

  await database.query(
    "DELETE FROM vagasdisponiveis WHERE id=$1", [params.id]
  )
  return Response.json({message:"Vaga removida"})
  
}

export default function VagaDetalhe({ params }) {

    const { id } = params;

    return (
        <div>
            <h1>Detalhes da vaga {id}</h1>
        </div>
    );
}

