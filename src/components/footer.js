import React from 'react';
import './footer.scss'; 


import logoPreto from '../assets/imagens/logo_preto.png';
import twitterImg from '../assets/imagens/twitter.png';
import instaImg from '../assets/imagens/insta.png';
import githubImg from '../assets/imagens/github.png';

const Footer = () => {

  return (
    <footer>
      <div className="footerContainer">
        {/* Logo e Descrição */}
        <div className="footerLogo">
          <img src={logoPreto} alt="Logo da Empresa" />
          <p>Uma loja feita para você que ama cosméticos, igual a nós!</p>
          <p>Compre fácil, rápido e com os melhores preços.</p>

          {/* Ícones de redes sociais */}
          <div className="icones">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src={twitterImg} alt="Twitter" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src={instaImg} alt="Instagram" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <img src={githubImg} alt="GitHub" />
            </a>
          </div>
        </div>


        <div className="footerColunas">

          <div className="footerColuna">
            <h3>Empresa</h3>
            <ul>
              <li><a href="#sobre">Sobre</a></li>
              <li><a href="#trabalhos">Trabalhos</a></li>
              <li><a href="#carreira">Carreira</a></li>
            </ul>
          </div>

          <div className="footerColuna">
            <h3>Ajuda</h3>
            <ul>
              <li><a href="#atendimento">Atendimento ao cliente</a></li>
              <li><a href="#entrega">Entrega</a></li>
              <li><a href="#termos">Termos e condições</a></li>
            </ul>
          </div>

          <div className="footerColuna">
            <h3>FAQ</h3>
            <ul>
              <li><a href="#conta">Conta</a></li>
              <li><a href="#pedidos">Pedidos</a></li>
              <li><a href="#pagamentos">Pagamentos</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
