import {database} from "@/database/database";


export async function GET() {

    const sql = `SELECT * FROM vagasdisponiveis ORDER BY created_at DESC`;

    const responseDB = await database.query(sql);
 
 //console.log("Resultado do banco", responseDB.rows);
  return Response.json(responseDB.rows)
  // return <BuscarVagas vagas={responseDB.rows} />

}
// alimentar o banco de dados
    export async function POST(request) {
    try {
        const dados = await request.json();
       
        const {cnpjEmpresa, titulo, descricao, requisitos, areaAtuacao, salario, localizacao, cargaHoraria, numeroVagas, contato, dataLimite} = dados;
        
        await database.query(
            `INSERT INTO vagasdisponiveis (cnpj_empresa, titulo, descricao, requisitos, areaatuacao, salario, localizacao, cargahoraria, numerovagas, contato, dataLimite) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11 ) RETURNING *`,
            [cnpjEmpresa, titulo, descricao, requisitos, areaAtuacao,salario, localizacao, cargaHoraria, numeroVagas, contato, dataLimite]
        );

        return Response.json({ message: "Vaga criada com sucesso" })
    } catch (error) {
        console.log(error);
            return Response.json({erro: "Erro ao salvar vaga"}, {status: 500}
        )
    }
}



