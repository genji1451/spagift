import React from "react";
import { motion } from "framer-motion";
import { Button, Card, CardBody, CardFooter, CardHeader, Image } from "@heroui/react";
import { Icon } from "@iconify/react";

interface MemeScreenProps {
  onBackToResults: () => void;
}

export const MemeScreen: React.FC<MemeScreenProps> = ({ onBackToResults }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <Card className="border-none shadow-lg">
        <CardHeader className="flex flex-col items-center gap-3">
          <motion.div
            initial={{ scale: 0.8, rotate: -5 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20 
            }}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-roulette-primary to-roulette-secondary flex items-center justify-center"
          >
            <Icon 
              icon="lucide:laugh" 
              className="text-white text-3xl"
            />
          </motion.div>
          
          <h1 className="text-xl font-bold text-center mt-2">Так нельзя! 😂</h1>
          <p className="text-default-500 text-center">
            Этот приз не продаётся. Выбери другой вариант!
          </p>
        </CardHeader>
        
        <CardBody className="py-5 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-4 rounded-xl overflow-hidden"
          >
            <Image
              src="https://el.kz/storage/storage/element/2025/06/04/mainphoto/157102/1200xauto_JP59cjqDiqBjPFVUX8PHDq787Uxpzze0790G1qdU.jpg"
              alt="Грустная лягушка мем"
              width={400}
              height={300}
              className="object-cover"
            />
          </motion.div>
        </CardBody>
        
        <CardFooter className="flex flex-col gap-3 pt-0">
          <Button 
            color="primary"
            size="lg"
            radius="full"
            className="font-bold w-full spin-button"
            startContent={<Icon icon="lucide:arrow-left" />}
            onPress={onBackToResults}
          >
            Назад
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};