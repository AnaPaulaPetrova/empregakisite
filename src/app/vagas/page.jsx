import "./vagaCard.css";
import database from "@/database/database";
import React from 'react'
import BuscarVagas from "./BuscarVagas";
import Link from "next/link"

// export default async function vagasPage() {
//  const sql = "select * from vagasdisponiveis";
//  const responseDB = await database.query(sql);
 
//  console.log("Resultado do banco", responseDB.rows);

//   return <BuscarVagas vagas={responseDB.rows} />

// }
async function getVagas(){

 const res = await fetch("http://localhost:3000/api/vagas",{
  cache:"no-store"
 })

 return res.json()
}

export default async function vagasPage(){

 const vagas = await getVagas()

 return(

  <div className="ContainerPagina">

   <h1>Vagas disponíveis</h1>

 <div className="containerVagas">
   {vagas.map(vaga => (
      <div key={vaga.id} className="cardVaga">
        
        <Link href={`/vagas/${vaga.slug}-${vaga.id}`} className="cardVaga">
          
          <h3>{vaga.titulo}</h3>
         
          <h4>{vaga.empresa}</h4>
          
          <div className="infoVaga">
            <span>📍{vaga.localizacao}</span>
            <span>R$ {vaga.salario}</span>
          </div>
          
          <p>{vaga.descricao}</p>
          {/* <p>Status: {vaga.status}</p> */}

          {/* <a href={`/vagas/editar/${vaga.id}`}>Editar</a> */}
        </Link>
      </div>
    
   ))}
   
  </div>
  </div>
 )
}