import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useArticleDispatch, useArticleState } from "../../context/articles/context";
import { Articles } from "/home/godlord/capstone301/sportnewsapp/src/types";
import { searchArticle } from "../../context/articles/actions";

const LiveArticles = () => {
  const dispatch = useArticleDispatch();
  const state: any = useArticleState();
  const { articles, isLoading, isError, errMsg } = state;

  useEffect(() => {
    searchArticle(dispatch).then(response => {
      console.log('API Response:', response);
    });
  }, [dispatch]);

  if (isError) {
    return <p className="text-red-500">{errMsg}</p>;
  }

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-4">
        {[...Array(10).keys()].map((id) => (
          <div
            key={id}
            className="animate-pulse flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md border border-gray-200"
          >
            <div className="w-32 h-24 bg-gray-200  rounded-lg"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200  rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200  rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <p className="font-bold text-2xl mb-3">Articles:</p>
      <div className="flex flex-col md:grid-cols-2 sm:grid-cols-1 gap-4">
        {articles &&
          articles.map((article: Articles) => (
            <Link
              key={article.id}
              to={`/article/${article.id}`}
              className="flex rounded-lg bg-white border border-gray-200 shadow-md hover:shadow-xl transition-shadow "
            >
              <img
                className="w-32 rounded-l-lg object-cover h-auto"
                src={article.thumbnail}
                alt="thumbnail"
              />
              <div className="flex flex-col justify-start p-6">
                <p className="text-xs text-neutral-500 ">
                  {article.sport.name}
                </p>
                <h5 className="mt-2 text-xl font-semibold text-neutral-800 ">
                  {article.title}
                </h5>
                <p className="mb-4 text-sm text-neutral-600 ">
                  {article.summary}
                </p>
                <p className="text-xs text-neutral-500 ">
                  {new Date(article.date).toDateString()}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default LiveArticles;
