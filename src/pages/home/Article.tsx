import React, { useEffect, useState } from "react";
import { useArticleDispatch, useArticleState } from "../../context/articles/context";
import { searchArticle } from "../../context/articles/actions";
import { useSportDispatch, useSportState } from "../../context/sports/context";
import { useTeamDispatch, useTeamState } from "../../context/teams/context";
import { searchSport } from "../../context/sports/actions";
import { searchTeam } from "../../context/teams/actions";
import { Articles, Sports, Teams } from "../../types";
import { XIcon } from "@heroicons/react/solid";
import ArticleModal from "./ArticleModel"; 

const LiveArticles = () => {
  const dispatch = useArticleDispatch();
  const state: any = useArticleState();
  const { articles, isLoading, isError, errMsg } = state;

  const sportDispatch = useSportDispatch();
  const TeamDispatch = useTeamDispatch();
  const sportState: any = useSportState();
  const teamState: any = useTeamState();
  const { sports, isLoading: sportLoading, isError: sportError, errMsg: sportErrMsg } = sportState;
  const { teams, isLoading: teamLoading, isError: teamError, errMsg: teamErrMsg } = teamState;

  const [selectedSport, setSelectedSport] = useState("All");
  const [selectedTeam, setSelectedTeam] = useState("All");
  const [selectedArticle, setSelectedArticle] = useState<Articles | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await searchArticle(dispatch);
      } catch (articleError) {
        console.error('Error fetching articles:', articleError);
      }

      try {
        await searchSport(sportDispatch);
      } catch (sportError) {
        console.error('Error fetching sports:', sportError);
      }

      try {
        await searchTeam(TeamDispatch);
      } catch (teamError) {
        console.error('Error fetching teams:', teamError);
      }
    };

    fetchData();
  }, [dispatch, sportDispatch, TeamDispatch]);

  if (isError) {
    return <p className="text-red-500">{errMsg}</p>;
  }

  if (isLoading || sportLoading || teamLoading) {
    return (
      <div className="flex flex-col space-y-4">
        {[...Array(10).keys()].map((id) => (
          <div
            key={id}
            className="animate-pulse flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md border border-gray-200"
          >
            <div className="w-32 h-24 bg-gray-200 rounded-lg"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Filter teams based on plays
  const filteredTeams = teams.filter((team: Teams) => {
    return selectedSport === "All" || team.plays === selectedSport;
  });

  // Handle dropdown change for sports
  const handleSportChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSport(event.target.value);
    setSelectedTeam("All"); // Reset team selection when sport changes
  };

  // Handle dropdown change for teams
  const handleTeamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeam(event.target.value);
    const selectedTeamPlays = teams.find(team => team.name === event.target.value)?.plays || "All";
    setSelectedSport(selectedTeamPlays);
  };

  // Filter articles by sport and team
  const filteredArticles = articles.filter((article: Articles) => {
    const isSportMatch = selectedSport === "All" || article.sport.name === selectedSport;
    const isTeamMatch = selectedTeam === "All" || article.teams.some(team => team.name === selectedTeam);
    return isSportMatch && isTeamMatch;      
  });

  const handleOpenArticleModal = (article: Articles) => {
    setSelectedArticle(article);
  };

  const handleCloseArticleModal = () => {
    setSelectedArticle(null);
  };

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
        <label className="text-md font-semibold mb-2 ml-6">Filter by Teams:</label>
        <select
          className="px-4 py-2 border-4 w-48 rounded-xl m-2 bg-grey-400 text-black focus:outline-none"
          value={selectedTeam}
          onChange={handleTeamChange}
        >
          <option value="All">All Teams</option>
          {filteredTeams.map((team: Teams) => (
            <option key={team.id} value={team.name}>
              {team.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col md:grid-cols-2 sm:grid-cols-1 gap-4">
        {filteredArticles.map((article: Articles) => (
          <div
            key={article.id}
            className="flex rounded-lg bg-white border border-gray-200 shadow-md hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => handleOpenArticleModal(article)}
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
          </div>
        ))}
      </div>
      {selectedArticle && (
        <ArticleModal article={selectedArticle} onClose={handleCloseArticleModal} />
      )}
    </div>
  );
};

export default LiveArticles;

