'use client'

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
  Badge,
  Button,
  LinearProgress,
  Chip,
} from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CalculateIcon from '@mui/icons-material/Calculate';
import SchoolIcon from '@mui/icons-material/School';
import QuizIcon from '@mui/icons-material/Quiz';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Enhanced number data with more engaging content and fun facts
const numbers = [
  { 
    number: 1, 
    word: 'One', 
    example: 'Apple', 
    emoji: '🍎', 
    items: ['🍎'], 
    color: '#FF6B6B',
    audio: '/audio/one.mp3',
    funFact: 'One is the first counting number!',
    backgroundColor: 'linear-gradient(135deg, #FF9A9E 0%, #FAD0C4 100%)',
    examples: ['🍎 Apple', '👶 Baby', '🌙 Moon', '☀️ Sun']
  },
  { 
    number: 2, 
    word: 'Two', 
    example: 'Eyes', 
    emoji: '👀', 
    items: ['👁️', '👁️'], 
    color: '#4ECDC4',
    audio: '/audio/two.mp3',
    funFact: 'Two eyes help us see the world!',
    backgroundColor: 'linear-gradient(135deg, #A1C4FD 0%, #C2E9FB 100%)',
    examples: ['👀 Eyes', '🦋 Wings', '👂 Ears', '👐 Hands']
  },
  { 
    number: 3, 
    word: 'Three', 
    example: 'Bears', 
    emoji: '🐻', 
    items: ['🐻', '🐻', '🐻'], 
    color: '#FFD93D',
    audio: '/audio/three.mp3',
    funFact: 'Three bears in the fairy tale!',
    backgroundColor: 'linear-gradient(135deg, #FFCC70 0%, #FFF6B7 100%)',
    examples: ['🐻 Bears', '🚦 Traffic Light', '🍀 Clover', '🎪 Circus']
  },
  { 
    number: 4, 
    word: 'Four', 
    example: 'Wheels', 
    emoji: '🚗', 
    items: ['⚫', '⚫', '⚫', '⚫'], 
    color: '#FF8B8B',
    audio: '/audio/four.mp3',
    funFact: 'Cars have four wheels to roll!',
    backgroundColor: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)',
    examples: ['🚗 Car Wheels', '🐕 Dog Legs', '🍀 Four-Leaf Clover', '📱 Phone Corners']
  },
  { 
    number: 5, 
    word: 'Five', 
    example: 'Fingers', 
    emoji: '✋', 
    items: ['👆', '👆', '👆', '👆', '👆'], 
    color: '#95E1D3',
    audio: '/audio/five.mp3',
    funFact: 'Five fingers on each hand!',
    backgroundColor: 'linear-gradient(135deg, #96DEDA 0%, #50C9C3 100%)',
    examples: ['✋ Fingers', '⭐ Star Points', '🌸 Petals', '🏠 House Points']
  },
  { 
    number: 6, 
    word: 'Six', 
    example: 'Legs', 
    emoji: '🐛', 
    items: ['🦵', '🦵', '🦵', '🦵', '🦵', '🦵'], 
    color: '#A8E6CF',
    audio: '/audio/six.mp3',
    funFact: 'Insects have six legs to walk!',
    backgroundColor: 'linear-gradient(135deg, #D4FC79 0%, #96E6A1 100%)',
    examples: ['🐛 Bug Legs', '❄️ Snowflake', '🎲 Dice Dots', '🏀 Basketball Team']
  },
  { 
    number: 7, 
    word: 'Seven', 
    example: 'Rainbow', 
    emoji: '🌈', 
    items: ['🟥', '🟧', '🟨', '🟩', '🟦', '🟪', '🟫'], 
    color: '#DDA0DD',
    audio: '/audio/seven.mp3',
    funFact: 'Seven colors in a rainbow!',
    backgroundColor: 'linear-gradient(135deg, #E0C3FC 0%, #8EC5FC 100%)',
    examples: ['🌈 Rainbow Colors', '📅 Week Days', '🎵 Music Notes', '🌟 Lucky Number']
  },
  { 
    number: 8, 
    word: 'Eight', 
    example: 'Octopus', 
    emoji: '🐙', 
    items: ['🐾', '🐾', '🐾', '🐾', '🐾', '🐾', '🐾', '🐾'], 
    color: '#F0E68C',
    audio: '/audio/eight.mp3',
    funFact: 'Octopus has eight arms!',
    backgroundColor: 'linear-gradient(135deg, #F6D365 0%, #FDA085 100%)',
    examples: ['🐙 Octopus Arms', '🕷️ Spider Legs', '🎱 Pool Ball', '♾️ Infinity Symbol']
  },
  { 
    number: 9, 
    word: 'Nine', 
    example: 'Planets', 
    emoji: '🪐', 
    items: ['🌍', '🪐', '🌟', '🌙', '☄️', '🛸', '🚀', '⭐', '🌌'], 
    color: '#FFA07A',
    audio: '/audio/nine.mp3',
    funFact: 'Nine planets in our solar system!',
    backgroundColor: 'linear-gradient(135deg, #FFAFBD 0%, #FFC3A0 100%)',
    examples: ['🪐 Planets', '🏀 Baseball Team', '🎯 Dartboard', '📱 Phone Keypad']
  },
  { 
    number: 10, 
    word: 'Ten', 
    example: 'Toes', 
    emoji: '🦶', 
    items: ['👶', '👶', '👶', '👶', '👶', '👶', '👶', '👶', '👶', '👶'], 
    color: '#87CEEB',
    audio: '/audio/ten.mp3',
    funFact: 'Ten toes to wiggle and walk!',
    backgroundColor: 'linear-gradient(135deg, #89F7FE 0%, #66A6FF 100%)',
    examples: ['🦶 Toes', '🔢 Complete Set', '💯 Perfect Score', '🏆 Top Achievement']
  },
];

