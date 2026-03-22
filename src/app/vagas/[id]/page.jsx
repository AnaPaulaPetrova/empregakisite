import database from "@/database/database";
import styles from "./vagaDetalhe.module.css"

export default async function VagaDetalhe({ params }) {

    const {id} = await params

    const sql = "SELECT * FROM vagasdisponiveis WHERE id = $1";

    const resultado = await database.query(sql, [id]);

    const vaga = resultado.rows[0];

    if(!vaga){
        return <h1>Vaga não encontrada</h1>
    }

    return (
    <div className={styles.containerCard}>

        <h2>{vaga.titulo}</h2>

        <div className={styles.infoVaga}>
            <span><strong>👤Empresa: </strong>{vaga.empresa}</span>
            <span><strong>💲Faixa Salarial: </strong>{vaga.salario}</span>
            <span><strong>👥Vagas: </strong>{vaga.numerovagas}</span>
            <span><strong>📞Contato: </strong>{vaga.contato}</span>
            <span><strong>📍Local: </strong>{vaga.localizacao}</span>

        </div>

        <div className={styles.descricao}>
            <h3>Descrição da vaga</h3>
            <p>{vaga.descricao}</p>
        </div>

        <div className={styles.botoes}>
            <button className={styles.localizacao}>Localização</button>
            <button className={styles.inscreva}>Inscreva-se</button>
        </div>
    </div>
    );
}