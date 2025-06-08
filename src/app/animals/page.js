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

const animals = {
  domestic: [
    { name: 'Dog', emoji: '🐕', sound: 'Woof!', audio: '/audio/dog.mp3' },
    { name: 'Cat', emoji: '🐱', sound: 'Meow!', audio: '/audio/cat.mp3' },
    { name: 'Cow', emoji: '🐄', sound: 'Moo!', audio: '/audio/cow.mp3' },
    { name: 'Chicken', emoji: '🐔', sound: 'Cluck!', audio: '/audio/chicken.mp3' },
  ],
  wild: [
    { name: 'Lion', emoji: '🦁', sound: 'Roar!', audio: '/audio/lion.mp3' },
    { name: 'Elephant', emoji: '🐘', sound: 'Trumpet!', audio: '/audio/elephant.mp3' },
    { name: 'Monkey', emoji: '🐒', sound: 'Ooh ooh!', audio: '/audio/monkey.mp3' },
    { name: 'Zebra', emoji: '🦓', sound: 'Neigh!', audio: '/audio/zebra.mp3' },
  ],
};

export default function AnimalsPage() {
  const theme = useTheme();
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);

  const handleAnimalClick = (animal) => {
    setSelectedAnimal(animal);
    // Play audio when animal is clicked
    const audio = new Audio(animal.audio);
    audio.play().catch(error => console.log('Audio playback failed:', error));
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
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
          Learn About Animals
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          centered
          sx={{
            '& .MuiTab-root': {
              fontSize: '1.2rem',
              fontWeight: 'bold',
            },
          }}
        >
          <Tab label="Domestic Animals" />
          <Tab label="Wild Animals" />
        </Tabs>
      </Box>

      <Grid container spacing={3}>
        {(currentTab === 0 ? animals.domestic : animals.wild).map((animal) => (
          <Grid item xs={6} sm={4} md={3} key={animal.name}>
            <Card
              sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
                bgcolor: currentTab === 0 ? 'success.light' : 'secondary.light',
                color: 'white',
              }}
              onClick={() => handleAnimalClick(animal)}
            >
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h1" component="div" gutterBottom>
                  {animal.emoji}
                </Typography>
                <Typography variant="h3" component="div" gutterBottom>
                  {animal.name}
                </Typography>
                <Typography variant="h5" component="div" gutterBottom>
                  {animal.sound}
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