import {database} from "@/database/database";

export async function PUT(req, {params}) {

  const { id } =  params

  const dados = await req.json()

  const {titulo, descricao, requisitos, salario, areaAtuacao, localizacao, cargaHoraria, numeroVagas, contato, dataLimite } = dados

  const sql = `
  UPDATE vagasdisponiveis SET empresa=$1, titulo=$2, descricao=$3, requisitos=$4, salario=$5, areaatuacao=$6, localizacao=$7, cargahoraria=$8, numerovagas=$9, contato=$10, datalimite=$11 WHERE id=$12
  `;

  try {
    await database.query(sql, [
      dados.empresa,
      dados.titulo,
      dados.descricao,
      dados.requisitos,
      dados.salario,
      dados.areaAtuacao,
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


