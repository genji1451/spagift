import React from "react";
import { motion } from "framer-motion";
import { Button, Card, CardBody, CardFooter, CardHeader, Progress } from "@heroui/react";
import { Icon } from "@iconify/react";
import { gsap } from "gsap";
import { UserData } from "../hooks/use-user-data";
import { Prize } from "../App";

interface RouletteGameProps {
  userData: UserData | null;
  onSpinComplete: (prize: Prize) => void;
}

// Prize data
const prizes: Prize[] = [
  {
    id: 1,
    name: "IVI",
    description: "50 дней бесплатной подписки, если не было активной подписки последние 180 дней",
    type: "trial",
    code: "cake50"
  },
  {
    id: 2,
    name: "Увы, не повезло",
    description: "Попробуйте снова — возможно, удача повернётся к вам лицом!",
    type: "loss"
  },
  {
    id: 3,
    name: "Aliexpress",
    description: "Скидка 500₽ при покупке от 1000₽ в мобильном приложении. Действует до 31 июля 2025 на товары со страницы акции",
    type: "discount",
    code: "НИХАО",
    value: "500₽"
  },
  {
    id: 4,
    name: "Кинопоиск",
    description: "30-дневная бесплатная подписка для новых пользователей. Действует до 31 июля 2025",
    type: "trial",
    code: "3H8QFWES3W"
  },
  {
    id: 5,
    name: "Burger King",
    description: "Скидка или подарок при заказе (детали уточняйте на сайте Burger King)",
    type: "promo",
    code: "JPZ0"
  },
  {
    id: 6,
    name: "Купер",
    description: "Скидка 33% на бытовую химию",
    type: "discount",
    code: "gshxo6up6",
    value: "33%"
  },
  {
    id: 7,
    name: "Купер",
    description: "Скидка 505₽ при заказе от 1500₽",
    type: "discount",
    code: "hyanrnenh",
    value: "505₽"
  },
  {
    id: 8,
    name: "Самокат",
    description: "Скидка 50% на первый заказ от 700₽, максимум 500₽. Действует до 31 июля 2025",
    type: "discount",
    code: "TTG4R",
    value: "50%"
  },
  {
    id: 9,
    name: "Яндекс Путешествия",
    description: "Скидка до 12% на бронирование отелей",
    type: "discount",
    code: "ADM-96970398",
    value: "до 12%"
  },
];


// Jackpot prize (only for 5th spin)
const jackpotPrize: Prize = { 
  id: 10, 
  name: "Сертификат в СПА", 
  description: "Поздравляем! Ты выиграл сертификат в СПА", 
  type: "jackpot", 
  value: "1****0₽" 
};

// Wheel segments colors
const segmentColors = [
  "#4D4C7D", // primary
  "#FF7676", // accent
  "#FF4B91", // secondary
  "#4D4C7D", // dark
  "#FF4B91", // primary
  "#4D4C7D", // accent
  "#FF7676", // secondary
  "#4D4C7D", // dark
  "#FF4B91", // primary
  "#FF7676", // accent
];

