import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './maisVendidos.scss';

function MaisVendidos() {

  const [produtos, setProdutos] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);


  const fetchProdutos = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/products/list');
      const data = await response.json();
      const maisVendidos = data.filter(produto => produto.is_topSelling).slice(0, 4);
      setProdutos(maisVendidos);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const checkIfAdmin = () => {
    const isAdmin = localStorage.getItem('isAdm');
    if (isAdmin === 'true') { // salvamos no localStorage como string
      setIsAdmin(true);
    }
  };

  useEffect(() => {
    fetchProdutos();
    checkIfAdmin();
  }, []); 

  return (
    <div id="maisVendidos" className="maisVendidosContainer">
      <h1>Mais Vendidos</h1>
      <div className="maisVendidos">
        {produtos.length > 0 ? (
          produtos.map(produto => (
            <div className="maisVendidosProduto" key={produto.id}>
              <Link to={isAdmin ? `/admProdutoPage/${produto.id}` : `/produtoPage/${produto.id}`}>
                <img src={produto.cover_image} alt={produto.productname} />
              </Link>
              <div className="maisVendidosDetalhes">
                <p className="nomeMaisVendidos">{produto.productname}</p>
                <p className="precoMaisVendidos">R$ {produto.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Carregando produtos...</p>
        )}
      </div>
      <Link to="/maisVendidosPage" className="bttMaisVendidos">Ver Todos</Link>
    </div>
  );
}

export default MaisVendidos;
