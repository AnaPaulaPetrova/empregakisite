// import { database } from "@/database/database";

// export async function GET(req, { params }) {
//   try {
//     const { id } = params;

//     const sql = `
//       SELECT
//         u.id AS usuario_id,
//         iu.nome,
//         iu.contato,
//         iu.endereco,
//         iu.documento,
//         l.email
//       FROM usuario u
//       JOIN info_usuarios iu ON iu.id_usuario = u.id
//       JOIN login l ON l.id = u.id_login
//       WHERE u.id = $1
//     `;

//     const result = await database.query(sql, [id]);

//     if (result.rows.length === 0) {
//       return Response.json({ error: "Perfil não encontrado" }, { status: 404 });
//     }

//     return Response.json(result.rows[0]);

//   } catch (error) {
//     console.error(error);
//     return Response.json({ error: "Erro no servidor" }, { status: 500 });
//   }
// }

// import { database } from "@/database/database";

// export async function PUT(req) {
//   try {
//     const { usuarioId, nome, contato, endereco, curriculo } = await req.json();

//     await database.query("BEGIN");

//     // atualiza info_usuarios
//     await database.query(
//       `
//       UPDATE info_usuarios
//       SET nome = $1,
//           contato = $2,
//           endereco = $3,
//           updated_at = NOW()
//       WHERE id_usuario = $4
//       `,
//       [nome, contato, endereco, usuarioId]
//     );

//     // currículo (vamos guardar em uma coluna futura ou tabela simples)
//     await database.query(
//       `
//       UPDATE candidatos
//       SET curriculo = $1
//       WHERE id_info_usuarios = (
//         SELECT id FROM info_usuarios WHERE id_usuario = $2
//       )
//       `,
//       [curriculo, usuarioId]
//     );

//     await database.query("COMMIT");

//     return Response.json({ success: true });

//   } catch (error) {
//     console.error(error);
//     await database.query("ROLLBACK");
//     return Response.json({ error: "Erro ao atualizar perfil" }, { status: 500 });
//   }
// }