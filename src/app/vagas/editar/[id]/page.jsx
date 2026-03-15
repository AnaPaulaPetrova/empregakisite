"use client"

import { useRouter } from "next/navigation"

// Editar do Banco
export default function EditarVaga({params}){

 const router = useRouter()

 async function atualizar(e){

  e.preventDefault()

  const dados = {
   empresa:e.target.empresa.value,
   titulo:e.target.titulo.value,
   descricao:e.target.descricao.value,
   salario:e.target.salario.value,
   status:e.target.status.value
  }

  await fetch(`/api/vagas/${params.id}`,{
   method:"PUT",
   body:JSON.stringify(dados)
  })

  router.push("/vagas")
 }

//  Função deletar do Banco
 async function deletar(){

  await fetch(`/api/vagas/${params.id}`,{
   method:"DELETE"
  })

  router.push("/vagas")
 }

 return(

  <form onSubmit={atualizar}>

   <input name="empresa"/>

   <input name="titulo"/>

   <textarea name="descricao"/>

   <input name="salario"/>

   <select name="status">

    <option value="aberta">Aberta</option>
    <option value="pausada">Pausada</option>
    <option value="encerrada">Encerrada</option>

   </select>

   <button>Atualizar</button>

   <button type="button" onClick={deletar}>
    Deletar
   </button>

  </form>
 )
}

import database from "@/database/database";

export default async function VagaDetalhe({ params }) {

    const id = params.id;

    const sql = "SELECT * FROM vagasdisponiveis WHERE id = $1";

    const vaga = await database.query(sql, [id]);

    const dados = vaga.rows[0];

    return (

        <div>

            <h1>{dados.titulo}</h1>

            <p><strong>Empresa:</strong> {dados.empresa}</p>

            <p><strong>Local:</strong> {dados.local}</p>

            <p><strong>Salário:</strong> {dados.salario}</p>

            <p>{dados.descricao}</p>

        </div>

    );
}