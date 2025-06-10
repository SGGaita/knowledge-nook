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
  Badge,
  Button,
  LinearProgress,
  Chip,
  Divider,
} from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import SchoolIcon from '@mui/icons-material/School';
import QuizIcon from '@mui/icons-material/Quiz';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Enhanced family data with relationships, activities, and fun facts
const familyMembers = [
  { 
    name: 'Mom', 
    emoji: '👩', 
    audio: '/audio/mom.mp3',
    color: '#FF6B9D',
    relationship: 'Mother',
    age: 'Adult',
    backgroundColor: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)',
    activities: ['🍳 Cooking', '📚 Reading Stories', '🎵 Singing', '🤗 Hugging'],
    roles: ['👩‍🍳 Chef', '👩‍⚕️ Nurse', '👩‍🏫 Teacher', '💝 Caregiver'],
    funFact: 'Mom gives the best hugs and makes yummy food!',
    description: 'Mom takes care of everyone and loves us so much!'
  },
  { 
    name: 'Dad', 
    emoji: '👨', 
    audio: '/audio/dad.mp3',
    color: '#4A90E2',
    relationship: 'Father',
    age: 'Adult',
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    activities: ['🚗 Driving', '⚽ Playing Sports', '🔧 Fixing Things', '📖 Teaching'],
    roles: ['👨‍🔧 Fixer', '👨‍🏫 Teacher', '🚗 Driver', '🛡️ Protector'],
    funFact: 'Dad is super strong and knows how to fix everything!',
    description: 'Dad works hard and loves to play with us!'
  },
  { 
    name: 'Grandma', 
    emoji: '👵', 
    audio: '/audio/grandma.mp3',
    color: '#9B59B6',
    relationship: 'Grandmother',
    age: 'Elder',
    backgroundColor: 'linear-gradient(135deg, #E0C3FC 0%, #9BB5FF 100%)',
    activities: ['🧶 Knitting', '🍪 Baking Cookies', '📖 Telling Stories', '🌸 Gardening'],
    roles: ['👵 Storyteller', '🍪 Baker', '🧶 Crafter', '💖 Grandmother'],
    funFact: 'Grandma makes the best cookies and tells amazing stories!',
    description: 'Grandma is wise and full of love and stories!'
  },
  { 
    name: 'Grandpa', 
    emoji: '👴', 
    audio: '/audio/grandpa.mp3',
    color: '#E67E22',
    relationship: 'Grandfather',
    age: 'Elder',
    backgroundColor: 'linear-gradient(135deg, #F6D365 0%, #FDA085 100%)',
    activities: ['🎣 Fishing', '🌳 Gardening', '🔨 Building', '⚽ Playing Catch'],
    roles: ['👴 Wise Man', '🔨 Builder', '🎣 Fisherman', '💝 Grandfather'],
    funFact: 'Grandpa knows everything about nature and building!',
    description: 'Grandpa is patient and teaches us cool things!'
  },
  { 
    name: 'Sister', 
    emoji: '👧', 
    audio: '/audio/sister.mp3',
    color: '#F39C12',
    relationship: 'Sibling',
    age: 'Child',
    backgroundColor: 'linear-gradient(135deg, #FFCC70 0%, #FFF6B7 100%)',
    activities: ['🎨 Drawing', '🧸 Playing with Dolls', '💃 Dancing', '📚 Learning'],
    roles: ['🎨 Artist', '👭 Best Friend', '📚 Student', '💃 Dancer'],
    funFact: 'Sister loves to draw beautiful pictures and dance!',
    description: 'Sister is creative and loves to share and play!'
  },
  { 
    name: 'Brother', 
    emoji: '👦', 
    audio: '/audio/brother.mp3',
    color: '#27AE60',
    relationship: 'Sibling',
    age: 'Child',
    backgroundColor: 'linear-gradient(135deg, #96DEDA 0%, #50C9C3 100%)',
    activities: ['⚽ Soccer', '🚗 Playing with Cars', '🏃 Running', '🎮 Gaming'],
    roles: ['⚽ Athlete', '👬 Buddy', '📚 Student', '🎮 Gamer'],
    funFact: 'Brother is fast and loves all kinds of sports!',
    description: 'Brother is energetic and loves to run and play!'
  },
  { 
    name: 'Baby', 
    emoji: '👶', 
    audio: '/audio/baby.mp3',
    color: '#E91E63',
    relationship: 'Sibling',
    age: 'Baby',
    backgroundColor: 'linear-gradient(135deg, #FFAFBD 0%, #FFC3A0 100%)',
    activities: ['😴 Sleeping', '🍼 Drinking Milk', '😊 Smiling', '🧸 Playing'],
    roles: ['👶 Little One', '😴 Sleeper', '😊 Smiler', '💕 Joy Bringer'],
    funFact: 'Baby is the smallest and cutest member of our family!',
    description: 'Baby needs lots of love and care from everyone!'
  },
  { 
    name: 'Dog', 
    emoji: '🐕', 
    audio: '/audio/dog.mp3',
    color: '#8D6E63',
    relationship: 'Pet',
    age: 'Pet',
    backgroundColor: 'linear-gradient(135deg, #D4A574 0%, #E6B88A 100%)',
    activities: ['🦴 Playing Fetch', '🚶 Walking', '🛏️ Sleeping', '🥣 Eating'],
    roles: ['🐕 Best Friend', '🛡️ Guardian', '🎾 Player', '💖 Companion'],
    funFact: 'Our dog is loyal and loves to play fetch!',
    description: 'Dog is a loving pet who protects our family!'
  },
];

