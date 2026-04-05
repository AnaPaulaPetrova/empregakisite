import {database} from "@/database/database";
import styles from "./vagaDetalhe.module.css"
import Footer from "@/components/Footer/Footer";
import Link from "next/link";


export default async function VagaDetalhe({ params }) {

    const {id} = await params
 console.log("ID", id);
    const sql = "SELECT * FROM vagasdisponiveis WHERE id = $1";

    const resultado = await database.query(sql, [id]);
 console.log("Resultado", resultado.rows)
    const vaga = resultado.rows[0];

    if(!vaga){
        return <h1>Vaga não encontrada</h1>
    }
   
    const cnpj = vaga.cnpj_empresa;

    const empresaResponse = await database.query(`SELECT * FROM empresas WHERE cnpj = $1`, [cnpj]);

    const empresa = empresaResponse.rows[0];

    return (
        <>
            <div className={styles.containerCard}>
                <h2>{vaga.titulo}</h2>

                <Link href={`/vagas/editar/${vaga.id}`}>
                    Editar
                </Link>

                <div className={styles.infoVaga}>
                    <span><strong>👤Empresa: </strong>{empresa.nome_da_empresa}</span>
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
    
            <Footer />
        </>
    );
}