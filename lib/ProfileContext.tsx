"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ProfileData {
  name?: string;
  title?: string;
  bio?: string;
  location?: string;
  email?: string;
  phone?: string;
  image?: string;
  github?: string;
  linkedin?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroAnimatedTexts?: string[];
  availabilityText?: string;
  yearsExperience?: number;
  projectsCompleted?: number;
  happyClients?: number;
  aboutDescription?: string;
  availableForWork?: boolean;
}

interface ProfileContextType {
  profile: ProfileData | null;
  loading: boolean;
}

const ProfileContext = createContext<ProfileContextType>({
  profile: null,
  loading: true,
});

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch profile data once and cache it
    fetch('/api/profile')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProfile(data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching profile:', err);
        setLoading(false);
      });
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, loading }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
