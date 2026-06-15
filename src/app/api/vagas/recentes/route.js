import { database } from "@/database/database";

import React from 'react'

export default async function GET() {
    try {
        const sql = `
            SELECT id, titulo, descricao, created_at 
            FROM vagas_disponiveis 
            ORDER BY created_at DESC
            LIMIT 5
        `;

        const result = await database.query(sql);
        return Response.json(result.rows);

    } catch (error) {
        console.error(error);
        
        return Response.json(
            { error: "Error ao buscar vagas recentes" },
            { status: 500 }
        );
    }
}
