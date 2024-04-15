import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';

const pages = ['Home', 'Admin Page'];

function ResponsiveAppBar() {
  return (
    <AppBar>
      <Container maxWidth="100%">
        <Toolbar disableGutters>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            {pages.map((page) => (
              <Tab
                key={page}
                label={page}
                component={Link}
                to={page === 'Home' ? '/' : `/${page}`}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
              </Tab>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
