import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './lancamentos.scss';

function Lancamentos() {

  const [produtos, setProdutos] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);


  const fetchProdutos = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/products/list');
      const data = await response.json();     
      const novosProdutos = data.filter(produto => produto.is_newArrivals).slice(0, 4);
      setProdutos(novosProdutos);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };


  const checkIfAdmin = () => {
    const isAdmin = localStorage.getItem('isAdm');
    if (isAdmin === 'true') { 
      setIsAdmin(true);
    }
  };

  useEffect(() => {
    fetchProdutos();
    checkIfAdmin();
  }, []); 

  return (
    <div id="lancamentos" className="lancamentoContainer">
      <h1>Lançamento</h1>
      <div className="lancamentos">
        {produtos.length > 0 ? (
          produtos.map(produto => (
            <div className="lancamentoProduto" key={produto.id}>
              <Link to={isAdmin ? `/admProdutoPage/${produto.id}` : `/produtoPage/${produto.id}`}>
                <img src={produto.cover_image} alt={produto.productname} />
              </Link>
              <div className="lancamentoDetalhes">
                <p className="nomeLancamento">{produto.productname}</p>
                <p className="precoLancamento">R$ {produto.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Carregando produtos...</p>
        )}
      </div>
      <Link to="/lancamentoPage" className="bttLancamento">Ver Todos</Link>
    </div>
  );
}

export default Lancamentos;
