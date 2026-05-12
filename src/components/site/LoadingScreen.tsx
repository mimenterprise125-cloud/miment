import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    // Initialize loading state only once
    if (!hasInitialized) {
      // Check if we've already shown loading screen in this session
      const alreadyLoaded = sessionStorage.getItem("_mim_app_loaded");
      
      if (!alreadyLoaded) {
        setIsLoading(true);
        // Show loading screen for 2 seconds on first load
        const timer = setTimeout(() => {
          setIsLoading(false);
          sessionStorage.setItem("_mim_app_loaded", "true");
        }, 2000);

        return () => clearTimeout(timer);
      } else {
        // Already loaded in this session, skip loading screen
        setIsLoading(false);
      }

      setHasInitialized(true);
    }
  }, [hasInitialized]);

  // Don't render if not loading
  if (!isLoading) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background fade in */}
      <motion.div
        className="absolute inset-0 bg-ink"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />
      
      {/* Left sliding panel */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2"
        initial={{ x: 0, scaleY: 0 }}
        animate={{ 
          x: [0, 0, "-100%"],
          scaleY: [0, 1, 1]
        }}
        transition={{ 
          x: { duration: 1, delay: 0.3, ease: [0.65, 0, 0.35, 1] },
          scaleY: { duration: 0.4, ease: "easeOut" },
        }}
        style={{
          background: "linear-gradient(90deg, oklch(0.13 0 0 / 1) 0%, oklch(0.13 0 0 / 0.95) 100%)",
          transformOrigin: "center",
        }}
      />

      {/* Right sliding panel */}
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2"
        initial={{ x: 0, scaleY: 0 }}
        animate={{ 
          x: [0, 0, "100%"],
          scaleY: [0, 1, 1]
        }}
        transition={{ 
          x: { duration: 1, delay: 0.3, ease: [0.65, 0, 0.35, 1] },
          scaleY: { duration: 0.4, ease: "easeOut" },
        }}
        style={{
          background: "linear-gradient(90deg, oklch(0.13 0 0 / 0.95) 0%, oklch(0.13 0 0 / 1) 100%)",
          transformOrigin: "center",
        }}
      />

      {/* Center content during loading */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="text-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.div
            className="inline-block"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          >
            <div className="h-12 w-12 rounded-full border-4 border-gold/30 border-t-gold"></div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
