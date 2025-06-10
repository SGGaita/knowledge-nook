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
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PetsIcon from '@mui/icons-material/Pets';
import SchoolIcon from '@mui/icons-material/School';
import QuizIcon from '@mui/icons-material/Quiz';
import NatureIcon from '@mui/icons-material/Nature';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Enhanced animals data with categories, habitats, sounds, and fun facts
const animals = {
  domestic: [
    { 
      name: 'Dog', 
      emoji: '🐕', 
      sound: 'Woof!', 
      audio: '/audio/dog.mp3',
      color: '#8D6E63',
      habitat: 'Home',
      category: 'Domestic',
      backgroundColor: 'linear-gradient(135deg, #D4A574 0%, #E6B88A 100%)',
      activities: ['🎾 Fetch', '🚶 Walking', '🛡️ Guarding', '🤗 Cuddling'],
      characteristics: ['🦴 Loyal', '👂 Good Hearing', '🏃 Fast Runner', '💖 Friendly'],
      funFact: 'Dogs have an incredible sense of smell - 10,000 times better than humans!',
      description: 'Dogs are loyal companions who love to play and protect their families!'
    },
    { 
      name: 'Cat', 
      emoji: '🐱', 
      sound: 'Meow!', 
      audio: '/audio/cat.mp3',
      color: '#FF8A80',
      habitat: 'Home',
      category: 'Domestic',
      backgroundColor: 'linear-gradient(135deg, #FFAFBD 0%, #FFC3A0 100%)',
      activities: ['😴 Sleeping', '🧶 Playing', '🐭 Hunting', '😸 Purring'],
      characteristics: ['🌙 Nocturnal', '👁️ Night Vision', '🤸 Agile', '🧘 Independent'],
      funFact: 'Cats sleep 12-16 hours a day and can see in the dark!',
      description: 'Cats are graceful and independent pets who love to explore!'
    },
    { 
      name: 'Cow', 
      emoji: '🐄', 
      sound: 'Moo!', 
      audio: '/audio/cow.mp3',
      color: '#81C784',
      habitat: 'Farm',
      category: 'Domestic',
      backgroundColor: 'linear-gradient(135deg, #A8E6CF 0%, #C7FFEA 100%)',
      activities: ['🌱 Grazing', '🥛 Making Milk', '🚶 Walking', '😴 Resting'],
      characteristics: ['🥛 Milk Producer', '🌱 Herbivore', '👥 Social', '🔔 Bell Wearer'],
      funFact: 'Cows can produce up to 7 gallons of milk per day!',
      description: 'Cows are gentle farm animals that give us delicious milk!'
    },
    { 
      name: 'Chicken', 
      emoji: '🐔', 
      sound: 'Cluck!', 
      audio: '/audio/chicken.mp3',
      color: '#FFB74D',
      habitat: 'Farm',
      category: 'Domestic',
      backgroundColor: 'linear-gradient(135deg, #FFCC70 0%, #FFF6B7 100%)',
      activities: ['🥚 Laying Eggs', '🌾 Pecking', '🐛 Bug Hunting', '🦋 Flapping'],
      characteristics: ['🥚 Egg Layer', '🌅 Early Riser', '👥 Flock Animal', '🦋 Flightless'],
      funFact: 'Chickens can remember over 100 different faces of people or animals!',
      description: 'Chickens are busy farm birds that give us fresh eggs every day!'
    },
    { 
      name: 'Horse', 
      emoji: '🐎', 
      sound: 'Neigh!', 
      audio: '/audio/horse.mp3',
      color: '#A1887F',
      habitat: 'Farm',
      category: 'Domestic',
      backgroundColor: 'linear-gradient(135deg, #C8A882 0%, #E2D5C6 100%)',
      activities: ['🏃 Running', '🚗 Riding', '🌾 Eating Hay', '🎠 Galloping'],
      characteristics: ['🏃 Fast Runner', '💪 Strong', '🎠 Rideable', '👂 Good Memory'],
      funFact: 'Horses can sleep both lying down and standing up!',
      description: 'Horses are majestic animals that love to run and can carry people!'
    },
    { 
      name: 'Rabbit', 
      emoji: '🐰', 
      sound: 'Thump!', 
      audio: '/audio/rabbit.mp3',
      color: '#E1BEE7',
      habitat: 'Home/Garden',
      category: 'Domestic',
      backgroundColor: 'linear-gradient(135deg, #E0C3FC 0%, #9BB5FF 100%)',
      activities: ['🥕 Eating Carrots', '🦘 Hopping', '🕳️ Digging', '👂 Listening'],
      characteristics: ['👂 Long Ears', '🦘 Great Jumper', '🥕 Vegetarian', '👶 Cute'],
      funFact: 'Rabbits can jump up to 3 feet high and see almost 360 degrees!',
      description: 'Rabbits are adorable hoppers with long ears who love carrots!'
    },
  ],
  wild: [
    { 
      name: 'Lion', 
      emoji: '🦁', 
      sound: 'Roar!', 
      audio: '/audio/lion.mp3',
      color: '#FF8F00',
      habitat: 'Savanna',
      category: 'Wild',
      backgroundColor: 'linear-gradient(135deg, #F6D365 0%, #FDA085 100%)',
      activities: ['👑 Leading Pride', '🦌 Hunting', '😴 Resting', '🗣️ Roaring'],
      characteristics: ['👑 King of Jungle', '💪 Strong', '👥 Pack Leader', '🦷 Sharp Teeth'],
      funFact: 'A lion\'s roar can be heard from 5 miles away!',
      description: 'Lions are the kings of the jungle with magnificent manes!'
    },
    { 
      name: 'Elephant', 
      emoji: '🐘', 
      sound: 'Trumpet!', 
      audio: '/audio/elephant.mp3',
      color: '#78909C',
      habitat: 'Savanna',
      category: 'Wild',
      backgroundColor: 'linear-gradient(135deg, #96DEDA 0%, #50C9C3 100%)',
      activities: ['💧 Spraying Water', '🌿 Eating Plants', '🚶 Migrating', '🤗 Hugging'],
      characteristics: ['🐘 Huge Size', '🧠 Smart', '💧 Water Lover', '👶 Family Oriented'],
      funFact: 'Elephants are so smart they can recognize themselves in mirrors!',
      description: 'Elephants are gentle giants with amazing memories!'
    },
    { 
      name: 'Monkey', 
      emoji: '🐒', 
      sound: 'Ooh ooh!', 
      audio: '/audio/monkey.mp3',
      color: '#8D6E63',
      habitat: 'Jungle',
      category: 'Wild',
      backgroundColor: 'linear-gradient(135deg, #D4A574 0%, #E6B88A 100%)',
      activities: ['🌳 Swinging', '🍌 Eating Bananas', '🎭 Playing', '👥 Socializing'],
      characteristics: ['🌳 Tree Climber', '🍌 Banana Lover', '🎭 Playful', '👥 Social'],
      funFact: 'Monkeys can use simple tools and have been to space!',
      description: 'Monkeys are playful animals who love swinging through trees!'
    },
    { 
      name: 'Zebra', 
      emoji: '🦓', 
      sound: 'Neigh!', 
      audio: '/audio/zebra.mp3',
      color: '#616161',
      habitat: 'Savanna',
      category: 'Wild',
      backgroundColor: 'linear-gradient(135deg, #B0B0B0 0%, #E0E0E0 100%)',
      activities: ['🏃 Running', '🌿 Grazing', '👥 Herding', '🦓 Showing Stripes'],
      characteristics: ['🦓 Striped', '🏃 Fast Runner', '👥 Herd Animal', '🌿 Grass Eater'],
      funFact: 'Every zebra has a unique stripe pattern, like human fingerprints!',
      description: 'Zebras are beautiful striped horses that live in herds!'
    },
    { 
      name: 'Giraffe', 
      emoji: '🦒', 
      sound: 'Hum!', 
      audio: '/audio/giraffe.mp3',
      color: '#FFAB40',
      habitat: 'Savanna',
      category: 'Wild',
      backgroundColor: 'linear-gradient(135deg, #FFE082 0%, #FFCC02 100%)',
      activities: ['🌳 Eating Leaves', '👀 Looking Far', '🚶 Walking Tall', '🦒 Stretching'],
      characteristics: ['📏 Very Tall', '👅 Long Tongue', '👀 Good Vision', '🌳 Tree Eater'],
      funFact: 'Giraffes are the tallest animals and their tongues are 18 inches long!',
      description: 'Giraffes are the tallest animals who can eat from the highest trees!'
    },
    { 
      name: 'Tiger', 
      emoji: '🐅', 
      sound: 'Growl!', 
      audio: '/audio/tiger.mp3',
      color: '#FF5722',
      habitat: 'Jungle',
      category: 'Wild',
      backgroundColor: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
      activities: ['🦌 Hunting', '💧 Swimming', '🌙 Night Prowling', '🐅 Stalking'],
      characteristics: ['🐅 Striped', '💪 Powerful', '🏊 Good Swimmer', '🌙 Night Hunter'],
      funFact: 'Tigers are excellent swimmers and love water unlike most cats!',
      description: 'Tigers are powerful striped hunters who are great swimmers!'
    },
    { 
      name: 'Bear', 
      emoji: '🐻', 
      sound: 'Growl!', 
      audio: '/audio/bear.mp3',
      color: '#5D4037',
      habitat: 'Forest',
      category: 'Wild',
      backgroundColor: 'linear-gradient(135deg, #8D6E63 0%, #BCAAA4 100%)',
      activities: ['🍯 Eating Honey', '🐟 Fishing', '😴 Hibernating', '🌲 Climbing Trees'],
      characteristics: ['🍯 Honey Lover', '💪 Very Strong', '😴 Hibernates', '🌲 Tree Climber'],
      funFact: 'Bears can run up to 35 mph and are amazing tree climbers!',
      description: 'Bears are strong forest animals who love honey and fish!'
    },
    { 
      name: 'Penguin', 
      emoji: '🐧', 
      sound: 'Squawk!', 
      audio: '/audio/penguin.mp3',
      color: '#37474F',
      habitat: 'Antarctica',
      category: 'Wild',
      backgroundColor: 'linear-gradient(135deg, #546E7A 0%, #78909C 100%)',
      activities: ['🏊 Swimming', '🐟 Catching Fish', '🧊 Sliding on Ice', '👶 Caring for Babies'],
      characteristics: ['🏊 Great Swimmer', '🧊 Cold Weather', '👥 Social', '🐟 Fish Eater'],
      funFact: 'Penguins can swim up to 22 mph and hold their breath for 20 minutes!',
      description: 'Penguins are amazing swimmers who live in the cold and love fish!'
    },
  ],
  sea: [
    { 
      name: 'Dolphin', 
      emoji: '🐬', 
      sound: 'Click!', 
      audio: '/audio/dolphin.mp3',
      color: '#42A5F5',
      habitat: 'Ocean',
      category: 'Sea',
      backgroundColor: 'linear-gradient(135deg, #89F7FE 0%, #66A6FF 100%)',
      activities: ['🏊 Swimming', '🤸 Jumping', '🎮 Playing', '🗣️ Echolocating'],
      characteristics: ['🧠 Very Smart', '🤸 Acrobatic', '🏊 Fast Swimmer', '👥 Friendly'],
      funFact: 'Dolphins are so smart they can recognize themselves in mirrors!',
      description: 'Dolphins are super smart ocean animals who love to play and jump!'
    },
    { 
      name: 'Whale', 
      emoji: '🐋', 
      sound: 'Sing!', 
      audio: '/audio/whale.mp3',
      color: '#1E88E5',
      habitat: 'Ocean',
      category: 'Sea',
      backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      activities: ['🎵 Singing', '💧 Spouting Water', '🏊 Deep Diving', '🐟 Filter Feeding'],
      characteristics: ['🐋 Huge Size', '🎵 Beautiful Songs', '💧 Water Spouts', '🫁 Hold Breath Long'],
      funFact: 'Blue whales are the largest animals ever known to have lived on Earth!',
      description: 'Whales are enormous ocean giants who sing beautiful songs!'
    },
    { 
      name: 'Shark', 
      emoji: '🦈', 
      sound: 'Splash!', 
      audio: '/audio/shark.mp3',
      color: '#455A64',
      habitat: 'Ocean',
      category: 'Sea',
      backgroundColor: 'linear-gradient(135deg, #546E7A 0%, #78909C 100%)',
      activities: ['🏊 Fast Swimming', '🦷 Showing Teeth', '🐟 Hunting Fish', '🌊 Patrolling Ocean'],
      characteristics: ['🦷 Sharp Teeth', '🏊 Amazing Swimmer', '👁️ Great Vision', '🐟 Fish Hunter'],
      funFact: 'Sharks have been around for over 400 million years!',
      description: 'Sharks are powerful ocean predators with amazing swimming skills!'
    },
    { 
      name: 'Octopus', 
      emoji: '🐙', 
      sound: 'Squirt!', 
      audio: '/audio/octopus.mp3',
      color: '#7B1FA2',
      habitat: 'Ocean',
      category: 'Sea',
      backgroundColor: 'linear-gradient(135deg, #E0C3FC 0%, #9BB5FF 100%)',
      activities: ['🎨 Changing Colors', '🕳️ Hiding', '🐚 Opening Shells', '🤸 Squeezing'],
      characteristics: ['🐙 Eight Arms', '🎨 Color Changer', '🧠 Very Smart', '🕳️ Escape Artist'],
      funFact: 'Octopuses have three hearts and blue blood!',
      description: 'Octopuses are amazing sea creatures with eight arms who can change colors!'
    },
  ]
};

