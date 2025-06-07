import React from "react";
import { motion } from "framer-motion";
import { Button, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Prize } from "../App";

interface ResultScreenProps {
  prize: Prize;
  spinCount: number;
  onTryAgain: () => void;
}

const funMessages = [
  "Удача на твоей стороне!",
  "Фортуна благоволит смелым!",
  "Какое удачное вращение!",
  "Сегодня везучий день!",
  "Колесо сделало свой выбор!",
  "Твой счастливый день!",
  "Звезды сошлись для тебя!",
  "Вот это настрой!",
  "Пусть удача не покидает тебя!",
  "Колесо фортуны улыбается тебе!"
];

export const ResultScreen: React.FC<ResultScreenProps> = ({ prize, spinCount, onTryAgain }) => {
  const [message] = React.useState(() => {
    const randomIndex = Math.floor(Math.random() * funMessages.length);
    return funMessages[randomIndex];
  });

  const isWin = prize.type !== "loss";
  const remainingSpins = 5 - spinCount;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <Card className="border-none shadow-lg overflow-hidden">
        <div className={`absolute top-0 left-0 w-full h-1 ${isWin ? "bg-success" : "bg-default-300"}`}></div>
        
        <CardHeader className="flex flex-col items-center gap-3 pt-8">
          <motion.div
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20 
            }}
            className={`w-24 h-24 rounded-full flex items-center justify-center
              ${isWin 
                ? "bg-gradient-to-br from-roulette-primary to-roulette-secondary" 
                : "bg-default-200"
              }`}
          >
            <Icon 
              icon={isWin ? "lucide:gift" : "lucide:x"} 
              className="text-white text-4xl"
            />
          </motion.div>
          
          <h1 className="text-xl font-bold text-center mt-2">{prize.name}</h1>
          <p className="text-default-500 text-center">{prize.description}</p>
          
          <div className="bg-default-100 px-4 py-2 rounded-full">
            <p className="text-sm font-medium text-default-600">{message}</p>
          </div>
        </CardHeader>
        
        <CardBody className="py-5">
          {isWin && prize.code && (
            <div className="bg-default-100 p-4 rounded-xl mb-4">
              <p className="text-xs text-default-500 mb-1">Твой промокод:</p>
              <div className="flex items-center gap-2">
                <code className="bg-default-200 px-3 py-1.5 rounded-lg text-lg font-mono font-bold flex-1 text-center">
                  {prize.code}
                </code>
                <Button 
                  isIconOnly 
                  variant="flat" 
                  color="primary"
                  radius="full"
                  aria-label="Copy code"
                >
                  <Icon icon="lucide:copy" />
                </Button>
              </div>
            </div>
          )}
          
          {remainingSpins > 0 ? (
            <div className="bg-roulette-accent/20 p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="bg-roulette-accent rounded-full p-2">
                  <Icon icon="lucide:info" className="text-roulette-dark" />
                </div>
                <div>
                  <p className="font-medium text-roulette-dark">
                    У тебя осталось {remainingSpins} {remainingSpins === 1 ? 'вращение' : (remainingSpins >= 2 && remainingSpins <= 4) ? 'вращения' : 'вращений'} на сегодня!
                  </p>
                  <p className="text-sm text-default-600">
                    Продолжай крутить для лучших призов
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-default-100 p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="bg-default-200 rounded-full p-2">
                  <Icon icon="lucide:calendar" className="text-default-600" />
                </div>
                <div>
                  <p className="font-medium">Ты использовал все вращения на сегодня</p>
                  <p className="text-sm text-default-600">
                    Возвращайся завтра за новыми шансами!
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardBody>
        
        <CardFooter className="flex flex-col gap-3 pt-0">
          {remainingSpins > 0 && (
            <Button 
              color="primary"
              size="lg"
              radius="full"
              className="font-bold w-full spin-button"
              startContent={<Icon icon="lucide:refresh-cw" />}
              onPress={onTryAgain}
            >
              Крутить снова
            </Button>
          )}
          
          <Button 
            variant="flat"
            color="default"
            size="lg"
            radius="full"
            className="font-medium w-full"
            startContent={<Icon icon="lucide:message-circle" />}
            as="a"
            href="https://t.me/PrizeRouletteChannel"
            target="_blank"
          >
            Перейти в Telegram канал
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};