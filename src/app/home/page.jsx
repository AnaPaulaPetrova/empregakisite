// import VagaCard from '@/components/VagasCard/page'
import React from 'react'
import "./Home.css"

export default function Home() {
  return (
    <>
    {/* Banner */}
    <section className="banner-container">
      <div className="banner-text">
        <h2>Encontre o trabalho certo, sem complicação</h2>
        <p>
          O lugar onde você encontra oportunidades que se encaixam no seu perfil.
        </p>
        <button className="btn-ver-vagas">Ver vagas</button>
      </div>

      <div className="logo-image">
        {/* Aqui você pode colocar uma imagem depois */}
      </div>
    </section>

    {/* Cards das principais vagas */}
    <section className="vagas-section">
        <h2>Vagas em destaque</h2>

        <div className="vagas-cards">
            {/* <VagaCard
                title="Operador de Máquinas"
                Empresa="Horaca Editora"
            /> */}

            {/* <VagaCard
                title="Programador"
                Empresa="Coneta Sequer"
            />     */}
        </div>

        <button className="bnt-VerTodas">Ver todas</button>

    </section>
    </>
  )
}
