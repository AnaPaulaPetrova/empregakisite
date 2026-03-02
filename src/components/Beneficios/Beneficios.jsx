import Link from "next/link";
import "./Beneficios.css";

export default function Beneficios() {
  return (
    <section className="beneficios">
      <h2>Benefícios EMPREGAKI</h2>

      <div className="beneficios-grid">
        <div>
          <h3>Transparência</h3>
          <p>Informações claras sobre vagas e empresas.</p>
        </div>

        <div>
          <h3>Agilidade</h3>
          <p>Processo rápido e simples.</p>
        </div>

        <div className="publicar-box">
          <h3>Publique suas Vagas</h3>
          <p>
            Atraia candidatos qualificados e encontre o talento certo.
          </p>
          <button ><Link href={"/cadastroEmpresa"}>Cadastre sua Empresa</ Link></button>
        </div>
      </div>
    </section>
  );
}