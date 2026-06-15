import { database } from "@/database/database";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  const client = await database.connect();

  try {
    const {
      nome,
      email,
      senha,
      contato,
      endereco,
      documento,
      tipo,
    } = await req.json();

    console.log("DADOS RECEBIDOS:", { nome, email, tipo });

    if (!nome || !email || !senha || !tipo) {
      return NextResponse.json(
        { error: "Dados incompletos" },
        { status: 400 }
      );
    }

    const emailFormatado = email.toLowerCase().trim();

    await client.query("BEGIN");

    // 🔐 hash senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // 🔎 verificar email
    const emailExiste = await client.query(
      "SELECT id FROM login WHERE email = $1",
      [emailFormatado]
    );

    if (emailExiste.rows.length > 0) {
      await client.query("ROLLBACK");
      return NextResponse.json(
        { error: "Email já cadastrado" },
        { status: 409 }
      );
    }

    // 🟢 inserir login
    const loginResult = await client.query(
      `INSERT INTO login (nome, email, senha_hash)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [nome, emailFormatado, senhaHash]
    );

    const loginId = loginResult.rows[0].id;

    // 🔥 BUSCA PERFIS
    let perfilResult = await client.query(
      "SELECT id, tipo FROM perfil"
    );

    console.log("TODOS PERFIS:", perfilResult.rows);

    // 🧠 se tabela estiver vazia, cria automaticamente (FIX DO SEU PROBLEMA)
    if (perfilResult.rows.length === 0) {
      console.log("CRIANDO PERFIS PADRÃO...");

      await client.query(`
        INSERT INTO perfil (tipo)
        VALUES ('admin'), ('candidato'), ('empresa')
      `);

      perfilResult = await client.query(
        "SELECT id, tipo FROM perfil"
      );
    }

    // 🔎 buscar perfil correto
    const perfil = perfilResult.rows.find(
      (p) => p.tipo === tipo
    );

    if (!perfil) {
      await client.query("ROLLBACK");
      return NextResponse.json(
        { error: "Perfil não encontrado" },
        { status: 400 }
      );
    }

    const perfilId = perfil.id;

    // 🟢 usuario
    const usuarioResult = await client.query(
      `INSERT INTO usuario (id_login, id_perfil)
       VALUES ($1, $2)
       RETURNING id`,
      [loginId, perfilId]
    );

    const usuarioId = usuarioResult.rows[0].id;

    // 🟢 info_usuario
    const infoResult = await client.query(
        `INSERT INTO info_usuarios
        (nome, contato, endereco, documento, id_usuario)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id`,
        [nome, contato, endereco, documento, usuarioId]
    );

    const infoId = infoResult.rows[0].id;

    // 🟢 tabelas específicas
    if (tipo === "empresa") {
      await client.query(
        `INSERT INTO empresas (id_info_usuarios)
         VALUES ($1)`,
        [infoId]
      );
    }

    if (tipo === "candidato") {
      await client.query(
        `INSERT INTO candidatos (id_info_usuarios)
         VALUES ($1)`,
        [infoId]
      );
    }

    await client.query("COMMIT");

    return NextResponse.json({ success: true });

  } catch (error) {
    await client.query("ROLLBACK");

    console.error("REGISTRO ERROR:", error);

    return NextResponse.json(
      { error: "Erro ao cadastrar" },
      { status: 500 }
    );

  } finally {
    client.release();
  }
}