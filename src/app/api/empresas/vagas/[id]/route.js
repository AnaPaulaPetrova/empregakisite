import { database } from "@/database/database";
import jwt from "jsonwebtoken";

export async function GET(req, { params }) {
  const { id } = await params;

  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return Response.json(
        { error: " Não autorizado" },
        { status: 401 }
      );
    }
    const token = authHeader.split(" ")[1];

    const usuario = jwt.verify(
      token,
      process.eventNames.JWT_SECRET
    );

    const result = await database.query(
      `
      SELECT *
      FROM vagas_disponiveis
      WHERE id = $1
      AND id_empresa = $2
      `,
      [id, usuario.empresa_id]
    );

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
      { error: "Erro ao buscar vaga"},
      { status: 500 }
    );
    
  }
}

export async function PUT(req, { params }) {

  const { id } = await params;
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return Response.json(
        { error: "Não autorizado" }, 
        { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const usuario = jwt.verify(token, process.env.JWT_SECRET);

    const {
      titulo,
      descricao,
      requisitos,
      responsabilidades,
      diferenciais,
      tipo_contrato,
      beneficios,
      area_atuacao,
      salario,
      localizacao,
      carga_horaria,
      numero_vagas,
      contato,
      data_limite,
      ativo
    } = await req.json();

    await database.query(
      `UPDATE vagas_disponiveis
       SET titulo = $1,
        descricao = $2,
        requisitos = $3,
        responsabilidades = $4,
        diferenciais = $5,
        tipo_contrato = $6,
        beneficios = $7,
        area_atuacao = $8,
        salario = $9,
        localizacao = $10,
        carga_horaria = $11,
        numero_vagas = $12,
        contato = $13,
        data_limite = $14,
        ativo = $15,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $16
        AND id_empresa = $17
      `,
      [titulo,
        descricao,
        requisitos,
        responsabilidades,
        diferenciais,
        tipo_contrato,
        beneficios,
        area_atuacao,
        salario,
        localizacao,
        carga_horaria,
        numero_vagas,
        contato,
        data_limite,
        ativo,
        id,
        usuario.empresa_id
      ]
    );

    return Response.json({ message: "Vaga atualizada" });

  } catch (error) {
    console.error(error);
    
    return Response.json(
      { error: "Erro ao atualizar" }, 
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { id } = await params;

  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return Response.json({ error: "Não autorizado" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const usuario = jwt.verify(token, process.env.JWT_SECRET);

    await database.query(
      `DELETE FROM vagas_disponiveis
       WHERE id=$1
       AND id_empresa=$2`,
      [id, usuario.empresa_id]
    );

    return Response.json({ message: "Vaga removida" });

  } catch (error) {
    return Response.json({ error: "Erro ao excluir" }, { status: 500 });
  }
}