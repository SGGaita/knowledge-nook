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
  Tooltip,
  Zoom,
} from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import HomeIcon from '@mui/icons-material/Home';
import CountCircleIcon from '@mui/icons-material/RadioButtonChecked';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Enhanced number data with more engaging content
const numbers = [
  { 
    number: 1, 
    word: 'One', 
    example: 'Apple', 
    emoji: '🍎', 
    items: ['🍎'], 
    color: '#FF6B6B', 
    audio: '/audio/one.mp3',
    backgroundColor: 'linear-gradient(135deg, #FF9A9E 0%, #FAD0C4 100%)'
  },
  { 
    number: 2, 
    word: 'Two', 
    example: 'Lions', 
    emoji: '🦁', 
    items: ['🦁', '🦁'], 
    color: '#4ECDC4', 
    audio: '/audio/two.mp3',
    backgroundColor: 'linear-gradient(135deg, #A1C4FD 0%, #C2E9FB 100%)'
  },
  { 
    number: 3, 
    word: 'Three', 
    example: 'Stars', 
    emoji: '⭐', 
    items: ['⭐', '⭐', '⭐'], 
    color: '#FFD93D', 
    audio: '/audio/three.mp3',
    backgroundColor: 'linear-gradient(135deg, #FFCC70 0%, #FFF6B7 100%)'
  },
  { 
    number: 4, 
    word: 'Four', 
    example: 'Flowers', 
    emoji: '🌸', 
    items: ['🌸', '🌸', '🌸', '🌸'], 
    color: '#FF8B8B', 
    audio: '/audio/four.mp3',
    backgroundColor: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)'
  },
  { 
    number: 5, 
    word: 'Five', 
    example: 'Balloons', 
    emoji: '🎈', 
    items: ['🎈', '🎈', '🎈', '🎈', '🎈'], 
    color: '#95E1D3', 
    audio: '/audio/five.mp3',
    backgroundColor: 'linear-gradient(135deg, #96DEDA 0%, #50C9C3 100%)'
  },
  { 
    number: 6, 
    word: 'Six', 
    example: 'Strawberries', 
    emoji: '🍓', 
    items: ['🍓', '🍓', '🍓', '🍓', '🍓', '🍓'], 
    color: '#A8E6CF', 
    audio: '/audio/six.mp3',
    backgroundColor: 'linear-gradient(135deg, #D4FC79 0%, #96E6A1 100%)'
  },
  { 
    number: 7, 
    word: 'Seven', 
    example: 'Rainbows', 
    emoji: '🌈', 
    items: ['🌈', '🌈', '🌈', '🌈', '🌈', '🌈', '🌈'], 
    color: '#DDA0DD', 
    audio: '/audio/seven.mp3',
    backgroundColor: 'linear-gradient(135deg, #E0C3FC 0%, #8EC5FC 100%)'
  },
  { 
    number: 8, 
    word: 'Eight', 
    example: 'Butterflies', 
    emoji: '🦋', 
    items: ['🦋', '🦋', '🦋', '🦋', '🦋', '🦋', '🦋', '🦋'], 
    color: '#F0E68C', 
    audio: '/audio/eight.mp3',
    backgroundColor: 'linear-gradient(135deg, #F6D365 0%, #FDA085 100%)'
  },
  { 
    number: 9, 
    word: 'Nine', 
    example: 'Sunflowers', 
    emoji: '🌻', 
    items: ['🌻', '🌻', '🌻', '🌻', '🌻', '🌻', '🌻', '🌻', '🌻'], 
    color: '#FFA07A', 
    audio: '/audio/nine.mp3',
    backgroundColor: 'linear-gradient(135deg, #FFAFBD 0%, #FFC3A0 100%)'
  },
  { 
    number: 10, 
    word: 'Ten', 
    example: 'Targets', 
    emoji: '🎯', 
    items: ['🎯', '🎯', '🎯', '🎯', '🎯', '🎯', '🎯', '🎯', '🎯', '🎯'], 
    color: '#87CEEB', 
    audio: '/audio/ten.mp3',
    backgroundColor: 'linear-gradient(135deg, #89F7FE 0%, #66A6FF 100%)'
  },
];

