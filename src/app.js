import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdmMainPage from "./pages/admMainPage";
import LoginPage from "./pages/loginPage";
import CadastroPage from "./pages/cadastroPage";
import LancamentoPage from "./pages/lancamentoPage";
import MaisVendidosPage from "./pages/maisVendidosPage";
import MaquiagemPage from "./pages/maquiagemPage";
import UnhasPage from "./pages/unhasPage";
import CabeloPage from "./pages/cabeloPage";
import PerfumePage from "./pages/perfumePage";
import ProdutoPage from "./pages/produtoPage";
import AdmProdutoPage from "./pages/admProdutoPage";
import MainPage from "./pages/mainPage";
import CarrinhoPage from "./pages/carrinhoPage";


function App() {
  return (
      <Routes>

        <Route path="/" element={<MainPage />} />
        <Route path="/admMainPage" element={<AdmMainPage />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/cadastroPage" element={<CadastroPage />} />
        <Route path="/lancamentoPage" element={<LancamentoPage />} />
        <Route path="/maisVendidosPage" element={<MaisVendidosPage />} />
        <Route path="/maquiagemPage" element={<MaquiagemPage />} />
        <Route path="/unhasPage" element={<UnhasPage />} />
        <Route path="/cabeloPage" element={<CabeloPage />} />
        <Route path="/perfumePage" element={<PerfumePage />} />
        <Route path="/produtoPage/:id" element={<ProdutoPage />} />
        <Route path="/admProdutoPage/:id" element={<AdmProdutoPage />} />
        <Route path="/carrinhoPage" element={<CarrinhoPage />} />
        
      </Routes>
  );
}

export default App;
