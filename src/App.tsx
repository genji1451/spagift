import React from "react";
import { Button, Card, Progress } from "@heroui/react";
import { Icon } from "@iconify/react";
import { WelcomeScreen } from "./components/welcome-screen";
import { SubscriptionCheck } from "./components/subscription-check";
import { RouletteGame } from "./components/roulette-game";
import { ResultScreen } from "./components/result-screen";
import { JackpotScreen } from "./components/jackpot-screen";
import { MemeScreen } from "./components/meme-screen";
import { CertificateDownloadedScreen } from "./components/certificate-downloaded-screen";
import { useTelegramWebApp } from "./hooks/use-telegram-webapp";
import { useUserData } from "./hooks/use-user-data";

// App states
export type AppState = 
  | "welcome" 
  | "subscription-check" 
  | "roulette" 
  | "result" 
  | "jackpot" 
  | "certificate-downloaded" 
  | "meme";

export type Prize = {
  id: number;
  name: string;
  description: string;
  type: "promo" | "discount" | "trial" | "loss" | "jackpot";
  code?: string;
  value?: string;
};

const App: React.FC = () => {
  const [appState, setAppState] = React.useState<AppState>("welcome");
  const [selectedPrize, setSelectedPrize] = React.useState<Prize | null>(null);
  const { telegramUser, isReady } = useTelegramWebApp();
  const { userData, updateUserData, isLoading } = useUserData(telegramUser?.id);

  const handleSubscriptionVerified = () => {
    setAppState("roulette");
  };

  const handleSpinComplete = (prize: Prize) => {
    setSelectedPrize(prize);
    
    if (userData && userData.spinCount === 4 && prize.type === "jackpot") {
      setAppState("jackpot");
    } else {
      setAppState("result");
    }
    
    // Update user data with new spin and prize
    if (userData) {
      updateUserData({
        ...userData,
        spinCount: (userData.spinCount || 0) + 1,
        prizeHistory: [...(userData.prizeHistory || []), prize.id]
      });
    }
  };

  const handleTryAgain = () => {
    setAppState("roulette");
  };

  const handleGetMoneyInstead = () => {
    setAppState("meme");
  };

  const handleBackToResults = () => {
    setAppState("jackpot");
  };

  const handleCertificateDownloaded = () => {
    setAppState("certificate-downloaded");
  };

  if (!isReady || isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md p-6 flex flex-col items-center">
          <div className="flex flex-col items-center gap-4 my-8">
            <Icon icon="lucide:loader-2" className="text-primary text-4xl animate-spin" />
            <p className="text-lg">Загрузка колеса призов...</p>
          </div>
          <Progress
            aria-label="Loading..."
            size="md"
            value={40}
            color="primary"
            className="max-w-md"
            isIndeterminate
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-4 pb-16">
      {appState === "welcome" && (
        <WelcomeScreen onContinue={() => setAppState("subscription-check")} />
      )}
      
      {appState === "subscription-check" && (
        <SubscriptionCheck 
          telegramUserId={telegramUser?.id} 
          onVerified={handleSubscriptionVerified} 
        />
      )}
      
      {appState === "roulette" && (
        <RouletteGame 
          userData={userData} 
          onSpinComplete={handleSpinComplete} 
        />
      )}
      
      {appState === "result" && selectedPrize && (
        <ResultScreen 
          prize={selectedPrize} 
          spinCount={userData?.spinCount || 0}
          onTryAgain={handleTryAgain} 
        />
      )}
      
      {appState === "jackpot" && selectedPrize && (
        <JackpotScreen 
          prize={selectedPrize}
          userName={telegramUser?.first_name || "Friend"}
          onGetMoneyInstead={handleGetMoneyInstead}
          onCertificateDownloaded={handleCertificateDownloaded}
        />
      )}
      
      {appState === "certificate-downloaded" && selectedPrize && (
        <CertificateDownloadedScreen 
          onGetMoneyInstead={handleGetMoneyInstead}
        />
      )}
      
      {appState === "meme" && (
        <MemeScreen onBackToResults={handleBackToResults} />
      )}
    </div>
  );
};

export default App;