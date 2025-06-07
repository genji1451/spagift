import React from "react";
import { motion } from "framer-motion";
import { Button, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { Icon } from "@iconify/react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Prize } from "../App";

interface JackpotScreenProps {
  prize: Prize;
  userName: string;
  onGetMoneyInstead: () => void;
  onCertificateDownloaded: () => void;
}

export const JackpotScreen: React.FC<JackpotScreenProps> = ({ 
  prize, 
  userName,
  onGetMoneyInstead,
  onCertificateDownloaded
}) => {
  const [isDownloading, setIsDownloading] = React.useState(false);
  const certificateRef = React.useRef<HTMLDivElement>(null);
  const confettiRef = React.useRef<HTMLDivElement>(null);
  const [confettiCreated, setConfettiCreated] = React.useState(false);
  
  // Create enhanced confetti effect
  React.useEffect(() => {
    if (!confettiRef.current || confettiCreated) return;
    
    const confettiContainer = confettiRef.current;
    const colors = ["#FF4B91", "#FF7676", "#FFE7A0", "#4D4C7D", "#FFC857", "#E3F2FD", "#FFECB3"];
    const shapes = ["circle", "square", "triangle"];
    
    // Clear any existing confetti
    while (confettiContainer.firstChild) {
      confettiContainer.removeChild(confettiContainer.firstChild);
    }
    
    // Create more confetti for a richer effect
    for (let i = 0; i < 150; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      
      // Random position
      confetti.style.left = `${Math.random() * 100}%`;
      
      // Random color
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      
      // Random size
      const size = Math.random() * 12 + 5;
      confetti.style.width = `${size}px`;
      confetti.style.height = `${size}px`;
      
      // Random shape
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      if (shape === "circle") {
        confetti.style.borderRadius = "50%";
      } else if (shape === "triangle") {
        confetti.style.width = "0";
        confetti.style.height = "0";
        confetti.style.backgroundColor = "transparent";
        confetti.style.borderLeft = `${size/2}px solid transparent`;
        confetti.style.borderRight = `${size/2}px solid transparent`;
        confetti.style.borderBottom = `${size}px solid ${colors[Math.floor(Math.random() * colors.length)]}`;
      }
      
      // Random animation duration and delay
      confetti.style.animationDuration = `${Math.random() * 4 + 3}s`;
      confetti.style.animationDelay = `${Math.random() * 2}s`;
      
      // Random initial position (start higher for a better effect)
      confetti.style.top = `${-Math.random() * 20 - 10}%`;
      
      // Add to container
      confettiContainer.appendChild(confetti);
    }
    
    setConfettiCreated(true);
    
    return () => {
      while (confettiContainer.firstChild) {
        confettiContainer.removeChild(confettiContainer.firstChild);
      }
    };
  }, [confettiCreated]);

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;
    
    setIsDownloading(true);
    
    try {
      const canvas = await html2canvas(certificateRef.current);
      const imgData = canvas.toDataURL("image/png");
      
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4"
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("spa-gift-certificate.pdf");
      
      // After successful download, move to the next screen
      setTimeout(() => {
        onCertificateDownloaded();
      }, 500);
    } catch (error) {
      console.error("Error generating PDF:", error);
      setIsDownloading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      {/* Confetti container */}
      <div ref={confettiRef} className="fixed inset-0 pointer-events-none overflow-hidden z-50"></div>
      
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
              icon="lucide:trophy" 
              className="text-white text-5xl"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h1 className="text-2xl font-bold text-center mt-2">ДЖЕКПОТ!</h1>
            <p className="text-default-500 text-center">Ты выиграл главный приз!</p>
          </motion.div>
        </CardHeader>
        
        <CardBody className="py-5">
          {/* Certificate preview with animation */}
          <motion.div 
            ref={certificateRef}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="bg-gradient-to-br from-roulette-dark to-black p-6 rounded-xl text-white mb-6 shadow-lg certificate-shine"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ 
                delay: 1.2,
                duration: 0.5,
                type: "spring",
                stiffness: 300
              }}
              className="border-2 border-roulette-accent p-4 rounded-lg"
            >
              <div className="text-center">
                <h2 className="text-roulette-accent text-xl font-bold mb-1">СЕРТИФИКАТ В СПА</h2>
                <p className="text-sm text-roulette-secondary mb-4">Особый приз</p>
                
                <div className="my-4 border-t border-b border-white/20 py-4">
                  <p className="text-lg mb-1">Этот сертификат дает право</p>
                  <p className="text-xl font-bold mb-1">Пользователю</p>
                  <p className="text-lg">на расслабляющий день в СПА</p>
                </div>
                
                <p className="text-roulette-accent font-bold text-xl mb-1">{prize.value}</p>
                <p className="text-sm text-white/70">Срок действия: 7 месяцев</p>
                
                <div className="mt-4 text-xs text-white/50">
                  <p>ID сертификата: EK012832#22849</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="bg-roulette-accent/20 p-4 rounded-xl"
          >
            <div className="flex items-center gap-3">
              <div className="bg-roulette-accent rounded-full p-2">
                <Icon icon="lucide:info" className="text-roulette-dark" />
              </div>
              <div>
                <p className="font-medium text-roulette-dark">
                  Поздравляем с большим выигрышем!
                </p>
                <p className="text-sm text-default-600">
                  Нажми на кнопку ниже, чтобы получить свой приз
                </p>
              </div>
            </div>
          </motion.div>
        </CardBody>
        
        <CardFooter className="flex flex-col gap-3 pt-0">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="w-full"
          >
            <Button 
              color="primary"
              size="lg"
              radius="full"
              className="font-bold w-full spin-button py-7"
              startContent={
                isDownloading ? (
                  <Icon icon="lucide:loader-2" className="animate-spin" />
                ) : (
                  <Icon icon="lucide:gift" className="text-xl" />
                )
              }
              onPress={downloadCertificate}
              isDisabled={isDownloading}
            >
              {isDownloading ? "Создаем PDF..." : "Скачать сертификат"}
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};