import { database } from "@/database/database";
import EditarVaga from "./EditarVaga";

export default async function Page({ params }) {

    const {id} = await params

  const vaga = await database.query(
    "SELECT * FROM vagasdisponiveis WHERE id = $1",
    [id]
  );

  const dados = vaga.rows[0];
  if(!dados){
    return <h1>Vagas não encontrada</h1>
  }
  
  return <EditarVaga vaga={dados} />;
}