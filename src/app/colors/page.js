'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Fab,
  Snackbar,
  Alert,
  Chip,
  LinearProgress,
} from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const colors = [
  { 
    name: 'Red', 
    hex: '#FF4444', 
    audio: '/audio/red.mp3', 
    emoji: '🍎',
    description: 'Like a juicy apple or beautiful rose',
    examples: ['🍎 Apple', '🌹 Rose', '❤️ Heart'],
    category: 'warm'
  },
  { 
    name: 'Blue', 
    hex: '#4444FF', 
    audio: '/audio/blue.mp3', 
    emoji: '🌊',
    description: 'Like the ocean or clear sky',
    examples: ['🌊 Ocean', '🌌 Sky', '🫐 Blueberry'],
    category: 'cool'
  },
  { 
    name: 'Yellow', 
    hex: '#FFD700', 
    audio: '/audio/yellow.mp3', 
    emoji: '🌞',
    description: 'Bright like the sun or banana',
    examples: ['🌞 Sun', '🍌 Banana', '⭐ Star'],
    category: 'warm'
  },
  { 
    name: 'Green', 
    hex: '#44AA44', 
    audio: '/audio/green.mp3', 
    emoji: '🌿',
    description: 'Fresh like grass or leaves',
    examples: ['🌿 Leaves', '🥬 Lettuce', '🐸 Frog'],
    category: 'cool'
  },
  { 
    name: 'Orange', 
    hex: '#FF8844', 
    audio: '/audio/orange.mp3', 
    emoji: '🍊',
    description: 'Vibrant like oranges or sunset',
    examples: ['🍊 Orange', '🌅 Sunset', '🦊 Fox'],
    category: 'warm'
  },
  { 
    name: 'Purple', 
    hex: '#AA44AA', 
    audio: '/audio/purple.mp3', 
    emoji: '🍇',
    description: 'Royal like grapes or lavender',
    examples: ['🍇 Grapes', '🌸 Lavender', '👑 Crown'],
    category: 'cool'
  },
  { 
    name: 'Pink', 
    hex: '#FF88CC', 
    audio: '/audio/pink.mp3', 
    emoji: '🌸',
    description: 'Soft like cherry blossoms',
    examples: ['🌸 Blossom', '🩰 Ballet', '🦩 Flamingo'],
    category: 'warm'
  },
  { 
    name: 'Brown', 
    hex: '#8B4513', 
    audio: '/audio/brown.mp3', 
    emoji: '🐻',
    description: 'Natural like tree bark or chocolate',
    examples: ['🐻 Bear', '🍫 Chocolate', '🌳 Tree'],
    category: 'neutral'
  },
  { 
    name: 'Black', 
    hex: '#333333', 
    audio: '/audio/black.mp3', 
    emoji: '🐧',
    description: 'Dark like night or penguin',
    examples: ['🐧 Penguin', '🌙 Night', '🐱 Cat'],
    category: 'neutral'
  },
  { 
    name: 'White', 
    hex: '#F8F8F8', 
    audio: '/audio/white.mp3', 
    emoji: '☁️',
    description: 'Pure like clouds or snow',
    examples: ['☁️ Cloud', '❄️ Snow', '🐑 Sheep'],
    category: 'neutral'
  },
];

const MotionCard = motion(Card);

