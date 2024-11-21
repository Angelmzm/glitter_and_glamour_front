import React, { useState } from 'react';
import './modalAtlProduto.scss'; 

import closeImg from '../../assets/imagens/close.png'; 

function ModalAtlProduto({ productId }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        productname: '',
        price: '',
        description: '',
        detail: '',
        is_newArrivals: '',
        is_topSelling: '',
        cover_image: '',
        first_image: '',
        second_image: '',
        third_image: '',
    });

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleOutsideClick = (event) => {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;


        const processedValue =
            (name === 'is_newArrivals' || name === 'is_topSelling') ? (value === 'sim') : value;

        setFormData((prevData) => ({
            ...prevData,
            [name]: processedValue,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        for (const [key, value] of Object.entries(formData)) {
            if (value === '' || value === null || value === undefined) {
                alert(`Por favor, preencha o campo "${key}".`);
                return;
            }
        }

        try {
            const response = await fetch(`http://localhost:3000/api/products/update/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Produto atualizado com sucesso!');
                closeModal();
            } else {
                alert('Erro ao atualizar produto');
            }
        } catch (error) {
            alert('Erro ao atualizar produto');
        }
    };

    return (
        <div className='btnModal'>
            <button id="openModalBtn" onClick={openModal}>
                Atualizar Produto
            </button>

            {isModalOpen && (
                <div
                    id="atualizarProdutoModal"
                    className={`modal ${isModalOpen ? 'open' : ''}`}
                    onClick={handleOutsideClick}
                >
                    <div className="modalContainer">
                        <div className="headerModal">
                            <h1>Atualizar Produto</h1>
                            <img
                                src={closeImg}
                                alt="Fechar"
                                id="closeModalBtn"
                                onClick={closeModal}
                            />
                        </div>

                        <form className="atualizarForm" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="nomeProduto">Nome:</label>
                                <input
                                    type="text"
                                    id="nomeProduto"
                                    name="productname"
                                    value={formData.productname}
                                    onChange={handleInputChange}
                                    placeholder="Ex: Base da Virginia"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="preco">Preço:</label>
                                <input
                                    type="number"
                                    id="preco"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    step="0.01"
                                    placeholder="R$ 0,00"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="descricao">Descrição:</label>
                                <input
                                    type="text"
                                    id="descricao"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Descrição"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="detalhes">Detalhes:</label>
                                <input
                                    type="text"
                                    id="detalhes"
                                    name="detail"
                                    value={formData.detail}
                                    onChange={handleInputChange}
                                    placeholder="Detalhes"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="lancamento">Lançamento:</label>
                                <select
                                    id="lancamento"
                                    name="is_newArrivals"
                                    value={formData.is_newArrivals ? 'sim' : 'nao'}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="" disabled>
                                        Selecione
                                    </option>
                                    <option value="sim">Sim</option>
                                    <option value="nao">Não</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="novoProduto">Novo Produto:</label>
                                <select
                                    id="novoProduto"
                                    name="is_topSelling"
                                    value={formData.is_topSelling ? 'sim' : 'nao'}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="" disabled>
                                        Selecione
                                    </option>
                                    <option value="sim">Sim</option>
                                    <option value="nao">Não</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="imagem_capa">Imagem de Capa (URL):</label>
                                <input
                                    type="url"
                                    id="imagem_capa"
                                    name="cover_image"
                                    value={formData.cover_image}
                                    onChange={handleInputChange}
                                    placeholder="https://exemplo.com/imagem.jpg"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="imagem_galeria1">Imagem da Galeria 1 (URL):</label>
                                <input
                                    type="url"
                                    id="imagem_galeria1"
                                    name="first_image"
                                    value={formData.first_image}
                                    onChange={handleInputChange}
                                    placeholder="https://exemplo.com/imagem1.jpg"
                                />
                            </div>
                            <div>
                                <label htmlFor="imagem_galeria2">Imagem da Galeria 2 (URL):</label>
                                <input
                                    type="url"
                                    id="imagem_galeria2"
                                    name="second_image"
                                    value={formData.second_image}
                                    onChange={handleInputChange}
                                    placeholder="https://exemplo.com/imagem2.jpg"
                                />
                            </div>
                            <div>
                                <label htmlFor="imagem_galeria3">Imagem da Galeria 3 (URL):</label>
                                <input
                                    type="url"
                                    id="imagem_galeria3"
                                    name="third_image"
                                    value={formData.third_image}
                                    onChange={handleInputChange}
                                    placeholder="https://exemplo.com/imagem3.jpg"
                                />
                            </div>

                            <button className="bttAtl" type="submit">
                                Atualizar
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ModalAtlProduto;
