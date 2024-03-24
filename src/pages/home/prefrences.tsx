import React, { Fragment, useEffect, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { BookmarkIcon } from "@heroicons/react/outline";
import { UserPreferences, Sports, Teams } from "/home/godlord/capstone301/sportnewsapp/src/types";
import { useSportState } from "../../context/sports/context";
import { useTeamState } from "../../context/teams/context";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../config/constants";

interface PreferencesProps {
  show: boolean;
  onClose: () => void;
}

const Preferences: React.FC<PreferencesProps> = ({ show, onClose }) => {
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    sports: [],
    teams: [],
  });
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const sportState: any = useSportState();
  const teamState: any = useTeamState();
  const {
    sports,
    isError: sportError,
    errMsg: sportErrorMessage,
  } = sportState;
  const {
    teams,
    isError: teamError,
    errMsg: teamErrorMessage,
  } = teamState;

  useEffect(() => {
    if (show) {
      searchPreferences();
    }
  }, [show]);

  const searchPreferences = async () => {
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
      setIsOpen(true);
    } catch (error) {
      console.error('Error fetching user preferences:', error);
    }
  };

  const patchPreferences = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(`${API_ENDPOINT}/user/preferences`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
      onClose(); // Close the modal
      navigate('/'); // Navigate to the home page
    } catch (error) {
      console.error('Error updating user preferences:', error);
    }
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
    closeModal(); // Close the modal after changing the team
  };

  const closeModal = () => {
    setIsOpen(false);
    onClose(); // Call the onClose function passed from props
    navigate("../../");
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
              <div className="bg-white rounded-lg p-6 max-w-sm mx-auto z-50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Preferences</h3>
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={patchPreferences}
                  >
                    <BookmarkIcon className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  Select your favourite sports and teams for a tailored feed.
                </p>
                <div className="mb-4">
                  <p className="font-medium">Select your favorite sports:</p>
                  <div className="flex flex-wrap gap-2">
                    {sports.map((sport: Sports) => (
                      <button
                        key={sport.id}
                        className={userPreferences.sports.includes(sport.id) ? "bg-blue-500 text-white" : ""}
                        onClick={() => changeSport(sport.id)}
                      >
                        {sport.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-medium">Select your favorite teams:</p>
                  <div className="flex flex-wrap gap-2">
                    {teams.map((team: Teams) => (
                      <button
                        key={team.id}
                        className={userPreferences.teams.includes(team.id) ? "bg-blue-500 text-white" : ""}
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
