import { database } from "@/database/database";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();

    const {
      titulo,
      descricao,
      requisitos,
      areaAtuacao,
      salario,
      localizacao,
      cargaHoraria,
      numeroVagas,
      contato,
      dataLimite,
      id_empresa
    } = data;

    const result = await database.query(
      `INSERT INTO vagas_disponiveis
      (id_empresa, titulo, descricao, requisitos, area_atuacao, salario, localizacao, carga_horaria, numero_vagas, contato, data_limite)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *`,
      [
        id_empresa,
        titulo,
        descricao,
        requisitos,
        areaAtuacao,
        salario,
        localizacao,
        cargaHoraria,
        numeroVagas,
        contato,
        dataLimite
      ]
    );

    return NextResponse.json(result.rows[0]);

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao publicar vaga" }, { status: 500 });
  }
}