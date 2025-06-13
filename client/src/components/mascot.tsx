import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function Mascot() {
  const [isWaving, setIsWaving] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);

  // Random waving animation
  useEffect(() => {
    const waveInterval = setInterval(() => {
      setIsWaving(true);
      setTimeout(() => setIsWaving(false), 1500);
    }, 4000 + Math.random() * 3000); // Random interval between 4-7 seconds

    return () => clearInterval(waveInterval);
  }, []);

  // Random blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 2000 + Math.random() * 3000); // Random interval between 2-5 seconds

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <motion.div
      className="relative flex flex-col items-center mb-8"
      initial={{ opacity: 0, scale: 0.5, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        ease: "easeOut",
        type: "spring",
        stiffness: 200,
        damping: 15
      }}
    >
      {/* Speech Bubble */}
      <motion.div
        className="relative bg-white dark:bg-gray-800 rounded-2xl px-4 py-2 mb-2 shadow-lg border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.p 
          className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap"
          animate={{ 
            color: ["#6B7280", "#3B82F6", "#6B7280"],
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Welcome! 👋
        </motion.p>
        {/* Speech bubble tail */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
          <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white dark:border-t-gray-800"></div>
        </div>
      </motion.div>

      {/* Mascot Container */}
      <motion.div
        className="relative w-16 h-16 sm:w-20 sm:h-20"
        animate={{ 
          y: [0, -5, 0],
          rotate: [0, 1, 0, -1, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Main Body */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-lg"
          animate={{
            scale: isWaving ? [1, 1.05, 1] : 1,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Face */}
        <div className="absolute inset-2 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-full flex items-center justify-center">
          {/* Eyes */}
          <div className="flex space-x-2 mb-1">
            <motion.div
              className="w-2 h-2 bg-gray-800 dark:bg-white rounded-full"
              animate={{
                scaleY: isBlinking ? 0.1 : 1,
              }}
              transition={{ duration: 0.1 }}
            />
            <motion.div
              className="w-2 h-2 bg-gray-800 dark:bg-white rounded-full"
              animate={{
                scaleY: isBlinking ? 0.1 : 1,
              }}
              transition={{ duration: 0.1 }}
            />
          </div>
          
          {/* Mouth */}
          <motion.div
            className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-1.5 border-b-2 border-gray-800 dark:border-white rounded-b-full"
            animate={{
              scaleX: isWaving ? [1, 1.3, 1] : 1,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Left Arm (Waving) */}
        <motion.div
          className="absolute -left-2 top-4 w-3 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full origin-top"
          animate={{
            rotate: isWaving ? [0, -30, 30, -20, 20, 0] : 0,
          }}
          transition={{ 
            duration: 1.5,
            ease: "easeInOut"
          }}
        />

        {/* Right Arm */}
        <motion.div
          className="absolute -right-2 top-4 w-3 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full origin-top"
          animate={{
            rotate: [0, 10, 0, -5, 0],
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Sparkles around mascot */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full"
            style={{
              left: `${30 + i * 20}%`,
              top: `${20 + i * 15}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>

      {/* Floating hearts */}
      <motion.div
        className="absolute -top-4 -right-4 text-red-500"
        animate={{
          y: [0, -10, 0],
          opacity: [0, 1, 0],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: 2,
          ease: "easeInOut"
        }}
      >
        ❤️
      </motion.div>
    </motion.div>
  );
}
