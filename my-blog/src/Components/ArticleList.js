import {Link} from "react-router-dom";
import articles from "../assets/article-content";

const ArticleList = () => {
  return (
    <>
      {/* <h1>Articles</h1> */}
      {articles.map((article) => (
        <div key={article.id} className="py-4" >
          <Link to={`/articles/${article.name}`}>
            <h3 className="font-semibold text-xl p-2 hover:text-3xl text-blue-800 transition-all duration-150">{article.title}</h3>
            <p className="font-mono text-lg">{article.content[0].substring(0, 150)}...</p>
          </Link>
        </div>
      ))}
    </>
  );
};
export default ArticleList;
