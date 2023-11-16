import {Link, useParams} from "react-router-dom";
import articles from "../assets/article-content";
import NotFound from "./NotFound";
import {useEffect, useState} from "react";
import axios from "axios";
import CommentsList from "./CommentsList";
import AddCommentForm from "./AddCommentForm";
import useUser from "../hooks/useUser";

const Article = () => {
  const [articleInfo, setArticleInfo] = useState({
    upvote: 0,
    comments: [],
    canUpvote: false,
  });
  const {canUpvote} = articleInfo;
  const {articleId} = useParams();
  const {user, isLoading} = useUser();

  useEffect(() => {
    const loadArticleInfo = async () => {
      const token = user && (await user.getIdToken());
      const headers = token ? {authToken: token} : {};
      const response = await axios.get(`/api/articles/${articleId}`, {headers});
      const newArticleInfo = response.data;
      setArticleInfo(newArticleInfo);
    };
    if (!isLoading) {
      loadArticleInfo();
    }
  }, [isLoading, user]);

  const article = articles.find((element) => element.name === articleId);

  const addUpvote = async () => {
    const token = user && (await user.getIdToken());
    const headers = token ? {authToken: token} : {};
    const response = await axios.put(
      `/api/articles/${articleId}/upvote`,
      null,
      {headers}
    );
    const updatedArticle = response.data;
    setArticleInfo(updatedArticle);
  };

  if (!article) {
    return <NotFound />;
  }

  return (
    <>
      <h1 className="font-semibold text-center text-xl p-2">{article.title}</h1>
      <div className="flex justify-between py-4">
        {user ? (
          <button
            onClick={addUpvote}
            className="p-2 rounded-md cursor-pointer text-white bg-black hover:bg-slate-500"
          >
            {canUpvote ? "Upvote" : "Already Upvoted"}
          </button>
        ) : (
          <Link to={"/login"}>
            <button className="p-2 rounded-md cursor-pointer text-white  bg-black hover:bg-slate-500">
              Login to Upvote
            </button>
          </Link>
        )}
        <p className="text-lg font-semibold text-gray-500">This article has {articleInfo.upvote} upvote(s).</p>
      </div>
      {article.content.map((paragraph, i) => (
        <p key={i} className="font-mono text-lg py-2">
          {paragraph}
        </p>
      ))}
      {user ? (
        <AddCommentForm
          articleName={articleId}
          updatedComment={(newArticle) => setArticleInfo(newArticle)}
        />
      ) : (
        <Link to={"/login"}>
          <button className="my-2 p-2 rounded-md cursor-pointer text-white  bg-black hover:bg-slate-500">Log in to add a comment</button>
        </Link>
      )}
      <CommentsList comments={articleInfo.comments} />
    </>
  );
};
export default Article;
