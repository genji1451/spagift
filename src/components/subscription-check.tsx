import React from "react";
import { motion } from "framer-motion";
import { Button, Card, CardBody, CardFooter, CardHeader, Progress } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useTelegramApi } from "../hooks/use-telegram-webapp";

interface SubscriptionCheckProps {
  telegramUserId: number | undefined;
  onVerified: () => void;
}

export const SubscriptionCheck: React.FC<SubscriptionCheckProps> = ({ 
  telegramUserId, 
  onVerified 
}) => {
  const [isChecking, setIsChecking] = React.useState(false);
  const [isSubscribed, setIsSubscribed] = React.useState<boolean | null>(null);
  const { checkSubscription } = useTelegramApi();

  const handleCheckSubscription = async () => {
    if (!telegramUserId) return;
    
    setIsChecking(true);
    
    try {
      const result = await checkSubscription(telegramUserId, "channel_username");
      setIsSubscribed(result);
      
      if (result) {
        setTimeout(() => {
          onVerified();
        }, 1500);
      }
    } catch (error) {
      console.error("Error checking subscription:", error);
      setIsSubscribed(false);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <Card className="border-none shadow-lg">
        <CardHeader className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-roulette-primary to-roulette-secondary flex items-center justify-center">
            <Icon 
              icon="lucide:check-circle" 
              className="text-white text-3xl"
            />
          </div>
          <h1 className="text-xl font-bold text-center">Проверка подписки</h1>
          <p className="text-default-500 text-center">
            Прежде чем крутить колесо, нам нужно проверить твою подписку
          </p>
        </CardHeader>
        
        <CardBody className="py-5">
          <div className="space-y-6">
            <div className="flex flex-col items-center gap-4 bg-default-100 p-4 rounded-xl">
              <Icon icon="logos:telegram" className="text-4xl" />
              <div className="text-center">
                <p className="font-semibold">Подпишись на наш канал</p>
                <p className="text-default-500 text-sm">@PrizeRouletteChannel</p>
              </div>
              <Button
                color="primary"
                variant="flat"
                radius="full"
                size="sm"
                className="font-medium"
                startContent={<Icon icon="lucide:external-link" />}
              >
                Открыть канал
              </Button>
            </div>
            
            {isSubscribed === false && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-danger-100 text-danger p-3 rounded-lg text-center"
              >
                <p className="font-medium">
                  <Icon icon="lucide:alert-circle" className="inline mr-1" />
                  Подписка не найдена. Пожалуйста, подпишись и попробуй снова.
                </p>
              </motion.div>
            )}
            
            {isSubscribed === true && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-success-100 text-success p-3 rounded-lg text-center"
              >
                <p className="font-medium">
                  <Icon icon="lucide:check-circle" className="inline mr-1" />
                  Подписка подтверждена! Перенаправляем в игру...
                </p>
              </motion.div>
            )}
          </div>
        </CardBody>
        
        <CardFooter className="flex justify-center pt-0">
          <Button 
            color="primary"
            size="lg"
            radius="full"
            className="font-bold px-8 py-6 spin-button"
            startContent={
              isChecking ? (
                <Icon icon="lucide:loader-2" className="animate-spin" />
              ) : (
                <Icon icon="lucide:check" />
              )
            }
            onPress={handleCheckSubscription}
            isDisabled={isChecking || isSubscribed === true}
          >
            {isChecking ? "Проверка..." : "Проверить подписку"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};