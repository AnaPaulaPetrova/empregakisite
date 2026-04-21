import { database } from "@/database/database";
import styles from "./perfil.module.css";
import Link from "next/link";


export default async function Perfil({ params }) {
    const { id } = await params;

    //  Busca o usuário 
    const usuarioResponse = await database.query(
        `SELECT id, nome, email 
         FROM usuarios 
         WHERE id = $1`, 
        [id]
    );
    const usuario = usuarioResponse.rows[0];

    if (!usuario) {
        return(
            <div className={styles.notFound}>
                <h1>Usuário não encontrado</h1>
                <Link href="/dashboard" className={styles.btnBack}>
                    Voltar ao Dashboard
                </Link>
            </div>
        );
    }

    // 2. Busca EMPRESA por CNPJ (seu banco!)
    let empresa = null;
    try {
        // 👈 Procura empresa pelo CNPJ do usuário (ajuste se necessário)
        const empresaResponse = await database.query(
            `SELECT cnpj, nome_da_empresa, contato, endereco, 
                    sobre_a_empresa, missao, visao, valor, ativo
             FROM empresas 
             WHERE ativo = true`
        );
        
        // Pega primeira empresa ativa (ou ajuste lógica)
        empresa = empresaResponse.rows[0] || null;
        
    } catch (e) {
        console.log('ℹ️ Sem empresas ainda');
    }

   return (
        <main className={styles.perfilContainer}>
            <section className={styles.perfilHeader}>
                <Link href="/dashboard" className={styles.linkBack}>← Dashboard</Link>
                <h1 className={styles.titulo}>Olá, {usuario.nome}!</h1>
            </section>

            <div className={styles.perfilContent}>
                {/* Perfil usuário */}
                <div className={styles.perfilCard}>
                    <div className={styles.avatarSection}>
                        <div className={styles.avatar}>
                            <span>{usuario.nome.charAt(0).toUpperCase()}</span>
                        </div>
                        <div className={styles.userInfo}>
                            <h2>{usuario.nome}</h2>
                            <p>{usuario.email}</p>
                            <span>ID: #{usuario.id}</span>
                        </div>
                    </div>
                </div>

                {/* Empresa (se existir) */}
                {empresa && (
                    <div className={styles.empresaCard}>
                        <h3>🏢 Sua Empresa</h3>
                        <div className={styles.empresaInfo}>
                            <p><strong>{empresa.nome_da_empresa}</strong></p>
                            <p>CNPJ: {empresa.cnpj}</p>
                            <p>📞 {empresa.contato}</p>
                            <p>📍 {empresa.endereco}</p>
                        </div>
                        
                        {empresa.sobre_a_empresa && (
                            <div className={styles.sobre}>
                                <h4>Sobre:</h4>
                                <p>{empresa.sobre_a_empresa}</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Ações */}
                <div className={styles.acoes}>
                    <Link href="/vagas" className={styles.btnPrimary}>
                        Ver Vagas
                    </Link>
                    <Link href="#" className={styles.btnSecondary}>
                        Configurações
                    </Link>
                </div>
            </div>
        </main>
    );
}