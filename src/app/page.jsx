import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1>Bem vindo ao EmpregAki!!!</h1>
       <Link href={"/login"}>Login</Link>
       <Link href={"/vagas"}>Vagas</Link>
    </div>
  );
}
