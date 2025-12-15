import "./vagaCard.css";
import database from "@/database/database";
import React from 'react'
import BuscarVagas from "./BuscarVagas";

export default async function vagasPage() {
 const sql = "select * from vagas";
 const responseDB = await database.query(sql);
 
 console.log("Resultado do banco", responseDB.rows);

  return <BuscarVagas vagas={responseDB.rows} />

}
