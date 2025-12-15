import "./empresasCard.css";
import database from "@/database/database";
import React from 'react'
import EmpresasClient from "./EmpresasClient";

export default async function empresasPage() {
 const sql = "select * from empresas";
 const responseDB = await database.query(sql);

 console.log("resposta:", responseDB.rows);
 
return <EmpresasClient empresas={responseDB.rows} />
}
