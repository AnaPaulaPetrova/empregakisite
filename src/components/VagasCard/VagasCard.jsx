import database from "@/database/database";
import "./vagasCard.css";

export default async function VagasCard() {

  const sql = "SELECT * FROM vagasdisponiveis ORDER BY created_at DESC";
 const responseDB = await database.query(sql);

 const vagas = responseDB.rows;
  return (
   <> 
    <div className="vaga-card">
        <h3>{vagas.titulo}</h3>
        <div className="vaga-img"></div>
        <p>{vagas.empresa}</p>
      </div>
    </>
  );
}
