import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

const SuccessAnimation = ({ onClose, redirectUrl }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Trigger confetti on mount
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Run 2 confetti animations
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#1d4ed8', '#3b82f6', '#60a5fa'],
      });
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#0f766e', '#14b8a6', '#2dd4bf'],
      });
    }, 250);

    // Progress through animation stages
    const stageTimers = [
      setTimeout(() => setStage(1), 1000),
      setTimeout(() => setStage(2), 2500)
    ];

    return () => {
      clearInterval(interval);
      stageTimers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <motion.div
        className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 15, stiffness: 100 }}
      >
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              delay: 0.2,
              damping: 8
            }}
            className="mb-6"
          >
            <div className="relative">
              <CheckCircle 
                size={100} 
                strokeWidth={1.5} 
                className="text-primary" 
                fill="#e0f2fe"
              />
              <AnimatePresence>
                {stage >= 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -top-2 -right-2"
                  >
                    <Sparkles size={28} className="text-amber-500" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl font-bold mb-2 text-gray-800"
          >
            Awesome! Your project is ready
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-gray-600 mb-6"
          >
            You've successfully completed all the steps. Your project has been created and is ready for you to start building.
          </motion.p>

          <AnimatePresence>
            {stage >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3 w-full"
              >
                <Button 
                  className="w-full bg-primary hover:bg-secondary text-white flex items-center justify-center gap-2"
                  onClick={() => window.location.href = redirectUrl || "/dash/user/projects"}
                >
                  <span>Go to Your Projects</span>
                  <ArrowRight size={16} />
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={onClose}
                >
                  Close
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default SuccessAnimation; 