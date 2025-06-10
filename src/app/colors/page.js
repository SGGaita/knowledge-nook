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
  Button,
  Badge,
} from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import PaletteIcon from '@mui/icons-material/Palette';
import SchoolIcon from '@mui/icons-material/School';
import QuizIcon from '@mui/icons-material/Quiz';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const colors = [
  { 
    name: 'Red', 
    hex: '#FF4444', 
    audio: '/audio/red.mp3', 
    emoji: '🍎',
    description: 'Like a juicy apple or beautiful rose',
    examples: ['🍎 Apple', '🌹 Rose', '❤️ Heart', '🍓 Strawberry'],
    category: 'warm',
    funFact: 'Red is the color of love and energy!'
  },
  { 
    name: 'Blue', 
    hex: '#4444FF', 
    audio: '/audio/blue.mp3', 
    emoji: '🌊',
    description: 'Like the ocean or clear sky',
    examples: ['🌊 Ocean', '🌌 Sky', '🫐 Blueberry', '🐋 Whale'],
    category: 'cool',
    funFact: 'Blue is the most calming color!'
  },
  { 
    name: 'Yellow', 
    hex: '#FFD700', 
    audio: '/audio/yellow.mp3', 
    emoji: '🌞',
    description: 'Bright like the sun or banana',
    examples: ['🌞 Sun', '🍌 Banana', '⭐ Star', '🌻 Sunflower'],
    category: 'warm',
    funFact: 'Yellow makes us feel happy and cheerful!'
  },
  { 
    name: 'Green', 
    hex: '#44AA44', 
    audio: '/audio/green.mp3', 
    emoji: '🌿',
    description: 'Fresh like grass or leaves',
    examples: ['🌿 Leaves', '🥬 Lettuce', '🐸 Frog', '🌲 Tree'],
    category: 'cool',
    funFact: 'Green is the color of nature and growth!'
  },
  { 
    name: 'Orange', 
    hex: '#FF8844', 
    audio: '/audio/orange.mp3', 
    emoji: '🍊',
    description: 'Vibrant like oranges or sunset',
    examples: ['🍊 Orange', '🌅 Sunset', '🦊 Fox', '🥕 Carrot'],
    category: 'warm',
    funFact: 'Orange is a mix of red and yellow!'
  },
  { 
    name: 'Purple', 
    hex: '#AA44AA', 
    audio: '/audio/purple.mp3', 
    emoji: '🍇',
    description: 'Royal like grapes or lavender',
    examples: ['🍇 Grapes', '🌸 Lavender', '👑 Crown', '🦄 Unicorn'],
    category: 'cool',
    funFact: 'Purple is the color of royalty and magic!'
  },
  { 
    name: 'Pink', 
    hex: '#FF88CC', 
    audio: '/audio/pink.mp3', 
    emoji: '🌸',
    description: 'Soft like cherry blossoms',
    examples: ['🌸 Blossom', '🩰 Ballet', '🦩 Flamingo', '🌺 Flower'],
    category: 'warm',
    funFact: 'Pink is a gentle and loving color!'
  },
  { 
    name: 'Brown', 
    hex: '#8B4513', 
    audio: '/audio/brown.mp3', 
    emoji: '🐻',
    description: 'Natural like tree bark or chocolate',
    examples: ['🐻 Bear', '🍫 Chocolate', '🌳 Tree', '🏠 House'],
    category: 'neutral',
    funFact: 'Brown is the color of earth and comfort!'
  },
  { 
    name: 'Black', 
    hex: '#333333', 
    audio: '/audio/black.mp3', 
    emoji: '🐧',
    description: 'Dark like night or penguin',
    examples: ['🐧 Penguin', '🌙 Night', '🐱 Cat', '🎩 Hat'],
    category: 'neutral',
    funFact: 'Black makes other colors look brighter!'
  },
  { 
    name: 'White', 
    hex: '#F8F8F8', 
    audio: '/audio/white.mp3', 
    emoji: '☁️',
    description: 'Pure like clouds or snow',
    examples: ['☁️ Cloud', '❄️ Snow', '🐑 Sheep', '🥛 Milk'],
    category: 'neutral',
    funFact: 'White contains all colors of the rainbow!'
  },
];

const MotionCard = motion(Card);
const MotionBox = motion(Box);

