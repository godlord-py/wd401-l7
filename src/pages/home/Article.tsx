import React, { useEffect, useState } from "react";
import { useArticleDispatch, useArticleState } from "../../context/articles/context";
import { searchArticle } from "../../context/articles/actions";
import { useSportDispatch, useSportState } from "../../context/sports/context";
import { useTeamDispatch, useTeamState } from "../../context/teams/context";
import { searchSport } from "../../context/sports/actions";
import { searchTeam } from "../../context/teams/actions";
import { Articles, Sports, Teams, UserPreferences } from "../../types";
import ArticleModal from "./ArticleModel"; 
import { API_ENDPOINT } from "../../config/constants";

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
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    sports: [],
    teams: [],
  });
  const [filteredArticles, setFilteredArticles] = useState<Articles[]>([]);

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

      try {
        const token = localStorage.getItem("authToken");
        const res = await fetch(`${API_ENDPOINT}/user/preferences`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setUserPreferences(data.preferences);
      } catch (error) {
        console.error('Error fetching user preferences:', error);
      }
    };

    fetchData();
  }, [dispatch, sportDispatch, TeamDispatch]);

  useEffect(() => {
    // Function to fetch and filter articles
    const fetchAndFilterArticles = async () => {
      // Filter articles by user preferences
      const filteredArticles = articles.filter((article: Articles) => {
        const isSportMatch = selectedSport === "All" || article.sport.name === selectedSport;
        const isTeamMatch = selectedTeam === "All" || article.teams.some(team => team.name === selectedTeam);
        const isUserPreferenceMatch = userPreferences.sports.length === 0 || userPreferences.sports.includes(article.sport.id);
        return isSportMatch && isTeamMatch && isUserPreferenceMatch;      
      });
      // Set the filtered articles state
      setFilteredArticles(filteredArticles);
    };

    // Call the function to fetch and filter articles whenever user preference or articles change
    fetchAndFilterArticles();
  }, [articles, selectedSport, selectedTeam, userPreferences]);

  const handleOpenArticleModal = (article: Articles) => {
    setSelectedArticle(article);
  };

  const handleCloseArticleModal = () => {
    setSelectedArticle(null);
  };
 
  return (
    <div>
      <p className="font-bold text-3xl text-black dark:text-white">Articles:</p>
      <div className="mb-4">
        <label className="text-md font-semibold mb-2 mr-2">Filter by sports:</label>
        <select
          className="px-4 py-2 border-gray-300 border-4 rounded-xl bg-grey-400 text-black focus:outline-none hover:shadow-lg hover:bg-blue-100"
          value={selectedSport} 
          onChange={(event) => setSelectedSport(event.target.value)}
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
          className="px-4 py-2 border-gray-300 border-4 w-48 rounded-xl m-2 bg-grey-400 text-black focus:outline-none hover:shadow-lg hover:bg-blue-100"
          value={selectedTeam}
          onChange={(event) => setSelectedTeam(event.target.value)}
        >
          <option value="All">All Teams</option>
          {teams.map((team: Teams) => (
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
