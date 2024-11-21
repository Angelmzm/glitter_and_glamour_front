import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./admMainPage.scss"; 

import ModalAdcProduto from '../components/modals/modalAdcProduto';  
import Lancamentos from '../components/lancamento';
import MaisVendidos from '../components/maisVendidos';
import Header from '../components/header';
import Footer from '../components/footer'; 


import capaImg from '../assets/imagens/imagemCapa.png'
import maquiagemImg from '../assets/imagensCategorias/maquiagem.png'
import unhasImg from '../assets/imagensCategorias/unhas.png'
import perfumeImg from '../assets/imagensCategorias/perfume.png'
import cabeloImg from '../assets/imagensCategorias/cabelo.png'

const AdmMainPage = () => {

  return (
    <div className="App">
      {/* Header */}
      <Header />

      {/* Seção de Capa */}
      <section className="capa">
        <div className="capaContainer">
          <div className="textoCapa">
            <h1>Os melhores cosméticos, na melhor loja!</h1>
            <h2>Uma loja feita para você que ama cosméticos, igual a nós! Compre fácil, rápido e com os melhores preços.</h2>
          </div>
        
        <div className="imagemCapa">
            <img src={capaImg} alt="Imagem de produtos" />
        </div>
        </div>
      </section>

      {/* Adicionar Produto */}
      <div className="adcProdutoAdm">
      <ModalAdcProduto />
      </div>

      {/* Lançamentos */}
      <Lancamentos />

      {/* Mais Vendidos */}
      <MaisVendidos />

      {/* Categorias */}
      <div id="categorias" className="categoriaContainer">
        <div className="categoria">
          <h1>Categorias</h1>
          <div className="categoriaOpcoes">
            <Link to="/unhasPage" className="opcaoCategoria">
              <p>Unhas</p>
              <img src={unhasImg} alt="Unhas" />
            </Link>
            <Link to="/maquiagemPage" className="opcaoCategoria">
              <p>Maquiagem</p>
              <img src={maquiagemImg} alt="Maquiagem" />
            </Link>
            <Link to="/perfumePage" className="opcaoCategoria">
              <p>Perfume</p>
              <img src={perfumeImg} alt="Perfume" />
            </Link>
            <Link to="/cabeloPage" className="opcaoCategoria">
              <p>Cabelo</p>
              <img src={cabeloImg} alt="Cabelo" />
            </Link>
          </div>
        </div>
      </div>

      {/* Rodapé */}
      <Footer />
    </div>
  );
};

export default AdmMainPage;
