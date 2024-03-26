import React, { Fragment, useEffect, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { BookmarkIcon } from "@heroicons/react/outline";
import { Sports, Teams, UserPreferences } from "/home/godlord/capstone301/sportnewsapp/src/types";
import { useSportState, useSportDispatch } from "../../context/sports/context";
import { useTeamState, useTeamDispatch } from "../../context/teams/context";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../config/constants";
import { searchArticle } from "../../context/articles/actions";
import { useArticleDispatch } from "../../context/articles/context";
import useUserPreferences from "./userpref";

interface PreferencesProps {
  show: boolean;
  onClose: () => void;
  authToken: string | null; // Add authToken prop
}

const Preferences: React.FC<PreferencesProps> = ({ show, onClose, authToken }) => {
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    sports: [],
    teams: [],
  });
  const dispatch = useArticleDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); 
  const sportDispatch = useSportDispatch();
  const teamDispatch = useTeamDispatch();
  const sportState = useSportState();
  const teamState = useTeamState();
  const { sports, isError: sportError, errMsg: sportErrorMessage } = sportState;
  const { teams, isError: teamError, errMsg: teamErrorMessage } = teamState;
// Fetch user preferences using the hook
const userpref = useUserPreferences(authToken);

useEffect(() => {
  if (show && authToken && userpref) {
    setIsOpen(true);
  } else {
    setIsOpen(false);
  }
}, [show, authToken, userpref]);


  const searchPreferences = async () => {
    try {
      if (!authToken) return;

      const res = await fetch(`${API_ENDPOINT}/user/preferences`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = await res.json();
      setUserPreferences(data.preferences);
      setIsOpen(true);
    } catch (error) {
      console.error('Error fetching user preferences:', error);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    onClose(); 
    navigate("../../");
  };

  const changeSport = (sportId: number) => {
    setUserPreferences((prevPreferences) => {
      const sportsArray = prevPreferences.sports || []; 
      return {
        ...prevPreferences,
        sports: sportsArray.includes(sportId)
          ? sportsArray.filter((selectedSport) => selectedSport !== sportId)
          : [...sportsArray, sportId],
      };
    });
  };

  const changeTeam = (teamId: number) => {
    setUserPreferences((prevPreferences) => ({
      ...prevPreferences,
      teams: Array.isArray(prevPreferences.teams) && prevPreferences.teams.includes(teamId)
        ? prevPreferences.teams.filter((selectedTeam) => selectedTeam !== teamId)
        : [...(prevPreferences.teams ?? []), teamId],
    }));
    closeModal(); 
  };

  useEffect(() => {
    searchArticle(dispatch);
  }, [dispatch]);

  const patchPreferences = async () => {
    try {
      if (!authToken) return;

      const res = await fetch(`${API_ENDPOINT}/user/preferences`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          preferences: userPreferences,
        }),
      });
      const data = await res.json();
      const userData = localStorage.getItem("userData") ?? "";
      const JSONdata = JSON.parse(userData);
  
      const patchedUserData = {
        ...JSONdata,
        preferences: data.preferences,
      };
      localStorage.setItem("userData", JSON.stringify(patchedUserData));
      onClose(); 
     
      window.location.reload(); 
    } catch (error) {
      console.error('Error updating user preferences:', error);
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 overflow-y-auto" onClose={closeModal}>
          <div className="min-h-screen flex items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
            </Transition.Child>
  
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="bg-white rounded-lg p-6 max-w-lg mx-auto z-50">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Preferences:</h3>
                    <button
                      className="text-gray-900 hover:text-gray-400"
                      onClick={patchPreferences}
                    >
                      <BookmarkIcon className="w-6 h-6" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    Select your favorite sports and teams for a tailored feed.
                  </p>
                  <div className="mb-4">
                  <p className="font-medium text-lg font-bold text-gray-900">Select your favorite Sports:</p>
                  <div className="flex flex-wrap gap-2">
                  {sports && sports.map((sport: Sports) => (
                  <button
                    key={sport.id}
                    className={`px-3 py-2 rounded-md ${userPreferences && userPreferences.sports.includes(sport.id) ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
                    onClick={() => changeSport(sport.id)}
                  >
                    {sport.name}
                  </button>
                ))}

                  </div>
                </div>
                <div>
                  <p className="font-medium text-lg font-bold text-gray-900">Select your favorite teams:</p>
                  <div className="flex flex-wrap gap-2">
                    {teams && teams.map((team: Teams) => (
                      <button
                        key={team.id}
                        className={`px-3 py-2 rounded-md ${userPreferences && userPreferences.teams.includes(team.id) ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
                        onClick={() => changeTeam(team.id)}
                      >
                        {team.name}
                      </button>
                    ))}
                  </div>
                </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </>
    );
};

export default Preferences;

