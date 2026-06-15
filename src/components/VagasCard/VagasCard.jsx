import Link from "next/link";
import { FiMapPin, FiBriefcase, FiHome, FiDollarSign, FiUsers, } from "react-icons/fi";
import styles from "./vagasCard.module.css";

export default async function VagasCard({id, titulo, empresaNome, localizacao,salario, descricao}) {

  return (
   <> 
    <Link href={`/vagas/${id}`}>
      <div className={styles.vagaCard}>
        <h3> <FiBriefcase /> {titulo}</h3>
        <span>
          <FiHome />
          {empresaNome}
        </span>
        {/* <p> <FiFileText /> {descricao}</p> */}
        <p><FiDollarSign /> {salario}</p>
        <p><FiMapPin /> {localizacao}</p>
      </div>
    </Link>
    </>
  );
}
