import React from 'react'
import "./cadastroEmpresa.css"
export default function cadastroEmp() {



  return (
     <div className="cadastroEmp-container">
        <h2 className="cadastroEmp-title">Crie sua conta</h2>
        <p className="cadastroEmp-subtitle">Preencha seus dados para começar a usar o Empregaki</p>

        {/* {error && <div className="error">{error}</div>} */}

        <form  className="cadastroEmp-form">
            <div className="cadastro-group">
                <div className="cadastro-item">
                    <input
                        className="input"
                        type="radio"
                        id="souEmpresa"
                        name="cadastro"
                        //value={souEmpresa}
                        //onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label for="souEmpresa">Sou Empresa</label>
                    <input
                        className="input"
                        type="radio"
                        id="souCandidato"
                        name="cadastro"
                        //value={souCandidato}
                        //onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label for="souCandidato">Sou Candidato</label>
                </div>
            </div>
            <label></label>
            <input
                className="input"
                type="text"
                //value={nome}
                //onChange={(e) => setEmail(e.target.value)}
                placeholder="Nome completo"
                required
            />
             <label></label>
            <input
                className="input"
                type="text"
                //value={nome}
                //onChange={(e) => setEmail(e.target.value)}
                placeholder="CNPJ"
                required
            />
            <label></label>
            <input
                className="input"
                type="email"
                //value={email}
                //onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
                required
            />

            <label></label>
            <input
                className="input"
                type="password"
                //value={password}
                //onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha"
                required
            />

            <label></label>
            <input
                className="input"
                type="password"
                //value={confirmSenha}
                //onChange={(e) => setPassword(e.target.value)}
                placeholder="Confirme sua senha"
                required
            />

            {/* <p className="cadastroEmp-subtitle">Tipo de conta</p> */}

            <button className="enter-button" type="submit">Entrar</button>
        </form>

          <a className="cadastroEmp-forgot" href="">Esqueceu sua senha?</a>
          
          <div className="cadastroEmp-divider">
            <span></span> ou <span></span>
          </div>

           <button className="google-button" type="submit">
            <img src="" alt=""></img>Continuar com o Google
           </button>
        </div>
  );
}
