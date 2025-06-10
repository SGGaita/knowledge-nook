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
  Tabs,
  Tab,
} from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import KitchenIcon from '@mui/icons-material/Kitchen';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Enhanced foods data with nutritional info, fun facts, and interactive elements
const foods = {
  fruits: [
    { 
      name: 'Apple', 
      emoji: '🍎', 
      audio: '/audio/apple.mp3',
      color: '#E53E3E',
      backgroundColor: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)',
      nutritionalBenefits: ['🦷 Good for teeth', '💪 Vitamin C', '🫀 Heart healthy', '🧠 Brain food'],
      funFact: 'Apples float in water because they are 25% air!',
      description: 'Crunchy, sweet apples are perfect for snacking!',
      category: 'Sweet',
      season: 'Fall',
      taste: 'Sweet & Crispy'
    },
    { 
      name: 'Banana', 
      emoji: '🍌', 
      audio: '/audio/banana.mp3',
      color: '#F6E05E',
      backgroundColor: 'linear-gradient(135deg, #F6E05E 0%, #FBBF24 100%)',
      nutritionalBenefits: ['🏃 Energy boost', '🍌 Potassium', '😊 Happy vitamins', '💪 Muscle health'],
      funFact: 'Bananas are berries, but strawberries are not!',
      description: 'Sweet, soft bananas give you lots of energy!',
      category: 'Tropical',
      season: 'Year-round',
      taste: 'Sweet & Creamy'
    },
    { 
      name: 'Orange', 
      emoji: '🍊', 
      audio: '/audio/orange.mp3',
      color: '#FB923C',
      backgroundColor: 'linear-gradient(135deg, #FB923C 0%, #F97316 100%)',
      nutritionalBenefits: ['🍊 Vitamin C', '💧 Hydrating', '🛡️ Immune boost', '✨ Glowing skin'],
      funFact: 'Oranges are actually green when ripe in tropical countries!',
      description: 'Juicy oranges are packed with vitamin C!',
      category: 'Citrus',
      season: 'Winter',
      taste: 'Sweet & Tangy'
    },
    { 
      name: 'Strawberry', 
      emoji: '🍓', 
      audio: '/audio/strawberry.mp3',
      color: '#F56565',
      backgroundColor: 'linear-gradient(135deg, #F56565 0%, #FC8181 100%)',
      nutritionalBenefits: ['🍓 Antioxidants', '❤️ Heart healthy', '🌟 Vitamin C', '😊 Mood booster'],
      funFact: 'Strawberries are the only fruit with seeds on the outside!',
      description: 'Sweet, red strawberries are summer treats!',
      category: 'Berry',
      season: 'Summer',
      taste: 'Sweet & Juicy'
    },
    { 
      name: 'Grapes', 
      emoji: '🍇', 
      audio: '/audio/grapes.mp3',
      color: '#9F7AEA',
      backgroundColor: 'linear-gradient(135deg, #9F7AEA 0%, #B794F6 100%)',
      nutritionalBenefits: ['🍇 Antioxidants', '🧠 Brain health', '💪 Energy', '💧 Hydrating'],
      funFact: 'Grapes explode when you put them in the microwave!',
      description: 'Tiny, sweet grapes are fun to pop in your mouth!',
      category: 'Cluster',
      season: 'Fall',
      taste: 'Sweet & Juicy'
    },
    { 
      name: 'Watermelon', 
      emoji: '🍉', 
      audio: '/audio/watermelon.mp3',
      color: '#68D391',
      backgroundColor: 'linear-gradient(135deg, #68D391 0%, #9AE6B4 100%)',
      nutritionalBenefits: ['💧 Super hydrating', '🍉 Low calories', '❤️ Heart healthy', '🌞 Summer cooling'],
      funFact: 'Watermelons are 92% water!',
      description: 'Refreshing watermelon is perfect for hot days!',
      category: 'Melon',
      season: 'Summer',
      taste: 'Sweet & Refreshing'
    },
  ],
  vegetables: [
    { 
      name: 'Carrot', 
      emoji: '🥕', 
      audio: '/audio/carrot.mp3',
      color: '#F6AD55',
      backgroundColor: 'linear-gradient(135deg, #F6AD55 0%, #FBD38D 100%)',
      nutritionalBenefits: ['👁️ Good for eyes', '🥕 Beta carotene', '🦷 Teeth cleaning', '💪 Vitamin A'],
      funFact: 'Carrots used to be purple, not orange!',
      description: 'Crunchy orange carrots help you see better!',
      category: 'Root',
      season: 'Fall',
      taste: 'Sweet & Crunchy'
    },
    { 
      name: 'Broccoli', 
      emoji: '🥦', 
      audio: '/audio/broccoli.mp3',
      color: '#48BB78',
      backgroundColor: 'linear-gradient(135deg, #48BB78 0%, #68D391 100%)',
      nutritionalBenefits: ['💪 Super strong', '🥦 Iron power', '🛡️ Immunity', '🦴 Bone health'],
      funFact: 'Broccoli looks like tiny trees!',
      description: 'Green broccoli trees make you super strong!',
      category: 'Cruciferous',
      season: 'Winter',
      taste: 'Mild & Earthy'
    },
    { 
      name: 'Tomato', 
      emoji: '🍅', 
      audio: '/audio/tomato.mp3',
      color: '#F56565',
      backgroundColor: 'linear-gradient(135deg, #F56565 0%, #FC8181 100%)',
      nutritionalBenefits: ['🍅 Lycopene', '❤️ Heart healthy', '☀️ Vitamin C', '💧 Hydrating'],
      funFact: 'Tomatoes are technically fruits, not vegetables!',
      description: 'Red, juicy tomatoes are fruits pretending to be vegetables!',
      category: 'Fruit-Veggie',
      season: 'Summer',
      taste: 'Tangy & Juicy'
    },
    { 
      name: 'Corn', 
      emoji: '🌽', 
      audio: '/audio/corn.mp3',
      color: '#ECC94B',
      backgroundColor: 'linear-gradient(135deg, #ECC94B 0%, #F6E05E 100%)',
      nutritionalBenefits: ['🌽 Fiber power', '⚡ Energy boost', '👁️ Eye health', '💪 B vitamins'],
      funFact: 'Each ear of corn has about 800 kernels!',
      description: 'Sweet, golden corn kernels pop with flavor!',
      category: 'Grain',
      season: 'Summer',
      taste: 'Sweet & Starchy'
    },
    { 
      name: 'Peas', 
      emoji: '🟢', 
      audio: '/audio/peas.mp3',
      color: '#38A169',
      backgroundColor: 'linear-gradient(135deg, #38A169 0%, #48BB78 100%)',
      nutritionalBenefits: ['🟢 Protein power', '💪 Plant protein', '🧠 Brain food', '💚 Iron rich'],
      funFact: 'Peas are one of the oldest vegetables known to humans!',
      description: 'Tiny green peas are packed with protein!',
      category: 'Legume',
      season: 'Spring',
      taste: 'Sweet & Fresh'
    },
    { 
      name: 'Bell Pepper', 
      emoji: '🫑', 
      audio: '/audio/pepper.mp3',
      color: '#F687B3',
      backgroundColor: 'linear-gradient(135deg, #F687B3 0%, #FBB6CE 100%)',
      nutritionalBenefits: ['🌶️ Vitamin C', '🌈 Rainbow colors', '👁️ Eye health', '🛡️ Antioxidants'],
      funFact: 'Red bell peppers have more vitamin C than oranges!',
      description: 'Colorful bell peppers come in rainbow colors!',
      category: 'Nightshade',
      season: 'Summer',
      taste: 'Sweet & Crisp'
    },
  ],
  snacks: [
    { 
      name: 'Cookie', 
      emoji: '🍪', 
      audio: '/audio/cookie.mp3',
      color: '#C69C6D',
      backgroundColor: 'linear-gradient(135deg, #C69C6D 0%, #D69E2E 100%)',
      nutritionalBenefits: ['😊 Happy treat', '🍪 Sweet energy', '🥛 Goes with milk', '❤️ Love in bites'],
      funFact: 'The chocolate chip cookie was invented by accident!',
      description: 'Sweet, round cookies make everything better!',
      category: 'Sweet',
      occasion: 'Treat Time',
      taste: 'Sweet & Chewy'
    },
    { 
      name: 'Pretzel', 
      emoji: '🥨', 
      audio: '/audio/pretzel.mp3',
      color: '#8B4513',
      backgroundColor: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
      nutritionalBenefits: ['🥨 Crunchy fun', '🧂 Salty taste', '🌾 Wheat goodness', '🎉 Party snack'],
      funFact: 'Pretzels were invented by monks over 1,400 years ago!',
      description: 'Twisted, salty pretzels are fun to eat!',
      category: 'Salty',
      occasion: 'Snack Time',
      taste: 'Salty & Crunchy'
    },
    { 
      name: 'Popcorn', 
      emoji: '🍿', 
      audio: '/audio/popcorn.mp3',
      color: '#FFF8DC',
      backgroundColor: 'linear-gradient(135deg, #FFF8DC 0%, #FFFAF0 100%)',
      nutritionalBenefits: ['🍿 Whole grain', '🎬 Movie magic', '💨 Air-popped', '🌽 Corn power'],
      funFact: 'Popcorn can pop up to 3 feet high!',
      description: 'Fluffy popcorn kernels dance when they pop!',
      category: 'Whole Grain',
      occasion: 'Movie Time',
      taste: 'Light & Airy'
    },
    { 
      name: 'Crackers', 
      emoji: '🧈', 
      audio: '/audio/crackers.mp3',
      color: '#DDD6FE',
      backgroundColor: 'linear-gradient(135deg, #DDD6FE 0%, #E9D5FF 100%)',
      nutritionalBenefits: ['🧈 Perfect base', '🧀 Cheese friend', '🥪 Sandwich maker', '🌾 Grain goodness'],
      funFact: 'Crackers were originally called "ship bread"!',
      description: 'Crispy crackers are perfect with cheese!',
      category: 'Crispy',
      occasion: 'Anytime',
      taste: 'Mild & Crispy'
    },
  ],
  meals: [
    { 
      name: 'Pizza', 
      emoji: '🍕', 
      audio: '/audio/pizza.mp3',
      color: '#FF6B35',
      backgroundColor: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
      nutritionalBenefits: ['🍕 Comfort food', '🧀 Calcium rich', '🍅 Tomato power', '🌟 Family fun'],
      funFact: 'Americans eat 3 billion pizzas per year!',
      description: 'Cheesy pizza slices bring families together!',
      category: 'Italian',
      mealTime: 'Dinner',
      taste: 'Cheesy & Savory'
    },
    { 
      name: 'Pasta', 
      emoji: '🍝', 
      audio: '/audio/pasta.mp3',
      color: '#FFD93D',
      backgroundColor: 'linear-gradient(135deg, #FFD93D 0%, #6BCF7F 100%)',
      nutritionalBenefits: ['🍝 Energy food', '🌾 Carb power', '🧀 Cheese love', '🍅 Veggie boost'],
      funFact: 'There are over 300 pasta shapes in the world!',
      description: 'Twirly pasta noodles are fun to eat!',
      category: 'Italian',
      mealTime: 'Dinner',
      taste: 'Hearty & Filling'
    },
    { 
      name: 'Sandwich', 
      emoji: '🥪', 
      audio: '/audio/sandwich.mp3',
      color: '#8FBC8F',
      backgroundColor: 'linear-gradient(135deg, #8FBC8F 0%, #98FB98 100%)',
      nutritionalBenefits: ['🥪 Complete meal', '🍞 Bread energy', '🥬 Veggie crunch', '🧀 Protein power'],
      funFact: 'The sandwich was named after the Earl of Sandwich!',
      description: 'Stacked sandwiches are meals between bread!',
      category: 'Classic',
      mealTime: 'Lunch',
      taste: 'Balanced & Fresh'
    },
    { 
      name: 'Soup', 
      emoji: '🍲', 
      audio: '/audio/soup.mp3',
      color: '#CD853F',
      backgroundColor: 'linear-gradient(135deg, #CD853F 0%, #DEB887 100%)',
      nutritionalBenefits: ['🍲 Warming comfort', '💧 Hydrating', '🥕 Veggie packed', '❤️ Heart warming'],
      funFact: 'Soup is one of the oldest prepared dishes!',
      description: 'Warm, cozy soup makes you feel better!',
      category: 'Comfort',
      mealTime: 'Lunch',
      taste: 'Warm & Comforting'
    },
  ]
};

