import { database } from "@/database/database";
import BuscarVagas from "./BuscarVagas";
export default async function vagasPage(){

 const sql = "SELECT * FROM vagasdisponiveis ORDER BY created_at DESC";
 const responseDB = await database.query(sql);

 const vagas = responseDB.rows;
 
return <BuscarVagas vagas={vagas} />
 
}