import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import './Header.scss'
import UnsplashIcon from '../../assets/Logo.svg'

const navItems = ['Home', 'Collections'];

export default function Header() {
  return (
    <Box sx={{ display: 'flex', marginBottom: '3.8rem'}}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <div
            color="inherit"
            aria-label="open drawer"
          >
            <a href='/'><img src={UnsplashIcon} alt="unsplash-icon"></img></a>
          </div>
          <Box>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }} href={item === 'Home' ? '/': '/collections'}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
