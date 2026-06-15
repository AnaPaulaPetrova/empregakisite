import {
  FiShield,
  FiDatabase,
  FiLock,
  FiUsers,
} from "react-icons/fi";

import styles from "./privacidade.module.css";

export default function PoliticaPrivacidadePage() {
  return (
    <main className={styles.container}>
      <section className={styles.hero}>
        <FiShield />

        <h1>Política de Privacidade</h1>

        <p>
          Transparência e segurança no tratamento dos seus dados.
        </p>
      </section>

      <section className={styles.card}>
        <h2>
          <FiUsers />
          1. Quem somos
        </h2>

        <p>
          O EmpregAki é uma plataforma criada para conectar
          candidatos e empresas, facilitando a divulgação
          de vagas e oportunidades profissionais.
        </p>
      </section>

      <section className={styles.card}>
        <h2>
          <FiDatabase />
          2. Dados coletados
        </h2>

        <p>
          Durante a utilização da plataforma, podemos
          coletar informações fornecidas pelos usuários,
          como:
        </p>

        <ul>
          <li>Nome completo;</li>
          <li>E-mail;</li>
          <li>Telefone ou contato;</li>
          <li>CPF ou CNPJ;</li>
          <li>Endereço;</li>
          <li>Currículo profissional;</li>
          <li>Informações sobre vagas e candidaturas.</li>
        </ul>
      </section>

      <section className={styles.card}>
        <h2>
          <FiLock />
          3. Como utilizamos seus dados
        </h2>

        <p>
          As informações coletadas são utilizadas para:
        </p>

        <ul>
          <li>Permitir o cadastro de candidatos e empresas;</li>
          <li>Divulgar vagas de emprego;</li>
          <li>Facilitar processos de recrutamento;</li>
          <li>Melhorar a experiência dos usuários;</li>
          <li>Garantir a segurança da plataforma.</li>
        </ul>
      </section>

      <section className={styles.card}>
        <h2>
          <FiShield />
          4. Compartilhamento de dados
        </h2>

        <p>
          O EmpregAki não vende informações pessoais.
          Os dados poderão ser compartilhados apenas
          quando necessários para o funcionamento da
          plataforma ou quando exigidos por lei.
        </p>
      </section>

      <section className={styles.card}>
        <h2>
          <FiLock />
          5. Segurança das informações
        </h2>

        <p>
          Adotamos medidas de segurança para proteger
          os dados armazenados contra acessos não
          autorizados, alterações indevidas ou perdas.
        </p>
      </section>

      <section className={styles.card}>
        <h2>
          <FiUsers />
          6. Direitos do usuário
        </h2>

        <p>
          Conforme a Lei Geral de Proteção de Dados
          (LGPD), o usuário pode solicitar:
        </p>

        <ul>
          <li>Acesso aos seus dados;</li>
          <li>Correção de informações;</li>
          <li>Exclusão da conta;</li>
          <li>Revogação de consentimentos.</li>
        </ul>
      </section>

      <section className={styles.card}>
        <h2>7. Alterações nesta política</h2>

        <p>
          Esta Política de Privacidade poderá ser
          atualizada periodicamente para refletir
          melhorias na plataforma ou mudanças legais.
        </p>
      </section>

      <section className={styles.footerCard}>
        <h3>EmpregAki</h3>

        <p>
          Conectando talentos e oportunidades com
          responsabilidade e transparência.
        </p>
      </section>
    </main>
  );
}