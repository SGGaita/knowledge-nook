'use client';

import { useState, useEffect } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Grid,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Chip,
  Divider,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  LinearProgress,
  Fade,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  AutoAwesome, 
  Celebration,
  ArrowForward,
  ArrowBack,
  PersonAdd,
  School,
  EmojiEvents,
  Favorite,
  CheckCircle,
  Psychology,
  Interests,
  Settings,
  Accessibility,
  VolumeUp,
  Translate
} from '@mui/icons-material';
import SplashScreen from './components/SplashScreen';

const avatarOptions = [
  { emoji: '👦', label: 'Boy', category: 'Kids' },
  { emoji: '👧', label: 'Girl', category: 'Kids' },
  { emoji: '🐱', label: 'Cat', category: 'Animals' },
  { emoji: '🐶', label: 'Dog', category: 'Animals' },
  { emoji: '🦁', label: 'Lion', category: 'Animals' },
  { emoji: '🐼', label: 'Panda', category: 'Animals' },
  { emoji: '🦊', label: 'Fox', category: 'Animals' },
  { emoji: '🐰', label: 'Rabbit', category: 'Animals' },
  { emoji: '🦄', label: 'Unicorn', category: 'Fantasy' },
  { emoji: '🐸', label: 'Frog', category: 'Animals' },
  { emoji: '🐻', label: 'Bear', category: 'Animals' },
  { emoji: '🐨', label: 'Koala', category: 'Animals' },
];

const ageOptions = [
  { value: '2-3', label: '2-3 years', description: 'Early learner', color: '#FF9A9E', features: ['Simple words', 'Basic colors', 'Fun sounds'] },
  { value: '4-5', label: '4-5 years', description: 'Growing explorer', color: '#4ECDC4', features: ['Numbers 1-10', 'Letter recognition', 'Story time'] },
  { value: '6-7', label: '6-7 years', description: 'Young scholar', color: '#95E1D3', features: ['Reading skills', 'Math basics', 'Science fun'] },
  { value: '8+', label: '8+ years', description: 'Advanced learner', color: '#FFD93D', features: ['Complex topics', 'Problem solving', 'Critical thinking'] },
];

const learningGoals = [
  { id: 'reading', label: 'Reading & Language', icon: '📚', description: 'Letters, words, and storytelling' },
  { id: 'math', label: 'Numbers & Math', icon: '🔢', description: 'Counting, shapes, and patterns' },
  { id: 'science', label: 'Science & Nature', icon: '🔬', description: 'How things work and nature exploration' },
  { id: 'creativity', label: 'Art & Creativity', icon: '🎨', description: 'Drawing, music, and creative expression' },
  { id: 'social', label: 'Social Skills', icon: '👥', description: 'Emotions, friendship, and communication' },
  { id: 'problem', label: 'Problem Solving', icon: '🧩', description: 'Logic, puzzles, and critical thinking' },
];

