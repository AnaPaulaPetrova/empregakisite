import {database} from "@/database/database";

export async function PUT(req, {params}) {

  const { id } =  params

  const dados = await req.json()

  const {titulo, descricao, requisitos, areaAtuacao, salario,localizacao, cargaHoraria, numeroVagas, contato, dataLimite } = dados

  const sql = `
  UPDATE vagasdisponiveis SET titulo=$1, descricao=$2, requisitos=$3, areaatuacao=$4, salario=$5, localizacao=$6, cargahoraria=$7, numerovagas=$8, contato=$9, datalimite=$10 WHERE id=$11
  `;

  try {
    await database.query(sql, [
      dados.titulo,
      dados.descricao,
      dados.requisitos,
      dados.areaAtuacao,
      dados.salario,
      dados.localizacao,
      dados.cargaHoraria,
      dados.numeroVagas,
      dados.contato,
      dados.dataLimite,
      id
    ])
    return Response.json({message: "Vagas atualizada com sucesso!"})
  } catch (error){
      return Response.json(
        alert("Erro ao atualizar vaga"),
        {status: 500}
      )
  };
  
}

export async function Delete(req, {params}) {

  await database.query(
    "DELETE FROM vagasdisponiveis WHERE id=$1", [params.id]
  )
  return Response.json({message:"Vaga removida"})
  
}


