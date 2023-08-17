import React, { useEffect, useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
// import Badge from '@mui/material/Badge';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems, secondaryListItems } from '../utils/listItems';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api_user_profile from '../services/api_user_profile';
import api_config_header from '../services/api_config_header';
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const defaultTheme = createTheme();


const ConfigsPage = () => {
  const [open, setOpen] = useState(true);
  const [contactConfig, setcontactConfig] = useState([]);
  const [newContact, setNewContact] = useState('');
  const [userProfile, setUserProfile] = useState(null);

  const navigate = useNavigate(); // 获取 navigate 函数

  // console.log(userProfile);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(()=>{
    api_user_profile()
    .then(data => {
      setUserProfile(data);
      if(data.is_admin!==1) 
        return navigate("/")
    })
    .catch(err => {
      return navigate("/")
    });
    api_config_header()
    .then(data=>{
      // console.log(data)
      setcontactConfig(data)
    })
    .catch(error=>{
      console.log(error)
    })
    

  },[])
  
  const handleRemoveContact = (index) => {
    const updatedTasks = contactConfig.filter((_, i) => i !== index);
    setcontactConfig(updatedTasks);
  };

  const handleAddContact = () => {
    if (newContact.trim() !== '') {
      const updatedContacts = [...contactConfig, {
        title: 'telephone',
        value: newContact
      }];
      setcontactConfig(updatedContacts);
      setNewContact('');
    }
  };

  const handleUpdateContact = ()=>{
    axios.post('http://localhost:8080/api/config/header/update', contactConfig)
    .then(response => {
      console.log('Data created successfully:', response.data);
    })
    .catch(error => {
      console.error('Error creating data:', error);
    });
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Configuration
            </Typography>
            { !!userProfile && (<span>welcome {userProfile.username} </span>)}
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <h1>configuration</h1>
            {
              !!contactConfig && contactConfig.map((element, index)=>{
                return <div key={index}>
                  <span>contacter{index} {element.value}</span>
                  &nbsp;
                  <button onClick={()=>handleRemoveContact(index)}>remove</button>
                </div>
              })
            }
            <input 
              type="text"
              value={newContact}
              onChange={(e) => setNewContact(e.target.value)}
              />
            <button onClick={handleAddContact}>add</button>
            <div><button onClick={handleUpdateContact}>update</button></div>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export { ConfigsPage };