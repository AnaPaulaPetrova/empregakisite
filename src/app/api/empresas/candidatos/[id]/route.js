import { database } from "@/database/database";

export async function PUT(req, { params }) {
  try {

    const { id } = await params;

    const { status } = await req.json();

    await database.query(
      `
      UPDATE candidato_vaga
      SET status = $1
      WHERE id = $2
      `,
      [status, id]
    );

    return Response.json({
      success: true,
      message: "Status atualizado"
    });

  } catch (error) {

    console.error(error);

    return Response.json(
      { error: "Erro ao atualizar status" },
      { status: 500 }
    );
  }
}