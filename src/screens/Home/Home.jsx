import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import Public from '@mui/icons-material/Public'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Room from '@mui/icons-material/Room'
import MapService from './services/maps'
import GroupService from './services/group'
import ImageMap from '../ImageMap/ImageMap'
import { Box } from '@mui/system'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { userData, logout } from '../../services/auth'
import LoginModal from '../Login/LoginModal'
import TeamModal from './components/TeamModal'
import LogoutIcon from '@mui/icons-material/Logout'
import GroupIcon from '@mui/icons-material/Group'

const drawerWidth = 240

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
                width: theme.spacing(0),
            }),
        },
    }),
)

const MapDiv = styled('div')(({ theme }) => ({
    flexGrow: 1,
    height: '100vh',
    overflow: 'hidden',
    paddingTop: 64,
}));

const WelcomeDiv = styled('div')(({ theme }) => ({
    paddingRight: theme.spacing(1)
}));

const FooterDiv = styled('div')(({ theme }) => ({
    position: 'absolute',
    bottom: 0,
    textAlign: "center",
    paddingBottom: 10,
    width: '100%'
}));

function HomeContent() {
    const [open, setOpen] = useState(false)
    const [openCollapse, setOpenCollapse] = useState(false)
    const [map, setMap] = useState(null)
    const [mapName, setMapName] = useState(null)
    const [maps, setMaps] = useState([])
    const [groupsObject, setGroupObject] = useState([])
    const [user, setUser] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null)
    const [logged, setLogged] = useState(false)
    const [openDrawer, setOpenDrawer] = useState(false);
    const [groupObject, setGroupObject] = useState()
    const menuId = 'primary-search-account-menu';

    const handleClick = () => {
        setOpenCollapse(!openCollapse);
    };

    const toggleDrawer = () => {
        setOpen(!open);
    }

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    const renderMenu = (
        user ? null : <LoginModal anchorEl={anchorEl} setAnchorEl={setAnchorEl} setLogged={setLogged} />
    );

    const getGroups = async () => {
        GroupService.getAll()
            .then(response => {
                if (response.data.length > 0) {
                    let group = response.data.map(x => Object.assign(x, {
                        group: x.name,
                        date: `${x.season} - ${x.day}º dia`,
                        players: x.players
                    }))
                    setGroupObject(group)
                }
            })
            .catch(e => {
                console.error(e);
            });
    }

    const getMenuData = () => {
        MapService.getAll()
            .then(response => {
                // setMap(response.data[0])
                // setMaps(response.data)
                setMap({id: 3, name: 'Mundi'})
                setMaps([{id: 3, name: 'Mundi'}])
            })
            .catch(e => {
                console.log(e);
            });
    }

    const handleLogout = () => {
        logout()
        setLogged(false)
        setUser(null)
    }

    const handleTeamDrawerOpen = () => {
        if (openDrawer === false)
            setOpenDrawer(true);
    };

    const handleTeamDrawerClose = () => {
        setOpenDrawer(false);
    };

    const groupList = () => (
        <TeamModal groupsObject={groupObject} setGroupObject={setGroupObject} openDrawer={openDrawer} handleTeamDrawerClose={handleTeamDrawerClose} user={user} />
    );

    useEffect(() => {
        getMenuData()
        getGroups()
        setUser(userData())
    }, [])

    useEffect(() => {
        if (logged) {
            setUser(userData())
        }
    }, [logged])

    useEffect(() => {
        if (map && map.name) {
            setMapName(map.name)
        }
    }, [map])

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px',
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
                            Láfiga{mapName ? ` - ${map.name}` : null}
                        </Typography>
                        {user ? <WelcomeDiv>{`Welcome, ${user.name}`}</WelcomeDiv> : null}
                        {user ? 
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleLogout}
                                color="inherit"
                            >
                                <LogoutIcon />
                            </IconButton> :
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircleIcon />
                            </IconButton>
                        }
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
                    <List>
                        {['Continentes'].map((text, index) => (
                            <React.Fragment key={`fragment_${index}`}>
                                <ListItemButton key={`button_${index}`} onClick={handleClick}>
                                    <ListItemIcon key={`item_icon_${index}`}>
                                        <Public key={`icon_public_${index}`}/>
                                    </ListItemIcon>
                                    <ListItemText key={`item_text_${index}`} primary="Maps" />
                                    {openCollapse ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse key={`collapse_${index}`} in={openCollapse} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding key={`list_${index}`}>
                                        {maps.map((map, idx) => (
                                            <ListItemButton key={`list_button_${index}_${idx}`} sx={{ pl: 4 }} onClick={() => setMap(map)}>
                                                <ListItemIcon key={`list_icon_${index}_${idx}`} >
                                                    <Room key={`room_icon_${index}_${idx}`} />
                                                </ListItemIcon>
                                                <ListItemText key={`list_item_${index}_${idx}`} primary={capitalize(map.name)} />
                                            </ListItemButton>
                                        ))}
                                    </List>
                                </Collapse>
                            </React.Fragment>
                        ))}
                         <ListItemButton button key={'teams'} onClick={() => handleTeamDrawerOpen()}>
                        <ListItemIcon><GroupIcon /></ListItemIcon>
                        <ListItemText primary={'Equipes'} />
                        <SwipeableDrawer
                            anchor={'right'}
                            open={openDrawer}
                        >
                            {groupList()}
                        </SwipeableDrawer>
                    </ListItemButton>
                    </List>
                    <Divider />
                    <FooterDiv>
                        <Typography>Version: {`${process.env.REACT_APP_VERSION}`}</Typography>
                    </FooterDiv>
                </Drawer>
                <MapDiv>
                    <ImageMap map={map} user={user} /> 
                </MapDiv>
            </Box>
            {renderMenu}
        </>
    );
}

export default function Home() {
    return <HomeContent />;
}