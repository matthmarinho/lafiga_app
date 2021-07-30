import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
    Drawer, CssBaseline, AppBar, Toolbar, List, Typography,
    Divider, IconButton, ListItem, ListItemIcon, ListItemText, Collapse, 
    Button, Menu, MenuItem, Avatar, TextField, FormControlLabel, Checkbox, Grid, Link, Card,
    CardHeader, CardMedia, CardContent, CardActions, withStyles, SwipeableDrawer, Accordion, AccordionSummary,
    AccordionDetails
} from '@material-ui/core'
import ImageMap from '../ImageMap/ImageMap'
import LoginModal from '../Login/LoginModal'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import PublicIcon from '@material-ui/icons/Public';
import RoomIcon from '@material-ui/icons/Room';
import AccountCircle from '@material-ui/icons/AccountCircle';
import TeamModal from '../ImageMap/components/TeamModal'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import GroupIcon from '@material-ui/icons/Group';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { red } from '@material-ui/core/colors';

import {userData} from '../../services/auth'

const drawerWidth = 240

const api = {
    data: [
        {
            id: 1,
            name: 'melee',
        },
        {
            id: 2,
            name: 'ostrov',
        },
        {
            id: 3,
            name: 'thosgrar',
        },
    ]
}
const groups = [
    {
        id: 1, 
        group: 'Grupo 1', 
        date: 'Inverno - 50º dia'
    }, 
    {
        id: 2, 
        group: 'Grupo 2', 
        date: 'Inverno - 62º dia'
    }, 
    {
        id: 3, 
        group: 'Grupo 3', 
        date: 'Inverno - 90º dia'
    }, 
    {
        id: 4, 
        group: 'Grupo 4', 
        date: 'Inverno - 112º dia'
    }
]

const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(red[500]),
      backgroundColor: red[500],
      '&:hover': {
        backgroundColor: red[700],
      },
    },
  }))(Button);

const ColorLink = withStyles((theme) => ({
    root: {
      color: red[500],
      '&:hover': {
        color: red[700],
      },
    },
  }))(Link);

  const ColorCheckbox = withStyles((theme) => ({
    root: {
      color: red[500],
      '&:hover': {
        color: red[700],
      },
    },
  }))(Checkbox);

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    mapContent: {
        flexGrow: 1,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
        height: '100vh',
        overflow: 'hidden',
        paddingTop: '64px'
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    title: {
        flexGrow: 1,
    },
    paper: {
        marginTop: theme.spacing(8),
        peddingTop: theme.spacing(8),
        maxWidth: theme.spacing(50),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    loginCard: {
        maxWidth: 345,
        background: 'black'
    },
    media: {
        height: 0,
        paddingTop: '60.25%', // 16:9
    },
    list: {
        width: 500,
      },
    teamDrawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
    }
}))

export default function Home() {
    const classes = useStyles()
    const theme = useTheme()
    const [name, setName] = useState(null)
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const [openCollapse, setOpenCollapse] = useState(false)
    const [mapName, setMapName] = useState('melee');
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)
    const [maps, setMaps] = useState([])
    const [openDrower, setOpenDrower] = useState(false);
    const menuId = 'primary-search-account-menu';
    const isMenuOpen = Boolean(anchorEl)

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
      };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }; 

    const handleTeamDrawerOpen = () => {
        if(openDrower == false)
            setOpenDrower(true);
    };
    
    const handleTeamDrawerClose = () => {
        console.log('123')
        setOpenDrower(false);
    };
    

    const renderMenu = (
       name ? null : <LoginModal anchorEl={anchorEl} setAnchorEl={setAnchorEl}/>
    );

    const getMenuData = () => {
        setMaps(api.data)
    }

    useEffect(() => {
        getMenuData()
    }, [])
    const list = () => (
        <TeamModal groups={groups} openDrower={openDrower} handleTeamDrawerClose={handleTeamDrawerClose}/>
      );

    useEffect(() => {
        const newName = userData()
        if (newName) {
            setName(newName.name)
        }
        getMenuData()
    }, [userData()])

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title} noWrap>
                        Láfiga Mundi
                    </Typography>
                    { name ? 'Bem vindo ' + name : null }
                    <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
            </AppBar>
            {renderMenu}
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {['Continentes'].map((text, index) => (
                        <>
                            <ListItem button key={text} onClick={() => setOpenCollapse(!openCollapse)}>
                                <ListItemIcon><PublicIcon /></ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                            <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {maps.map((map, index) => (
                                        <ListItem key={map.id} button className={classes.nested} onClick={() => setMapName(map.name)}>
                                            <ListItemIcon>
                                                <RoomIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={capitalize(map.name)} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Collapse>
                        </>
                    ))}
                    <ListItem button key={'teams'} onClick={() => handleTeamDrawerOpen()}>
                        <ListItemIcon><GroupIcon /></ListItemIcon>
                        <ListItemText primary={'Equipes'} />
                        <SwipeableDrawer
                            anchor={'right'}
                            open={openDrower}
                        >
                            {list()}
                        </SwipeableDrawer>
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.mapContent}>
                <ImageMap mapName={mapName} />
            </main>
        </div>
    )
}