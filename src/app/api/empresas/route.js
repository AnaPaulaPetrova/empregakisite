import { database } from "@/database/database";

export async function GET(request, { params }) {

    const resolvedParams = await params; 
    const { id } = resolvedParams;

    console.log("CNPJ na API:", id);

    const empresa = await database.query(
        `SELECT * FROM empresas WHERE id = $1`,
        [id]
    );

    return Response.json(empresa.rows[0]);
}