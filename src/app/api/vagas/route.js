import {database} from "@/database/database";
import jwt from "jsonwebtoken";

// LISTAR VAGAS (GET)
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const id_empresa = searchParams.get("id_empresa");

    let result;

    if (id_empresa) {
      result = await database.query(
        `
          SELECT
            v.*,
            i.nome AS empresa_nome
          FROM vagas_disponiveis v

          INNER JOIN empresas e
            ON v.id_empresa = e.id

          INNER JOIN info_usuarios i
            ON e.id_info_usuarios = i.id

          WHERE v.id_empresa = $1

          ORDER BY v.created_at DESC
        `,
        [id_empresa]
      );
    } else {
      result = await database.query(`
        SELECT
          v.*,
          i.nome AS empresa_nome
        FROM vagas_disponiveis v

        INNER JOIN empresas e
          ON v.id_empresa = e.id

        INNER JOIN info_usuarios i
          ON e.id_info_usuarios = i.id

        WHERE v.ativo = true
        AND (
          v.data_limite IS NULL
          OR v.data_limite >= CURRENT_DATE
        )

        ORDER BY v.created_at DESC
      `);
    }

    return Response.json(result.rows);

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Erro ao buscar vagas" },
      { status: 500 }
    );
  }
}

// alimentar o banco de dados
export async function POST(req) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return Response.json({ error: "Não autorizado" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const usuario = jwt.verify(token, process.env.JWT_SECRET);

    const {
      titulo,
      descricao,
      requisitos,
      responsabilidades,
      tipo_contrato,
      diferenciais,
      beneficios,
      area_atuacao,
      salario,
      localizacao,
      carga_horaria,
      numero_vagas,
      contato,
      data_limite
    } = await req.json();

    await database.query(
      `INSERT INTO vagas_disponiveis (
        id_empresa,
        titulo,
        descricao,
        requisitos,
        responsabilidades,
        tipo_contrato,
        diferenciais,
        beneficios,
        area_atuacao,
        salario,
        localizacao,
        carga_horaria,
        numero_vagas,
        contato,
        data_limite
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)`,
      [
        usuario.empresa_id,
        titulo,
        descricao,
        requisitos,
        responsabilidades,
        tipo_contrato,
        diferenciais,
        beneficios,
        area_atuacao,
        salario,
        localizacao,
        carga_horaria,
        numero_vagas,
        contato,
        data_limite
      ]
    );

    return Response.json({ message: "Vaga criada com sucesso!" });

  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Erro ao criar vaga" },
      { status: 500 }
    );
  }
}



