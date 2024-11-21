import React, { useState, useEffect } from "react";
import "./modalAtlDadosPessoais.scss";

import closeImg from "../../assets/imagens/close.png";

const ModalAtlDadosPessoais = ({ userId, onClose }) => {
  const [formData, setFormData] = useState({
    username: "",
    cpf: "",
    cellphone: "",
  });


  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/list/${userId}`); 
      const data = await response.json();
      setFormData({
        username: data.username,
        cpf: data.cpf,
        cellphone: data.cellphone,
      }); 
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const response = await fetch(`http://localhost:3000/api/users/update/${userId}`, { 
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Dados atualizados com sucesso!");
        onClose();
      } else {
        alert("Erro ao atualizar os dados. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      alert("Erro de conexão com o servidor.");
    }
  };


  useEffect(() => {
    fetchUserData();
  }, [userId]);

  return (
    <div className="modal" onClick={(e) => e.target.className === "modal" && onClose()}>
      <div className="modalContainer">
        <div className="headerModal">
          <h1>Atualizar Dados Pessoais</h1>
          <img src={closeImg} alt="Fechar" onClick={onClose} />
        </div>
        <form className="dadosForm" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Nome:</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Digite seu nome"
              value={formData.username}
              onChange={handleChange}
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
              value={formData.cpf}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="cellphone">Celular:</label>
            <input
              type="tel"
              id="cellphone"
              name="cellphone"
              pattern="\(\d{2}\) \d{5}-\d{4}"
              placeholder="(00) 00000-0000"
              value={formData.cellphone}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Atualizar</button>
        </form>
      </div>
    </div>
  );
};

export default ModalAtlDadosPessoais;
