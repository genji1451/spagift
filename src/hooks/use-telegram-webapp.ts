import React from "react";

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        close: () => void;
        initData: string;
        initDataUnsafe: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
            photo_url?: string;
          };
          auth_date: number;
          hash: string;
        };
      };
    };
  }
}

type TelegramUser = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
};

export const useTelegramWebApp = () => {
  const [isReady, setIsReady] = React.useState(false);
  const [telegramUser, setTelegramUser] = React.useState<TelegramUser | null>(null);

  React.useEffect(() => {
    // Check if running in Telegram WebApp
    const isTelegramWebApp = window.Telegram && window.Telegram.WebApp;
    
    if (isTelegramWebApp) {
      // Initialize Telegram WebApp
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
      
      // Get user data
      const user = window.Telegram.WebApp.initDataUnsafe.user;
      if (user) {
        setTelegramUser(user);
      }
      
      setIsReady(true);
    } else {
      // For development outside of Telegram, create mock user
      console.log("Not running in Telegram WebApp, using mock data");
      setTimeout(() => {
        setTelegramUser({
          id: 12345678,
          first_name: "Test",
          last_name: "User",
          username: "testuser",
        });
        setIsReady(true);
      }, 1000);
    }
  }, []);

  return { isReady, telegramUser };
};

export const useTelegramApi = () => {
  const checkSubscription = async (userId: number, channelUsername: string): Promise<boolean> => {
    // In a real app, this would call your backend which would use the Telegram Bot API
    // For this demo, we'll simulate a successful check after a delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 2000);
    });
  };

  return { checkSubscription };
};
