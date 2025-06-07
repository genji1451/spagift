import React from "react";
import { motion } from "framer-motion";
import { Button, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { Icon } from "@iconify/react";

interface WelcomeScreenProps {
  onContinue: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onContinue }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <Card className="border-none shadow-lg">
        <CardHeader className="flex flex-col items-center gap-3 pb-0">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20,
              delay: 0.3 
            }}
            className="w-32 h-32 rounded-full bg-gradient-to-br from-roulette-primary to-roulette-secondary flex items-center justify-center"
          >
            <Icon 
              icon="lucide:gift" 
              className="text-white text-5xl"
            />
          </motion.div>
          <h1 className="text-2xl font-bold text-center mt-2">Колесо Призов</h1>
          <p className="text-default-500 text-center">Крути колесо и выигрывай крутые призы!</p>
        </CardHeader>
        
        <CardBody className="py-5">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-primary-100 p-2 rounded-full">
                <Icon icon="lucide:check" className="text-primary" />
              </div>
              <p>Крути колесо до <span className="font-bold">5 раз</span> в день</p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-primary-100 p-2 rounded-full">
                <Icon icon="lucide:check" className="text-primary" />
              </div>
              <p>Подтверди подписку на наш Telegram канал</p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-primary-100 p-2 rounded-full">
                <Icon icon="lucide:check" className="text-primary" />
              </div>
              <p>Выигрывай промокоды, скидки и особые призы!</p>
            </div>
          </div>
        </CardBody>
        
        <CardFooter className="flex justify-center pt-0">
          <Button 
            color="primary"
            size="lg"
            radius="full"
            className="font-bold px-8 py-6 spin-button"
            startContent={<Icon icon="lucide:arrow-right" />}
            onPress={onContinue}
          >
            Начать
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};