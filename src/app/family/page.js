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
} from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';

const familyMembers = [
  { name: 'Mom', emoji: '👩', audio: '/audio/mom.mp3' },
  { name: 'Dad', emoji: '👨', audio: '/audio/dad.mp3' },
  { name: 'Grandma', emoji: '👵', audio: '/audio/grandma.mp3' },
  { name: 'Grandpa', emoji: '👴', audio: '/audio/grandpa.mp3' },
  { name: 'Sister', emoji: '👧', audio: '/audio/sister.mp3' },
  { name: 'Brother', emoji: '👦', audio: '/audio/brother.mp3' },
  { name: 'Baby', emoji: '👶', audio: '/audio/baby.mp3' },
];

export default function FamilyPage() {
  const theme = useTheme();
  const [selectedMember, setSelectedMember] = useState(null);

  const handleMemberClick = (member) => {
    setSelectedMember(member);
    // Play audio when family member is clicked
    const audio = new Audio(member.audio);
    audio.play().catch(error => console.log('Audio playback failed:', error));
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
          Meet the Family
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {familyMembers.map((member) => (
          <Grid item xs={6} sm={4} md={3} key={member.name}>
            <Card
              sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
                bgcolor: 'secondary.light',
                color: 'white',
              }}
              onClick={() => handleMemberClick(member)}
            >
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h1" component="div" gutterBottom>
                  {member.emoji}
                </Typography>
                <Typography variant="h3" component="div" gutterBottom>
                  {member.name}
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