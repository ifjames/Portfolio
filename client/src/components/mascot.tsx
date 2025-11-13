import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function Mascot() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const processInterval = setInterval(() => {
      setIsProcessing(true);
      setTimeout(() => setIsProcessing(false), 2000);
    }, 5000 + Math.random() * 3000);

    return () => clearInterval(processInterval);
  }, []);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 3000 + Math.random() * 2000);

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
      {/* Enhanced Speech Bubble */}
      <motion.div
        className="relative bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 dark:from-cyan-400/30 dark:via-blue-400/30 dark:to-purple-400/30 backdrop-blur-md rounded-2xl px-6 py-4 mb-4 shadow-2xl border-2 border-cyan-400/40 dark:border-cyan-400/60 overflow-hidden"
        initial={{ opacity: 0, scale: 0.8, y: -10 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          y: 0,
          boxShadow: [
            "0 10px 30px rgba(34, 211, 238, 0.2)",
            "0 10px 40px rgba(34, 211, 238, 0.4)",
            "0 10px 30px rgba(34, 211, 238, 0.2)"
          ]
        }}
        transition={{ 
          delay: 1, 
          duration: 0.5,
          boxShadow: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        {/* Animated background shimmer */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
          animate={{
            x: ["-200%", "200%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Glowing particles inside bubble */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full blur-sm"
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "easeInOut"
            }}
          />
        ))}
        
        <motion.div className="relative flex items-center gap-2">
          {/* Terminal prompt symbol */}
          <motion.span
            className="text-lg font-bold text-cyan-400 dark:text-cyan-300 font-mono"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {'>'}
          </motion.span>
          
          {/* Main text with gradient */}
          <motion.p 
            className="text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 dark:from-cyan-300 dark:via-blue-400 dark:to-purple-400 whitespace-nowrap font-mono tracking-wider"
            animate={{ 
              backgroundPosition: ["0%", "100%", "0%"],
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundSize: "200% 100%"
            }}
          >
            System Ready
          </motion.p>
          
          {/* Blinking cursor */}
          <motion.span
            className="text-base sm:text-lg font-bold text-cyan-400 dark:text-cyan-300 font-mono"
            animate={{
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "steps(2)"
            }}
          >
            _
          </motion.span>
        </motion.div>
        
        {/* Binary code stream */}
        <motion.div
          className="absolute top-0 right-2 text-xs font-mono text-cyan-400/30 dark:text-cyan-300/30"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          01101110
        </motion.div>
        
        {/* Triangle pointer */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
          <motion.div 
            className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-cyan-400/40 dark:border-t-cyan-400/60"
            animate={{
              borderTopColor: [
                "rgba(34, 211, 238, 0.4)",
                "rgba(34, 211, 238, 0.7)",
                "rgba(34, 211, 238, 0.4)"
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>

      {/* Robot Container with 3D Perspective */}
      <motion.div
        className="relative w-32 h-32 sm:w-40 sm:h-40"
        style={{ perspective: "1000px" }}
        animate={{ 
          y: [0, -8, 0],
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Antenna */}
        <motion.div className="absolute left-1/2 -top-6 -translate-x-1/2 flex flex-col items-center z-20">
          <motion.div 
            className="w-0.5 h-6 bg-gradient-to-b from-cyan-400 to-slate-600 dark:from-cyan-300 dark:to-slate-400"
            animate={{
              scaleY: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="w-2 h-2 rounded-full bg-cyan-400 dark:bg-cyan-300 shadow-lg shadow-cyan-500/50"
            animate={{
              scale: isProcessing ? [1, 1.5, 1] : 1,
              boxShadow: isProcessing 
                ? ["0 0 10px rgba(34, 211, 238, 0.5)", "0 0 20px rgba(34, 211, 238, 1)", "0 0 10px rgba(34, 211, 238, 0.5)"]
                : "0 0 10px rgba(34, 211, 238, 0.5)",
            }}
            transition={{ duration: 0.5, repeat: isProcessing ? Infinity : 0 }}
          />
        </motion.div>

        {/* Robot Head - 3D Cube */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 sm:w-28 sm:h-28"
          style={{ transformStyle: "preserve-3d" }}
          animate={{
            rotateY: [0, 5, 0, -5, 0],
            rotateX: [0, 2, 0, -2, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Front Face */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 dark:from-slate-600 dark:via-slate-700 dark:to-slate-800 rounded-2xl border-2 border-cyan-400/40 shadow-2xl"
            style={{ transform: "translateZ(12px)" }}
          >
            {/* Circuit pattern overlay */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <motion.path
                  d="M10,10 L30,10 L30,30 M70,10 L90,10 L90,30 M10,70 L10,90 L30,90 M70,90 L90,90 L90,70"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                  className="text-cyan-400"
                  animate={{ pathLength: [0.5, 1, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </svg>
            </div>

            {/* Digital Eyes Display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex space-x-4 sm:space-x-5">
                {/* Left Eye */}
                <motion.div
                  className="relative w-8 h-10 sm:w-10 sm:h-12 bg-black rounded-lg border border-cyan-500/50 overflow-hidden shadow-inner"
                  animate={{
                    boxShadow: isProcessing 
                      ? ["0 0 5px rgba(34, 211, 238, 0.3)", "0 0 15px rgba(34, 211, 238, 0.8)", "0 0 5px rgba(34, 211, 238, 0.3)"]
                      : "0 0 5px rgba(34, 211, 238, 0.3)",
                  }}
                  transition={{ duration: 1, repeat: isProcessing ? Infinity : 0 }}
                >
                  <motion.div
                    className="absolute inset-1 bg-gradient-to-b from-cyan-400 to-cyan-600 rounded"
                    animate={{
                      scaleY: isBlinking ? 0.1 : 1,
                      opacity: isBlinking ? 0.3 : 1,
                    }}
                    transition={{ duration: 0.1 }}
                  />
                  {/* Scan line effect */}
                  <motion.div
                    className="absolute inset-x-0 h-0.5 bg-cyan-300/50"
                    animate={{ y: [0, 40, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>

                {/* Right Eye */}
                <motion.div
                  className="relative w-8 h-10 sm:w-10 sm:h-12 bg-black rounded-lg border border-cyan-500/50 overflow-hidden shadow-inner"
                  animate={{
                    boxShadow: isProcessing 
                      ? ["0 0 5px rgba(34, 211, 238, 0.3)", "0 0 15px rgba(34, 211, 238, 0.8)", "0 0 5px rgba(34, 211, 238, 0.3)"]
                      : "0 0 5px rgba(34, 211, 238, 0.3)",
                  }}
                  transition={{ duration: 1, repeat: isProcessing ? Infinity : 0 }}
                >
                  <motion.div
                    className="absolute inset-1 bg-gradient-to-b from-cyan-400 to-cyan-600 rounded"
                    animate={{
                      scaleY: isBlinking ? 0.1 : 1,
                      opacity: isBlinking ? 0.3 : 1,
                    }}
                    transition={{ duration: 0.1 }}
                  />
                  {/* Scan line effect */}
                  <motion.div
                    className="absolute inset-x-0 h-0.5 bg-cyan-300/50"
                    animate={{ y: [0, 40, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.1 }}
                  />
                </motion.div>
              </div>
            </div>

            {/* Status LED strip */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                  animate={{
                    opacity: isProcessing ? [0.3, 1, 0.3] : 0.3,
                    scale: isProcessing ? [1, 1.2, 1] : 1,
                  }}
                  transition={{
                    duration: 1,
                    repeat: isProcessing ? Infinity : 0,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Top Face - creates 3D depth */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-slate-600 to-slate-700 dark:from-slate-500 dark:to-slate-600 rounded-2xl border-2 border-cyan-400/20"
            style={{ 
              transform: "rotateX(90deg) translateZ(12px)",
              transformOrigin: "top"
            }}
          />

          {/* Right Face - creates 3D depth */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-700 dark:to-slate-800 rounded-2xl border-2 border-cyan-400/20"
            style={{ 
              transform: "rotateY(90deg) translateZ(12px)",
              transformOrigin: "right"
            }}
          />
        </motion.div>

        {/* Floating Binary Code */}
        {['01', '10', '11', '00', '01'].map((binary, i) => (
          <motion.div
            key={i}
            className="absolute text-xs font-mono font-bold text-cyan-500/60 dark:text-cyan-400/60"
            style={{
              left: `${15 + i * 18}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeInOut"
            }}
          >
            {binary}
          </motion.div>
        ))}

        {/* Particle Effects */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${25 + i * 18}%`,
              top: `${50 + (i % 2) * 20}%`,
            }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Holographic Ring */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 sm:w-44 sm:h-44 border-2 border-cyan-400/20 rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.div>
    </motion.div>
  );
}
