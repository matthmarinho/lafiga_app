import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
    Drawer, CssBaseline, AppBar, Toolbar, List, Typography,
    Divider, IconButton, ListItem, ListItemIcon, ListItemText, Collapse, 
    Button, Menu, MenuItem, Avatar, TextField, FormControlLabel, Checkbox, Grid, Link, Card,
    CardHeader, CardMedia, CardContent, CardActions, withStyles
} from '@material-ui/core'
import ImageMap from '../ImageMap/ImageMap'
import LoginModal from '../Login/LoginModal'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import PublicIcon from '@material-ui/icons/Public';
import RoomIcon from '@material-ui/icons/Room';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { red } from '@material-ui/core/colors';

import {userData} from '../../services/auth'

const drawerWidth = 240

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
        overflow: 'hidden'
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
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
}))

export default function Home() {
    const classes = useStyles()
    const theme = useTheme()
    const [name, setName] = useState(null);
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const [openCollapse, setOpenCollapse] = useState(false)
    const [mapName, setMapName] = useState('melee');
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const menuId = 'primary-search-account-menu';
    const isMenuOpen = Boolean(anchorEl);

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
    const getName = () => {
        const {newName} = userData()
        return newName
    }

    const renderMenu = (
       name ? null : <LoginModal anchorEl={anchorEl} setAnchorEl={setAnchorEl}/>
    );

    useEffect(() => {
        const newName = userData()
        if (newName) {
            setName(newName.name)
        }
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
                    { name ? 'Bem Vindo ' + name :<Button color="inherit">Login</Button>}
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
                                    {['melee', 'ostrov', 'thosgrar'].map((city, index) => (
                                        <ListItem key={city} button className={classes.nested} onClick={() => setMapName(city)}>
                                            <ListItemIcon>
                                                <RoomIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={capitalize(city)} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Collapse>
                        </>
                    ))}
                </List>
            </Drawer>
            <main className={classes.mapContent}>
                <div className={classes.drawerHeader} />
                <ImageMap mapName={mapName} />
            </main>
        </div>
    )
}