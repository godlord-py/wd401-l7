import React, { useEffect } from 'react';
import { useMatchDispatch, useMatchState } from '../../context/members/context.tsx';
import { searchMatch } from '../../context/members/actions.ts';
import "/home/godlord/capstone301/sportnewsapp/src/index.css";
import { CalendarDaysIcon, MapPinIcon } from "@heroicons/react/20/solid";

const HomePage = () => {
  const dispatch = useMatchDispatch();
  const state = useMatchState();
  const { matches, isLoading, isError, errorMessage } = state;

  useEffect(() => {
    searchMatch(dispatch);
  }, [dispatch]);

  if (isError) {
    return <p className="text-red-500">{errorMessage}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="scroll-bar">
      <h2 className="font-bold text-3xl mb-4 text-black dark:text-white px-4">Live Sports</h2>
      <div className="flex overflow-x-auto gap-4 pb-2 rounded-l-md px-4">
        {matches.map((match) => (
          <div key={match.id} className="flex-shrink-0 bg-gray-800 p-4 rounded-md text-white border dark:border-white" style={{ minWidth: '260px' }}>
            <div className="flex mr-2 justify-between items-center mb-4">
              <p className="text-lg">{match.teams[0].name} VS {match.teams[1].name}</p>
              {match.isRunning ? (
                <div className="flex items-center gap-2">
                  <span className="p-2 ml-2 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-green-700">Live Now</p>
                </div>
              ) : (
                <div className="flex ml-2 p-2 items-center text-sm">
                  <CalendarDaysIcon className="w-5 h-5" />
                  <p>{new Date(match.endsAt).toLocaleDateString()}</p>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xl font-semibold">{match.teams[0].name} vs {match.teams[1].name}</p>
            </div>
            <div className="flex text-sm text-gray-500 items-center">
              <MapPinIcon className="w-4 h-4" />
              <p>{match.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