const MotionCard = motion(Card);
const MotionBox = motion(Box);

export default function NumbersPage() {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [audioError, setAudioError] = useState(false);
  const [countingMode, setCountingMode] = useState(false);
  const [learnedNumbers, setLearnedNumbers] = useState(new Set());
  const [currentMode, setCurrentMode] = useState('explore'); // explore, learn, quiz
  const [showFunFact, setShowFunFact] = useState(false);
  const [stars, setStars] = useState(0);
  const [animatingItems, setAnimatingItems] = useState([]);
  const [clickedExamples, setClickedExamples] = useState(new Set());
  const audioRef = useRef(null);

  const progress = (learnedNumbers.size / numbers.length) * 100;

  const handleNumberClick = (numberObj) => {
    setSelectedNumber(numberObj);
    setLearnedNumbers(prev => new Set([...prev, numberObj.number]));
    setCountingMode(true);
    setShowFunFact(true);
    setAnimatingItems([]);

    // Add stars for learning new numbers
    if (!learnedNumbers.has(numberObj.number)) {
      setStars(prev => prev + 15);
    }

    // Stop any playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    // Try to play the audio file
    const audio = new Audio(numberObj.audio);
    audioRef.current = audio;

    audio.play().catch(() => {
      setAudioError(true);
      speakNumber(numberObj);
    });

    // Enhanced counting animation
    const animateItems = async () => {
      for (let i = 0; i < numberObj.items.length; i++) {
        setAnimatingItems(prev => [...prev, i]);
        setTimeout(() => {
          if ('speechSynthesis' in window && i > 0) {
            const utterance = new SpeechSynthesisUtterance(`${i + 1}`);
            utterance.rate = 0.8;
            utterance.volume = 0.6;
            speechSynthesis.speak(utterance);
          }
        }, 400);
        await new Promise(resolve => setTimeout(resolve, 800));
      }
    };

    animateItems();
    setTimeout(() => setCountingMode(false), 12000);
  };

  const handleExampleClick = (example, numberObj) => {
    const word = example.split(' ').slice(1).join(' ');
    const exampleKey = `${numberObj.number}-${word}`;
    
    setClickedExamples(prev => new Set([...prev, exampleKey]));
    setStars(prev => prev + 3);
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      speechSynthesis.speak(utterance);
    }
  };

  const speakNumber = (numberObj) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(`${numberObj.number}. ${numberObj.word}. ${numberObj.example}`);
      utterance.rate = 0.6;
      utterance.pitch = 1.2;
      speechSynthesis.speak(utterance);
    }
  };

  const getModeIcon = (mode) => {
    switch(mode) {
      case 'explore': return <CalculateIcon />;
      case 'learn': return <SchoolIcon />;
      case 'quiz': return <QuizIcon />;
      default: return <CalculateIcon />;
    }
  };

  const getModeTitle = (mode) => {
    switch(mode) {
      case 'explore': return 'Free Counting';
      case 'learn': return 'Guided Learning';
      case 'quiz': return 'Number Quiz';
      default: return 'Free Counting';
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `
          radial-gradient(circle at 20% 80%, rgba(255, 107, 107, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(78, 205, 196, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(255, 217, 61, 0.25) 0%, transparent 50%),
          linear-gradient(135deg, #667eea 0%, #764ba2 50%, #ff9a9e 100%)
        `,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Enhanced Animated Background Elements */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`bg-element-${i}`}
          style={{
            position: 'absolute',
            width: `${40 + Math.random() * 50}px`,
            height: `${40 + Math.random() * 50}px`,
            borderRadius: '50%',
            background: `linear-gradient(135deg, 
              ${numbers[Math.floor(Math.random() * numbers.length)].color}40 0%, 
              transparent 70%)`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            zIndex: 0,
          }}
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -30, 40, 0],
            scale: [1, 1.3, 0.7, 1],
            opacity: [0.4, 0.8, 0.3, 0.4],
          }}
          transition={{
            duration: 10 + Math.random() * 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 4,
          }}
        />
      ))}

      {/* Floating Number Particles */}
      {numbers.slice(0, 5).map((number, i) => (
        <motion.div
          key={`particle-${i}`}
          style={{
            position: 'absolute',
            fontSize: '2rem',
            top: `${15 + i * 18}%`,
            right: `${8 + (i % 2) * 12}%`,
            zIndex: 0,
            fontWeight: 'bold',
            color: 'rgba(255,255,255,0.7)',
          }}
          animate={{
            y: [0, -25, 0],
            rotate: [0, 360],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.7,
          }}
        >
          {number.number}
        </motion.div>
      ))}

      <Container maxSize="xl" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
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
                  🔢 Numbers Universe! 🔢
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
                Count, learn, and explore amazing numbers!
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
                      {learnedNumbers.size}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                      Numbers Learned
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
                      background: 'linear-gradient(90deg, #FF6B6B 0%, #4ECDC4 25%, #FFD93D 50%, #95E1D3 75%, #DDA0DD 100%)',
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
              🎯 How to Count
            </Typography>
            <Typography variant="h6" sx={{ 
              color: 'rgba(255,255,255,0.95)',
              fontSize: { xs: '1rem', md: '1.2rem' },
              lineHeight: 1.6
            }}>
              Tap any number card to see magical counting animations! 
              Learn all {numbers.length} numbers and earn shiny stars! ✨🔢
            </Typography>
          </Box>
        </motion.div>

        {/* Enhanced Numbers Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Grid container spacing={4} justifyContent="center">
            {numbers.map((numberObj, index) => (
              <Grid item xs={6} sm={4} md={2.4} key={numberObj.number}>
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
                    height: 260,
                    cursor: 'pointer',
                    borderRadius: '30px',
                    overflow: 'hidden',
                    position: 'relative',
                    background: numberObj.backgroundColor,
                    boxShadow: `0 15px 35px ${numberObj.color}40`,
                    border: selectedNumber?.number === numberObj.number 
                      ? '4px solid #FFD700' 
                      : '3px solid rgba(255,255,255,0.3)',
                    transform: 'perspective(1000px)',
                  }}
                  onClick={() => handleNumberClick(numberObj)}
                >
                  {/* Enhanced Learned Indicator */}
                  <AnimatePresence>
                    {learnedNumbers.has(numberObj.number) && (
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
                  {learnedNumbers.has(numberObj.number) && (
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
                      color: 'white',
                      p: 3,
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    {/* Enhanced Number Badge */}
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: index * 0.2,
                      }}
                    >
                      <Box sx={{
                        background: 'rgba(255,255,255,0.9)',
                        color: numberObj.color,
                        borderRadius: '50%',
                        width: 60,
                        height: 60,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        fontWeight: 900,
                        mb: 2,
                        boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
                      }}>
                        {numberObj.number}
                      </Box>
                    </motion.div>

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
                        delay: index * 0.3,
                      }}
                    >
                      <Typography 
                        sx={{ 
                          fontSize: '3rem',
                          mb: 1.5,
                          filter: 'drop-shadow(3px 3px 8px rgba(0,0,0,0.5))',
                        }}
                      >
                        {numberObj.emoji}
                      </Typography>
                    </motion.div>
                    
                    {/* Enhanced Number Word */}
                    <Typography 
                      variant="h4" 
                      component="div" 
                      sx={{
                        fontWeight: 900,
                        fontSize: { xs: '1.3rem', md: '1.6rem' },
                        textShadow: '2px 2px 6px rgba(0,0,0,0.8)',
                        mb: 1,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {numberObj.word}
                    </Typography>

                    <Typography 
                      variant="body1" 
                      sx={{
                        fontSize: '1rem',
                        opacity: 0.9,
                        mb: 2,
                        textShadow: '1px 1px 3px rgba(0,0,0,0.7)',
                      }}
                    >
                      {numberObj.example}
                    </Typography>
                    
                    {/* Enhanced Audio Button */}
                    <motion.div 
                      whileHover={{ scale: 1.15 }} 
                      whileTap={{ scale: 0.9 }}
                    >
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          speakNumber(numberObj);
                        }}
                        sx={{
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          color: numberObj.color,
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
        </motion.div>

        {/* Enhanced Interactive Counting Display */}
        <AnimatePresence>
          {selectedNumber && countingMode && (
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
                  background: `linear-gradient(135deg, ${selectedNumber.color}25 0%, rgba(255,255,255,0.95) 100%)`,
                  backdropFilter: 'blur(25px)',
                  boxShadow: `0 25px 60px ${selectedNumber.color}40`,
                  border: `4px solid ${selectedNumber.color}`,
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
                    background: `radial-gradient(circle, ${selectedNumber.color} 2px, transparent 2px)`,
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
                      color: selectedNumber.color, 
                      fontWeight: 900, 
                      mb: 3,
                      fontSize: { xs: '2.5rem', md: '4rem' },
                      textShadow: '3px 3px 8px rgba(0,0,0,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 2,
                      flexWrap: 'wrap'
                    }}>
                      <span style={{ fontSize: '3rem' }}>{selectedNumber.number}</span>
                      <span style={{ fontSize: '2rem' }}>-</span>
                      <span>{selectedNumber.word}</span>
                      <span style={{ fontSize: '2rem' }}>-</span>
                      <span>{selectedNumber.example}</span>
                    </Typography>
                  </motion.div>

                  <AnimatePresence>
                    {showFunFact && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Box sx={{
                          backgroundColor: selectedNumber.color,
                          color: 'white',
                          borderRadius: '20px',
                          py: 2,
                          px: 4,
                          mb: 4,
                          boxShadow: `0 8px 24px ${selectedNumber.color}50`,
                        }}>
                          <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            💡 Fun Fact: {selectedNumber.funFact}
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
                    Watch me count {selectedNumber.word.toLowerCase()}!
                  </Typography>

                  {/* Enhanced Counting Animation */}
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    flexWrap: 'wrap', 
                    gap: 3,
                    mb: 4,
                    minHeight: '80px',
                    alignItems: 'center'
                  }}>
                    {selectedNumber.items.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: animatingItems.includes(idx) ? 1 : 0.3,
                          scale: animatingItems.includes(idx) ? 1 : 0.7,
                        }}
                        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                        whileHover={{ scale: 1.3, rotate: 15 }}
                      >
                        <Typography 
                          sx={{ 
                            fontSize: '2.5rem',
                            display: 'inline-block',
                            filter: animatingItems.includes(idx) ? 'none' : 'grayscale(100%)',
                            transform: animatingItems.includes(idx) ? 'scale(1.1)' : 'scale(1)',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                          }}
                        >
                          {item}
                        </Typography>
                      </motion.div>
                    ))}
                  </Box>

                  <Typography variant="h5" sx={{ 
                    color: 'text.primary', 
                    mb: 3,
                    fontWeight: 700,
                    fontSize: { xs: '1.3rem', md: '1.6rem' }
                  }}>
                    Tap to explore {selectedNumber.word.toLowerCase()} examples:
                  </Typography>

                  {/* Clickable Examples */}
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
                    {selectedNumber.examples.map((example, index) => {
                      const word = example.split(' ').slice(1).join(' ');
                      const exampleKey = `${selectedNumber.number}-${word}`;
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
                            onClick={() => handleExampleClick(example, selectedNumber)}
                            sx={{
                              backgroundColor: isClicked 
                                ? `${selectedNumber.color}DD` 
                                : selectedNumber.color,
                              color: 'white',
                              fontWeight: 700,
                              fontSize: '1.1rem',
                              py: 3,
                              px: 2,
                              boxShadow: isClicked 
                                ? `0 8px 24px ${selectedNumber.color}60, 0 0 20px ${selectedNumber.color}40`
                                : `0 6px 20px ${selectedNumber.color}40`,
                              cursor: 'pointer',
                              position: 'relative',
                              overflow: 'visible',
                              border: isClicked ? '2px solid #FFD700' : 'none',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                backgroundColor: `${selectedNumber.color}EE`,
                                boxShadow: `0 10px 30px ${selectedNumber.color}60`,
                                transform: 'translateY(-4px)',
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
                        ? `🎉 Amazing counting! You've explored ${Array.from(clickedExamples).filter(key => key.startsWith(selectedNumber.number)).length} examples!`
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
          {learnedNumbers.size === numbers.length && (
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
                {[...Array(25)].map((_, i) => (
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
                    {['🎉', '⭐', '🌟', '✨', '🔢'][i % 5]}
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
                    🎉 Incredible! You're a Number Master! 🎉
                  </Typography>
                </motion.div>
                
                <Typography variant="h4" sx={{ 
                  mb: 3,
                  fontSize: { xs: '1.5rem', md: '2rem' }
                }}>
                  You've mastered all {numbers.length} numbers! 🔢⭐
                </Typography>
                
                <Typography variant="h5" sx={{ 
                  fontWeight: 400,
                  opacity: 0.9 
                }}>
                  You earned {stars} stars total! Keep counting and exploring! 🚀
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