export const RouletteGame: React.FC<RouletteGameProps> = ({ userData, onSpinComplete }) => {
  const [isSpinning, setIsSpinning] = React.useState(false);
  const [spinCount, setSpinCount] = React.useState(userData?.spinCount || 0);
  const wheelRef = React.useRef<SVGSVGElement>(null);
  const spinTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Create wheel segments
  const createWheel = () => {
    const segments = [];
    const segmentAngle = 360 / prizes.length;
    
    // Emoji array for wheel segments - 9 regular prizes + 1 placeholder for jackpot
    const emojis = ["🎁", "🎉", "🎯", "💰", "🎊", "⭐", "🏆", "💎", "🔥", "👑"];
    
    // Use only 9 regular prizes for the wheel
    const displayPrizes = spinCount === 4 ? [...prizes.slice(0, 8), jackpotPrize] : prizes;
    
    for (let i = 0; i < displayPrizes.length; i++) {
      const startAngle = i * segmentAngle;
      const endAngle = (i + 1) * segmentAngle;
      
      // Calculate SVG arc path
      const startRad = (startAngle - 90) * Math.PI / 180;
      const endRad = (endAngle - 90) * Math.PI / 180;
      
      const x1 = 100 + 100 * Math.cos(startRad);
      const y1 = 100 + 100 * Math.sin(startRad);
      const x2 = 100 + 100 * Math.cos(endRad);
      const y2 = 100 + 100 * Math.sin(endRad);
      
      const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
      
      const pathData = [
        `M 100 100`,
        `L ${x1} ${y1}`,
        `A 100 100 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        `Z`
      ].join(" ");
      
      segments.push(
        <path
          key={i}
          d={pathData}
          fill={segmentColors[i]}
          stroke="#fff"
          strokeWidth="1"
        />
      );
      
      // Add emoji instead of text
      const textAngle = startAngle + segmentAngle / 2;
      const textRad = (textAngle - 90) * Math.PI / 180;
      const textX = 100 + 70 * Math.cos(textRad);
      const textY = 100 + 70 * Math.sin(textRad);
      
      // Use crown emoji for jackpot on 5th spin
      const emoji = spinCount === 4 && i === 8 ? "👑" : emojis[i];
      
      segments.push(
        <text
          key={`text-${i}`}
          x={textX}
          y={textY}
          fill="#fff"
          fontSize="16"
          fontWeight="bold"
          textAnchor="middle"
          dominantBaseline="middle"
          transform={`rotate(${textAngle}, ${textX}, ${textY})`}
        >
          {emoji}
        </text>
      );
    }
    
    return segments;
  };

  const handleSpin = () => {
    if (isSpinning || !wheelRef.current) return;
    
    setIsSpinning(true);
    
    // Determine the winning prize
    let targetPrizeIndex: number;
    let selectedPrize: Prize;
    
    // If this is the 5th spin, always land on the jackpot
    if (spinCount === 4) {
      targetPrizeIndex = 8; // Last position will be jackpot
      selectedPrize = jackpotPrize;
    } else {
      // Random prize for spins 1-4 (excluding jackpot)
      targetPrizeIndex = Math.floor(Math.random() * prizes.length);
      selectedPrize = prizes[targetPrizeIndex];
    }
    
    // Calculate the rotation angle
    const segmentAngle = 360 / prizes.length;
    const targetAngle = 360 - (targetPrizeIndex * segmentAngle) + (segmentAngle / 2);
    const spins = 5; // Number of full rotations
    const finalAngle = spins * 360 + targetAngle;
    
    // Animate the wheel
    gsap.to(wheelRef.current, {
      rotation: finalAngle,
      duration: 8,
      ease: "power2.out",
      onComplete: () => {
        // Wait a moment before showing the result
        spinTimeoutRef.current = setTimeout(() => {
          setIsSpinning(false);
          onSpinComplete(selectedPrize);
        }, 1000);
      }
    });
  };

  React.useEffect(() => {
    return () => {
      if (spinTimeoutRef.current) {
        clearTimeout(spinTimeoutRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <Card className="border-none shadow-lg">
        <CardHeader className="flex flex-col items-center gap-3">
          <h1 className="text-xl font-bold text-center">Крути и выигрывай</h1>
          <div className="flex items-center gap-2">
            <Icon icon="lucide:refresh-cw" className="text-default-500" />
            <span className="text-default-500">
              Вращение {spinCount + 1} из 5
            </span>
          </div>
        </CardHeader>
        
        <CardBody className="py-5 flex flex-col items-center">
          <div className="wheel-container mb-6">
            {/* Wheel pointer */}
            <div className="wheel-pointer">
              <Icon 
                icon="lucide:arrow-down" 
                className="text-roulette-primary text-3xl drop-shadow-md" 
              />
            </div>
            
            {/* Wheel */}
            <svg 
              ref={wheelRef} 
              viewBox="0 0 200 200" 
              className="wheel"
            >
              {createWheel()}
              <circle cx="100" cy="100" r="15" fill="#fff" stroke="#ccc" />
            </svg>
          </div>
          
          <div className="w-full bg-default-100 rounded-xl p-4 mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Ежедневные вращения</span>
              <span className="text-sm font-bold">{spinCount}/5</span>
            </div>
            <Progress 
              value={(spinCount / 5) * 100} 
              color="primary"
              aria-label="Spin progress"
              className="h-2"
            />
          </div>
          
          {spinCount === 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-roulette-accent/20 p-3 rounded-lg text-center mb-4"
            >
              <p className="font-medium text-roulette-dark">
                <Icon icon="lucide:sparkles" className="inline mr-1 text-roulette-primary" />
                Это твое последнее вращение! Тебя ждет что-то особенное...
              </p>
            </motion.div>
          )}
        </CardBody>
        
        <CardFooter className="flex justify-center pt-0">
          <Button 
            color="primary"
            size="lg"
            radius="full"
            className="font-bold px-8 py-6 spin-button"
            startContent={
              isSpinning ? (
                <Icon icon="lucide:loader-2" className="animate-spin" />
              ) : (
                <Icon icon="lucide:zap" />
              )
            }
            onPress={handleSpin}
            isDisabled={isSpinning}
          >
            {isSpinning ? "Крутим..." : "Крутить"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};