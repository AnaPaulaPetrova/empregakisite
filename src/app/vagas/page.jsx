import database from "@/database/database";
import "./vagaCard.css";
import React from 'react'
import Link from "next/link"
import BuscarVagas from"./BuscarVagas"
// export default async function vagasPage() {
//  const sql = "select * from vagasdisponiveis";
//  const responseDB = await database.query(sql);
 
//  console.log("Resultado do banco", responseDB.rows);

//   return <BuscarVagas vagas={responseDB.rows} />

// }
// async function getVagas(){

//  const res = await fetch("/api/vagas",{
//   cache:"no-store"
//  })

//     if(!res.ok){
//       throw new Error("Erro ao buscar vagas")
//  }


//  return res.json()
// }

// export default async function vagasPage(){

//  const vagas = await getVagas()

//  return(

//   <div className="ContainerPagina">

//    <h1>Vagas disponíveis</h1>

//  <div className="containerVagas">
//    {vagas.map(vaga => (
              
//         <Link key={vaga.id} href={`/vagas/${vaga.slug}-${vaga.id}`} className="cardVaga">
          
//           <h3>{vaga.titulo}</h3>
         
//           <h4>{vaga.empresa}</h4>
          
//           <div className="infoVaga">
//             <span>📍{vaga.localizacao}</span>
//             <span>R$ {vaga.salario}</span>
//           </div>
          
//           <p>{vaga.descricao}</p>
//           {/* <p>Status: {vaga.status}</p> */}

//           {/* <a href={`/vagas/editar/${vaga.id}`}>Editar</a> */}
//         </Link>
      
//     ))}
   
//     </div>
//   </div>
//  )
// }

export default async function vagasPage(){

 const sql = "SELECT * FROM vagasdisponiveis ORDER BY created_at DESC";
 const responseDB = await database.query(sql);

 const vagas = responseDB.rows;
 
//return <BuscarVagas empresas={responseDB.rows} />
 return(

  <div className="ContainerPagina">

   <h1>Vagas disponíveis</h1>

   <div className="containerVagas">

    {vagas.map(vaga => (

      <Link
        key={vaga.id}
        href={`/vagas/${vaga.id}`}
        className="cardVaga"
      >

        <h3>{vaga.titulo}</h3>

        <h4>{vaga.empresa}</h4>

        <div className="infoVaga">
          <span>📍 {vaga.localizacao}</span>
          <span>R$ {vaga.salario}</span>
        </div>

        <p>{vaga.descricao}</p>

      </Link>

    ))}

   </div>

  </div>
 )
}