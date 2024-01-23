import React, { useEffect } from 'react';
import { useMatchDispatch, useMatchState} from '../../context/context.tsx';
import { searchMatch } from '../../context/actions.ts';
import "/home/godlord/capstone301/sportnewsapp/src/index.css"
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
    <div className="flex flex-wrap">
      <h2>Live Sports</h2>
      {matches.map((match) => (
        <div key={match.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
          <div className="bg-grey border border-gray-200 rounded-md p-4">
            <h3 className="font-semibold mb-2">{`${match.teams[0].name} VS ${match.teams[1].name}`}</h3>
            <p>{new Date(match.endsAt).toLocaleString()}</p>
            <p>{match.location}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomePage;