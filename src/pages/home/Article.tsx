import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useArticleDispatch, useArticleState } from "../../context/articles/context";
import { Articles, Sports } from "/home/godlord/capstone301/sportnewsapp/src/types";
import { searchArticle } from "../../context/articles/actions";
import { useSportDispatch, useSportState } from "../../context/sports/context";
import { searchSport } from "../../context/sports/actions";

const LiveArticles = () => {
  const dispatch = useArticleDispatch();
  const state: any = useArticleState();
  const { articles, isLoading, isError, errMsg } = state;
  const sportDispatch = useSportDispatch();
  const sportState: any = useSportState();
  const { sports, isLoading: sportLoading, isError: sportError, errMsg: sportErrMsg } = sportState;
  const [selectedSport, setSelectedSport] = useState("All");
  useEffect(() => {
    searchArticle(dispatch).then(response => {
      console.log('API Response:', response);
    });
    searchSport(sportDispatch).then((sportResponse) => {
      console.log('Sports API Response:', sportResponse);
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
  //handle dropdown change
  const handleSportChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSport(event.target.value);
  };
  //filter articles by sport
  const filteredArticles = articles.filter((article: Articles) => {
    return selectedSport === "All" || article.sport.name === selectedSport;
  });

  return (
    <div>
      <p className="font-bold text-2xl mb-3">Articles:</p>
      <div className="mb-4">
        <label className="text-md font-semibold mb-2 mr-1">Filter by sports:</label>
        <select
          className="px-4 py-2 border-4 rounded-xl bg-grey-400 text-black focus:outline-none"
          value={selectedSport}
          onChange={handleSportChange}
        >
          <option value="All">All Sports</option>
          {sports.map((sport: Sports) => (
            <option key={sport.id} value={sport.name}>
              {sport.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col md:grid-cols-2 sm:grid-cols-1 gap-4">
          {filteredArticles.map((article: Articles) => (
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
