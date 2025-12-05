import "./vagaCard.css";
import database from "@/database/database";
import React from 'react'

export default async function vagasPage() {
 const sql = "select * from vagas";
 const responseDB = await database.query(sql);

 console.log("Resultado do banco", responseDB.rows);

  return (
    <div className="container-all">
      <div className="title">
        <h1>Vagas Disponiveis</h1>
        </div>
          <div className="vagas-list">
          {
            responseDB.rows.map(field => (
              <div className="card-vagas">
                <h3>{field.title}</h3>
                <h4>{field.requirement}</h4>
              
              </div>
            ))}
          </div>
    </div>
  )
}
