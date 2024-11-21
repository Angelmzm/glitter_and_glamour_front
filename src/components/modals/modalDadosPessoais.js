import React, { useState, useEffect } from "react";
import "./modalDadosPessoais.scss";
import ModalAtlDadosPessoais from "./modalAtlDadosPessoais";
import ModalDltDadosPessoais from "./modalDltDadosPessoais";
import { useNavigate } from 'react-router-dom';

import closeImg from "../../assets/imagens/close.png";

const ModalDadosPessoais = () => {

  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [userData, setUserData] = useState(null); 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 
  const [error, setError] = useState(null); 

  const userId = localStorage.getItem("userId"); 
  const navigate = useNavigate(); 


  const fetchUserData = async () => {
    if (!userId) {
      setError("Usuário não encontrado. Por favor, faça o login.");
      navigate("/loginPage");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/users/list/${userId}`);
      if (!response.ok) {
        throw new Error(`Erro ao buscar dados do usuário: ${response.statusText}`);
      }
      const data = await response.json();
      setUserData(data); 
      setIsModalOpen(true); 
    } catch (error) {
      setError(`Erro: ${error.message}`); 
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]); 


  const openEditModal = () => {
    setIsEditModalOpen(true); 
    setIsModalOpen(false); 
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false); 
    fetchUserData(); 
  };

  const closeModal = () => {
    setIsModalOpen(false); 
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true); 
    setIsModalOpen(false); 
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false); 
    setIsModalOpen(true); 
  };


  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal")) {
      closeModal(); 
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId"); 
    localStorage.removeItem("authToken");
    localStorage.clear()
    navigate("/loginPage"); 
  };

  return (
    <>
      {/* Modal de Dados Pessoais */}
      {isModalOpen && (
        <div className="modal" onClick={handleOutsideClick}>
          <div className="modalContainer">
            <div className="headerModal">
              <h1>Dados Pessoais</h1>
              <img
                src={closeImg}
                alt="Fechar"
                onClick={closeModal} 
              />
            </div>

            <div className="dadosContainer">
              {error ? (
                <p>{error}</p> 
              ) : userData ? (
                <div className="dados">
                  <span>Nome</span>
                  <p>{userData.username}</p>
                  <span>CPF</span>
                  <p>{userData.cpf}</p>
                  <span>Celular</span>
                  <p>{userData.cellphone}</p>
                </div>
              ) : (
                <p>Carregando...</p>
              )}
  
              <div className="bttDados">
                <button onClick={openEditModal}>Atualizar</button>
                <button onClick={openDeleteModal}>Deletar</button>
                <button onClick={handleLogout}>Sair</button> 
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Edição */}
      {isEditModalOpen && <ModalAtlDadosPessoais userId={userId} onClose={closeEditModal} />}

      {/* Modal de Deletação */}
      {isDeleteModalOpen && <ModalDltDadosPessoais userId={userId} onClose={closeDeleteModal} />}
    </>
  );
};

export default ModalDadosPessoais;
