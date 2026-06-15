import {database} from "@/database/database";

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    console.log("id:", id);

    const result = await database.query(
      `
      SELECT
        vd.*,
        iu.nome AS nome_empresa
      FROM vagas_disponiveis vd
      LEFT JOIN empresas e
        ON e.id = vd.id_empresa
      LEFT JOIN info_usuarios iu
        ON iu.id = e.id_info_usuarios
      WHERE vd.id = $1
      `,
      [id]
    );

    console.log("vaga:", result.rows[0]);

    if (result.rows.length === 0) {
      return Response.json(
        { error: "Vaga não encontrada" },
        { status: 404 }
      );
    }

    return Response.json(result.rows[0]);

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Erro ao buscar vaga" },
      { status: 500 }
    );
  }
}

export async function PUT(req, {params}) {

  const { id } = await params

  const dados = await req.json()
  console.log("dados", dados);
  

  const {titulo, descricao, requisitos, area_atuacao, salario,localizacao, carga_horaria, numero_vagas, contato, data_limite } = dados

  const sql = `
  UPDATE vagas_disponiveis SET 
    titulo = $1,
    descricao = $2,
    requisitos = $3,
    area_atuacao = $4,
    salario = $5,
    localizacao = $6,
    carga_horaria = $7,
    numero_vagas = $8,
    contato = $9,
    data_limite = $10
    WHERE id = $11
  `;

  try {
    await database.query(sql, [
      dados.titulo,
      dados.descricao,
      dados.requisitos,
      dados.area_atuacao,
      dados.salario,
      dados.localizacao,
      dados.carga_horaria,
      dados.numero_vagas,
      dados.contato,
      dados.data_limite,
      id
    ])
    return Response.json({message: "Vagas atualizada com sucesso!"})

  } catch (error){
    console.error(error);

    return Response.json(
      { error: "Erro ao atualizar vaga" },
      { status: 500 }
    );
  };
  
}

export async function DELETE(req, {params}) {
  const { id } = await params;

  await database.query(
    "DELETE FROM vagas_disponiveis WHERE id=$1", [id]
  )
  return Response.json({message:"Vaga removida"})
  
}


