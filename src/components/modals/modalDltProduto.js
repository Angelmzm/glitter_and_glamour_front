import React, { useState } from "react";
import "./modalDltProduto.scss";
import { useNavigate } from 'react-router-dom'; 

import closeImg from '../../assets/imagens/close.png';

const ModalDltProduto = ({ productId }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleDeleteProduct = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:3000/api/products/delete/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert('Produto deletado com sucesso!');
        navigate("/admMainPage");
        closeModal();
    } else {
        alert('Erro ao deletar produto');
    }

      setIsModalOpen(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="btnModal">
      <button onClick={handleOpenModal}>Deletar Produto</button>

  
      {isModalOpen && (
        <div
          id="deletarProdutoModal"
          className="modal"
          onClick={(e) => {
            if (e.target.id === "deletarProdutoModal") handleCloseModal();
          }}
        >
          <div className="modalContainer">
            <div className="headerModal">
              <h1>Deletar Produto</h1>
              <img
                src={closeImg}
                alt="Fechar"
                onClick={handleCloseModal}
                style={{ cursor: "pointer" }}
              />
            </div>

            <div className="deletarContainer">
              <p className="texto1">
                Tem certeza que deseja remover este anúncio?
              </p>
              <p>
                Essa ação não poderá ser desfeita. Isso excluirá permanentemente
                o anúncio e removerá os dados salvos de nossos servidores.
              </p>

              {error && <p className="error">{error}</p>}

              <div className="bttDeletar">
                <button className="cancelar" onClick={handleCloseModal}>
                  Cancelar
                </button>
                <button
                  className="confirmar"
                  onClick={handleDeleteProduct}
                  disabled={loading}
                >
                  {loading ? "Deletando..." : "Sim, tenho certeza"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalDltProduto;
