'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Container, 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  Box, 
  Chip, 
  IconButton,
  Avatar,
  LinearProgress,
  Fab,
  Tooltip,
  Button,
  Stepper,
  Step,
  StepLabel,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Paper
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  PlayArrow, 
  Star, 
  Lightbulb, 
  TrendingUp,
  Schedule,
  EmojiEvents,
  Favorite,
  AutoAwesome,
  BookmarkBorder,
  Speed,
  ArrowBack,
  ArrowForward,
  Psychology,
  Interests,
  Dashboard as DashboardIcon
} from '@mui/icons-material';
import ProfileDisplay from '../components/ProfileDisplay';

const modules = [
  {
    title: 'Colors',
    description: 'Explore the rainbow and learn about different colors',
    icon: '🎨',
    path: '/colors',
    gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 50%, #FFB3B3 100%)',
    difficulty: 'Easy',
    lessons: 12,
    category: 'Creative',
    progress: 65,
    time: '15 min',
    featured: true,
    tags: ['visual', 'creative', 'artistic']
  },
  {
    title: 'Numbers',
    description: 'Count, add, and discover the magic of mathematics',
    icon: '🔢',
    path: '/numbers',
    gradient: 'linear-gradient(135deg, #4ECDC4 0%, #44B3AC 50%, #3A9B94 100%)',
    difficulty: 'Medium',
    lessons: 15,
    category: 'Math',
    progress: 40,
    time: '20 min',
    featured: false,
    tags: ['logical', 'analytical', 'problem-solving']
  },
  {
    title: 'Family',
    description: 'Meet family members and learn relationships',
    icon: '👨‍👩‍👧‍👦',
    path: '/family',
    gradient: 'linear-gradient(135deg, #95E1D3 0%, #81D4C5 50%, #6CC7B7 100%)',
    difficulty: 'Easy',
    lessons: 8,
    category: 'Social',
    progress: 85,
    time: '12 min',
    featured: false,
    tags: ['social', 'emotional', 'relationships']
  },
  {
    title: 'Animals',
    description: 'Discover amazing creatures from around the world',
    icon: '🦁',
    path: '/animals',
    gradient: 'linear-gradient(135deg, #FFD93D 0%, #FFE066 50%, #FFE799 100%)',
    difficulty: 'Easy',
    lessons: 20,
    category: 'Nature',
    progress: 25,
    time: '18 min',
    featured: true,
    tags: ['visual', 'nature', 'discovery']
  },
  {
    title: 'Food',
    description: 'Learn about healthy foods and nutrition',
    icon: '🍎',
    path: '/food',
    gradient: 'linear-gradient(135deg, #FF8B8B 0%, #FFA3A3 50%, #FFBBBB 100%)',
    difficulty: 'Medium',
    lessons: 10,
    category: 'Health',
    progress: 10,
    time: '16 min',
    featured: false,
    tags: ['practical', 'health', 'discovery']
  },
];

const learningStyles = [
  {
    id: 'visual',
    title: 'Visual Learner',
    description: 'I learn best with pictures, colors, and visual elements',
    icon: '👁️',
    gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)',
    characteristics: ['Pictures help me understand', 'I love colorful content', 'Charts and diagrams are my friends']
  },
  {
    id: 'auditory',
    title: 'Audio Learner',
    description: 'I learn best by listening and hearing sounds',
    icon: '👂',
    gradient: 'linear-gradient(135deg, #4ECDC4 0%, #44B3AC 100%)',
    characteristics: ['I enjoy stories and songs', 'Sound effects help me focus', 'I like to repeat words aloud']
  },
  {
    id: 'kinesthetic',
    title: 'Hands-On Learner',
    description: 'I learn best by doing and moving around',
    icon: '🤲',
    gradient: 'linear-gradient(135deg, #FFD93D 0%, #FFE066 100%)',
    characteristics: ['I like to touch and explore', 'Moving helps me think', 'I prefer interactive activities']
  },
  {
    id: 'mixed',
    title: 'Mixed Learner',
    description: 'I like to learn in different ways depending on the topic',
    icon: '🌟',
    gradient: 'linear-gradient(135deg, #95E1D3 0%, #81D4C5 100%)',
    characteristics: ['I adapt to different styles', 'Variety keeps me interested', 'I enjoy combining approaches']
  }
];

