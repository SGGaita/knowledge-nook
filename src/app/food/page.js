'use client';

import { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  useTheme,
  Tabs,
  Tab,
} from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';

const foods = {
  fruits: [
    { name: 'Apple', emoji: '🍎', audio: '/audio/apple.mp3' },
    { name: 'Banana', emoji: '🍌', audio: '/audio/banana.mp3' },
    { name: 'Orange', emoji: '🍊', audio: '/audio/orange.mp3' },
  ],
  vegetables: [
    { name: 'Carrot', emoji: '🥕', audio: '/audio/carrot.mp3' },
    { name: 'Broccoli', emoji: '🥦', audio: '/audio/broccoli.mp3' },
    { name: 'Tomato', emoji: '🍅', audio: '/audio/tomato.mp3' },
  ],
  snacks: [
    { name: 'Cookie', emoji: '🍪', audio: '/audio/cookie.mp3' },
    { name: 'Cracker', emoji: '🥨', audio: '/audio/cracker.mp3' },
  ],
  meals: [
    { name: 'Pizza', emoji: '🍕', audio: '/audio/pizza.mp3' },
    { name: 'Pasta', emoji: '🍝', audio: '/audio/pasta.mp3' },
  ],
};

const categories = [
  { label: 'Fruits', value: 'fruits' },
  { label: 'Vegetables', value: 'vegetables' },
  { label: 'Snacks', value: 'snacks' },
  { label: 'Meals', value: 'meals' },
];

export default function FoodPage() {
  const theme = useTheme();
  const [selectedFood, setSelectedFood] = useState(null);
  const [currentCategory, setCurrentCategory] = useState('fruits');

  const handleFoodClick = (food) => {
    setSelectedFood(food);
    // Play audio when food is clicked
    const audio = new Audio(food.audio);
    audio.play().catch(error => console.log('Audio playback failed:', error));
  };

  const handleCategoryChange = (event, newValue) => {
    setCurrentCategory(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Link href="/" passHref>
          <IconButton
            sx={{
              mr: 2,
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': { bgcolor: 'primary.dark' },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Link>
        <Typography variant="h2" component="h1" color="primary">
          Learn About Food
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs
          value={currentCategory}
          onChange={handleCategoryChange}
          centered
          sx={{
            '& .MuiTab-root': {
              fontSize: '1.2rem',
              fontWeight: 'bold',
            },
          }}
        >
          {categories.map((category) => (
            <Tab
              key={category.value}
              label={category.label}
              value={category.value}
            />
          ))}
        </Tabs>
      </Box>

      <Grid container spacing={3}>
        {foods[currentCategory].map((food) => (
          <Grid item xs={6} sm={4} md={3} key={food.name}>
            <Card
              sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
                bgcolor: 'primary.light',
                color: 'white',
              }}
              onClick={() => handleFoodClick(food)}
            >
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h1" component="div" gutterBottom>
                  {food.emoji}
                </Typography>
                <Typography variant="h3" component="div" gutterBottom>
                  {food.name}
                </Typography>
                <IconButton
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.3)',
                    },
                  }}
                >
                  <VolumeUpIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
} 