export default function ColorsPage() {
  const [selectedColor, setSelectedColor] = useState(null);
  const [audioError, setAudioError] = useState(false);
  const [learnedColors, setLearnedColors] = useState(new Set());
  const [currentMode, setCurrentMode] = useState('explore'); // explore, learn, quiz
  const audioRef = useRef(null);

  const progress = (learnedColors.size / colors.length) * 100;

  const handleColorClick = (color) => {
    setSelectedColor(color);
    setLearnedColors(prev => new Set([...prev, color.name]));
    
    // Stop any currently playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    
    // Create and play new audio
    const audio = new Audio(color.audio);
    audioRef.current = audio;
    
    audio.play().catch(error => {
      console.log('Audio playback failed:', error);
      setAudioError(true);
      
      // Fallback: Use Web Speech API for pronunciation
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(color.name);
        utterance.rate = 0.7;
        utterance.pitch = 1.2;
        speechSynthesis.speak(utterance);
      }
    });
  };

  const speakColor = (colorName) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(colorName);
      utterance.rate = 0.7;
      utterance.pitch = 1.2;
      speechSynthesis.speak(utterance);
    }
  };

  const getCategoryColors = (category) => {
    return colors.filter(color => color.category === category);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 15% 85%, rgba(255, 68, 68, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 85% 15%, rgba(68, 68, 255, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.2) 0%, transparent 50%)
          `,
          zIndex: 0,
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
        {/* Header with Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Link href="/" passHref>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <IconButton
                  sx={{
                    mr: 3,
                    background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
                    color: '#667eea',
                    width: 60,
                    height: 60,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                    '&:hover': { 
                      background: 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)',
                    },
                  }}
                >
                  <ArrowBackIcon fontSize="large" />
                </IconButton>
              </motion.div>
            </Link>
            
            <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
              <motion.div
                animate={{ 
                  y: [0, -5, 0],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Typography 
                  variant="h2" 
                  component="h1" 
                  sx={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 900,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    mb: 1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  🎨 Rainbow Adventure! 🎨
                </Typography>
              </motion.div>
              
              <Typography 
                variant="h6" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 400,
                  mb: 2,
                }}
              >
                Discover the magical world of colors!
              </Typography>

              {/* Progress Bar */}
              <Box sx={{ maxWidth: 400, mx: 'auto', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    Progress: {learnedColors.size}/{colors.length} colors
                  </Typography>
                  <Chip 
                    label={`${Math.round(progress)}%`}
                    size="small"
                    sx={{ 
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      fontWeight: 600 
                    }}
                  />
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={progress} 
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(90deg, #FFD700 0%, #FF8844 50%, #FF4444 100%)',
                      borderRadius: 4,
                    }
                  }}
                />
              </Box>
            </Box>
          </Box>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Box sx={{ 
            textAlign: 'center', 
            mb: 4,
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: '20px',
            py: 2,
            px: 4,
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
          }}>
            <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
              🎯 How to Play
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
              Tap any color card to hear its name and learn fun facts! 
              Try to discover all {colors.length} colors! 🌈
            </Typography>
          </Box>
        </motion.div>

        {/* Colors by Category */}
        {['warm', 'cool', 'neutral'].map((category, categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + categoryIndex * 0.1 }}
          >
            <Box sx={{ mb: 5 }}>
              <Typography 
                variant="h4" 
                sx={{ 
                  color: 'white', 
                  fontWeight: 700, 
                  mb: 3,
                  textAlign: 'center',
                  textTransform: 'capitalize',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                }}
              >
                {category === 'warm' ? '🔥 Warm Colors' : 
                 category === 'cool' ? '❄️ Cool Colors' : 
                 '⚖️ Neutral Colors'}
              </Typography>
              
              <Grid container spacing={3} justifyContent="center">
                {getCategoryColors(category).map((color, index) => (
                  <Grid item xs={6} sm={4} md={3} lg={2} key={color.name}>
                    <MotionCard
                      initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 100
                      }}
                      whileHover={{ 
                        scale: 1.08,
                        y: -10,
                        rotateY: 5,
                        boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
                      }}
                      whileTap={{ scale: 0.95 }}
                      sx={{
                        height: 200,
                        cursor: 'pointer',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        position: 'relative',
                        background: `linear-gradient(135deg, ${color.hex} 0%, ${color.hex}CC 100%)`,
                        boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                        border: selectedColor?.name === color.name 
                          ? '4px solid #FFD700' 
                          : '2px solid rgba(255,255,255,0.2)',
                        transform: 'perspective(1000px)',
                      }}
                      onClick={() => handleColorClick(color)}
                    >
                      {/* Learned Indicator */}
                      <AnimatePresence>
                        {learnedColors.has(color.name) && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0 }}
                            transition={{ type: "spring", stiffness: 200 }}
                          >
                            <Box
                              sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                zIndex: 2,
                                backgroundColor: '#4CAF50',
                                borderRadius: '50%',
                                width: 32,
                                height: 32,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '2px solid white',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                              }}
                            >
                              <CheckCircleIcon sx={{ color: 'white', fontSize: '1rem' }} />
                            </Box>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Shimmer Effect */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: '-100%',
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                          animation: 'shimmer 3s infinite',
                          '@keyframes shimmer': {
                            '0%': { left: '-100%' },
                            '100%': { left: '100%' },
                          },
                        }}
                      />
                      
                      <CardContent 
                        sx={{ 
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                          color: color.name === 'White' || color.name === 'Yellow' ? '#333' : 'white',
                          p: 2,
                          position: 'relative',
                          zIndex: 1,
                        }}
                      >
                        {/* Emoji with Animation */}
                        <motion.div
                          animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        >
                          <Typography 
                            sx={{ 
                              fontSize: '2.5rem',
                              mb: 1,
                              filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.4))',
                            }}
                          >
                            {color.emoji}
                          </Typography>
                        </motion.div>
                        
                        {/* Color Name */}
                        <Typography 
                          variant="h5" 
                          component="div" 
                          sx={{
                            fontWeight: 800,
                            fontSize: '1.4rem',
                            textShadow: color.name === 'White' || color.name === 'Yellow' 
                              ? '2px 2px 4px rgba(0,0,0,0.4)' 
                              : '2px 2px 4px rgba(0,0,0,0.6)',
                            mb: 1,
                          }}
                        >
                          {color.name}
                        </Typography>
                        
                        {/* Audio Button */}
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation();
                              speakColor(color.name);
                            }}
                            sx={{
                              backgroundColor: 'rgba(255, 255, 255, 0.9)',
                              color: color.hex,
                              width: 36,
                              height: 36,
                              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                              '&:hover': {
                                backgroundColor: 'white',
                              },
                            }}
                          >
                            <VolumeUpIcon fontSize="small" />
                          </IconButton>
                        </motion.div>
                      </CardContent>
                    </MotionCard>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </motion.div>
        ))}

        {/* Selected Color Display */}
        <AnimatePresence>
          {selectedColor && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ duration: 0.4, type: "spring" }}
            >
              <Box
                sx={{
                  textAlign: 'center',
                  p: 5,
                  borderRadius: '32px',
                  background: `linear-gradient(135deg, ${selectedColor.hex}20 0%, rgba(255,255,255,0.95) 100%)`,
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                  border: `3px solid ${selectedColor.hex}`,
                  mt: 4,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Background Pattern */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0.1,
                    background: `radial-gradient(circle, ${selectedColor.hex} 1px, transparent 1px)`,
                    backgroundSize: '20px 20px',
                  }}
                />

                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Typography variant="h2" sx={{ 
                      color: selectedColor.hex, 
                      fontWeight: 800, 
                      mb: 2,
                      fontSize: { xs: '2rem', md: '3rem' },
                    }}>
                      {selectedColor.emoji} {selectedColor.name}!
                    </Typography>
                  </motion.div>
                  
                  <Typography variant="h6" sx={{ 
                    color: 'text.secondary', 
                    mb: 3,
                    fontStyle: 'italic' 
                  }}>
                    {selectedColor.description}
                  </Typography>

                  <Typography variant="h6" sx={{ 
                    color: 'text.primary', 
                    mb: 2,
                    fontWeight: 600 
                  }}>
                    You can find {selectedColor.name.toLowerCase()} in:
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
                    {selectedColor.examples.map((example, index) => (
                      <motion.div
                        key={example}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Chip
                          label={example}
                          sx={{
                            backgroundColor: selectedColor.hex,
                            color: selectedColor.name === 'White' || selectedColor.name === 'Yellow' ? '#333' : 'white',
                            fontWeight: 600,
                            fontSize: '1rem',
                            py: 2,
                            px: 1,
                            '& .MuiChip-label': { px: 2 }
                          }}
                        />
                      </motion.div>
                    ))}
                  </Box>
                </Box>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Completion Celebration */}
        <AnimatePresence>
          {learnedColors.size === colors.length && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Box
                sx={{
                  textAlign: 'center',
                  p: 4,
                  mt: 4,
                  borderRadius: '24px',
                  background: 'linear-gradient(135deg, #FFD700 0%, #FF8844 100%)',
                  color: 'white',
                  boxShadow: '0 20px 40px rgba(255, 215, 0, 0.3)',
                }}
              >
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
                  🎉 Congratulations! 🎉
                </Typography>
                <Typography variant="h6">
                  You've learned all the colors! You're a Color Master! 🌈⭐
                </Typography>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Home Button */}
        <Link href="/" passHref>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              zIndex: 1000,
            }}
          >
            <Fab
              sx={{
                width: 70,
                height: 70,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                },
              }}
            >
              <HomeIcon fontSize="large" />
            </Fab>
          </motion.div>
        </Link>

        {/* Audio Error Snackbar */}
        <Snackbar
          open={audioError}
          autoHideDuration={3000}
          onClose={() => setAudioError(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert 
            severity="info" 
            onClose={() => setAudioError(false)}
            sx={{ borderRadius: '12px' }}
          >
            🔊 Using text-to-speech for audio!
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}