const interestCategories = [
  { id: 'creative', label: 'Creative Arts', icon: '🎨', description: 'Drawing, colors, music, and creative expression' },
  { id: 'nature', label: 'Nature & Animals', icon: '🌿', description: 'Plants, animals, outdoors, and environment' },
  { id: 'science', label: 'Science & Discovery', icon: '🔬', description: 'Experiments, space, how things work' },
  { id: 'math', label: 'Numbers & Patterns', icon: '🔢', description: 'Counting, shapes, puzzles, and logic' },
  { id: 'social', label: 'People & Relationships', icon: '👥', description: 'Family, friends, emotions, and community' },
  { id: 'stories', label: 'Stories & Language', icon: '📚', description: 'Reading, storytelling, and communication' },
  { id: 'movement', label: 'Movement & Sports', icon: '⚽', description: 'Physical activities, games, and coordination' },
  { id: 'music', label: 'Music & Rhythm', icon: '🎵', description: 'Songs, instruments, and musical patterns' }
];

const MotionCard = motion(Card);
const MotionBox = motion(Box);

const getDifficultyColor = (difficulty) => {
  switch(difficulty) {
    case 'Easy': return '#4CAF50';
    case 'Medium': return '#FF9800';
    case 'Hard': return '#F44336';
    default: return '#4CAF50';
  }
};

const getDifficultyIcon = (difficulty) => {
  switch(difficulty) {
    case 'Easy': return '⭐';
    case 'Medium': return '⭐⭐';
    case 'Hard': return '⭐⭐⭐';
    default: return '⭐';
  }
};

