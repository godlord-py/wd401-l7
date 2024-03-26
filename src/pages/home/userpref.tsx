// useUserPreferences.ts
import { useState, useEffect } from 'react';
import { API_ENDPOINT } from '../../config/constants';
import { UserPreferences } from '../../types';

const useUserPreferences = (authToken: string | null): UserPreferences | null => {
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);

  useEffect(() => {
    const fetchUserPreferences = async () => {
      try {
        if (!authToken) return;

        const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user preferences');
        }

        const data = await response.json();
        setUserPreferences(data.preferences);

      } catch (error) {
        console.error('Error fetching user preferences:', error);
      }
    };

    fetchUserPreferences();
  }, [authToken]);

  return userPreferences;
};

export default useUserPreferences;
