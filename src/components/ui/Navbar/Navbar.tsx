import { Brightness4, Brightness7 } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Slide,
  Stack,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material';
import { useContext, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { iconComponents, MOVIE_LISTS, TOP_LISTS } from '../../../constants';
import { ColorModeContext } from '../../../context/ToggleColorMode';
import Search from '../Search';

export const Icon = ({ iconName }: { iconName: string }) => {
  // @ts-ignore
  const IconComponent = iconComponents[iconName];
  return <IconComponent />;
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { toggleColorMode, mode } = useContext(ColorModeContext);

  const handleDrawerToggle = () => {
    setIsOpen(prevState => !prevState);
  };

  const trigger = useScrollTrigger({
    target: window,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar>
        <Container>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              variant="temporary"
              open={isOpen}
              onClose={handleDrawerToggle}
            >
              <Box sx={{ width: 250 }} onClick={handleDrawerToggle}>
                <List>
                  {TOP_LISTS.map(genre => (
                    <Link
                      key={genre.title}
                      component={RouterLink}
                      to={genre.url}
                      sx={{ textDecoration: 'none' }}
                    >
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <Icon iconName={genre.icon} />
                          </ListItemIcon>
                          <ListItemText primary={genre.title} />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  ))}
                </List>
                <Divider />
                <List>
                  {MOVIE_LISTS.map(movie => (
                    <Link
                      key={movie.title}
                      component={RouterLink}
                      to={movie.url}
                      sx={{ textDecoration: 'none' }}
                    >
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <Icon iconName={movie.icon} />
                          </ListItemIcon>
                          <ListItemText primary={movie.title} />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  ))}
                </List>
              </Box>
            </Drawer>
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Typography
                sx={{ color: 'white', textDecoration: 'none' }}
                component={RouterLink}
                to="/"
                variant="h5"
              >
                Teen Gud Movies
              </Typography>
              <Search />
              <IconButton color="inherit" onClick={toggleColorMode}>
                {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </Slide>
  );
}
