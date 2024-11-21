import React, { useState } from "react";
import "./modalDLtDadosPessoais.scss"; 
import { useNavigate } from 'react-router-dom'; 

import closeImg from "../../assets/imagens/close.png";

const ModalDltDadosPessoais = ({ userId, onClose }) => {
  
  const [isModalOpen, setIsModalOpen] = useState(true); 
  const navigate = useNavigate(); 

  const deleteUser = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/delete/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Erro ao excluir o usuário");
      }
      alert("Usuário excluído com sucesso!");
      onClose(); 
      localStorage.removeItem("userId");
      localStorage.removeItem("authToken"); 
      navigate("/loginPage"); 
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao excluir o usuário. Tente novamente.");
    }
  };

  return (
    <>
      {/* Modal para deletar a conta */}
      {isModalOpen && (
        <div id="deletarContaModal" className="modal" onClick={(e) => e.target === e.currentTarget && onClose()}>
          <div className="modalContainer">
            <div className="headerModal">
              <h1>Deletar Conta</h1>
              <img
                src={closeImg}
                alt="Fechar"
                id="closeModalBtn"
                onClick={onClose} 
              />
            </div>

            <div className="deletarContainer">
              <p className="texto1">Tem certeza que deseja excluir sua conta?</p>
              <p>
                Essa ação não poderá ser desfeita. Isso excluirá permanentemente sua conta e removerá todos os seus dados de nossos servidores.
              </p>
              <div className="bttDeletar">
                <button className="cancelar" onClick={onClose}>Cancelar</button>
                <button className="confirmar" onClick={deleteUser}>Sim, tenho certeza</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalDltDadosPessoais;
