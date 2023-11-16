import Home from "./Components/Home";
import About from "./Components/About";
import Article from "./Components/Article";
import ArticleList from "./Components/ArticleList";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./Navbar";
import NotFound from "./Components/NotFound";
import LoginPage from "./Components/LoginPage";
import CreateAccountPage from "./Components/CreateAccountPage";

function App() {
  return (
    <BrowserRouter>
      <div className="font-serif">
        <Navbar />
        <div className="mx-16 p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/articles" element={<ArticleList />} />
            <Route path="/articles/:articleId" element={<Article />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/create-account" element={<CreateAccountPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
