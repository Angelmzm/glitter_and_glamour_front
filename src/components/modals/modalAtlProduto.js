import React, { useState, useEffect } from 'react';
import './modalAtlProduto.scss';

import closeImg from '../../assets/imagens/close.png';

function ModalAtlProduto({ productId }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        productname: '',
        price: '',
        description: '',
        detail: '',
        is_newArrivals: false,
        is_topSelling: false,
        cover_image: '',
        first_image: '',
        second_image: '',
        third_image: '',
    });

    const openModal = async () => {
        setIsModalOpen(true);
        try {
            const response = await fetch(`http://localhost:3000/api/products/${productId}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar os dados do produto');
            }
            const productData = await response.json();
            setFormData({
                productname: productData.productname || '',
                price: productData.price || '',
                description: productData.description || '',
                detail: productData.detail || '',
                is_newArrivals: productData.is_newArrivals || false,
                is_topSelling: productData.is_topSelling || false,
                cover_image: productData.cover_image || '',
                first_image: productData.first_image || '',
                second_image: productData.second_image || '',
                third_image: productData.third_image || '',
            });
        } catch (error) {
            console.error(error); 
        }
    };

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

        // Filtra os campos que foram alterados
        const updatedFields = Object.entries(formData).reduce((acc, [key, value]) => {
            if (value !== '' && value !== null) {
                acc[key] = value;
            }
            return acc;
        }, {});

        console.log('Campos atualizados:', updatedFields);

        try {
            const response = await fetch(`http://localhost:3000/api/products/update/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedFields),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Produto atualizado com sucesso!');
                closeModal();
            } else {
                alert('Erro ao atualizar produto');
                console.error(data);
            }
        } catch (error) {
            alert('Erro ao atualizar produto');
            console.error(error);
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
                                    
                                />
                            </div>
                            <div>
                                <label htmlFor="lancamento">Lançamento:</label>
                                <select
                                    id="lancamento"
                                    name="is_newArrivals"
                                    value={formData.is_newArrivals ? 'sim' : 'nao'}
                                    onChange={handleInputChange}
                                    
                                >
                                    <option value="" disabled>
                                        Selecione
                                    </option>
                                    <option value="sim">Sim</option>
                                    <option value="nao">Não</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="novoProduto">Mais Vendidos:</label>
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
