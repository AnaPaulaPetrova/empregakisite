import "./VagaCard.css";

export default function VagaCard({ title, empresa }) {
  return (
   <> 
    <div className="vaga-card">
        <h3>{title}</h3>
        <div className="vaga-img"></div>
        <p>{empresa}</p>
      </div>
    </>
  );
}