const MotionCard = motion(Card);
const MotionBox = motion(Box);

export default function FoodPage() {
  const [selectedFood, setSelectedFood] = useState(null);
  const [audioError, setAudioError] = useState(false);
  const [learnedFoods, setLearnedFoods] = useState(new Set());
  const [currentTab, setCurrentTab] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [stars, setStars] = useState(0);
  const [clickedBenefits, setClickedBenefits] = useState(new Set());
  const audioRef = useRef(null);

  const foodCategories = ['fruits', 'vegetables', 'snacks', 'meals'];
  const currentFoods = foods[foodCategories[currentTab]];
  const totalFoods = Object.values(foods).flat().length;
  const progress = (learnedFoods.size / totalFoods) * 100;

  const handleFoodClick = (food) => {
    setSelectedFood(food);
    setLearnedFoods(prev => new Set([...prev, food.name]));
    setShowInfo(true);

    // Add stars for learning new foods
    if (!learnedFoods.has(food.name)) {
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
    const audio = new Audio(food.audio);
    audioRef.current = audio;

    audio.play().catch(() => {
      setAudioError(true);
      speakFood(food);
    });
  };

  const handleBenefitClick = (benefit, food) => {
    const word = benefit.split(' ').slice(1).join(' ');
    const benefitKey = `${food.name}-${word}`;
    
    setClickedBenefits(prev => new Set([...prev, benefitKey]));
    setStars(prev => prev + 5);
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      speechSynthesis.speak(utterance);
    }
  };

  const speakFood = (food) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(`${food.name}. ${food.description}`);
      utterance.rate = 0.6;
      utterance.pitch = 1.2;
      speechSynthesis.speak(utterance);
    }
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    setSelectedFood(null);
    setShowInfo(false);
  };

  const getTabIcon = (index) => {
    switch(index) {
      case 0: return '🍎';
      case 1: return '🥕';
      case 2: return '🍪';
      case 3: return '🍕';
      default: return '🍽️';
    }
  };

  const getCategoryTitle = (index) => {
    switch(index) {
      case 0: return 'Fresh Fruits';
      case 1: return 'Healthy Vegetables';
      case 2: return 'Yummy Snacks';
      case 3: return 'Delicious Meals';
      default: return 'Food';
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `
          radial-gradient(circle at 20% 80%, rgba(255, 193, 7, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(76, 175, 80, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(255, 87, 34, 0.25) 0%, transparent 50%),
          linear-gradient(135deg, #FF9800 0%, #4CAF50 50%, #2196F3 100%)
        `,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Enhanced Animated Background Elements */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`bg-element-${i}`}
          style={{
            position: 'absolute',
            width: `${25 + Math.random() * 45}px`,
            height: `${25 + Math.random() * 45}px`,
            borderRadius: '50%',
            background: `linear-gradient(135deg, 
              ${currentFoods[Math.floor(Math.random() * currentFoods.length)]?.color || '#FF9800'}40 0%, 
              transparent 70%)`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            zIndex: 0,
          }}
          animate={{
            x: [0, 70, -60, 0],
            y: [0, -60, 70, 0],
            scale: [1, 1.6, 0.4, 1],
            opacity: [0.2, 0.7, 0.1, 0.2],
          }}
          transition={{
            duration: 12 + Math.random() * 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Floating Food Emojis */}
      {currentFoods.slice(0, 8).map((food, i) => (
        <motion.div
          key={`particle-${i}`}
          style={{
            position: 'absolute',
            fontSize: '2.5rem',
            top: `${5 + i * 12}%`,
            right: `${2 + (i % 3) * 15}%`,
            zIndex: 0,
            opacity: 0.6,
          }}
          animate={{
            y: [0, -40, 0],
            rotate: [0, 25, -25, 0],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 6 + i * 0.8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.7,
          }}
        >
          {food.emoji}
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
                    color: '#FF9800',
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
                  y: [0, -15, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 8, 
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
                  🍎 Delicious Food Adventure! 🍕
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
                Discover yummy foods and learn about healthy eating!
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
                      {learnedFoods.size}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                      Foods Learned
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
                    <Typography variant="h4" sx={{ color: '#FF9800', fontWeight: 800 }}>
                      {stars}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                      Food Stars
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
                    <Typography variant="h4" sx={{ color: '#4CAF50', fontWeight: 800 }}>
                      {Math.round(progress)}%
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                      Food Discovery
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
                      background: 'linear-gradient(90deg, #FF9800 0%, #4CAF50 25%, #2196F3 50%, #9C27B0 75%, #F44336 100%)',
                      borderRadius: 6,
                      boxShadow: '0 4px 12px rgba(255,255,255,0.3)',
                    }
                  }}
                />
              </Box>
            </Box>

            {/* Food Stars Display */}
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Badge badgeContent={stars} color="primary" max={999}>
                <Box sx={{
                  backgroundColor: 'rgba(255,152,0,0.9)',
                  borderRadius: '50%',
                  p: 1.5,
                  boxShadow: '0 8px 24px rgba(255,152,0,0.4)',
                }}>
                  <RestaurantIcon sx={{ fontSize: '2rem', color: 'white' }} />
                </Box>
              </Badge>
            </motion.div>
          </Box>
        </motion.div>

        {/* Enhanced Food Categories Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mb: 5,
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: '25px',
            p: 1,
            backdropFilter: 'blur(15px)',
            border: '2px solid rgba(255,255,255,0.2)',
          }}>
            <Tabs
              value={currentTab}
              onChange={handleTabChange}
              sx={{
                '& .MuiTab-root': {
                  color: 'rgba(255,255,255,0.8)',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  borderRadius: '20px',
                  mx: 1,
                  minHeight: '56px',
                  transition: 'all 0.3s ease',
                  '&.Mui-selected': {
                    color: '#FF9800',
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.15)',
                  },
                },
                '& .MuiTabs-indicator': {
                  display: 'none',
                },
              }}
            >
              <Tab 
                icon={<Box sx={{ fontSize: '2rem', mb: 1 }}>🍎</Box>}
                label="Fresh Fruits" 
              />
              <Tab 
                icon={<Box sx={{ fontSize: '2rem', mb: 1 }}>🥕</Box>}
                label="Healthy Vegetables" 
              />
              <Tab 
                icon={<Box sx={{ fontSize: '2rem', mb: 1 }}>🍪</Box>}
                label="Yummy Snacks" 
              />
              <Tab 
                icon={<Box sx={{ fontSize: '2rem', mb: 1 }}>🍕</Box>}
                label="Delicious Meals" 
              />
            </Tabs>
          </Box>
        </motion.div>

        {/* Enhanced Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
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
              🌟 Explore Delicious Foods
            </Typography>
            <Typography variant="h6" sx={{ 
              color: 'rgba(255,255,255,0.95)',
              fontSize: { xs: '1rem', md: '1.2rem' },
              lineHeight: 1.6
            }}>
              Tap each food to learn amazing facts and health benefits! 
              Discover all {totalFoods} foods and become a nutrition expert! 🍎🥕🍪🍕
            </Typography>
          </Box>
        </motion.div>

        {/* Enhanced Food Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Grid container spacing={4} justifyContent="center">
            {currentFoods.map((food, index) => (
              <Grid item xs={6} sm={4} md={3} key={food.name}>
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
                    height: 320,
                    cursor: 'pointer',
                    borderRadius: '30px',
                    overflow: 'hidden',
                    position: 'relative',
                    background: food.backgroundColor,
                    boxShadow: `0 15px 35px ${food.color}40`,
                    border: selectedFood?.name === food.name 
                      ? '4px solid #FFD700' 
                      : '3px solid rgba(255,255,255,0.3)',
                    transform: 'perspective(1000px)',
                  }}
                  onClick={() => handleFoodClick(food)}
                >
                  {/* Enhanced Learned Indicator */}
                  <AnimatePresence>
                    {learnedFoods.has(food.name) && (
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
                      animation: `shimmer 4s infinite`,
                      '@keyframes shimmer': {
                        '0%': { left: '-100%' },
                        '100%': { left: '100%' },
                      },
                    }}
                  />

                  {/* Stars Animation for Learned Foods */}
                  {learnedFoods.has(food.name) && (
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
                            color: '#FF9800',
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
                    {/* Enhanced Food Emoji */}
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
                          fontSize: '4.5rem',
                          mb: 2,
                          filter: 'drop-shadow(3px 3px 8px rgba(0,0,0,0.5))',
                        }}
                      >
                        {food.emoji}
                      </Typography>
                    </motion.div>
                    
                    {/* Enhanced Food Name */}
                    <Typography 
                      variant="h4" 
                      component="div" 
                      sx={{
                        fontWeight: 900,
                        fontSize: { xs: '1.5rem', md: '1.9rem' },
                        textShadow: '2px 2px 6px rgba(0,0,0,0.8)',
                        mb: 1,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {food.name}
                    </Typography>

                    <Typography 
                      variant="body1" 
                      sx={{
                        fontSize: '1.1rem',
                        opacity: 0.9,
                        mb: 2,
                        textShadow: '1px 1px 3px rgba(0,0,0,0.7)',
                        fontWeight: 600,
                      }}
                    >
                      {food.taste}
                    </Typography>

                    {/* Enhanced Category Badge */}
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
                        color: food.color,
                        borderRadius: '15px',
                        px: 2,
                        py: 0.5,
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        mb: 2,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                      }}>
                        {food.category}
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
                          speakFood(food);
                        }}
                        sx={{
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          color: food.color,
                          width: 48,
                          height: 48,
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

        {/* Enhanced Interactive Food Display */}
        <AnimatePresence>
          {selectedFood && showInfo && (
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
                  background: `linear-gradient(135deg, ${selectedFood.color}25 0%, rgba(255,255,255,0.95) 100%)`,
                  backdropFilter: 'blur(25px)',
                  boxShadow: `0 25px 60px ${selectedFood.color}40`,
                  border: `4px solid ${selectedFood.color}`,
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
                    background: `radial-gradient(circle, ${selectedFood.color} 2px, transparent 2px)`,
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
                      color: selectedFood.color, 
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
                      <span style={{ fontSize: '3.5rem' }}>{selectedFood.emoji}</span>
                      <span>{selectedFood.name}</span>
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
                        backgroundColor: selectedFood.color,
                        color: 'white',
                        borderRadius: '20px',
                        py: 2,
                        px: 4,
                        mb: 4,
                        boxShadow: `0 8px 24px ${selectedFood.color}50`,
                      }}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          💡 Fun Fact: {selectedFood.funFact}
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
                    {selectedFood.description}
                  </Typography>

                  <Divider sx={{ my: 4, backgroundColor: selectedFood.color, height: 2 }} />

                  <Typography variant="h5" sx={{ 
                    color: 'text.primary', 
                    mb: 3,
                    fontWeight: 700,
                    fontSize: { xs: '1.3rem', md: '1.6rem' }
                  }}>
                    🌟 Health Benefits of {selectedFood.name}:
                  </Typography>

                  {/* Clickable Nutritional Benefits */}
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
                    {selectedFood.nutritionalBenefits.map((benefit, index) => {
                      const word = benefit.split(' ').slice(1).join(' ');
                      const benefitKey = `${selectedFood.name}-${word}`;
                      const isClicked = clickedBenefits.has(benefitKey);
                      
                      return (
                        <motion.div
                          key={benefit}
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
                            label={benefit}
                            onClick={() => handleBenefitClick(benefit, selectedFood)}
                            sx={{
                              backgroundColor: isClicked 
                                ? `${selectedFood.color}DD` 
                                : selectedFood.color,
                              color: 'white',
                              fontWeight: 700,
                              fontSize: '1.1rem',
                              py: 3,
                              px: 2,
                              boxShadow: isClicked 
                                ? `0 8px 24px ${selectedFood.color}60, 0 0 20px ${selectedFood.color}40`
                                : `0 6px 20px ${selectedFood.color}40`,
                              cursor: 'pointer',
                              position: 'relative',
                              overflow: 'visible',
                              border: isClicked ? '2px solid #FFD700' : 'none',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                backgroundColor: `${selectedFood.color}EE`,
                                boxShadow: `0 10px 30px ${selectedFood.color}60`,
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
                          
                          {/* Star effect for clicked benefits */}
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
                        mt: 4,
                        fontStyle: 'italic',
                        fontSize: '1.1rem'
                      }}
                    >
                      {clickedBenefits.size > 0 
                        ? `🎉 Amazing! You're learning about healthy eating! Keep exploring!`
                        : '👆 Tap each health benefit to learn more and earn food stars!'
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
          {learnedFoods.size === totalFoods && (
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
                  background: 'linear-gradient(135deg, #FF9800 0%, #4CAF50 50%, #2196F3 100%)',
                  color: 'white',
                  boxShadow: '0 30px 80px rgba(255, 152, 0, 0.5)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Celebration Particles */}
                {[...Array(30)].map((_, i) => (
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
                    {['🎉', '⭐', '🍎', '🥕', '🍪', '🍕', '🎊'][i % 7]}
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
                    🎉 Food Expert! 🎉
                  </Typography>
                </motion.div>
                
                <Typography variant="h4" sx={{ 
                  mb: 3,
                  fontSize: { xs: '1.5rem', md: '2rem' }
                }}>
                  You've discovered all {totalFoods} delicious foods! 🍎🥕🍪🍕
                </Typography>
                
                <Typography variant="h5" sx={{ 
                  fontWeight: 400,
                  opacity: 0.9 
                }}>
                  You earned {stars} food stars! You're now a nutrition expert! 🌟
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
                background: 'linear-gradient(135deg, #FF9800 0%, #4CAF50 100%)',
                color: 'white',
                boxShadow: '0 12px 40px rgba(255, 152, 0, 0.5)',
                border: '3px solid rgba(255,255,255,0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #F57C00 0%, #388E3C 100%)',
                  boxShadow: '0 16px 50px rgba(255, 152, 0, 0.7)',
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