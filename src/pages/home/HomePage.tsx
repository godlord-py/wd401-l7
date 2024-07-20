import React, { useEffect, useState } from 'react';
import { RefreshIcon, CalendarIcon, MapIcon } from '@heroicons/react/solid';
import { searchMatch } from '../../context/members/actions';
import { useMatchDispatch, useMatchState } from '../../context/members/context';
import { API_ENDPOINT } from '../../config/constants';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation()
  const dispatch = useMatchDispatch();
  const state = useMatchState();
  const { matches, isLoading, isError, errorMessage } = state;
  const [matchesWithScores, setMatchesWithScores] = useState([]);
  const [loadingData, setLoadingData] = useState(true); // State to manage skeleton loading

  useEffect(() => {
    setLoadingData(true); // Set loading state to true when data fetching starts
    const fetchMatchesWithScores = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/matches`);
        const data = await response.json();
        const matchesWithScoresPromises = data.matches.map(async (match) => {
          const matchResponse = await fetch(`${API_ENDPOINT}/matches/${match.id}`);
          const matchData = await matchResponse.json();
          return { ...match, score: matchData.score };
        });
        const matchesWithScores = await Promise.all(matchesWithScoresPromises);
        setMatchesWithScores(matchesWithScores);
        setLoadingData(false); // Set loading state to false when data fetching is completed
      } catch (error) {
        console.error('Error fetching matches:', error);
        setLoadingData(false); // Ensure loading state is set to false in case of error
      }
    };
    fetchMatchesWithScores();
  }, []);

  const handleRefresh = () => {
    searchMatch(dispatch);
  };

  if (isError) {
    return <p className="text-red-500">{errorMessage}</p>;
  }

  return (
    <div className="scroll-bar">
    <button onClick={() => methodDoesNotExist()}>Break the world</button>
      <div className="flex justify-between items-center mb-4 px-4">
        <h2 className="font-bold text-5xl text-slate-900 dark:text-white hover:text-blue-900 transition-all">Live Sports:</h2>
        <button onClick={handleRefresh} className="bg-gray-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400">
          <RefreshIcon className="w-6 h-6" />
        </button>
      </div>
      {loadingData && (
        <div className="flex flex-wrap">
          {[...Array(3)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-shrink-0 bg-gray-300 p-4 rounded-md mr-4 mb-4"
              style={{ minWidth: '360px', minHeight: '150px' }}
            >
              <div className="w-50 h-10 bg-gray-200 rounded-lg"></div>
              <div className="flex-1"></div>
            </motion.div>
          ))}
        </div>
      )}
      {!loadingData && (
        <div id='match' className="flex overflow-x-auto gap-4 pb-2 rounded-l-md px-4">
          {matchesWithScores.map((match) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0 bg-gradient-to-r from-gray-700 to-gray-500 p-4 rounded-md text-white border dark:border-white"
              style={{ minWidth: '260px' }}
              whileHover={{ scale: 1.01,  }}
            >
              <div className="flex mr-2 justify-between items-center mb-4">
                <p className="text-lg">{match.teams[0].name} VS {match.teams[1].name}</p>
                {match.isRunning ? (
                  <div className="flex items-center gap-2">
                    <span className="p-2 ml-2 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-green-500">Live Now</p>
                  </div>
                ) : (
                  <div className="flex items-center text-sm">
                    <CalendarIcon className="w-5 h-5 mr-2" />
                    <p>{new Date(match.endsAt).toLocaleDateString()}</p>
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                {Object.entries(match.score).map(([teamName, score]) => (
                  <p key={teamName} className="text-lg text-green-500">{`${teamName}: ${score}`}</p>
                ))}
              </div>
              <div className="flex text-sm text-gray-400 items-center">
                <MapIcon className="w-4 h-4 mr-2 text-gray-300" />
                <p>{match.location}</p>
                <RefreshIcon onClick={handleRefresh} className="w-6 h-6 ml-40" />
                
              </div>
              
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
