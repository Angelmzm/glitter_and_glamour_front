import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./admProdutoPage.scss";

import Header from "../components/header";
import Footer from "../components/footer";
import ModalAtlProduto from "../components/modals/modalAtlProduto";
import ModalDltProduto from "../components/modals/modalDltProduto";

const AdmProdutoPage = () => {

  const [product, setProduct] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/products/list/${id}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar os dados do produto');
        }
        const data = await response.json();
        setProduct(data);
        console.log("Produto carregado:", data);
      } catch (error) {
        console.error('Erro ao buscar o produto:', error);
      }
    };

    const fetchProdutos = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products/list');
        const data = await response.json();
        const novosProdutos = data.filter(produto => produto.is_newArrivals).slice(0, 4);
        setProdutos(novosProdutos);
      } catch (error) {
        console.error('Erro ao buscar outros produtos:', error);
      }
    };

    fetchProduct();
    fetchProdutos();
  }, [id]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/carrinhoPage"); 
  };

  if (!product) {
    return <p>Carregando informações do produto...</p>;
  }

  return (
    <>
      <Header />
      <main className="produtoPageContainer">
        <section>
          <div className="produtoDetalhes">
            <div className="produtoImages">
              <div className="thumbnails">
                {product.first_image && <img src={product.first_image} alt="Thumbnail 1" />}
                {product.second_image && <img src={product.second_image} alt="Thumbnail 2" />}
                {product.third_image && <img src={product.third_image} alt="Thumbnail 3" />}
              </div>
              <img src={product.cover_image} alt={product.productname} className="imagemPrincipal" />
            </div>

            <div className="produtoInformacoes">
              <h1>{product.productname}</h1>
              <span className="preco">R$ {product.price}</span>
              <p>{product.description}</p>

              <div className="produtoInfoQuantidade">
                <div className="produtoQuantidade">
                  <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
                <button className="adcCarrinho" onClick={handleAddToCart}>
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          </div>

          <div className="admFuncoes">

          {product && <ModalAtlProduto productId={product.id} />}

          {product && <ModalDltProduto productId={product.id} />}
          </div>

          <div className="productDescricao">
            <h2>Detalhes do Produto</h2>
            <p>{product.detail}</p>
          </div>

        </section>

      <div className="outrasOpcoesContainer">
          <h1>Outras Opções</h1>
          <div className="outrasOpcoes">
            {produtos.length > 0 ? (
              produtos.map(produto => (
                <div className="outrasOpcoesProduto" key={produto.id}>
                  <Link to={`/admProdutoPage/${produto.id}`}>
                    <img src={produto.cover_image} alt={produto.productname} />
                  </Link>
                  <div className="outrasOpcoesDetalhes">
                    <p className="nomeOutrasOpcoes">{produto.productname}</p>
                    <p className="precoOutrasOpcoes">R$ {produto.price}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>Carregando produtos...</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AdmProdutoPage;
