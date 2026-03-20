import style from "./quem-somos.module.css";

export default function QuemSomos() {
  return (
    <div className={style.quemContainer}>
      <h1>Quem Somos</h1>

      <p>
        O <strong>Empregaki</strong> é uma plataforma digital criada para conectar
        empresas e profissionais de forma simples e eficiente.
      </p>

      <section>
        <h2>Missão</h2>
        <p>
          Facilitar a conexão entre empresas e profissionais, promovendo
          oportunidades de trabalho de forma acessível.
        </p>
      </section>

      <section>
        <h2>Visão</h2>
        <p>
          Ser referência em recrutamento digital e divulgação de vagas.
        </p>
      </section>

      <section>
        <h2>Valores</h2>
        <ul>
          <li>Transparência</li>
          <li>Inovação</li>
          <li>Acessibilidade</li>
          <li>Compromisso</li>
          <li>Ética</li>
        </ul>
      </section>

      <section>
        <h2>Nossa História</h2>
        <p>
          O Empregaki surgiu com o objetivo de simplificar o acesso ao mercado de
          trabalho, conectando talentos e empresas em um só lugar.
        </p>
      </section>
    </div>
  );
}