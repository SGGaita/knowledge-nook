'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Button, Menu, MenuItem } from '@mui/material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function ProfileDisplay() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  useEffect(() => {
    // Get profile from localStorage
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleEditProfile = () => {
    router.push('/profile');
    handleClose();
  };
  
  const handleSignOut = () => {
    localStorage.removeItem('userProfile');
    router.push('/profile');
    handleClose();
  };
  
  if (!profile) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box 
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          cursor: 'pointer',
          padding: '8px 16px',
          borderRadius: 30,
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          transition: 'all 0.2s ease',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.25)',
          }
        }}
        onClick={handleClick}
      >
        <Box 
          sx={{ 
            fontSize: '1.8rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {profile.avatar}
        </Box>
        <Typography sx={{ color: 'white', fontWeight: 500 }}>
          {profile.name}
        </Typography>
      </Box>
      
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: 2,
            minWidth: 180,
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          }
        }}
      >
        <MenuItem onClick={handleEditProfile}>Edit Profile</MenuItem>
        <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
      </Menu>
    </motion.div>
  );
}