export default function Dashboard() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedLearningStyle, setSelectedLearningStyle] = useState('');
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [showPersonalized, setShowPersonalized] = useState(false);
  const [greeting, setGreeting] = useState('');

  const steps = ['Learning Style', 'Your Interests', 'Your Dashboard'];

  useEffect(() => {
    const profile = localStorage.getItem('userProfile');
    const learningData = localStorage.getItem('learningPreferences');
    
    if (!profile) {
      router.push('/');
      return;
    }

    setUserProfile(JSON.parse(profile));

    // Check if user has already completed the learning setup
    if (learningData) {
      const data = JSON.parse(learningData);
      setSelectedLearningStyle(data.style);
      setSelectedInterests(data.interests);
      setShowPersonalized(true);
      setCurrentStep(2);
    }

    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, [router]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInterestToggle = (interestId) => {
    setSelectedInterests(prev => 
      prev.includes(interestId) 
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleComplete = () => {
    const learningData = {
      style: selectedLearningStyle,
      interests: selectedInterests,
      completedAt: new Date().toISOString()
    };
    
    localStorage.setItem('learningPreferences', JSON.stringify(learningData));
    setShowPersonalized(true);
  };

  const getRecommendedModules = () => {
    return modules.filter(module => {
      // Filter based on selected interests
      const hasMatchingInterest = selectedInterests.some(interest => 
        module.tags?.includes(interest) || 
        module.category.toLowerCase().includes(interest)
      );
      
      // Filter based on learning style
      const matchesStyle = selectedLearningStyle === 'mixed' || 
        module.tags?.includes(selectedLearningStyle);
      
      return hasMatchingInterest || matchesStyle;
    }).slice(0, 4);
  };

  if (!userProfile) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `
          radial-gradient(circle at 10% 20%, rgba(102, 126, 234, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(255, 154, 158, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(78, 205, 196, 0.2) 0%, transparent 50%),
          linear-gradient(135deg, #667eea 0%, #764ba2 50%, #ff9a9e 100%)
        `,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Enhanced Floating Background Elements */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`bg-element-${i}`}
          style={{
            position: 'absolute',
            width: `${40 + Math.random() * 80}px`,
            height: `${40 + Math.random() * 80}px`,
            borderRadius: '50%',
            background: `linear-gradient(135deg, 
              rgba(255, 255, 255, ${0.05 + Math.random() * 0.1}) 0%, 
              rgba(255, 255, 255, ${0.02 + Math.random() * 0.05}) 100%)`,
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            zIndex: 0,
          }}
          animate={{
            x: [0, 50, -25, 0],
            y: [0, -30, 40, 0],
            scale: [1, 1.1, 0.9, 1],
            opacity: [0.3, 0.6, 0.4, 0.3],
          }}
          transition={{
            duration: 10 + Math.random() * 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 5,
          }}
        />
      ))}

      <Box sx={{ 
        position: 'absolute', 
        top: 24, 
        right: 24, 
        zIndex: 10 
      }}>
        <ProfileDisplay />
      </Box>

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: 6 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Welcome Header */}
          <motion.div variants={itemVariants}>
            <Box sx={{ mb: 6, textAlign: 'center' }}>
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Typography
                  sx={{
                    fontSize: '4rem',
                    mb: 2,
                    filter: 'drop-shadow(2px 2px 8px rgba(0,0,0,0.3))'
                  }}
                >
                  {userProfile.avatar}
                </Typography>
              </motion.div>
              
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.2,
                  mb: 1,
                }}
              >
                {greeting}, {userProfile.name}!
              </Typography>
              
              <Typography
                variant="h5"
                sx={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 300,
                  fontSize: { xs: '1.2rem', md: '1.5rem' },
                  mb: 4
                }}
              >
                {showPersonalized 
                  ? 'Here\'s your personalized learning dashboard! ✨'
                  : 'Let\'s create your perfect learning experience! ✨'
                }
              </Typography>

              {/* Progress Stepper */}
              {!showPersonalized && (
                <Box sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
                  <Stepper 
                    activeStep={currentStep} 
                    alternativeLabel
                    sx={{
                      '& .MuiStepLabel-root .Mui-completed': {
                        color: '#4CAF50',
                      },
                      '& .MuiStepLabel-root .Mui-active': {
                        color: '#FF9800',
                      },
                      '& .MuiStepLabel-label': {
                        color: 'white',
                        fontWeight: 600,
                      },
                    }}
                  >
                    {steps.map((label, index) => (
                      <Step key={label}>
                        <StepLabel
                          icon={
                            <Box sx={{
                              width: 40,
                              height: 40,
                              borderRadius: '50%',
                              background: currentStep >= index 
                                ? 'linear-gradient(135deg, #4CAF50 0%, #45A049 100%)'
                                : 'rgba(255,255,255,0.3)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              fontWeight: 700,
                              border: '2px solid rgba(255,255,255,0.4)',
                            }}>
                              {index === 0 && <Psychology />}
                              {index === 1 && <Interests />}
                              {index === 2 && <DashboardIcon />}
                            </Box>
                          }
                        >
                          {label}
                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              )}
            </Box>
          </motion.div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            {currentStep === 0 && !showPersonalized && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <Paper sx={{
                  p: 6,
                  borderRadius: 4,
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  textAlign: 'center'
                }}>
                  <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'primary.main' }}>
                    🧠 How Do You Like to Learn?
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 4, color: 'text.secondary' }}>
                    Choose the learning style that sounds most like you!
                  </Typography>

                  <FormControl component="fieldset">
                    <RadioGroup
                      value={selectedLearningStyle}
                      onChange={(e) => setSelectedLearningStyle(e.target.value)}
                    >
                      <Grid container spacing={3}>
                        {learningStyles.map((style) => (
                          <Grid item xs={12} md={6} key={style.id}>
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Card
                                sx={{
                                  cursor: 'pointer',
                                  border: selectedLearningStyle === style.id 
                                    ? '3px solid #4CAF50' 
                                    : '3px solid transparent',
                                  background: selectedLearningStyle === style.id 
                                    ? style.gradient 
                                    : 'white',
                                  color: selectedLearningStyle === style.id ? 'white' : 'inherit',
                                  transition: 'all 0.3s ease',
                                  height: '100%'
                                }}
                                onClick={() => setSelectedLearningStyle(style.id)}
                              >
                                <CardContent sx={{ p: 3 }}>
                                  <Typography sx={{ fontSize: '3rem', mb: 2 }}>
                                    {style.icon}
                                  </Typography>
                                  <FormControlLabel
                                    value={style.id}
                                    control={<Radio sx={{ display: 'none' }} />}
                                    label={
                                      <Box>
                                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                          {style.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                                          {style.description}
                                        </Typography>
                                        <Box>
                                          {style.characteristics.map((char, index) => (
                                            <Typography key={index} variant="caption" sx={{ 
                                              display: 'block', 
                                              opacity: 0.8,
                                              fontSize: '0.85rem'
                                            }}>
                                              • {char}
                                            </Typography>
                                          ))}
                                        </Box>
                                      </Box>
                                    }
                                    sx={{ m: 0, width: '100%' }}
                                  />
                                </CardContent>
                              </Card>
                            </motion.div>
                          </Grid>
                        ))}
                      </Grid>
                    </RadioGroup>
                  </FormControl>

                  <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={handleNext}
                      disabled={!selectedLearningStyle}
                      endIcon={<ArrowForward />}
                      sx={{
                        borderRadius: 3,
                        px: 4,
                        py: 1.5,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                      }}
                    >
                      Continue to Interests
                    </Button>
                  </Box>
                </Paper>
              </motion.div>
            )}

            {currentStep === 1 && !showPersonalized && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <Paper sx={{
                  p: 6,
                  borderRadius: 4,
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  textAlign: 'center'
                }}>
                  <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'primary.main' }}>
                    🌟 What Interests You Most?
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 4, color: 'text.secondary' }}>
                    Select 3-5 topics you'd love to explore! This helps us recommend the best learning modules for you.
                  </Typography>

                  <Grid container spacing={3}>
                    {interestCategories.map((category) => (
                      <Grid item xs={12} sm={6} md={4} key={category.id}>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Card
                            sx={{
                              cursor: 'pointer',
                              border: selectedInterests.includes(category.id)
                                ? '3px solid #4CAF50' 
                                : '3px solid transparent',
                              background: selectedInterests.includes(category.id)
                                ? 'linear-gradient(135deg, #4CAF50 0%, #45A049 100%)'
                                : 'white',
                              color: selectedInterests.includes(category.id) ? 'white' : 'inherit',
                              transition: 'all 0.3s ease',
                              height: '100%'
                            }}
                            onClick={() => handleInterestToggle(category.id)}
                          >
                            <CardContent sx={{ p: 3, textAlign: 'center' }}>
                              <Typography sx={{ fontSize: '2.5rem', mb: 2 }}>
                                {category.icon}
                              </Typography>
                              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                {category.label}
                              </Typography>
                              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                {category.description}
                              </Typography>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>

                  <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={handleBack}
                      startIcon={<ArrowBack />}
                      sx={{ borderRadius: 3, px: 3 }}
                    >
                      Back
                    </Button>

                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                      {selectedInterests.length} topic{selectedInterests.length !== 1 ? 's' : ''} selected
                    </Typography>

                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => {
                        setCurrentStep(2);
                        handleComplete();
                      }}
                      disabled={selectedInterests.length < 1}
                      endIcon={<ArrowForward />}
                      sx={{
                        borderRadius: 3,
                        px: 4,
                        py: 1.5,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                      }}
                    >
                      Create My Dashboard
                    </Button>
                  </Box>
                </Paper>
              </motion.div>
            )}

            {(currentStep === 2 || showPersonalized) && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Personalized Learning Modules */}
                <Box sx={{ mb: 6 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: 'white',
                      mb: 2,
                      textAlign: 'center',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    }}
                  >
                    🎯 Perfect for You
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'rgba(255,255,255,0.9)',
                      textAlign: 'center',
                      mb: 4
                    }}
                  >
                    Based on your {selectedLearningStyle} learning style and interests
                  </Typography>

                  <Grid container spacing={4}>
                    {getRecommendedModules().map((module, index) => (
                      <Grid item xs={12} sm={6} lg={3} key={module.title}>
                        <Link href={module.path} style={{ textDecoration: 'none' }}>
                          <MotionCard
                            variants={itemVariants}
                            whileHover={{ 
                              y: -10, 
                              scale: 1.02,
                              transition: { duration: 0.3 } 
                            }}
                            whileTap={{ scale: 0.98 }}
                            sx={{
                              height: 320,
                              cursor: 'pointer',
                              borderRadius: 4,
                              overflow: 'hidden',
                              background: module.gradient,
                              boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                              border: '1px solid rgba(255,255,255,0.2)',
                              position: 'relative',
                            }}
                          >
                            {module.featured && (
                              <Chip
                                label="🌟 Recommended"
                                size="small"
                                sx={{
                                  position: 'absolute',
                                  top: 12,
                                  right: 12,
                                  backgroundColor: 'rgba(255,215,0,0.9)',
                                  color: '#333',
                                  fontWeight: 700,
                                  zIndex: 2,
                                }}
                              />
                            )}
                            
                            <CardContent 
                              sx={{ 
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                color: 'white',
                                p: 3,
                              }}
                            >
                              <Typography 
                                sx={{ 
                                  fontSize: '3.5rem',
                                  textAlign: 'center',
                                  mb: 2,
                                  filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
                                }}
                              >
                                {module.icon}
                              </Typography>
                              
                              <Typography 
                                variant="h5" 
                                component="div" 
                                sx={{
                                  fontWeight: 700,
                                  textAlign: 'center',
                                  mb: 2,
                                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                                }}
                              >
                                {module.title}
                              </Typography>
                              
                              <Typography 
                                variant="body2" 
                                sx={{
                                  textAlign: 'center',
                                  opacity: 0.9,
                                  mb: 3,
                                  flexGrow: 1,
                                  fontSize: '1rem'
                                }}
                              >
                                {module.description}
                              </Typography>

                              <Box sx={{ mb: 2 }}>
                                <LinearProgress 
                                  variant="determinate" 
                                  value={module.progress} 
                                  sx={{
                                    height: 8,
                                    borderRadius: 4,
                                    backgroundColor: 'rgba(255,255,255,0.3)',
                                    '& .MuiLinearProgress-bar': {
                                      backgroundColor: 'white',
                                      borderRadius: 4,
                                    }
                                  }}
                                />
                                <Typography variant="caption" sx={{ mt: 1, display: 'block', textAlign: 'center' }}>
                                  {module.progress}% Complete
                                </Typography>
                              </Box>

                              <Box sx={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center'
                              }}>
                                <Chip
                                  label={module.difficulty}
                                  size="small"
                                  sx={{
                                    backgroundColor: 'rgba(255,255,255,0.2)',
                                    color: 'white',
                                    fontWeight: 600,
                                  }}
                                />
                                <Typography variant="caption" sx={{ 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  gap: 0.5 
                                }}>
                                  <Schedule fontSize="small" />
                                  {module.time}
                                </Typography>
                              </Box>
                            </CardContent>
                          </MotionCard>
                        </Link>
                      </Grid>
                    ))}
                  </Grid>
                </Box>

                {/* All Modules Section */}
                <Box sx={{ mb: 6 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: 'white',
                      mb: 4,
                      textAlign: 'center',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    }}
                  >
                    🚀 Explore More
                  </Typography>

                  <Grid container spacing={4}>
                    {modules.filter(module => !getRecommendedModules().includes(module)).map((module, index) => (
                      <Grid item xs={12} sm={6} lg={4} key={module.title}>
                        <Link href={module.path} style={{ textDecoration: 'none' }}>
                          <MotionCard
                            variants={itemVariants}
                            whileHover={{ 
                              y: -8, 
                              scale: 1.02,
                              transition: { duration: 0.3 } 
                            }}
                            whileTap={{ scale: 0.98 }}
                            sx={{
                              height: 280,
                              cursor: 'pointer',
                              borderRadius: 4,
                              overflow: 'hidden',
                              background: module.gradient,
                              boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                              border: '1px solid rgba(255,255,255,0.2)',
                              opacity: 0.9,
                              '&:hover': { opacity: 1 }
                            }}
                          >
                            <CardContent 
                              sx={{ 
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                color: 'white',
                                p: 3,
                              }}
                            >
                              <Typography 
                                sx={{ 
                                  fontSize: '3rem',
                                  textAlign: 'center',
                                  mb: 2,
                                }}
                              >
                                {module.icon}
                              </Typography>
                              
                              <Typography 
                                variant="h6" 
                                component="div" 
                                sx={{
                                  fontWeight: 700,
                                  textAlign: 'center',
                                  mb: 2,
                                }}
                              >
                                {module.title}
                              </Typography>
                              
                              <Typography 
                                variant="body2" 
                                sx={{
                                  textAlign: 'center',
                                  opacity: 0.9,
                                  mb: 2,
                                  flexGrow: 1,
                                }}
                              >
                                {module.description}
                              </Typography>

                              <Box sx={{ 
                                display: 'flex', 
                                justifyContent: 'center', 
                                alignItems: 'center',
                                gap: 2
                              }}>
                                <Chip
                                  label={module.difficulty}
                                  size="small"
                                  sx={{
                                    backgroundColor: 'rgba(255,255,255,0.2)',
                                    color: 'white',
                                    fontWeight: 600,
                                  }}
                                />
                                <Typography variant="caption" sx={{ 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  gap: 0.5 
                                }}>
                                  <Schedule fontSize="small" />
                                  {module.time}
                                </Typography>
                              </Box>
                            </CardContent>
                          </MotionCard>
                        </Link>
                      </Grid>
                    ))}
                  </Grid>
                </Box>

                {/* Reset Preferences Button */}
                <Box sx={{ textAlign: 'center', mt: 6 }}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      localStorage.removeItem('learningPreferences');
                      setShowPersonalized(false);
                      setCurrentStep(0);
                      setSelectedLearningStyle('');
                      setSelectedInterests([]);
                    }}
                    sx={{
                      borderRadius: 3,
                      px: 3,
                      py: 1.5,
                      color: 'white',
                      borderColor: 'rgba(255,255,255,0.5)',
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                      }
                    }}
                  >
                    🔄 Retake Learning Style Quiz
                  </Button>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </Container>
    </Box>
  );
} 