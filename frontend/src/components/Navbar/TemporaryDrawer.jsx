import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import CategoryIcon from '@mui/icons-material/Category';
import { useNavigate } from 'react-router';

export default function TemporaryDrawer({ open, toggleDrawer }) {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
            <List>
                <ListItem key={'Dashboard'} disablePadding>
                    <ListItemButton onClick={() => navigate('/dashboard')}>
                        <ListItemIcon>
                            <SpaceDashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Dashboard'} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={'Medicines'} disablePadding>
                    <ListItemButton onClick={() => navigate('/medicines')}>
                        <ListItemIcon>
                            <VaccinesIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Medicines'} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={'Categories'} disablePadding>
                    <ListItemButton href='#catergories'>
                        <ListItemIcon>
                            <CategoryIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Categories'} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem key='sign-out' disablePadding>
                    <ListItemButton onClick={logout}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Logout'} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Drawer open={open} onClose={toggleDrawer}>
            {DrawerList}
        </Drawer>
    );
}