const MotionCard = motion(Card);
const MotionBox = motion(Box);

export default function AnimalsPage() {
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [audioError, setAudioError] = useState(false);
  const [learnedAnimals, setLearnedAnimals] = useState(new Set());
  const [currentMode, setCurrentMode] = useState('explore'); // explore, learn, quiz
  const [currentTab, setCurrentTab] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [stars, setStars] = useState(0);
  const [clickedActivities, setClickedActivities] = useState(new Set());
  const [clickedCharacteristics, setClickedCharacteristics] = useState(new Set());
  const audioRef = useRef(null);

  const animalCategories = ['domestic', 'wild', 'sea'];
  const currentAnimals = animals[animalCategories[currentTab]];
  const totalAnimals = Object.values(animals).flat().length;
  const progress = (learnedAnimals.size / totalAnimals) * 100;

  const handleAnimalClick = (animal) => {
    setSelectedAnimal(animal);
    setLearnedAnimals(prev => new Set([...prev, animal.name]));
    setShowInfo(true);

    // Add stars for learning new animals
    if (!learnedAnimals.has(animal.name)) {
      setStars(prev => prev + 10);
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
    const audio = new Audio(animal.audio);
    audioRef.current = audio;

    audio.play().catch(() => {
      setAudioError(true);
      speakAnimal(animal);
    });
  };

  const handleActivityClick = (activity, animal) => {
    const word = activity.split(' ').slice(1).join(' ');
    const activityKey = `${animal.name}-${word}`;
    
    setClickedActivities(prev => new Set([...prev, activityKey]));
    setStars(prev => prev + 3);
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      speechSynthesis.speak(utterance);
    }
  };

  const handleCharacteristicClick = (characteristic, animal) => {
    const word = characteristic.split(' ').slice(1).join(' ');
    const characteristicKey = `${animal.name}-${word}`;
    
    setClickedCharacteristics(prev => new Set([...prev, characteristicKey]));
    setStars(prev => prev + 4);
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      speechSynthesis.speak(utterance);
    }
  };

  const speakAnimal = (animal) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(`${animal.name} says ${animal.sound}. ${animal.description}`);
      utterance.rate = 0.6;
      utterance.pitch = 1.2;
      speechSynthesis.speak(utterance);
    }
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    setSelectedAnimal(null);
    setShowInfo(false);
  };

  const getModeIcon = (mode) => {
    switch(mode) {
      case 'explore': return <PetsIcon />;
      case 'learn': return <SchoolIcon />;
      case 'quiz': return <QuizIcon />;
      default: return <PetsIcon />;
    }
  };

  const getModeTitle = (mode) => {
    switch(mode) {
      case 'explore': return 'Animal Explorer';
      case 'learn': return 'Animal Learning';
      case 'quiz': return 'Animal Quiz';
      default: return 'Animal Explorer';
    }
  };

  const getTabIcon = (index) => {
    switch(index) {
      case 0: return '🏠';
      case 1: return '🌿';
      case 2: return '🌊';
      default: return '🐾';
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `
          radial-gradient(circle at 20% 80%, rgba(76, 175, 80, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(33, 150, 243, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(255, 152, 0, 0.25) 0%, transparent 50%),
          linear-gradient(135deg, #4CAF50 0%, #2196F3 50%, #FF9800 100%)
        `,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Enhanced Animated Background Elements */}
      {[...Array(18)].map((_, i) => (
        <motion.div
          key={`bg-element-${i}`}
          style={{
            position: 'absolute',
            width: `${30 + Math.random() * 50}px`,
            height: `${30 + Math.random() * 50}px`,
            borderRadius: '50%',
            background: `linear-gradient(135deg, 
              ${currentAnimals[Math.floor(Math.random() * currentAnimals.length)]?.color || '#4CAF50'}40 0%, 
              transparent 70%)`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            zIndex: 0,
          }}
          animate={{
            x: [0, 60, -50, 0],
            y: [0, -50, 60, 0],
            scale: [1, 1.5, 0.5, 1],
            opacity: [0.3, 0.8, 0.2, 0.3],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 6,
          }}
        />
      ))}

      {/* Floating Animal Emojis */}
      {currentAnimals.slice(0, 6).map((animal, i) => (
        <motion.div
          key={`particle-${i}`}
          style={{
            position: 'absolute',
            fontSize: '2.2rem',
            top: `${8 + i * 16}%`,
            right: `${3 + (i % 2) * 18}%`,
            zIndex: 0,
            opacity: 0.7,
          }}
          animate={{
            y: [0, -35, 0],
            rotate: [0, 20, -20, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 7 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.9,
          }}
        >
          {animal.emoji}
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
                    color: '#4CAF50',
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
                  y: [0, -12, 0],
                  scale: [1, 1.04, 1]
                }}
                transition={{ 
                  duration: 7, 
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
                  🦁 Amazing Animal Kingdom! 🐘
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
                Discover incredible animals from around the world!
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
                      {learnedAnimals.size}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                      Animals Learned
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
                      {stars}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                      Nature Stars
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
                    <Typography variant="h4" sx={{ color: '#2196F3', fontWeight: 800 }}>
                      {Math.round(progress)}%
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                      Discovery Progress
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
                      background: 'linear-gradient(90deg, #4CAF50 0%, #2196F3 25%, #FF9800 50%, #9C27B0 75%, #F44336 100%)',
                      borderRadius: 6,
                      boxShadow: '0 4px 12px rgba(255,255,255,0.3)',
                    }
                  }}
                />
              </Box>
            </Box>

            {/* Nature Stars Display */}
            <motion.div
              animate={{ rotate: [0, 12, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Badge badgeContent={stars} color="primary" max={999}>
                <Box sx={{
                  backgroundColor: 'rgba(76,175,80,0.9)',
                  borderRadius: '50%',
                  p: 1.5,
                  boxShadow: '0 8px 24px rgba(76,175,80,0.4)',
                }}>
                  <NatureIcon sx={{ fontSize: '2rem', color: 'white' }} />
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
                    color: currentMode === mode ? '#4CAF50' : 'white',
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

        {/* Enhanced Animal Categories Tabs */}
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
                    color: '#4CAF50',
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
                icon={<Box sx={{ fontSize: '2rem', mb: 1 }}>🏠</Box>}
                label="Domestic Animals" 
              />
              <Tab 
                icon={<Box sx={{ fontSize: '2rem', mb: 1 }}>🌿</Box>}
                label="Wild Animals" 
              />
              <Tab 
                icon={<Box sx={{ fontSize: '2rem', mb: 1 }}>🌊</Box>}
                label="Sea Animals" 
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
              🌟 Explore the Animal Kingdom
            </Typography>
            <Typography variant="h6" sx={{ 
              color: 'rgba(255,255,255,0.95)',
              fontSize: { xs: '1rem', md: '1.2rem' },
              lineHeight: 1.6
            }}>
              Tap each animal to hear their sounds and learn amazing facts! 
              Discover all {totalAnimals} animals and earn nature stars! 🦁🐘🐬
            </Typography>
          </Box>
        </motion.div>

        {/* Enhanced Animal Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Grid container spacing={4} justifyContent="center">
            {currentAnimals.map((animal, index) => (
              <Grid item xs={6} sm={4} md={3} key={animal.name}>
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
                    background: animal.backgroundColor,
                    boxShadow: `0 15px 35px ${animal.color}40`,
                    border: selectedAnimal?.name === animal.name 
                      ? '4px solid #FFD700' 
                      : '3px solid rgba(255,255,255,0.3)',
                    transform: 'perspective(1000px)',
                  }}
                  onClick={() => handleAnimalClick(animal)}
                >
                  {/* Enhanced Learned Indicator */}
                  <AnimatePresence>
                    {learnedAnimals.has(animal.name) && (
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

                  {/* Stars Animation for Learned Animals */}
                  {learnedAnimals.has(animal.name) && (
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
                            color: '#4CAF50',
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
                    {/* Enhanced Animal Emoji */}
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
                        {animal.emoji}
                      </Typography>
                    </motion.div>
                    
                    {/* Enhanced Animal Name */}
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
                      {animal.name}
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
                      {animal.sound}
                    </Typography>

                    {/* Enhanced Habitat Badge */}
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
                        color: animal.color,
                        borderRadius: '15px',
                        px: 2,
                        py: 0.5,
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        mb: 2,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                      }}>
                        {animal.habitat}
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
                          speakAnimal(animal);
                        }}
                        sx={{
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          color: animal.color,
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

        {/* Enhanced Interactive Animal Display */}
        <AnimatePresence>
          {selectedAnimal && showInfo && (
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
                  background: `linear-gradient(135deg, ${selectedAnimal.color}25 0%, rgba(255,255,255,0.95) 100%)`,
                  backdropFilter: 'blur(25px)',
                  boxShadow: `0 25px 60px ${selectedAnimal.color}40`,
                  border: `4px solid ${selectedAnimal.color}`,
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
                    background: `radial-gradient(circle, ${selectedAnimal.color} 2px, transparent 2px)`,
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
                      color: selectedAnimal.color, 
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
                      <span style={{ fontSize: '3.5rem' }}>{selectedAnimal.emoji}</span>
                      <span>{selectedAnimal.name}</span>
                      <span style={{ fontSize: '2rem' }}>says</span>
                      <span style={{ fontSize: '2.5rem' }}>{selectedAnimal.sound}</span>
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
                        backgroundColor: selectedAnimal.color,
                        color: 'white',
                        borderRadius: '20px',
                        py: 2,
                        px: 4,
                        mb: 4,
                        boxShadow: `0 8px 24px ${selectedAnimal.color}50`,
                      }}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          💡 Amazing Fact: {selectedAnimal.funFact}
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
                    {selectedAnimal.description}
                  </Typography>

                  <Divider sx={{ my: 4, backgroundColor: selectedAnimal.color, height: 2 }} />

                  <Typography variant="h5" sx={{ 
                    color: 'text.primary', 
                    mb: 3,
                    fontWeight: 700,
                    fontSize: { xs: '1.3rem', md: '1.6rem' }
                  }}>
                    🎯 What {selectedAnimal.name} loves to do:
                  </Typography>

                  {/* Clickable Activities */}
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap', mb: 4 }}>
                    {selectedAnimal.activities.map((activity, index) => {
                      const word = activity.split(' ').slice(1).join(' ');
                      const activityKey = `${selectedAnimal.name}-${word}`;
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
                            onClick={() => handleActivityClick(activity, selectedAnimal)}
                            sx={{
                              backgroundColor: isClicked 
                                ? `${selectedAnimal.color}DD` 
                                : selectedAnimal.color,
                              color: 'white',
                              fontWeight: 700,
                              fontSize: '1.1rem',
                              py: 3,
                              px: 2,
                              boxShadow: isClicked 
                                ? `0 8px 24px ${selectedAnimal.color}60, 0 0 20px ${selectedAnimal.color}40`
                                : `0 6px 20px ${selectedAnimal.color}40`,
                              cursor: 'pointer',
                              position: 'relative',
                              overflow: 'visible',
                              border: isClicked ? '2px solid #FFD700' : 'none',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                backgroundColor: `${selectedAnimal.color}EE`,
                                boxShadow: `0 10px 30px ${selectedAnimal.color}60`,
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
                          
                          {/* Star effect for clicked activities */}
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

                  <Divider sx={{ my: 4, backgroundColor: selectedAnimal.color, height: 2 }} />

                  <Typography variant="h5" sx={{ 
                    color: 'text.primary', 
                    mb: 3,
                    fontWeight: 700,
                    fontSize: { xs: '1.3rem', md: '1.6rem' }
                  }}>
                    ✨ Special traits of {selectedAnimal.name}:
                  </Typography>

                  {/* Clickable Characteristics */}
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
                    {selectedAnimal.characteristics.map((characteristic, index) => {
                      const word = characteristic.split(' ').slice(1).join(' ');
                      const characteristicKey = `${selectedAnimal.name}-${word}`;
                      const isClicked = clickedCharacteristics.has(characteristicKey);
                      
                      return (
                        <motion.div
                          key={characteristic}
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
                            label={characteristic}
                            onClick={() => handleCharacteristicClick(characteristic, selectedAnimal)}
                            sx={{
                              backgroundColor: isClicked 
                                ? `${selectedAnimal.color}DD` 
                                : `${selectedAnimal.color}BB`,
                              color: 'white',
                              fontWeight: 700,
                              fontSize: '1.1rem',
                              py: 3,
                              px: 2,
                              boxShadow: isClicked 
                                ? `0 8px 24px ${selectedAnimal.color}60, 0 0 20px ${selectedAnimal.color}40`
                                : `0 6px 20px ${selectedAnimal.color}40`,
                              cursor: 'pointer',
                              position: 'relative',
                              overflow: 'visible',
                              border: isClicked ? '3px solid #FFD700' : 'none',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                backgroundColor: `${selectedAnimal.color}EE`,
                                boxShadow: `0 10px 30px ${selectedAnimal.color}60`,
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
                          
                          {/* Special star effect for clicked characteristics */}
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
                      {(clickedActivities.size > 0 || clickedCharacteristics.size > 0) 
                        ? `🎉 Awesome! You're learning so much about ${selectedAnimal.name}! Keep exploring!`
                        : '👆 Tap each activity and trait to learn more and earn nature stars!'
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
          {learnedAnimals.size === totalAnimals && (
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
                  background: 'linear-gradient(135deg, #4CAF50 0%, #2196F3 50%, #FF9800 100%)',
                  color: 'white',
                  boxShadow: '0 30px 80px rgba(76, 175, 80, 0.5)',
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
                    {['🎉', '⭐', '🦁', '🐘', '🐬', '🌟', '🎊'][i % 7]}
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
                    🎉 Animal Kingdom Master! 🎉
                  </Typography>
                </motion.div>
                
                <Typography variant="h4" sx={{ 
                  mb: 3,
                  fontSize: { xs: '1.5rem', md: '2rem' }
                }}>
                  You've discovered all {totalAnimals} amazing animals! 🦁🐘🐬
                </Typography>
                
                <Typography variant="h5" sx={{ 
                  fontWeight: 400,
                  opacity: 0.9 
                }}>
                  You earned {stars} nature stars! You're now a true animal expert! 🌟
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
                background: 'linear-gradient(135deg, #4CAF50 0%, #2196F3 100%)',
                color: 'white',
                boxShadow: '0 12px 40px rgba(76, 175, 80, 0.5)',
                border: '3px solid rgba(255,255,255,0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #45A049 0%, #1976D2 100%)',
                  boxShadow: '0 16px 50px rgba(76, 175, 80, 0.7)',
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