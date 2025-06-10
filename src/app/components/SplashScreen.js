'use client';

import { motion } from 'framer-motion';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export default function SplashScreen({ onComplete }) {
  const [showText, setShowText] = useState(false);
  const [showSubtext, setShowSubtext] = useState(false);

  useEffect(() => {
    // Show text after logo animation
    const textTimer = setTimeout(() => setShowText(true), 1800);
    
    // Show subtext
    const subtextTimer = setTimeout(() => setShowSubtext(true), 2500);
    
    // Complete splash after total animation
    const completeTimer = setTimeout(() => onComplete(), 4500);
    
    return () => {
      clearTimeout(textTimer);
      clearTimeout(subtextTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `
          radial-gradient(circle at 20% 20%, #667eea 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, #764ba2 0%, transparent 50%),
          radial-gradient(circle at 40% 60%, #ff9a9e 0%, transparent 50%),
          linear-gradient(135deg, #1e3c72 0%, #2a5298 25%, #667eea 50%, #764ba2 75%, #ff9a9e 100%)
        `,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      {/* Animated Background Orbs */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          style={{
            position: 'absolute',
            width: `${60 + Math.random() * 120}px`,
            height: `${60 + Math.random() * 120}px`,
            borderRadius: '50%',
            background: `linear-gradient(135deg, 
              rgba(255, 255, 255, ${0.1 + Math.random() * 0.2}) 0%, 
              rgba(255, 255, 255, ${0.05 + Math.random() * 0.1}) 100%)`,
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -80, 60, 0],
            scale: [1, 1.2, 0.8, 1],
            opacity: [0.3, 0.7, 0.4, 0.3],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          style={{
            position: 'absolute',
            width: '3px',
            height: '3px',
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '50%',
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-40, 40, -40],
            x: [-30, 30, -30],
            opacity: [0.2, 1, 0.2],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 4,
          }}
        />
      ))}

      {/* Ripple Effect Background */}
      <motion.div
        style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          border: '2px solid rgba(255, 255, 255, 0.1)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 2.5, 1],
          opacity: [0.5, 0.1, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        style={{
          position: 'absolute',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          border: '2px solid rgba(255, 255, 255, 0.15)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 3, 1],
          opacity: [0.6, 0.1, 0.6],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      {/* Main Logo Container */}
      <motion.div
        initial={{ scale: 0, rotate: -360, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ 
          duration: 2, 
          ease: "easeOut",
          type: "spring",
          stiffness: 80,
          damping: 15
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '160px',
            height: '160px',
            borderRadius: '50%',
            background: `
              radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%),
              linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%)
            `,
            backdropFilter: 'blur(30px)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 6,
            boxShadow: `
              0 25px 80px rgba(0,0,0,0.3),
              inset 0 1px 0 rgba(255,255,255,0.4),
              0 0 60px rgba(255,255,255,0.1)
            `,
            overflow: 'hidden',
          }}
        >
          {/* Inner Glow Layers */}
          <Box
            sx={{
              position: 'absolute',
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(102, 126, 234, 0.2) 0%, transparent 70%)',
            }}
          />
          
          <Box
            sx={{
              position: 'absolute',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 154, 158, 0.15) 0%, transparent 70%)',
            }}
          />

          {/* Animated Icon */}
          <motion.div
            animate={{ 
              rotate: [0, 15, -15, 0],
              scale: [1, 1.1, 1],
              y: [0, -5, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          >
            <Typography 
              sx={{ 
                fontSize: '4.5rem',
                filter: 'drop-shadow(3px 3px 8px rgba(0,0,0,0.3))',
                position: 'relative',
                zIndex: 2,
              }}
            >
              🎓
            </Typography>
          </motion.div>

          {/* Rotating Ring */}
          <motion.div
            style={{
              position: 'absolute',
              width: '180px',
              height: '180px',
              border: '3px solid transparent',
              borderTop: '3px solid rgba(255, 255, 255, 0.6)',
              borderRight: '3px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '50%',
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </Box>
      </motion.div>

      {/* Main Title with Enhanced Typography */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 50 }}
        transition={{ duration: 1, ease: "easeOut", type: "spring", stiffness: 100 }}
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontWeight: 900,
            background: `
              linear-gradient(135deg, 
                rgba(255, 255, 255, 1) 0%,
                rgba(255, 255, 255, 0.9) 25%, 
                rgba(255, 255, 255, 1) 50%,
                rgba(255, 255, 255, 0.8) 75%,
                rgba(255, 255, 255, 1) 100%)
            `,
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 8px 32px rgba(0,0,0,0.3)',
            mb: 3,
            fontSize: { xs: '3rem', md: '4.5rem' },
            textAlign: 'center',
            letterSpacing: '-0.02em',
            position: 'relative',
          }}
        >
          <motion.span
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              background: `
                linear-gradient(135deg, 
                  rgba(255, 255, 255, 1) 0%,
                  rgba(255, 255, 255, 0.7) 25%, 
                  rgba(255, 255, 255, 1) 50%,
                  rgba(255, 255, 255, 0.7) 75%,
                  rgba(255, 255, 255, 1) 100%)
              `,
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Knowledge Nook
          </motion.span>
        </Typography>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: showSubtext ? 1 : 0, scale: showSubtext ? 1 : 0.8 }}
          transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100 }}
        >
          <Typography
            variant="h5"
            sx={{
              color: 'rgba(255, 255, 255, 0.95)',
              textAlign: 'center',
              fontWeight: 300,
              mb: 6,
              fontSize: { xs: '1.3rem', md: '1.8rem' },
              textShadow: '0 4px 16px rgba(0,0,0,0.2)',
              letterSpacing: '0.5px',
            }}
          >
            Learning Made Magical ✨
          </Typography>
        </motion.div>
      </motion.div>

      {/* Enhanced Loading Animation */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: showSubtext ? 1 : 0, y: showSubtext ? 0 : 30 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Box sx={{ display: 'flex', gap: 2, mt: 4, alignItems: 'center' }}>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.4, 1, 0.4],
                boxShadow: [
                  '0 0 5px rgba(255, 255, 255, 0.3)',
                  '0 0 25px rgba(255, 255, 255, 0.8)',
                  '0 0 5px rgba(255, 255, 255, 0.3)'
                ],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'easeInOut',
              }}
            >
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.6) 100%)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                }}
              />
            </motion.div>
          ))}
        </Box>
      </motion.div>

      {/* Enhanced Sparkle Effects */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          style={{
            position: 'absolute',
            fontSize: `${1.2 + Math.random() * 1}rem`,
            top: `${15 + Math.random() * 70}%`,
            left: `${5 + Math.random() * 90}%`,
            filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))',
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            rotate: [0, 180, 360],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
        >
          {['✨', '⭐', '🌟', '💫'][Math.floor(Math.random() * 4)]}
        </motion.div>
      ))}

      {/* Progress Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showSubtext ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <Box
          sx={{
            width: '200px',
            height: '4px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '2px',
            overflow: 'hidden',
            backdropFilter: 'blur(10px)',
          }}
        >
          <motion.div
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 1) 100%)',
              borderRadius: '2px',
            }}
            animate={{
              width: ['0%', '100%'],
            }}
            transition={{
              duration: 4,
              ease: 'easeInOut',
            }}
          />
        </Box>
        
        <Typography
          variant="caption"
          sx={{
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
            display: 'block',
            mt: 2,
            fontSize: '0.9rem',
            letterSpacing: '1px',
            textShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}
        >
          Preparing your adventure...
        </Typography>
      </motion.div>

      {/* Corner Decorative Elements */}
      {[
        { top: '10%', left: '10%' },
        { top: '10%', right: '10%' },
        { bottom: '20%', left: '15%' },
        { bottom: '20%', right: '15%' },
      ].map((position, i) => (
        <motion.div
          key={`corner-${i}`}
          style={{
            position: 'absolute',
            ...position,
            fontSize: '2rem',
            opacity: 0.6,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 6 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'easeInOut',
          }}
        >
          {['🎨', '📚', '🧮', '🌈'][i]}
        </motion.div>
      ))}
    </Box>
  );
} 