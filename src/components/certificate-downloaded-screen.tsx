import React from "react";
import { motion } from "framer-motion";
import { Button, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { Icon } from "@iconify/react";

interface CertificateDownloadedScreenProps {
  onGetMoneyInstead: () => void;
}

export const CertificateDownloadedScreen: React.FC<CertificateDownloadedScreenProps> = ({ 
  onGetMoneyInstead 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <Card className="border-none shadow-lg overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-roulette-primary via-roulette-secondary to-roulette-accent"></div>
        
        <CardHeader className="flex flex-col items-center gap-3 pt-8">
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20,
              delay: 0.3
            }}
            className="w-28 h-28 rounded-full bg-gradient-to-br from-roulette-primary to-roulette-secondary flex items-center justify-center prize-glow"
          >
            <Icon 
              icon="lucide:check-circle" 
              className="text-white text-5xl"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h1 className="text-2xl font-bold text-center mt-2">Сертификат загружен!</h1>
            <p className="text-default-500 text-center">Что ты хочешь сделать дальше?</p>
          </motion.div>
        </CardHeader>
        
        <CardBody className="py-5">
          <div className="bg-roulette-accent/20 p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="bg-roulette-accent rounded-full p-2">
                <Icon icon="lucide:info" className="text-roulette-dark" />
              </div>
              <div>
                <p className="font-medium text-roulette-dark">
                  Твой сертификат успешно загружен!
                </p>
                <p className="text-sm text-default-600">
                  Ты можешь найти его в папке загрузок
                </p>
              </div>
            </div>
          </div>
        </CardBody>
        
        <CardFooter className="flex flex-col gap-3 pt-0">
          <Button 
            variant="flat"
            color="default"
            size="lg"
            radius="full"
            className="font-medium w-full py-6"
            startContent={<Icon icon="lucide:banknote" className="text-xl" />}
            onPress={onGetMoneyInstead}
          >
            💸 Получить деньгами
          </Button>
          
          <Button 
            color="primary"
            size="lg"
            radius="full"
            className="font-bold w-full py-6"
            startContent={<Icon icon="lucide:message-circle" className="text-xl" />}
            as="a"
            href="https://t.me/spagift"
            target="_blank"
          >
            📩 Перейти в Telegram канал
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};