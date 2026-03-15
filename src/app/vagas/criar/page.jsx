"use client"

import { useRouter } from "next/navigation"

export default function CriarVaga(){

 const router = useRouter()

 async function enviar(e){

  e.preventDefault()

  const dados = {
   empresa:e.target.empresa.value,
   titulo:e.target.titulo.value,
   descricao:e.target.descricao.value,
   salario:e.target.salario.value,
   status:"aberta"
  }

  await fetch("/api/vagas",{
   method:"POST",
   body:JSON.stringify(dados)
  })

  router.push("/vagas")
 }

 return(

  <form onSubmit={enviar}>

   <input name="empresa" placeholder="empresa"/>

   <input name="titulo" placeholder="titulo"/>

   <textarea name="descricao"/>

   <input name="salario" placeholder="salario"/>

   <button>Criar vaga</button>

  </form>
 )
}