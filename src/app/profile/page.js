'use client';

import { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Avatar, 
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  IconButton
} from '@mui/material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

const avatarOptions = [
  { emoji: '👦', label: 'Boy' },
  { emoji: '👧', label: 'Girl' },
  { emoji: '🐱', label: 'Cat' },
  { emoji: '🐶', label: 'Dog' },
  { emoji: '🦁', label: 'Lion' },
  { emoji: '🐼', label: 'Panda' },
  { emoji: '🦊', label: 'Fox' },
  { emoji: '🐰', label: 'Rabbit' },
];

const ageOptions = [
  { value: '2-3', label: '2-3 years' },
  { value: '4-5', label: '4-5 years' },
  { value: '6-7', label: '6-7 years' },
  { value: '8+', label: '8+ years' },
];

export default function ProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    avatar: '👦',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarSelect = (avatar) => {
    setFormData(prev => ({
      ...prev,
      avatar
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name.trim()) {
      setError('Please enter a name');
      return;
    }
    
    if (!formData.age) {
      setError('Please select an age group');
      return;
    }
    
    // Save profile to localStorage
    localStorage.setItem('userProfile', JSON.stringify(formData));
    
    // Show success message
    setSuccess(true);
    
    // Redirect to home page after a short delay
    setTimeout(() => {
      router.push('/');
    }, 1500);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background elements */}
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
      
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper 
            elevation={6} 
            sx={{ 
              borderRadius: 4, 
              overflow: 'hidden',
              boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
            }}
          >
            <Box sx={{ 
              p: 4, 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #FF9A9E 0%, #FAD0C4 100%)',
              color: 'white',
            }}>
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
                  variant="h3" 
                  component="h1" 
                  sx={{ 
                    fontWeight: 800,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                    mb: 1,
                  }}
                >
                  Create Your Profile
                </Typography>
              </motion.div>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Let's get to know you before we start learning!
              </Typography>
            </Box>
            
            <Box component="form" onSubmit={handleSubmit} sx={{ p: 4 }}>
              <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Choose your avatar
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                  {avatarOptions.map((option) => (
                    <Grid item key={option.emoji}>
                      <IconButton
                        onClick={() => handleAvatarSelect(option.emoji)}
                        sx={{
                          width: 60,
                          height: 60,
                          fontSize: '2rem',
                          border: formData.avatar === option.emoji ? 
                            '3px solid #764ba2' : '3px solid transparent',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            backgroundColor: 'rgba(118, 75, 162, 0.1)',
                          }
                        }}
                      >
                        {option.emoji}
                      </IconButton>
                    </Grid>
                  ))}
                </Grid>
              </Box>
              
              <TextField
                fullWidth
                label="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                sx={{ mb: 3 }}
                InputProps={{
                  sx: { borderRadius: 2 }
                }}
              />
              
              <FormControl fullWidth margin="normal" sx={{ mb: 4 }}>
                <InputLabel>Age Group</InputLabel>
                <Select
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  label="Age Group"
                  sx={{ borderRadius: 2 }}
                >
                  {ageOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                  }}
                >
                  Start Learning Adventure!
                </Button>
              </motion.div>
            </Box>
          </Paper>
          
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              Knowledge Nook - Making learning fun for kids!
            </Typography>
          </Box>
        </motion.div>
      </Container>
      
      <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError('')}>
        <Alert severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      </Snackbar>
      
      <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)}>
        <Alert severity="success">
          Profile created successfully! Redirecting to learning modules...
        </Alert>
      </Snackbar>
    </Box>
  );
}