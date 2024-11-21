import React, { useState } from 'react';
import './cadastroPage.scss';
import Header from '../components/header'; 
import Footer from '../components/footer'; 


function CadastroPage() {
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [celular, setCelular] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username: nome,           
      email,
      cpf: cpf.replace(/\D/g, ''),
      cellphone: celular.replace(/\D/g, ''),
      password: senha,
      confirmPassword: confirmarSenha
    };

    try {
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Erro ao registrar usuário');
      }

      const data = await response.json();
      console.log('Usuário registrado com sucesso:', data);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <div className="App">
      <Header />

      <main>
        <div className="cadastroPage">
          <div className="cadastroContainer">
            <h2 className="tCadastro">Cadastro</h2>
            <form className="cadastroForm" onSubmit={handleFormSubmit}>
              <div>
                <label htmlFor="nome">Nome:</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Digite seu nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="cpf">CPF:</label>
                <input
                  type="text"
                  id="cpf"
                  name="cpf"
                  pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="celular">Celular:</label>
                <input
                  type="tel"
                  id="celular"
                  name="celular"
                  pattern="\(\d{2}\) \d{5}-\d{4}"
                  placeholder="(00) 00000-0000"
                  value={celular}
                  onChange={(e) => setCelular(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="senha">Senha:</label>
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="confirmar_senha">Confirmar Senha:</label>
                <input
                  type="password"
                  id="confirmar_senha"
                  name="confirmar_senha"
                  placeholder="Confirme sua senha"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  required
                />
              </div>
              <button className="bttCadastrar" type="submit">Cadastrar</button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default CadastroPage;
