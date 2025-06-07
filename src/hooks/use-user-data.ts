import React from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { Prize } from "../App";

// Firebase configuration
const firebaseConfig = {
  // In a real app, these would be your Firebase config values
  // For this demo, we'll use placeholder values
  apiKey: "YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app-id",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export type UserData = {
  telegramId: number;
  spinCount: number;
  prizeHistory: number[];
  lastSpinDate: string;
  createdAt: string;
};

export const useUserData = (telegramId?: number) => {
  const [userData, setUserData] = React.useState<UserData | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchUserData = async () => {
      if (!telegramId) {
        setIsLoading(false);
        return;
      }

      try {
        // For demo purposes, we'll simulate Firebase interaction
        // In a real app, you'd use the actual Firebase methods
        
        // Simulate a delay for data fetching
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock user data or create new user
        const mockUserData: UserData = {
          telegramId,
          spinCount: 0,
          prizeHistory: [],
          lastSpinDate: new Date().toISOString(),
          createdAt: new Date().toISOString()
        };
        
        setUserData(mockUserData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [telegramId]);

  const updateUserData = async (newData: UserData) => {
    if (!telegramId) return;

    try {
      // In a real app, you'd update Firestore here
      // For demo, we'll just update the local state
      setUserData(newData);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return { userData, updateUserData, isLoading };
};