const MotionCard = motion(Card);
const MotionBox = motion(Box);

export default function FamilyPage() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [audioError, setAudioError] = useState(false);
  const [learnedMembers, setLearnedMembers] = useState(new Set());
  const [currentMode, setCurrentMode] = useState('explore'); // explore, learn, quiz
  const [showInfo, setShowInfo] = useState(false);
  const [stars, setStars] = useState(0);
  const [clickedActivities, setClickedActivities] = useState(new Set());
  const [clickedRoles, setClickedRoles] = useState(new Set());
  const audioRef = useRef(null);

  const progress = (learnedMembers.size / familyMembers.length) * 100;

  const handleMemberClick = (member) => {
    setSelectedMember(member);
    setLearnedMembers(prev => new Set([...prev, member.name]));
    setShowInfo(true);

    // Add stars for learning new family members
    if (!learnedMembers.has(member.name)) {
      setStars(prev => prev + 12);
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
    const audio = new Audio(member.audio);
    audioRef.current = audio;

    audio.play().catch(() => {
      setAudioError(true);
      speakMember(member);
    });
  };

  const handleActivityClick = (activity, member) => {
    const word = activity.split(' ').slice(1).join(' ');
    const activityKey = `${member.name}-${word}`;
    
    setClickedActivities(prev => new Set([...prev, activityKey]));
    setStars(prev => prev + 3);
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      speechSynthesis.speak(utterance);
    }
  };

  const handleRoleClick = (role, member) => {
    const word = role.split(' ').slice(1).join(' ');
    const roleKey = `${member.name}-${word}`;
    
    setClickedRoles(prev => new Set([...prev, roleKey]));
    setStars(prev => prev + 4);
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      speechSynthesis.speak(utterance);
    }
  };

  const speakMember = (member) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(`${member.name}. ${member.description}`);
      utterance.rate = 0.6;
      utterance.pitch = 1.2;
      speechSynthesis.speak(utterance);
    }
  };

  const getModeIcon = (mode) => {
    switch(mode) {
      case 'explore': return <FamilyRestroomIcon />;
      case 'learn': return <SchoolIcon />;
      case 'quiz': return <QuizIcon />;
      default: return <FamilyRestroomIcon />;
    }
  };

  const getModeTitle = (mode) => {
    switch(mode) {
      case 'explore': return 'Family Explorer';
      case 'learn': return 'Family Learning';
      case 'quiz': return 'Family Quiz';
      default: return 'Family Explorer';
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `
          radial-gradient(circle at 20% 80%, rgba(255, 107, 157, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(74, 144, 226, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(155, 89, 182, 0.25) 0%, transparent 50%),
          linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)
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
            width: `${40 + Math.random() * 60}px`,
            height: `${40 + Math.random() * 60}px`,
            borderRadius: '50%',
            background: `linear-gradient(135deg, 
              ${familyMembers[Math.floor(Math.random() * familyMembers.length)].color}30 0%, 
              transparent 70%)`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            zIndex: 0,
          }}
          animate={{
            x: [0, 50, -40, 0],
            y: [0, -40, 50, 0],
            scale: [1, 1.4, 0.6, 1],
            opacity: [0.3, 0.7, 0.2, 0.3],
          }}
          transition={{
            duration: 12 + Math.random() * 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Floating Family Emojis */}
      {familyMembers.slice(0, 6).map((member, i) => (
        <motion.div
          key={`particle-${i}`}
          style={{
            position: 'absolute',
            fontSize: '2.5rem',
            top: `${10 + i * 15}%`,
            right: `${5 + (i % 2) * 15}%`,
            zIndex: 0,
            opacity: 0.6,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.8,
          }}
        >
          {member.emoji}
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
                    color: '#ff9a9e',
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
                  y: [0, -10, 0],
                  scale: [1, 1.03, 1]
                }}
                transition={{ 
                  duration: 6, 
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
                  👨‍👩‍👧‍👦 Our Amazing Family! 👨‍👩‍👧‍👦
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
                Meet everyone who makes our family special!
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
                      {learnedMembers.size}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                      Family Learned
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
                    <Typography variant="h4" sx={{ color: '#FF6B9D', fontWeight: 800 }}>
                      {stars}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                      Love Hearts
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
                    <Typography variant="h4" sx={{ color: '#4A90E2', fontWeight: 800 }}>
                      {Math.round(progress)}%
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                      Family Bond
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
                      background: 'linear-gradient(90deg, #FF6B9D 0%, #4A90E2 25%, #9B59B6 50%, #E67E22 75%, #27AE60 100%)',
                      borderRadius: 6,
                      boxShadow: '0 4px 12px rgba(255,255,255,0.3)',
                    }
                  }}
                />
              </Box>
            </Box>

            {/* Love Hearts Display */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Badge badgeContent={stars} color="primary" max={999}>
                <Box sx={{
                  backgroundColor: 'rgba(255,107,157,0.9)',
                  borderRadius: '50%',
                  p: 1.5,
                  boxShadow: '0 8px 24px rgba(255,107,157,0.4)',
                }}>
                  <FavoriteIcon sx={{ fontSize: '2rem', color: 'white' }} />
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
                    color: currentMode === mode ? '#ff9a9e' : 'white',
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
              💝 Meet Your Family
            </Typography>
            <Typography variant="h6" sx={{ 
              color: 'rgba(255,255,255,0.95)',
              fontSize: { xs: '1rem', md: '1.2rem' },
              lineHeight: 1.6
            }}>
              Tap each family member to learn about their role, activities, and special qualities! 
              Discover all {familyMembers.length} family members and earn love hearts! 💖👨‍👩‍👧‍👦
            </Typography>
          </Box>
        </motion.div>

        {/* Enhanced Family Members Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Grid container spacing={4} justifyContent="center">
            {familyMembers.map((member, index) => (
              <Grid item xs={6} sm={4} md={3} key={member.name}>
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
                    scale: 1.08,
                    y: -12,
                    rotateY: 5,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  sx={{
                    height: 280,
                    cursor: 'pointer',
                    borderRadius: '30px',
                    overflow: 'hidden',
                    position: 'relative',
                    background: member.backgroundColor,
                    boxShadow: `0 15px 35px ${member.color}40`,
                    border: selectedMember?.name === member.name 
                      ? '4px solid #FFD700' 
                      : '3px solid rgba(255,255,255,0.3)',
                    transform: 'perspective(1000px)',
                  }}
                  onClick={() => handleMemberClick(member)}
                >
                  {/* Enhanced Learned Indicator */}
                  <AnimatePresence>
                    {learnedMembers.has(member.name) && (
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

                  {/* Floating Hearts Animation */}
                  {learnedMembers.has(member.name) && (
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
                            fontSize: '1.2rem',
                            color: '#FF6B9D',
                            top: `${30 + i * 20}%`,
                            left: `${20 + i * 30}%`,
                          }}
                          animate={{
                            y: [0, -25, 0],
                            opacity: [0.5, 1, 0.5],
                            scale: [0.8, 1.3, 0.8],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            delay: i * 0.5,
                          }}
                        >
                          💖
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
                          fontSize: '4rem',
                          mb: 2,
                          filter: 'drop-shadow(3px 3px 8px rgba(0,0,0,0.5))',
                        }}
                      >
                        {member.emoji}
                      </Typography>
                    </motion.div>
                    
                    {/* Enhanced Family Member Name */}
                    <Typography 
                      variant="h4" 
                      component="div" 
                      sx={{
                        fontWeight: 900,
                        fontSize: { xs: '1.4rem', md: '1.8rem' },
                        textShadow: '2px 2px 6px rgba(0,0,0,0.8)',
                        mb: 1,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {member.name}
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
                      {member.relationship}
                    </Typography>

                    {/* Enhanced Age Badge */}
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: index * 0.2,
                      }}
                    >
                      <Box sx={{
                        background: 'rgba(255,255,255,0.9)',
                        color: member.color,
                        borderRadius: '15px',
                        px: 2,
                        py: 0.5,
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        mb: 2,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                      }}>
                        {member.age}
                      </Box>
                    </motion.div>
                    
                    {/* Enhanced Audio Button */}
                    <motion.div 
                      whileHover={{ scale: 1.15 }} 
                      whileTap={{ scale: 0.9 }}
                    >
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          speakMember(member);
                        }}
                        sx={{
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          color: member.color,
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

        {/* Enhanced Interactive Family Member Display */}
        <AnimatePresence>
          {selectedMember && showInfo && (
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
                  background: `linear-gradient(135deg, ${selectedMember.color}25 0%, rgba(255,255,255,0.95) 100%)`,
                  backdropFilter: 'blur(25px)',
                  boxShadow: `0 25px 60px ${selectedMember.color}40`,
                  border: `4px solid ${selectedMember.color}`,
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
                    background: `radial-gradient(circle, ${selectedMember.color} 2px, transparent 2px)`,
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
                      color: selectedMember.color, 
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
                      <span style={{ fontSize: '3rem' }}>{selectedMember.emoji}</span>
                      <span>{selectedMember.name}</span>
                      <span style={{ fontSize: '2rem' }}>-</span>
                      <span>{selectedMember.relationship}</span>
                    </Typography>
                  </motion.div>

                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Box sx={{
                        backgroundColor: selectedMember.color,
                        color: 'white',
                        borderRadius: '20px',
                        py: 2,
                        px: 4,
                        mb: 4,
                        boxShadow: `0 8px 24px ${selectedMember.color}50`,
                      }}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          💡 Fun Fact: {selectedMember.funFact}
                        </Typography>
                      </Box>
                    </motion.div>
                  </AnimatePresence>
                  
                  <Typography variant="h5" sx={{ 
                    color: 'text.primary', 
                    mb: 4,
                    fontWeight: 700,
                    fontSize: { xs: '1.3rem', md: '1.6rem' }
                  }}>
                    {selectedMember.description}
                  </Typography>

                  <Divider sx={{ my: 4, backgroundColor: selectedMember.color, height: 2 }} />

                  <Typography variant="h5" sx={{ 
                    color: 'text.primary', 
                    mb: 3,
                    fontWeight: 700,
                    fontSize: { xs: '1.3rem', md: '1.6rem' }
                  }}>
                    🎯 Activities {selectedMember.name} loves:
                  </Typography>

                  {/* Clickable Activities */}
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap', mb: 4 }}>
                    {selectedMember.activities.map((activity, index) => {
                      const word = activity.split(' ').slice(1).join(' ');
                      const activityKey = `${selectedMember.name}-${word}`;
                      const isClicked = clickedActivities.has(activityKey);
                      
                      return (
                        <motion.div
                          key={activity}
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
                            label={activity}
                            onClick={() => handleActivityClick(activity, selectedMember)}
                            sx={{
                              backgroundColor: isClicked 
                                ? `${selectedMember.color}DD` 
                                : selectedMember.color,
                              color: 'white',
                              fontWeight: 700,
                              fontSize: '1.1rem',
                              py: 3,
                              px: 2,
                              boxShadow: isClicked 
                                ? `0 8px 24px ${selectedMember.color}60, 0 0 20px ${selectedMember.color}40`
                                : `0 6px 20px ${selectedMember.color}40`,
                              cursor: 'pointer',
                              position: 'relative',
                              overflow: 'visible',
                              border: isClicked ? '2px solid #FFD700' : 'none',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                backgroundColor: `${selectedMember.color}EE`,
                                boxShadow: `0 10px 30px ${selectedMember.color}60`,
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
                          
                          {/* Heart effect for clicked activities */}
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
                                    scale: [1, 1.2, 1],
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                  }}
                                >
                                  💖
                                </motion.div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </Box>

                  <Divider sx={{ my: 4, backgroundColor: selectedMember.color, height: 2 }} />

                  <Typography variant="h5" sx={{ 
                    color: 'text.primary', 
                    mb: 3,
                    fontWeight: 700,
                    fontSize: { xs: '1.3rem', md: '1.6rem' }
                  }}>
                    👔 Special roles {selectedMember.name} has:
                  </Typography>

                  {/* Clickable Roles */}
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
                    {selectedMember.roles.map((role, index) => {
                      const word = role.split(' ').slice(1).join(' ');
                      const roleKey = `${selectedMember.name}-${word}`;
                      const isClicked = clickedRoles.has(roleKey);
                      
                      return (
                        <motion.div
                          key={role}
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
                            label={role}
                            onClick={() => handleRoleClick(role, selectedMember)}
                            sx={{
                              backgroundColor: isClicked 
                                ? `${selectedMember.color}DD` 
                                : `${selectedMember.color}BB`,
                              color: 'white',
                              fontWeight: 700,
                              fontSize: '1.1rem',
                              py: 3,
                              px: 2,
                              boxShadow: isClicked 
                                ? `0 8px 24px ${selectedMember.color}60, 0 0 20px ${selectedMember.color}40`
                                : `0 6px 20px ${selectedMember.color}40`,
                              cursor: 'pointer',
                              position: 'relative',
                              overflow: 'visible',
                              border: isClicked ? '3px solid #FFD700' : 'none',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                backgroundColor: `${selectedMember.color}EE`,
                                boxShadow: `0 10px 30px ${selectedMember.color}60`,
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
                          
                          {/* Special heart effect for clicked roles */}
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
                                    scale: [1, 1.3, 1],
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                  }}
                                >
                                  💖
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
                        mt: 4,
                        fontStyle: 'italic',
                        fontSize: '1.1rem'
                      }}
                    >
                      {(clickedActivities.size > 0 || clickedRoles.size > 0) 
                        ? `🎉 Wonderful! You're learning so much about ${selectedMember.name}! Keep exploring!`
                        : '👆 Tap each activity and role to learn more and earn love hearts!'
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
          {learnedMembers.size === familyMembers.length && (
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
                  background: 'linear-gradient(135deg, #FF6B9D 0%, #4A90E2 50%, #9B59B6 100%)',
                  color: 'white',
                  boxShadow: '0 30px 80px rgba(255, 107, 157, 0.5)',
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
                    {['🎉', '💖', '👨‍👩‍👧‍👦', '✨', '🌟'][i % 5]}
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
                    🎉 Amazing! You Know Your Whole Family! 🎉
                  </Typography>
                </motion.div>
                
                <Typography variant="h4" sx={{ 
                  mb: 3,
                  fontSize: { xs: '1.5rem', md: '2rem' }
                }}>
                  You've learned about all {familyMembers.length} family members! 👨‍👩‍👧‍👦💖
                </Typography>
                
                <Typography variant="h5" sx={{ 
                  fontWeight: 400,
                  opacity: 0.9 
                }}>
                  You earned {stars} love hearts! Family is the most important! 🏠💕
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
                background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
                color: 'white',
                boxShadow: '0 12px 40px rgba(255, 154, 158, 0.5)',
                border: '3px solid rgba(255,255,255,0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #ff8a95 0%, #fdbde6 100%)',
                  boxShadow: '0 16px 50px rgba(255, 154, 158, 0.7)',
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