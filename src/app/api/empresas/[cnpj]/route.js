import { database } from "@/database/database";

export async function GET(request, { params }) {

    const resolvedParams = await params; // 👈 IMPORTANTE
    const { cnpj } = resolvedParams;

    console.log("CNPJ na API:", cnpj);

    const empresa = await database.query(
        `SELECT * FROM empresas WHERE cnpj = $1`,
        [cnpj]
    );

    return Response.json(empresa.rows[0]);
}