const MotionCard = motion(Card);
const MotionBox = motion(Box);
const MotionBadge = motion(Badge);

export default function NumbersPage() {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [audioError, setAudioError] = useState(false);
  const [countingMode, setCountingMode] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [animatingItems, setAnimatingItems] = useState([]);
  const audioRef = useRef(null);

  // Reset counting mode when navigating away
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleNumberClick = (numberObj) => {
    setSelectedNumber(numberObj);
    setCountingMode(true);
    setAnimatingItems([]);

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

    // Animate counting items one by one
    const animateItems = async () => {
      for (let i = 0; i < numberObj.items.length; i++) {
        setAnimatingItems(prev => [...prev, i]);
        // Speak each count with a delay
        if (i > 0) { // Don't speak on first item as the audio file is playing
          setTimeout(() => {
            if ('speechSynthesis' in window) {
              const utterance = new SpeechSynthesisUtterance(`${i + 1}`);
              utterance.rate = 0.7;
              utterance.volume = 0.5; // Lower volume for counting
              speechSynthesis.speak(utterance);
            }
          }, 300);
        }
        await new Promise(resolve => setTimeout(resolve, 600));
      }
    };

    animateItems();

    // Auto-hide counting mode after a delay
    setTimeout(() => setCountingMode(false), 8000);
  };

  const speakNumber = (numberObj) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Cancel any ongoing speech
      const utterance = new SpeechSynthesisUtterance(`${numberObj.number}. ${numberObj.word}. ${numberObj.example}`);
      utterance.rate = 0.6;
      utterance.pitch = 1.2;
      speechSynthesis.speak(utterance);
    }
  };

  const toggleTips = () => {
    setShowTips(prev => !prev);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
      py: 4,
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Decorative elements */}
      <Box sx={{ 
        position: 'absolute', 
        top: '5%', 
        left: '5%', 
        fontSize: '3rem', 
        animation: 'float 6s ease-in-out infinite',
        '@keyframes float': {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
          '100%': { transform: 'translateY(0px)' },
        }
      }}>
        1️⃣
      </Box>
      <Box sx={{ 
        position: 'absolute', 
        top: '15%', 
        right: '10%', 
        fontSize: '4rem',
        animation: 'float 8s ease-in-out infinite',
        '@keyframes float': {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-30px)' },
          '100%': { transform: 'translateY(0px)' },
        }
      }}>
        3️⃣
      </Box>
      <Box sx={{ 
        position: 'absolute', 
        bottom: '10%', 
        left: '15%', 
        fontSize: '5rem',
        animation: 'float 10s ease-in-out infinite',
        '@keyframes float': {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-25px)' },
          '100%': { transform: 'translateY(0px)' },
        }
      }}>
        7️⃣
      </Box>

      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography 
            variant="h2" 
            component={motion.h1}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            sx={{ 
              color: 'white', 
              fontWeight: 800,
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
              display: 'inline-block',
            }}
          >
            🔢 Numbers Wonderland 🔢
          </Typography>
          <Typography 
            variant="h6" 
            component={motion.p}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 0.9 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            sx={{ 
              color: 'white', 
              mt: 1,
              mb: 2,
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            Tap a card to count and learn numbers!
          </Typography>
          
          <Button 
            variant="contained" 
            color="secondary"
            startIcon={<HelpOutlineIcon />}
            onClick={toggleTips}
            sx={{ 
              mb: 3, 
              borderRadius: '20px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
            }}
          >
            {showTips ? 'Hide Tips' : 'Show Tips'}
          </Button>
          
          <AnimatePresence>
            {showTips && (
              <MotionBox
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                sx={{ 
                  background: 'rgba(255,255,255,0.9)', 
                  p: 3, 
                  borderRadius: 4,
                  mb: 4,
                  maxWidth: '800px',
                  mx: 'auto',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
                }}
              >
                <Typography variant="h6" sx={{ mb: 1, color: '#764ba2', fontWeight: 600 }}>
                  Learning Tips for Parents:
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  • Tap a number card to see and hear counting in action
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  • Each item appears one by one to help with counting
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  • Use the speaker button to hear the number again
                </Typography>
                <Typography>
                  • Practice counting along with your child as items appear
                </Typography>
              </MotionBox>
            )}
          </AnimatePresence>
        </Box>

        <Grid container spacing={3} justifyContent="center">
          {numbers.map((n, idx) => (
            <Grid item xs={6} sm={4} md={2.4} key={n.number}>
              <MotionBadge
                badgeContent={n.number}
                color="primary"
                overlap="circular"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                sx={{
                  '& .MuiBadge-badge': {
                    fontSize: '1.2rem',
                    height: '2rem',
                    minWidth: '2rem',
                    borderRadius: '50%',
                    fontWeight: 'bold',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                  },
                  width: '100%',
                }}
              >
                <MotionCard
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    y: 0,
                    transition: { delay: idx * 0.1, duration: 0.5 }
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNumberClick(n)}
                  sx={{
                    background: n.backgroundColor,
                    color: 'white',
                    height: 200,
                    borderRadius: 4,
                    textAlign: 'center',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    border: selectedNumber?.number === n.number ? '4px solid #FFD700' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
                  }}
                >
                  <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: '2.5rem', mb: 1 }}>{n.emoji}</Typography>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>{n.word}</Typography>
                      <Typography variant="body1" sx={{ opacity: 0.9, mb: 1 }}>{n.example}</Typography>
                    </Box>
                    <Tooltip title="Hear the number" arrow>
                      <IconButton 
                        onClick={(e) => { e.stopPropagation(); speakNumber(n); }}
                        sx={{ 
                          alignSelf: 'center',
                          background: 'rgba(255,255,255,0.3)',
                          '&:hover': { background: 'rgba(255,255,255,0.5)' },
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <VolumeUpIcon sx={{ color: 'white' }} />
                      </IconButton>
                    </Tooltip>
                  </CardContent>
                </MotionCard>
              </MotionBadge>
            </Grid>
          ))}
        </Grid>

        <AnimatePresence>
          {selectedNumber && countingMode && (
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              sx={{ 
                mt: 5, 
                textAlign: 'center', 
                background: 'white', 
                p: 4, 
                borderRadius: 6, 
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                position: 'relative',
                overflow: 'hidden',
                border: `4px solid ${selectedNumber.color}`,
              }}
            >
              <Typography 
                variant="h3" 
                sx={{ 
                  color: selectedNumber.color, 
                  mb: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2
                }}
              >
                <span style={{ fontSize: '2.5rem' }}>{selectedNumber.number}</span>
                <span style={{ fontSize: '2rem' }}>-</span>
                <span>{selectedNumber.word}</span>
                <span style={{ fontSize: '2rem' }}>-</span>
                <span>{selectedNumber.example}</span>
              </Typography>
              
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                flexWrap: 'wrap', 
                gap: 2,
                mb: 2
              }}>
                {selectedNumber.items.map((item, idx) => (
                  <Zoom 
                    in={animatingItems.includes(idx)} 
                    key={idx}
                    style={{ 
                      transitionDelay: `${idx * 100}ms`,
                    }}
                  >
                    <Typography 
                      component={motion.span}
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      sx={{ 
                        fontSize: '3rem',
                        display: 'inline-block',
                        filter: animatingItems.includes(idx) ? 'none' : 'grayscale(100%)',
                        opacity: animatingItems.includes(idx) ? 1 : 0.3,
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {item}
                    </Typography>
                  </Zoom>
                ))}
              </Box>
              
              <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
                Count along with me!
              </Typography>
            </MotionBox>
          )}
        </AnimatePresence>

        <Link href="/" passHref>
          <Fab 
            component={motion.button}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            sx={{ 
              position: 'fixed', 
              bottom: 24, 
              right: 24, 
              background: '#764ba2', 
              color: 'white',
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
            }}
          >
            <HomeIcon />
          </Fab>
        </Link>

        <Snackbar open={audioError} autoHideDuration={3000} onClose={() => setAudioError(false)}>
          <Alert severity="info">🔊 Using text-to-speech for pronunciation</Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