export default function ColorsPage() {
  const [selectedColor, setSelectedColor] = useState(null);
  const [audioError, setAudioError] = useState(false);
  const [learnedColors, setLearnedColors] = useState(new Set());
  const [currentMode, setCurrentMode] = useState('explore'); // explore, learn, quiz
  const [showFunFact, setShowFunFact] = useState(false);
  const [stars, setStars] = useState(0);
  const [clickedExamples, setClickedExamples] = useState(new Set());
  const audioRef = useRef(null);

  const progress = (learnedColors.size / colors.length) * 100;

  const handleColorClick = (color) => {
    setSelectedColor(color);
    setLearnedColors(prev => new Set([...prev, color.name]));
    setShowFunFact(true);
    
    // Add stars for learning new colors
    if (!learnedColors.has(color.name)) {
      setStars(prev => prev + 10);
    }
    
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

  const handleExampleClick = (example, colorName) => {
    // Extract the word from the example (remove emoji)
    const word = example.split(' ').slice(1).join(' '); // Remove emoji and get the word
    const exampleKey = `${colorName}-${word}`;
    
    // Add to clicked examples for visual feedback
    setClickedExamples(prev => new Set([...prev, exampleKey]));
    
    // Add bonus stars for exploring examples
    setStars(prev => prev + 2);
    
    // Play audio for the example
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      speechSynthesis.speak(utterance);
    }
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

  const getModeIcon = (mode) => {
    switch(mode) {
      case 'explore': return <PaletteIcon />;
      case 'learn': return <SchoolIcon />;
      case 'quiz': return <QuizIcon />;
      default: return <PaletteIcon />;
    }
  };

  const getModeTitle = (mode) => {
    switch(mode) {
      case 'explore': return 'Free Exploration';
      case 'learn': return 'Guided Learning';
      case 'quiz': return 'Color Quiz';
      default: return 'Free Exploration';
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `
          radial-gradient(circle at 20% 80%, rgba(255, 68, 68, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(68, 68, 255, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(255, 215, 0, 0.25) 0%, transparent 50%),
          linear-gradient(135deg, #667eea 0%, #764ba2 50%, #ff9a9e 100%)
        `,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Enhanced Animated Background Elements */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`bg-element-${i}`}
          style={{
            position: 'absolute',
            width: `${30 + Math.random() * 60}px`,
            height: `${30 + Math.random() * 60}px`,
            borderRadius: '50%',
            background: `linear-gradient(135deg, 
              ${colors[Math.floor(Math.random() * colors.length)].hex}40 0%, 
              transparent 70%)`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            zIndex: 0,
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 30, 0],
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

      {/* Floating Color Particles */}
      {colors.slice(0, 6).map((color, i) => (
        <motion.div
          key={`particle-${i}`}
          style={{
            position: 'absolute',
            fontSize: '1.5rem',
            top: `${10 + i * 15}%`,
            right: `${5 + (i % 2) * 10}%`,
            zIndex: 0,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 360],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        >
          {color.emoji}
        </motion.div>
      ))}

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
        {/* Enhanced Header with Navigation and Stats */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Link href="/dashboard" passHref>
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
                  y: [0, -8, 0],
                  scale: [1, 1.02, 1]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Typography 
                  variant="h1" 
                  component="h1" 
                  sx={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 900,
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    textShadow: '0 6px 30px rgba(0,0,0,0.4)',
                    mb: 1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  🎨 Rainbow Adventure! 🎨
                </Typography>
              </motion.div>
              
              <Typography 
                variant="h5" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.95)',
                  fontWeight: 400,
                  mb: 3,
                  fontSize: { xs: '1.2rem', md: '1.5rem' }
                }}
              >
                Discover the magical world of colors!
              </Typography>

              {/* Enhanced Stats Row */}
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: 4, 
                mb: 3,
                flexWrap: 'wrap'
              }}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Box sx={{ 
                    textAlign: 'center',
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    borderRadius: '20px',
                    py: 2,
                    px: 3,
                    backdropFilter: 'blur(15px)',
                    border: '1px solid rgba(255,255,255,0.3)',
                  }}>
                    <Typography variant="h4" sx={{ color: '#FFD700', fontWeight: 800 }}>
                      {learnedColors.size}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                      Colors Learned
                    </Typography>
                  </Box>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }}>
                  <Box sx={{ 
                    textAlign: 'center',
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    borderRadius: '20px',
                    py: 2,
                    px: 3,
                    backdropFilter: 'blur(15px)',
                    border: '1px solid rgba(255,255,255,0.3)',
                  }}>
                    <Typography variant="h4" sx={{ color: '#FF6B6B', fontWeight: 800 }}>
                      {stars}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                      Stars Earned
                    </Typography>
                  </Box>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }}>
                  <Box sx={{ 
                    textAlign: 'center',
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    borderRadius: '20px',
                    py: 2,
                    px: 3,
                    backdropFilter: 'blur(15px)',
                    border: '1px solid rgba(255,255,255,0.3)',
                  }}>
                    <Typography variant="h4" sx={{ color: '#4ECDC4', fontWeight: 800 }}>
                      {Math.round(progress)}%
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                      Progress
                    </Typography>
                  </Box>
                </motion.div>
              </Box>

              {/* Enhanced Progress Bar */}
              <Box sx={{ maxWidth: 500, mx: 'auto', mb: 3 }}>
                <LinearProgress 
                  variant="determinate" 
                  value={progress} 
                  sx={{
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    border: '2px solid rgba(255,255,255,0.3)',
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(90deg, #FF6B6B 0%, #FFD93D 25%, #4ECDC4 50%, #AA44AA 75%, #FF8844 100%)',
                      borderRadius: 6,
                      boxShadow: '0 4px 12px rgba(255,255,255,0.3)',
                    }
                  }}
                />
              </Box>
            </Box>

            {/* Stars Display */}
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Badge badgeContent={stars} color="primary" max={999}>
                <Box sx={{
                  backgroundColor: 'rgba(255,215,0,0.9)',
                  borderRadius: '50%',
                  p: 1.5,
                  boxShadow: '0 8px 24px rgba(255,215,0,0.4)',
                }}>
                  <EmojiEventsIcon sx={{ fontSize: '2rem', color: 'white' }} />
                </Box>
              </Badge>
            </motion.div>
          </Box>
        </motion.div>

        {/* Learning Mode Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 2, 
            mb: 4,
            flexWrap: 'wrap'
          }}>
            {['explore', 'learn', 'quiz'].map((mode) => (
              <motion.div
                key={mode}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={currentMode === mode ? 'contained' : 'outlined'}
                  startIcon={getModeIcon(mode)}
                  onClick={() => setCurrentMode(mode)}
                  sx={{
                    borderRadius: '25px',
                    py: 1.5,
                    px: 3,
                    backgroundColor: currentMode === mode 
                      ? 'rgba(255,255,255,0.9)' 
                      : 'rgba(255,255,255,0.1)',
                    color: currentMode === mode ? '#667eea' : 'white',
                    border: '2px solid rgba(255,255,255,0.3)',
                    backdropFilter: 'blur(10px)',
                    fontWeight: 700,
                    fontSize: '1rem',
                    '&:hover': {
                      backgroundColor: currentMode === mode 
                        ? 'white' 
                        : 'rgba(255,255,255,0.2)',
                    },
                  }}
                >
                  {getModeTitle(mode)}
                </Button>
              </motion.div>
            ))}
          </Box>
        </motion.div>

        {/* Enhanced Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Box sx={{ 
            textAlign: 'center', 
            mb: 5,
            backgroundColor: 'rgba(255,255,255,0.15)',
            borderRadius: '25px',
            py: 3,
            px: 4,
            backdropFilter: 'blur(15px)',
            border: '2px solid rgba(255,255,255,0.3)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
          }}>
            <Typography variant="h5" sx={{ color: 'white', mb: 2, fontWeight: 700 }}>
              🎯 How to Play
            </Typography>
            <Typography variant="h6" sx={{ 
              color: 'rgba(255,255,255,0.95)',
              fontSize: { xs: '1rem', md: '1.2rem' },
              lineHeight: 1.6
            }}>
              Tap any color card to hear its name and discover amazing facts! 
              Collect all {colors.length} colors and earn stars! 🌈⭐
            </Typography>
          </Box>
        </motion.div>

        {/* Enhanced Colors by Category */}
        {['warm', 'cool', 'neutral'].map((category, categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 + categoryIndex * 0.2 }}
          >
            <Box sx={{ mb: 6 }}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Typography 
                  variant="h3" 
                  sx={{ 
                    color: 'white', 
                    fontWeight: 800, 
                    mb: 4,
                    textAlign: 'center',
                    textTransform: 'capitalize',
                    textShadow: '3px 3px 6px rgba(0,0,0,0.4)',
                    fontSize: { xs: '2rem', md: '3rem' }
                  }}
                >
                  {category === 'warm' ? '🔥 Warm Colors' : 
                   category === 'cool' ? '❄️ Cool Colors' : 
                   '⚖️ Neutral Colors'}
                </Typography>
              </motion.div>
              
              <Grid container spacing={4} justifyContent="center">
                {getCategoryColors(category).map((color, index) => (
                  <Grid item xs={6} sm={4} md={3} lg={2.4} key={color.name}>
                    <MotionCard
                      initial={{ opacity: 0, scale: 0.7, rotateX: -20 }}
                      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 120
                      }}
                      whileHover={{ 
                        scale: 1.12,
                        y: -15,
                        rotateY: 8,
                        boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
                        transition: { duration: 0.3 }
                      }}
                      whileTap={{ scale: 0.95 }}
                      sx={{
                        height: 240,
                        cursor: 'pointer',
                        borderRadius: '30px',
                        overflow: 'hidden',
                        position: 'relative',
                        background: `linear-gradient(135deg, ${color.hex} 0%, ${color.hex}E6 50%, ${color.hex}CC 100%)`,
                        boxShadow: `0 15px 35px ${color.hex}40`,
                        border: selectedColor?.name === color.name 
                          ? '4px solid #FFD700' 
                          : '3px solid rgba(255,255,255,0.3)',
                        transform: 'perspective(1000px)',
                      }}
                      onClick={() => handleColorClick(color)}
                    >
                      {/* Enhanced Learned Indicator */}
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
                                top: 12,
                                right: 12,
                                zIndex: 3,
                                backgroundColor: '#4CAF50',
                                borderRadius: '50%',
                                width: 40,
                                height: 40,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '3px solid white',
                                boxShadow: '0 4px 16px rgba(76, 175, 80, 0.5)',
                              }}
                            >
                              <CheckCircleIcon sx={{ color: 'white', fontSize: '1.2rem' }} />
                            </Box>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Enhanced Shimmer Effect */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: '-100%',
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
                          animation: `shimmer-${index} 4s infinite`,
                          '@keyframes shimmer': {
                            '0%': { left: '-100%' },
                            '100%': { left: '100%' },
                          },
                        }}
                      />

                      {/* Floating Stars Animation */}
                      {learnedColors.has(color.name) && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            overflow: 'hidden',
                            pointerEvents: 'none',
                          }}
                        >
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              style={{
                                position: 'absolute',
                                fontSize: '1rem',
                                color: '#FFD700',
                                top: `${30 + i * 20}%`,
                                left: `${20 + i * 30}%`,
                              }}
                              animate={{
                                y: [0, -20, 0],
                                opacity: [0.5, 1, 0.5],
                                scale: [0.8, 1.2, 0.8],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.4,
                              }}
                            >
                              ⭐
                            </motion.div>
                          ))}
                        </Box>
                      )}
                      
                      <CardContent 
                        sx={{ 
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                          color: color.name === 'White' || color.name === 'Yellow' ? '#333' : 'white',
                          p: 3,
                          position: 'relative',
                          zIndex: 1,
                        }}
                      >
                        {/* Enhanced Emoji with Animation */}
                        <motion.div
                          animate={{
                            scale: [1, 1.15, 1],
                            rotate: [0, 8, -8, 0],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: index * 0.2,
                          }}
                        >
                          <Typography 
                            sx={{ 
                              fontSize: '3.5rem',
                              mb: 1.5,
                              filter: 'drop-shadow(3px 3px 8px rgba(0,0,0,0.5))',
                            }}
                          >
                            {color.emoji}
                          </Typography>
                        </motion.div>
                        
                        {/* Enhanced Color Name */}
                        <Typography 
                          variant="h4" 
                          component="div" 
                          sx={{
                            fontWeight: 900,
                            fontSize: { xs: '1.3rem', md: '1.6rem' },
                            textShadow: color.name === 'White' || color.name === 'Yellow' 
                              ? '2px 2px 6px rgba(0,0,0,0.5)' 
                              : '2px 2px 6px rgba(0,0,0,0.8)',
                            mb: 2,
                            letterSpacing: '-0.02em',
                          }}
                        >
                          {color.name}
                        </Typography>
                        
                        {/* Enhanced Audio Button */}
                        <motion.div 
                          whileHover={{ scale: 1.15 }} 
                          whileTap={{ scale: 0.9 }}
                        >
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation();
                              speakColor(color.name);
                            }}
                            sx={{
                              backgroundColor: 'rgba(255, 255, 255, 0.95)',
                              color: color.hex,
                              width: 44,
                              height: 44,
                              boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
                              border: '2px solid rgba(255,255,255,0.8)',
                              '&:hover': {
                                backgroundColor: 'white',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                              },
                            }}
                          >
                            <VolumeUpIcon fontSize="medium" />
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

        {/* Enhanced Selected Color Display */}
        <AnimatePresence>
          {selectedColor && (
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -60, scale: 0.8 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            >
              <Box
                sx={{
                  textAlign: 'center',
                  p: 6,
                  borderRadius: '40px',
                  background: `linear-gradient(135deg, ${selectedColor.hex}25 0%, rgba(255,255,255,0.95) 100%)`,
                  backdropFilter: 'blur(25px)',
                  boxShadow: `0 25px 60px ${selectedColor.hex}40`,
                  border: `4px solid ${selectedColor.hex}`,
                  mt: 6,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Enhanced Background Pattern */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0.08,
                    background: `radial-gradient(circle, ${selectedColor.hex} 2px, transparent 2px)`,
                    backgroundSize: '25px 25px',
                    animation: 'pulse 4s infinite',
                    '@keyframes pulse': {
                      '0%, 100%': { opacity: 0.08 },
                      '50%': { opacity: 0.15 },
                    }
                  }}
                />

                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Typography variant="h2" sx={{ 
                      color: selectedColor.hex, 
                      fontWeight: 900, 
                      mb: 3,
                      fontSize: { xs: '2.5rem', md: '4rem' },
                      textShadow: '3px 3px 8px rgba(0,0,0,0.2)',
                    }}>
                      {selectedColor.emoji} {selectedColor.name}!
                    </Typography>
                  </motion.div>
                  
                  <Typography variant="h5" sx={{ 
                    color: 'text.secondary', 
                    mb: 3,
                    fontStyle: 'italic',
                    fontSize: { xs: '1.2rem', md: '1.5rem' }
                  }}>
                    {selectedColor.description}
                  </Typography>

                  <AnimatePresence>
                    {showFunFact && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Box sx={{
                          backgroundColor: selectedColor.hex,
                          color: selectedColor.name === 'White' || selectedColor.name === 'Yellow' ? '#333' : 'white',
                          borderRadius: '20px',
                          py: 2,
                          px: 4,
                          mb: 4,
                          boxShadow: `0 8px 24px ${selectedColor.hex}50`,
                        }}>
                          <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            💡 Fun Fact: {selectedColor.funFact}
                          </Typography>
                        </Box>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Typography variant="h5" sx={{ 
                    color: 'text.primary', 
                    mb: 3,
                    fontWeight: 700,
                    fontSize: { xs: '1.3rem', md: '1.6rem' }
                  }}>
                    Tap to explore {selectedColor.name.toLowerCase()} things:
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
                    {selectedColor.examples.map((example, index) => {
                      const word = example.split(' ').slice(1).join(' ');
                      const exampleKey = `${selectedColor.name}-${word}`;
                      const isClicked = clickedExamples.has(exampleKey);
                      
                      return (
                        <motion.div
                          key={example}
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.15 }}
                          whileHover={{ 
                            scale: 1.08,
                            y: -8,
                            transition: { duration: 0.2 }
                          }}
                          whileTap={{ 
                            scale: 0.95,
                            transition: { duration: 0.1 }
                          }}
                        >
                          <Chip
                            label={example}
                            onClick={() => handleExampleClick(example, selectedColor.name)}
                            sx={{
                              backgroundColor: isClicked 
                                ? `${selectedColor.hex}DD` 
                                : selectedColor.hex,
                              color: selectedColor.name === 'White' || selectedColor.name === 'Yellow' ? '#333' : 'white',
                              fontWeight: 700,
                              fontSize: '1.1rem',
                              py: 3,
                              px: 2,
                              boxShadow: isClicked 
                                ? `0 8px 24px ${selectedColor.hex}60, 0 0 20px ${selectedColor.hex}40`
                                : `0 6px 20px ${selectedColor.hex}40`,
                              cursor: 'pointer',
                              position: 'relative',
                              overflow: 'visible',
                              border: isClicked ? '2px solid #FFD700' : 'none',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                backgroundColor: `${selectedColor.hex}EE`,
                                boxShadow: `0 10px 30px ${selectedColor.hex}60`,
                                transform: 'translateY(-4px)',
                              },
                              '&:active': {
                                transform: 'translateY(-2px)',
                              },
                              '& .MuiChip-label': { 
                                px: 3, 
                                py: 1,
                                position: 'relative',
                                zIndex: 1,
                              }
                            }}
                          />
                          
                          {/* Sparkle effect for clicked examples */}
                          <AnimatePresence>
                            {isClicked && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                style={{
                                  position: 'absolute',
                                  top: -10,
                                  right: -10,
                                  fontSize: '1.2rem',
                                  pointerEvents: 'none',
                                  zIndex: 10,
                                }}
                              >
                                <motion.div
                                  animate={{
                                    rotate: [0, 360],
                                    scale: [1, 1.2, 1],
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                  }}
                                >
                                  ⭐
                                </motion.div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                          
                          {/* Ripple effect on click */}
                          <AnimatePresence>
                            {isClicked && (
                              <motion.div
                                initial={{ scale: 0, opacity: 1 }}
                                animate={{ scale: 4, opacity: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6 }}
                                style={{
                                  position: 'absolute',
                                  top: '50%',
                                  left: '50%',
                                  transform: 'translate(-50%, -50%)',
                                  width: '20px',
                                  height: '20px',
                                  borderRadius: '50%',
                                  backgroundColor: selectedColor.hex,
                                  opacity: 0.6,
                                  pointerEvents: 'none',
                                  zIndex: 0,
                                }}
                              />
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </Box>
                  
                  {/* Exploration Encouragement */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: 'text.secondary', 
                        mt: 3,
                        fontStyle: 'italic',
                        fontSize: '1rem'
                      }}
                    >
                      {clickedExamples.size > 0 
                        ? `🎉 Great exploring! You've discovered ${Array.from(clickedExamples).filter(key => key.startsWith(selectedColor.name)).length} ${selectedColor.name.toLowerCase()} things!`
                        : '👆 Tap each example to hear its name and earn bonus stars!'
                      }
                    </Typography>
                  </motion.div>
                </Box>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Completion Celebration */}
        <AnimatePresence>
          {learnedColors.size === colors.length && (
            <motion.div
              initial={{ opacity: 0, scale: 0.3, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.3, y: -100 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            >
              <Box
                sx={{
                  textAlign: 'center',
                  p: 6,
                  mt: 6,
                  borderRadius: '35px',
                  background: 'linear-gradient(135deg, #FFD700 0%, #FF8844 50%, #FF6B6B 100%)',
                  color: 'white',
                  boxShadow: '0 30px 80px rgba(255, 215, 0, 0.5)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Celebration Particles */}
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    style={{
                      position: 'absolute',
                      fontSize: '1.5rem',
                      color: 'white',
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -50, 0],
                      opacity: [1, 0.5, 1],
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  >
                    {['🎉', '⭐', '🌟', '✨'][i % 4]}
                  </motion.div>
                ))}

                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Typography variant="h2" sx={{ 
                    fontWeight: 900, 
                    mb: 3,
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    textShadow: '3px 3px 8px rgba(0,0,0,0.3)',
                  }}>
                    🎉 Amazing! You're a Color Master! 🎉
                  </Typography>
                </motion.div>
                
                <Typography variant="h4" sx={{ 
                  mb: 3,
                  fontSize: { xs: '1.5rem', md: '2rem' }
                }}>
                  You've learned all {colors.length} colors! 🌈⭐
                </Typography>
                
                <Typography variant="h5" sx={{ 
                  fontWeight: 400,
                  opacity: 0.9 
                }}>
                  You earned {stars} stars total! Keep exploring! 🚀
                </Typography>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Floating Home Button */}
        <Link href="/dashboard" passHref>
          <motion.div
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            style={{
              position: 'fixed',
              bottom: 30,
              right: 30,
              zIndex: 1000,
            }}
          >
            <Fab
              sx={{
                width: 80,
                height: 80,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                boxShadow: '0 12px 40px rgba(102, 126, 234, 0.5)',
                border: '3px solid rgba(255,255,255,0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                  boxShadow: '0 16px 50px rgba(102, 126, 234, 0.7)',
                },
              }}
            >
              <HomeIcon sx={{ fontSize: '2rem' }} />
            </Fab>
          </motion.div>
        </Link>

        {/* Audio Error Snackbar */}
        <Snackbar
          open={audioError}
          autoHideDuration={4000}
          onClose={() => setAudioError(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert 
            severity="info" 
            onClose={() => setAudioError(false)}
            sx={{ 
              borderRadius: '15px',
              fontSize: '1rem',
              fontWeight: 600
            }}
          >
            🔊 Using text-to-speech for audio!
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}