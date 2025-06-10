import Box from '@mui/material/Box';
import ThemeRegistry from './ThemeRegistry';

export const metadata = {
  title: 'Knowledge Nook - Toddler Learning App',
  description: 'An interactive learning platform for toddlers',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Box
            sx={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              bgcolor: 'background.default',
            }}
          >
        {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