const accessibilityOptions = [
  { id: 'audio', label: 'Audio Support', icon: <VolumeUp />, description: 'Read content aloud and sound effects' },
  { id: 'visual', label: 'High Contrast', icon: <Accessibility />, description: 'Better visibility with enhanced colors' },
  { id: 'simple', label: 'Simple Mode', icon: <Settings />, description: 'Cleaner interface with fewer distractions' },
  { id: 'slow', label: 'Slower Pace', icon: <School />, description: 'More time for each activity' },
];

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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    avatar: '',
    goals: [],
    accessibility: [],
    parentEmail: '',
    notifications: true,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const steps = [
    { 
      label: 'Choose Avatar', 
      icon: <AutoAwesome />, 
      title: 'Choose Your Learning Buddy!',
      description: 'Pick a character that represents you on your learning journey'
    },
    { 
      label: 'Select Age', 
      icon: <School />, 
      title: 'How Old Are You?',
      description: 'This helps us customize your learning experience'
    },
    { 
      label: 'Enter Name', 
      icon: <PersonAdd />, 
      title: 'What\'s Your Name?',
      description: 'Let\'s make this personal and fun!'
    },
    { 
      label: 'Learning Goals', 
      icon: <Psychology />, 
      title: 'What Do You Want to Learn?',
      description: 'Choose the subjects that interest you most'
    },
    { 
      label: 'Accessibility', 
      icon: <Accessibility />, 
      title: 'Make Learning Perfect for You',
      description: 'Optional features to enhance your experience'
    },
    { 
      label: 'Finish Setup', 
      icon: <Celebration />, 
      title: 'Almost Ready!',
      description: 'Just a few final touches to get started'
    },
  ];

  useEffect(() => {
    // Check if user is editing existing profile
    const existingProfile = localStorage.getItem('userProfile');
    if (existingProfile) {
      const profile = JSON.parse(existingProfile);
      setFormData(prev => ({ ...prev, ...profile }));
      setIsEditing(true);
      // If profile exists, skip splash and go to dashboard
      setShowSplash(false);
      router.push('/dashboard');
    }
  }, [router]);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAvatarSelect = (avatar) => {
    setFormData(prev => ({
      ...prev,
      avatar
    }));
    setCompletedSteps(prev => new Set(prev).add(0));
  };

  const handleAgeSelect = (age) => {
    setFormData(prev => ({
      ...prev,
      age
    }));
    setCompletedSteps(prev => new Set(prev).add(1));
  };

  const handleGoalToggle = (goalId) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goalId)
        ? prev.goals.filter(id => id !== goalId)
        : [...prev.goals, goalId]
    }));
  };

  const handleAccessibilityToggle = (optionId) => {
    setFormData(prev => ({
      ...prev,
      accessibility: prev.accessibility.includes(optionId)
        ? prev.accessibility.filter(id => id !== optionId)
        : [...prev.accessibility, optionId]
    }));
  };

  const validateStep = (step) => {
    switch (step) {
      case 0: return !!formData.avatar;
      case 1: return !!formData.age;
      case 2: return !!formData.name.trim();
      case 3: return formData.goals.length >= 1;
      case 4: return true; // Accessibility is optional
      case 5: return true; // Final step
      default: return false;
    }
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      setError(getStepError(currentStep));
      return;
    }

    setCompletedSteps(prev => new Set(prev).add(currentStep));
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
    setError('');
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepError = (step) => {
    switch (step) {
      case 0: return 'Please choose an avatar!';
      case 1: return 'Please select your age group!';
      case 2: return 'Please enter your name!';
      case 3: return 'Please select at least one learning goal!';
      default: return '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Final validation
    for (let i = 0; i < steps.length - 1; i++) {
      if (!validateStep(i)) {
        setError(`Please complete step ${i + 1}: ${steps[i].label}`);
        setCurrentStep(i);
        return;
      }
    }
    
    // Save profile to localStorage
    const profileData = {
      ...formData,
      createdAt: new Date().toISOString(),
      isComplete: true
    };
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    
    // Show success message
    setSuccess(true);
    
    // Redirect to dashboard after a short delay
    setTimeout(() => {
      router.push('/dashboard');
    }, 2500);
  };

  const getProgress = () => {
    return ((completedSteps.size + (currentStep === steps.length - 1 ? 1 : 0)) / steps.length) * 100;
  };

  // Show splash screen first
  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      {/* Enhanced floating background elements */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`bg-element-${i}`}
          style={{
            position: 'absolute',
            width: `${30 + Math.random() * 50}px`,
            height: `${30 + Math.random() * 50}px`,
            borderRadius: '50%',
            background: `linear-gradient(135deg, 
              rgba(255, 255, 255, ${0.05 + Math.random() * 0.1}) 0%, 
              rgba(255, 255, 255, ${0.02 + Math.random() * 0.05}) 100%)`,
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            zIndex: 0,
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 30, 0],
            scale: [1, 1.1, 0.9, 1],
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
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Typography 
                  variant="h2" 
                  component="h1" 
                  sx={{ 
                    fontWeight: 900,
                    background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    mb: 2,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                  }}
                >
                  {isEditing ? '✏️ Edit Profile' : '🎉 Welcome to Knowledge Nook!'}
                </Typography>
              </motion.div>
              
              <Typography 
                variant="h5" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 300,
                  maxWidth: '700px',
                  mx: 'auto',
                  mb: 3,
                }}
              >
                {isEditing ? 'Update your learning profile' : 'Let\'s create your personalized learning journey step by step!'}
              </Typography>

              {/* Enhanced Progress Bar */}
              <Box sx={{ maxWidth: '600px', mx: 'auto', mb: 2 }}>
                <LinearProgress 
                  variant="determinate" 
                  value={getProgress()} 
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(90deg, #4CAF50 0%, #8BC34A 50%, #CDDC39 100%)',
                      borderRadius: 4,
                    }
                  }}
                />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mt: 1 }}>
                  Step {currentStep + 1} of {steps.length} • {Math.round(getProgress())}% Complete
                </Typography>
              </Box>

              {/* Step Indicators */}
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 3 }}>
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    animate={{
                      scale: currentStep === index ? 1.3 : 1,
                      opacity: currentStep >= index ? 1 : 0.4,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        backgroundColor: completedSteps.has(index) 
                          ? '#4CAF50' 
                          : currentStep === index 
                            ? '#FF9800' 
                            : 'rgba(255,255,255,0.3)',
                        boxShadow: currentStep === index ? '0 0 20px rgba(255,152,0,0.8)' : 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '0.7rem',
                      }}
                    >
                      {completedSteps.has(index) && <CheckCircle sx={{ fontSize: '1rem' }} />}
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </Box>
          </motion.div>

          {/* Main Content */}
          <motion.div variants={itemVariants}>
            <Paper 
              elevation={0}
              sx={{ 
                borderRadius: 6, 
                overflow: 'hidden',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 25px 80px rgba(0,0,0,0.15)',
                minHeight: '600px',
              }}
            >
              {/* Dynamic Step Header */}
              <Box sx={{ 
                p: 4, 
                textAlign: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
              }}>
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}>
                    {steps[currentStep].icon}
                    <Typography 
                      variant="h4" 
                      component="h2" 
                      sx={{ 
                        fontWeight: 700,
                      }}
                    >
                      {steps[currentStep].title}
                    </Typography>
                  </Box>
                  <Typography variant="h6" sx={{ opacity: 0.9 }}>
                    {steps[currentStep].description}
                  </Typography>
                </motion.div>
              </Box>
              
              <Box component="form" onSubmit={handleSubmit} sx={{ p: 4 }}>
                <AnimatePresence mode="wait">
                  {/* Step 0: Avatar Selection */}
                  {currentStep === 0 && (
                    <motion.div
                      key="step0"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" sx={{ mb: 3, textAlign: 'center', color: 'text.primary', fontWeight: 600 }}>
                          Choose your learning companion for this adventure! 🚀
                        </Typography>
                        
                        {/* Avatar Categories */}
                        {['Kids', 'Animals', 'Fantasy'].map((category) => (
                          <Box key={category} sx={{ mb: 3 }}>
                            <Chip 
                              label={category} 
                              sx={{ 
                                mb: 2, 
                                fontSize: '0.9rem',
                                fontWeight: 600,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white'
                              }} 
                            />
                            <Grid container spacing={2}>
                              {avatarOptions
                                .filter(option => option.category === category)
                                .map((option) => (
                                  <Grid item key={option.emoji}>
                                    <motion.div
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      <Card
                                        sx={{
                                          cursor: 'pointer',
                                          border: formData.avatar === option.emoji ? 
                                            '3px solid #4CAF50' : '3px solid transparent',
                                          transition: 'all 0.3s ease',
                                          borderRadius: 3,
                                          background: formData.avatar === option.emoji ? 
                                            'linear-gradient(135deg, #4CAF50 0%, #45A049 100%)' : 'white',
                                          color: formData.avatar === option.emoji ? 'white' : 'inherit',
                                          boxShadow: formData.avatar === option.emoji ? 
                                            '0 8px 25px rgba(76, 175, 80, 0.3)' : '0 2px 8px rgba(0,0,0,0.1)',
                                          transform: formData.avatar === option.emoji ? 'translateY(-2px)' : 'none',
                                        }}
                                        onClick={() => handleAvatarSelect(option.emoji)}
                                      >
                                        <CardContent sx={{ textAlign: 'center', py: 2.5, px: 2 }}>
                                          <Typography sx={{ fontSize: '3rem', mb: 1 }}>
                                            {option.emoji}
                                          </Typography>
                                          <Typography variant="caption" sx={{ fontWeight: 600 }}>
                                            {option.label}
                                          </Typography>
                                        </CardContent>
                                      </Card>
                                    </motion.div>
                                  </Grid>
                                ))}
                            </Grid>
                          </Box>
                        ))}
                      </Box>
                    </motion.div>
                  )}

                  {/* Step 1: Age Selection */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" sx={{ mb: 3, textAlign: 'center', color: 'text.primary', fontWeight: 600 }}>
                          This helps us create the perfect learning experience for you! 🎯
                        </Typography>
                        <Grid container spacing={3}>
                          {ageOptions.map((option) => (
                            <Grid item xs={12} sm={6} key={option.value}>
                              <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Card
                                  sx={{
                                    cursor: 'pointer',
                                    border: formData.age === option.value ? 
                                      '3px solid #4CAF50' : '3px solid transparent',
                                    transition: 'all 0.3s ease',
                                    borderRadius: 3,
                                    background: formData.age === option.value ? 
                                      `linear-gradient(135deg, ${option.color} 0%, ${option.color}dd 100%)` : 'white',
                                    color: formData.age === option.value ? 'white' : 'inherit',
                                    boxShadow: formData.age === option.value ? 
                                      `0 8px 25px ${option.color}50` : '0 2px 8px rgba(0,0,0,0.1)',
                                    height: '100%',
                                  }}
                                  onClick={() => handleAgeSelect(option.value)}
                                >
                                  <CardContent sx={{ textAlign: 'center', py: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                                      {option.label}
                                    </Typography>
                                    <Typography variant="body1" sx={{ opacity: 0.9, mb: 2, fontWeight: 600 }}>
                                      {option.description}
                                    </Typography>
                                    <Box sx={{ mt: 'auto' }}>
                                      {option.features.map((feature, index) => (
                                        <Typography key={index} variant="caption" sx={{ 
                                          display: 'block', 
                                          opacity: 0.8,
                                          fontSize: '0.85rem',
                                          mb: 0.5
                                        }}>
                                          • {feature}
                                        </Typography>
                                      ))}
                                    </Box>
                                  </CardContent>
                                </Card>
                              </motion.div>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    </motion.div>
                  )}

                  {/* Step 2: Name Input */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <motion.div
                          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          <Typography sx={{ fontSize: '5rem', mb: 3 }}>
                            {formData.avatar}
                          </Typography>
                        </motion.div>
                        
                        <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary' }}>
                          What should we call you on your learning adventure? 🌟
                        </Typography>
                        
                        <TextField
                          fullWidth
                          label="Your awesome name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          variant="outlined"
                          sx={{ 
                            mb: 4,
                            maxWidth: '400px',
                            mx: 'auto',
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 3,
                              fontSize: '1.3rem',
                              '&.Mui-focused fieldset': {
                                borderColor: '#4CAF50',
                                borderWidth: 2,
                              },
                            },
                          }}
                          InputProps={{
                            sx: { 
                              textAlign: 'center',
                              fontWeight: 600,
                              py: 1,
                            }
                          }}
                        />

                        {formData.name && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                          >
                            <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>
                              Nice to meet you, {formData.name}! 👋
                            </Typography>
                          </motion.div>
                        )}
                      </Box>
                    </motion.div>
                  )}

                  {/* Step 3: Learning Goals */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" sx={{ mb: 3, textAlign: 'center', color: 'text.primary', fontWeight: 600 }}>
                          Choose what excites you most! (Select at least one) 🚀
                        </Typography>
                        <Grid container spacing={3}>
                          {learningGoals.map((goal) => (
                            <Grid item xs={12} sm={6} md={4} key={goal.id}>
                              <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Card
                                  sx={{
                                    cursor: 'pointer',
                                    border: formData.goals.includes(goal.id) ? 
                                      '3px solid #4CAF50' : '3px solid transparent',
                                    transition: 'all 0.3s ease',
                                    borderRadius: 3,
                                    background: formData.goals.includes(goal.id) ? 
                                      'linear-gradient(135deg, #4CAF50 0%, #45A049 100%)' : 'white',
                                    color: formData.goals.includes(goal.id) ? 'white' : 'inherit',
                                    boxShadow: formData.goals.includes(goal.id) ? 
                                      '0 8px 25px rgba(76, 175, 80, 0.3)' : '0 2px 8px rgba(0,0,0,0.1)',
                                    height: '100%',
                                  }}
                                  onClick={() => handleGoalToggle(goal.id)}
                                >
                                  <CardContent sx={{ textAlign: 'center', py: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <Typography sx={{ fontSize: '3rem', mb: 2 }}>
                                      {goal.icon}
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                      {goal.label}
                                    </Typography>
                                    <Typography variant="body2" sx={{ opacity: 0.9, flexGrow: 1 }}>
                                      {goal.description}
                                    </Typography>
                                  </CardContent>
                                </Card>
                              </motion.div>
                            </Grid>
                          ))}
                        </Grid>
                        
                        {formData.goals.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                          >
                            <Typography variant="body1" sx={{ textAlign: 'center', mt: 3, color: 'text.secondary' }}>
                              Great choice! You've selected {formData.goals.length} learning goal{formData.goals.length !== 1 ? 's' : ''} 🎯
                            </Typography>
                          </motion.div>
                        )}
                      </Box>
                    </motion.div>
                  )}

                  {/* Step 4: Accessibility Options */}
                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" sx={{ mb: 3, textAlign: 'center', color: 'text.primary', fontWeight: 600 }}>
                          Optional features to make learning even better for you! ⚙️
                        </Typography>
                        <Grid container spacing={3}>
                          {accessibilityOptions.map((option) => (
                            <Grid item xs={12} sm={6} key={option.id}>
                              <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Card
                                  sx={{
                                    cursor: 'pointer',
                                    border: formData.accessibility.includes(option.id) ? 
                                      '3px solid #4CAF50' : '3px solid rgba(0,0,0,0.1)',
                                    transition: 'all 0.3s ease',
                                    borderRadius: 3,
                                    background: formData.accessibility.includes(option.id) ? 
                                      'linear-gradient(135deg, #4CAF50 0%, #45A049 100%)' : 'white',
                                    color: formData.accessibility.includes(option.id) ? 'white' : 'inherit',
                                    height: '100%',
                                  }}
                                  onClick={() => handleAccessibilityToggle(option.id)}
                                >
                                  <CardContent sx={{ display: 'flex', alignItems: 'center', py: 3 }}>
                                    <Box sx={{ mr: 2, fontSize: '2rem' }}>
                                      {option.icon}
                                    </Box>
                                    <Box sx={{ flexGrow: 1 }}>
                                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                                        {option.label}
                                      </Typography>
                                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                        {option.description}
                                      </Typography>
                                    </Box>
                                  </CardContent>
                                </Card>
                              </motion.div>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    </motion.div>
                  )}

                  {/* Step 5: Final Setup */}
                  {currentStep === 5 && (
                    <motion.div
                      key="step5"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <motion.div
                          animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Typography sx={{ fontSize: '5rem', mb: 3 }}>
                            {formData.avatar}
                          </Typography>
                        </motion.div>
                        
                        <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: 'primary.main' }}>
                          Perfect! Let's review your profile, {formData.name}! ✨
                        </Typography>

                        {/* Profile Summary */}
                        <Grid container spacing={3} sx={{ mb: 4 }}>
                          <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 3, borderRadius: 3, background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
                              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                                👤 Basic Info
                              </Typography>
                              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <Chip icon={<span>{formData.avatar}</span>} label={`Avatar: ${formData.avatar}`} />
                                <Chip icon={<School />} label={`Age: ${formData.age} years`} />
                                <Chip icon={<Favorite />} label={`Name: ${formData.name}`} />
                              </Box>
                            </Paper>
                          </Grid>
                          
                          <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 3, borderRadius: 3, background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' }}>
                              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                                🎯 Learning Goals
                              </Typography>
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {formData.goals.map(goalId => {
                                  const goal = learningGoals.find(g => g.id === goalId);
                                  return (
                                    <Chip 
                                      key={goalId}
                                      icon={<span>{goal?.icon}</span>} 
                                      label={goal?.label}
                                      size="small"
                                    />
                                  );
                                })}
                              </Box>
                            </Paper>
                          </Grid>
                        </Grid>

                        {formData.accessibility.length > 0 && (
                          <Paper sx={{ p: 3, borderRadius: 3, background: 'linear-gradient(135deg, #e0c3fc 0%, #9bb5ff 100%)', mb: 4 }}>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                              ⚙️ Accessibility Features
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, justifyContent: 'center' }}>
                              {formData.accessibility.map(optionId => {
                                const option = accessibilityOptions.find(o => o.id === optionId);
                                return (
                                  <Chip 
                                    key={optionId}
                                    label={option?.label}
                                    size="small"
                                  />
                                );
                              })}
                            </Box>
                          </Paper>
                        )}

                        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
                          Everything looks great! Click the button below to start your learning adventure! 🚀
                        </Typography>
                      </Box>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Enhanced Navigation Buttons */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4, pt: 3, borderTop: '1px solid rgba(0,0,0,0.1)' }}>
                  <Button
                    onClick={handleBack}
                    variant="outlined"
                    startIcon={<ArrowBack />}
                    disabled={currentStep === 0}
                    sx={{ 
                      borderRadius: 3, 
                      px: 3,
                      opacity: currentStep === 0 ? 0 : 1,
                      transition: 'opacity 0.3s ease'
                    }}
                  >
                    Back
                  </Button>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {currentStep + 1} of {steps.length}
                    </Typography>
                  </Box>
                  
                  {currentStep < steps.length - 1 ? (
                    <Button
                      onClick={handleNext}
                      variant="contained"
                      endIcon={<ArrowForward />}
                      disabled={!validateStep(currentStep)}
                      sx={{
                        borderRadius: 3,
                        px: 4,
                        py: 1.5,
                        background: validateStep(currentStep) 
                          ? 'linear-gradient(135deg, #4CAF50 0%, #45A049 100%)'
                          : 'linear-gradient(135deg, #ccc 0%, #999 100%)',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        boxShadow: validateStep(currentStep) 
                          ? '0 8px 25px rgba(76, 175, 80, 0.3)'
                          : 'none',
                      }}
                    >
                      Next Step
                    </Button>
                  ) : (
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        endIcon={<Celebration />}
                        sx={{
                          borderRadius: 3,
                          px: 5,
                          py: 2,
                          background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
                          fontSize: '1.3rem',
                          fontWeight: 700,
                          textTransform: 'none',
                          boxShadow: '0 12px 35px rgba(255, 154, 158, 0.4)',
                        }}
                      >
                        Start My Adventure! 🚀
                      </Button>
                    </motion.div>
                  )}
                </Box>
              </Box>
            </Paper>
          </motion.div>
          
          {/* Enhanced Footer */}
          <motion.div variants={itemVariants}>
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                <EmojiEvents sx={{ mr: 1, verticalAlign: 'middle', fontSize: '1rem' }} />
                Join thousands of kids already on their learning adventure with Knowledge Nook!
              </Typography>
            </Box>
          </motion.div>
        </motion.div>
      </Container>
      
      <Snackbar open={!!error} autoHideDuration={5000} onClose={() => setError('')}>
        <Alert severity="error" onClose={() => setError('')} sx={{ borderRadius: 2 }}>
          {error}
        </Alert>
      </Snackbar>
      
      <Snackbar open={success} autoHideDuration={4000} onClose={() => setSuccess(false)}>
        <Alert severity="success" sx={{ borderRadius: 2 }}>
          🎉 Profile created successfully! Welcome to your personalized learning adventure!
        </Alert>
      </Snackbar>
    </Box>
  );
}