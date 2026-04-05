import styles from "./vagasCard.module.css";
import Link from "next/link";

export default async function VagasCard({id, titulo, localizacao, descricao}) {

  return (
   <> 
    <Link href={`/vagas/${id}`}>
      <div className={styles.vagaCard}>
        <h3>{titulo}</h3>
        <p>{localizacao}</p>
        <p>{descricao}</p>
      </div>
    </Link>
    </>
  );
}
