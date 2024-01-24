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
    return <p>{errorMessage}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="scroll-bar">
      <p className="font-bold text-2xl mb-4 text-black dark:text-white px-2">Live Sports</p>
      <div className="flex overflow-x-auto gap-2 pb-1 rounded-l-md px-2">
        {matches.map((match) => (
          <div key={match.id} className="flex-shrink-0 bg-black p-3 rounded-md text-black dark:bg-black dark:text-white border dark:border-white" style={{ minWidth: '260px' }}>
            <div className="flex justify-between items-center mb-3 gap-6">
              <p className="text-sm text-white">{match.teams[0].name} VS {match.teams[1].name}</p>
              {match.isRunning ? (
                <div className="flex items-center gap-1">
                  <span className="p-1 rounded-full bg-green-700 animate-pulse" />
                  <p className="text-green-700 text-sm">Live Now</p>
                </div>
              ) : (
                <div className="flex items-center text-sm text-white gap-1">
                  <CalendarDaysIcon className="w-4 h-4" />
                  <p>{new Date(match.endsAt).toDateString()}</p>
                </div>
              )}
            </div>
            <div className="flex mt-2 items-center font-semibold gap-2 text-white">
              <span>{match.teams[0].name}</span>
              <span>VS</span>
              <span>{match.teams[1].name}</span>
            </div>
            <div className="flex text-sm text-gray-500 gap-1 items-center mt-1">
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
        