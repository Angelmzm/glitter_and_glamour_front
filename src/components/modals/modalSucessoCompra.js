import React from "react";
import "./modalSucesso.scss";
import closeImg from '../../assets/imagens/close.png';
import sucessoImg from '../../assets/imagens/sucesso.png';


const ModalSucessoCompra = ({ fecharModal }) => {
  return (
    <div className="modal" onClick={fecharModal}>
      <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
        <div className="headerModal">
          <h1>Compra realizada com Sucesso!</h1>
          <img
            src={closeImg}
            alt="Fechar"
            className="closeButton"
            onClick={fecharModal}
          />
        </div>
        <div className="sucessoContainer">
          <p className="texto1">Obrigada pela preferência!</p>
          <img src={sucessoImg} alt="Carinha feliz" />
        </div>
      </div>
    </div>
  );
};

export default ModalSucessoCompra;
