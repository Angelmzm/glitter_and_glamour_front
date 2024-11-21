import React, { useState, useEffect } from "react";
import "./carrinhoPage.scss";
import { Link, useNavigate } from "react-router-dom";

import Header from "../components/header";
import Footer from "../components/footer";
import ModalSucessoCompra from "../components/modals/modalSucessoCompra";

import lixeira from "../assets/imagens/lixeira.png";

const CarrinhoPage = () => {

  const [produtos, setProdutos] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setProdutos(cart);

    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      navigate('/loginPage');
    }
  }, [navigate]);

  const atualizarQuantidade = (id, operacao) => {
    const updatedCart = produtos.map((produto) =>
      produto.id === id
        ? {
            ...produto,
            quantity:
              operacao === "increment"
                ? produto.quantity + 1
                : produto.quantity > 1
                ? produto.quantity - 1
                : produto.quantity,
          }
        : produto
    );
    setProdutos(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removerProduto = (id) => {
    const updatedCart = produtos.filter((produto) => produto.id !== id);
    setProdutos(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calcularTotal = () => {
    return produtos
      .reduce((total, produto) => total + produto.price * produto.quantity, 0)
      .toFixed(2);
  };

  const abrirModal = () => {
    setShowModal(true);
  };

  const fecharModal = () => {
    setShowModal(false);
  };

  return (
    <>

      <Header />

      <main>
        <div className="carrinhoContainer">
          <h1>Carrinho</h1>
          <div className="carrinhoContent">
            <div className="carrinhoProdutos">
              {produtos.length > 0 ? (
                produtos.map((produto) => (
                  <div className="carrinhoItens" key={produto.id}>
                    <Link to={`/admProdutoPage/${produto.id}`}>
                      <img src={produto.cover_image} alt={produto.productname} />
                    </Link>
                    <div className="carrinhoItensDetalhes">
                      <h4>{produto.productname}</h4>
                      <p>R$ {produto.price}</p>
                    </div>
                    <div className="carrinhoQuantidade">
                      <button onClick={() => atualizarQuantidade(produto.id, "decrement")}>
                        -
                      </button>
                      <span>{produto.quantity}</span>
                      <button onClick={() => atualizarQuantidade(produto.id, "increment")}>
                        +
                      </button>
                    </div>
                    <div className="carrinhoLixeira">
                      <img
                        src={lixeira}
                        alt="Remover"
                        onClick={() => removerProduto(produto.id)}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p>Seu carrinho está vazio!</p>
              )}
            </div>

            <div className="totalContainer">
              <div className="total">
                <h2>Total</h2>
                <div className="totalDetalhes">
                  <span className="totalLabel">Total</span>
                  <span className="totalPreco">R$ {calcularTotal()}</span>
                </div>
                <div className="bttComprar">
                  <button onClick={abrirModal}>Comprar</button> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      {/* Exibir o modal de sucesso se showModal for verdadeiro */}
      {showModal && <ModalSucessoCompra fecharModal={fecharModal} />}

    </>
  );
};

export default CarrinhoPage;
