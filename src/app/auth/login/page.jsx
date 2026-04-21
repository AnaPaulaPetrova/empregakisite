"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./login.module.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");
    const router = useRouter();
    
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErro("");

        try {
            const resposta = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ email, senha })
            });

            const data = await resposta.json();

            if (!resposta.ok) {
                setErro(data.error || "Erro no login");
                return;
            }
            console.log("✅ Dados da API:", data);
            
             if (!data.token) {
                setErro("Token não encontrado");
                return;
            }
            
            // Salvar token e dados do usuário
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.usuario.id.toString());
            localStorage.setItem("userName", data.usuario.nome);

            router.push(`/perfil/${data.usuario.id}`);
            // Redirecionamento SEGURO baseado no que tem disponível
        if (data.user?.cnpj) {
            // Empresa com CNPJ
            localStorage.setItem("userCnpj", data.user.cnpj);
            router.push(`/perfil/${data.user.cnpj}`);
        } else if (data.user?.id) {
            // Usuário com ID
            localStorage.setItem("userId", data.user.id);
            router.push(`/perfil/${data.user.id}`);
        } else if (data.id) {
            // API retorna ID direto
            localStorage.setItem("userId", data.id);
            router.push(`/perfil/${data.id}`);
        } else {
            // Fallback para dashboard genérico
            console.warn("⚠️ Não encontrou ID/CNPJ, indo pro dashboard");
            router.push("/dashboard");
        }

        } catch (error) {
            console.error("❌ Erro no login: ", error);
            setErro("Erro de conexão. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };
    return (
    <div className={styles.loginContainer}>
        <h2 className={styles.loginTitulo}>Acesse sua conta</h2>
        <p className={styles.loginSubtitulo}>Entre com seus dados para continuar</p>
        {erro && (
            <div className={styles.error} role="alert">
                {erro}
            </div>
        )}

        <form onSubmit={handleLogin} className={styles.loginForm}>
            
            <label></label>
            <input
                className={styles.input}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu e-mail"
                required
                disabled={loading}
            />

            <label></label>
            <input
                className={styles.input}
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite sua senha"
                required
                disabled={loading}
            />

            <button
                className={styles.enterButton} 
                type="submit" 
                disabled={loading || !email || !senha}
            >
                    { loading ? "Entrando..." : "Entrar"}
             </button>
        </form>

        <p className={styles.semConta}>
            Não tem conta? {" "}
            <Link href="/auth/registro" className={styles.cadastro}>    Cadastre-se
            </Link>
        </p>
          <Link href={"/auth/recuperarSenha"} className={styles.loginForgot}>
            Esqueceu sua senha?
          </Link>
          
          {/* <div className={styles.loginDivider}>
            <span></span> ou <span></span>
          </div>

           <button 
            className={styles.googleButton}
            type="button">
            <img src="" alt="Google">
            </img>Continuar com o Google
           </button> */}
        </div>
  );
}
