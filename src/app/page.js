'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Grid, Typography, Card, CardContent, Box, Chip, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { PlayArrow, Star, Lightbulb } from '@mui/icons-material';
import ProfileDisplay from './components/ProfileDisplay';

const modules = [
  {
    title: 'Colors',
    description: 'Explore the rainbow and learn about different colors',
    icon: '🎨',
    path: '/colors',
    gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 50%, #FFB3B3 100%)',
    difficulty: 'Easy',
    lessons: 12,
    category: 'Creative'
  },
  {
    title: 'Numbers',
    description: 'Count, add, and discover the magic of mathematics',
    icon: '🔢',
    path: '/numbers',
    gradient: 'linear-gradient(135deg, #4ECDC4 0%, #44B3AC 50%, #3A9B94 100%)',
    difficulty: 'Medium',
    lessons: 15,
    category: 'Math'
  },
  {
    title: 'Family',
    description: 'Meet family members and learn relationships',
    icon: '👨‍👩‍👧‍👦',
    path: '/family',
    gradient: 'linear-gradient(135deg, #95E1D3 0%, #81D4C5 50%, #6CC7B7 100%)',
    difficulty: 'Easy',
    lessons: 8,
    category: 'Social'
  },
  {
    title: 'Animals',
    description: 'Discover amazing creatures from around the world',
    icon: '🦁',
    path: '/animals',
    gradient: 'linear-gradient(135deg, #FFD93D 0%, #FFE066 50%, #FFE799 100%)',
    difficulty: 'Easy',
    lessons: 20,
    category: 'Nature'
  },
  {
    title: 'Food',
    description: 'Learn about healthy foods and nutrition',
    icon: '🍎',
    path: '/food',
    gradient: 'linear-gradient(135deg, #FF8B8B 0%, #FFA3A3 50%, #FFBBBB 100%)',
    difficulty: 'Medium',
    lessons: 10,
    category: 'Health'
  },
];

const MotionCard = motion(Card);

const getDifficultyIcon = (difficulty) => {
  switch(difficulty) {
    case 'Easy': return '⭐';
    case 'Medium': return '⭐⭐';
    case 'Hard': return '⭐⭐⭐';
    default: return '⭐';
  }
};

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    // Check if user profile exists in localStorage
    const userProfile = localStorage.getItem('userProfile');
    
    // If no profile exists, redirect to profile creation page
    if (!userProfile) {
      router.push('/profile');
    }
  }, [router]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Floating Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 107, 107, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(78, 205, 196, 0.3) 0%, transparent 50%)
          `,
          zIndex: 0,
        }}
      />

      {/* Profile Display - Added at the top right */}
      <Box sx={{ 
        position: 'absolute', 
        top: 20, 
        right: 20, 
        zIndex: 10 
      }}>
        <ProfileDisplay />
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 8 }}>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontSize: { xs: '3rem', md: '4.5rem' },
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                  mb: 2,
                  letterSpacing: '-0.02em',
                }}
              >
                Knowledge Nook ✨
              </Typography>
            </motion.div>
            
            <Typography
              variant="h5"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                maxWidth: '700px',
                mx: 'auto',
                mb: 4,
                fontSize: { xs: '1.2rem', md: '1.5rem' },
                fontWeight: 300,
                lineHeight: 1.6,
              }}
            >
              Embark on an exciting learning adventure! Choose your path and discover new worlds of knowledge.
            </Typography>

            {/* Stats Section */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 2 }}>
              {[
                { icon: '📚', label: 'Lessons', value: '65+' },
                { icon: '🎯', label: 'Topics', value: '5' },
                { icon: '⭐', label: 'Fun Level', value: '100%' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <Box sx={{ textAlign: 'center', color: 'white' }}>
                    <Typography variant="h4" sx={{ mb: 0.5 }}>
                      {stat.icon}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      {stat.label}
                    </Typography>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </Box>
        </motion.div>

        {/* Modules Grid */}
        <Grid container spacing={4}>
          {modules.map((module, index) => (
            <Grid item xs={12} sm={6} lg={4} key={module.title}>
              <Link href={module.path} style={{ textDecoration: 'none' }}>
                <MotionCard
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.15,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  sx={{
                    height: '100%',
                    background: module.gradient,
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                    cursor: 'pointer',
                    position: 'relative',
                    border: '1px solid rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  {/* Floating Decorative Elements */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 20,
                      right: 20,
                      opacity: 0.3,
                      transform: 'rotate(15deg)',
                    }}
                  >
                    <Lightbulb sx={{ fontSize: '2rem', color: 'white' }} />
                  </Box>

                  <CardContent
                    sx={{
                      textAlign: 'center',
                      py: 5,
                      px: 4,
                      color: 'white',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      minHeight: '380px',
                      position: 'relative',
                    }}
                  >
                    {/* Category Badge */}
                    <Chip
                      label={module.category}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 16,
                        left: 16,
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                      }}
                    />

                    {/* Icon with Animation */}
                    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                      <motion.div
                        animate={{
                          y: [0, -8, 0],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        <Typography
                          variant="h1"
                          component="div"
                          sx={{
                            fontSize: { xs: '4rem', md: '5rem' },
                            filter: 'drop-shadow(4px 4px 8px rgba(0,0,0,0.3))',
                            mb: 2,
                          }}
                        >
                          {module.icon}
                        </Typography>
                      </motion.div>
                    </Box>

                    {/* Content */}
                    <Box sx={{ width: '100%' }}>
                      <Typography
                        variant="h4"
                        component="h2"
                        sx={{
                          fontWeight: 800,
                          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                          mb: 2,
                          fontSize: { xs: '1.8rem', md: '2.2rem' },
                        }}
                      >
                        {module.title}
                      </Typography>
                      
                      <Typography
                        variant="body1"
                        sx={{
                          opacity: 0.95,
                          mb: 3,
                          lineHeight: 1.5,
                          fontSize: '1rem',
                        }}
                      >
                        {module.description}
                      </Typography>

                      {/* Module Info */}
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        mb: 3,
                        backgroundColor: 'rgba(255,255,255,0.15)',
                        borderRadius: '12px',
                        px: 2,
                        py: 1,
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                            {getDifficultyIcon(module.difficulty)} {module.difficulty}
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                          📖 {module.lessons} lessons
                        </Typography>
                      </Box>

                      {/* Action Button */}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 1,
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            borderRadius: '50px',
                            py: 1.5,
                            px: 3,
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.3)',
                          }}
                        >
                          <PlayArrow sx={{ fontSize: '1.2rem' }} />
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            Start Learning
                          </Typography>
                        </Box>
                      </motion.div>
                    </Box>
                  </CardContent>
                </MotionCard>
              </Link>
            </Grid>
          ))}
        </Grid>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Box sx={{ textAlign: 'center', mt: 8 }}>
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                mb: 2,
              }}
            >
              Ready to start your learning journey? 🚀
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                maxWidth: '500px',
                mx: 'auto',
              }}
            >
              Choose any topic above and begin exploring! Each module is designed to make learning fun and engaging.
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}