// app/api/candidatos/route.js

import { database } from "@/database/database";

export async function GET() {
  try {
    const sql = `
      SELECT * 
      FROM candidatos
      ORDER BY created_at DESC
    `;

    const response = await database.query(sql);

    return Response.json(response.rows, { status: 200 });

  } catch (error) {
    console.error("Erro ao buscar candidatos:", error);

    return Response.json(
      { error: "Erro ao buscar candidatos" },
      { status: 500 }
    );
  }
}