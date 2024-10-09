import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import AllArticles from "./pages/AllArticles";
import DetailArticle from "./pages/DetailArticle";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="articles" element={<AllArticles />} />
          <Route path="article/:id/:slug" element={<DetailArticle />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
