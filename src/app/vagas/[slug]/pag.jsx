import database from "@/database/database";

export default async function VagaDetalhe({ params }) {

    const slug = params.slug;

    // pega o id no final do slug
    const id = slug.split("-").pop();

    const sql = "SELECT * FROM vagasdisponiveis WHERE id = $1";

    const resultado = await database.query(sql, [id]);

    const vaga = resultado.rows[0];

    return (
        <div>

            <h1>{vaga.titulo}</h1>

            <p><strong>Empresa:</strong> {vaga.empresa}</p>

            <p><strong>Local:</strong> {vaga.local}</p>

            <p><strong>Salário:</strong> {vaga.salario}</p>

            <p>{vaga.descricao}</p>

        </div>
    );
}