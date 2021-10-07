import React, { useState, useEffect, useCallback } from 'react'
import { styled } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import MapService from './../../services/maps'
import { Box } from '@mui/system'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { userData, logout } from '../../services/auth'
import LoginModal from '../Login/LoginModal'
import SidebarItems from './components/SidebarItems'
import IconComponents from './components/IconComponents'
import { Link } from "react-router-dom"
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import TeamModal from './components/TeamModal'
import GroupService from '../../services/group'

const drawerWidth = 300

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
}))

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

const WelcomeDiv = styled('div')(({ theme }) => ({
    paddingRight: theme.spacing(1)
}))

const FooterDiv = styled('div')(({ theme }) => ({
    bottom: 0,
    textAlign: "center",
    paddingTop: 10,
    width: '100%'
}))

const generateCollapseState = (array, key, value) => {
    const initialValue = {}
    return array.reduce((obj, item) => {
        return {
            ...obj,
            [item[key]]: value,
        }
    }, initialValue);
}

function NavBarContent() {
    const [open, setOpen] = useState(false)
    const [openCollapse, setOpenCollapse] = useState(generateCollapseState(SidebarItems, 'name', false))
    const [map, setMap] = useState(null)
    const [mapName, setMapName] = useState(null)
    const [maps, setMaps] = useState([])
    const [user, setUser] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null)
    const [logged, setLogged] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)
    const [sideBarItems, setSideBarItems] = useState([])
    const [openDrawer, setOpenDrawer] = useState(false)
    const [groupObject, setGroupObject] = useState()

    const menuId = 'primary-search-account-menu'

    const handleListItemClick = (event, index) => {
        setActiveIndex(index);
    };

    const handleClick = (key) => {
        setOpenCollapse(prevState => ({
            ...prevState,
            [key]: !prevState[key]
        }))
    }

    const toggleDrawer = () => {
        setOpen(!open)
    }

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    const renderMenu = (
        user ? null : <LoginModal anchorEl={anchorEl} setAnchorEl={setAnchorEl} setLogged={setLogged} />
    )

    const setMapsId = (data) => {
        const sideItems = SidebarItems
        const index = sideItems.findIndex(item => item.name === "Map")
        const sideMaps = sideItems[index].items

        SidebarItems[index].items = sideMaps.map((item) => {
            let info = data.find((e) => e.name === item.name)
            if (info) {
                item.route += `/${info.id}`
                return { ...info, ...item }
            } else {
                return { ...item }
            }
        })

        setSideBarItems(SidebarItems)
    }

    const getMenuData = () => {
        MapService.getAll()
            .then(response => {
                setMaps(response.data)
                setMapsId(response.data)
            })
            .catch(e => {
                console.log(e)
            })
    }

    const handleLogout = () => {
        logout()
        setLogged(false)
        setUser(null)
        window.location.reload()
    }

    const renderComponent = (index) => {
        const ComponentToRender = IconComponents[index]
        return <ComponentToRender />
    }

    const handleTeamDrawerOpen = () => {
        console.log('open')
        setOpenDrawer(true);
    }

    const handleTeamDrawerClose = () => {
        console.log('close')
        setOpenDrawer(false);
    };

    const groupList = () => (
        <TeamModal
            groupsObject={groupObject}
            setGroupObject={setGroupObject}
            openDrawer={openDrawer}
            handleTeamDrawerClose={handleTeamDrawerClose}
            user={user}
        />
    )

    const getGroups = useCallback(async () => {
        GroupService.getAll()
            .then(response => {
                if (response.data.length > 0) {
                    console.log(response.data.length)
                    let group = response.data.map(x => Object.assign(x, {
                        group: x.name,
                        date: `${x.season} - ${x.day}º dia`,
                        players: x.players
                    }))
                    setGroupObject(group)
                } else {
                    setGroupObject([])
                }
            })
            .catch(e => {
                console.error(e);
            });
    }, [])

    useEffect(() => {
        getGroups()
    }, [getGroups])

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
                <Drawer variant="permanent" open={open} onClose={toggleDrawer}>
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
                        {sideBarItems.map((item, index) => (
                            <React.Fragment key={`fragment_${index}`}>
                                <ListItemButton
                                    key={`button_${index}`}
                                    selected={activeIndex === index}
                                    onClick={(event) => {
                                        if (item.name === 'Teams') {
                                            handleTeamDrawerOpen()
                                        }
                                        handleClick(item.name, index)
                                    }}
                                    component={item.route && Link}
                                    to={item.route}
                                >
                                    <ListItemIcon key={`item_icon_${index}`}>
                                        {renderComponent(item.icon)}
                                    </ListItemIcon>
                                    <ListItemText key={`item_text_${index}`} primary={item.name} />
                                    {item.items && (openCollapse[item.name] ? <ExpandLess /> : <ExpandMore />)}
                                </ListItemButton>
                                {item.items &&
                                    <Collapse key={`collapse_${index}`} in={openCollapse[item.name]} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding key={`list_${index}`}>
                                            {item.items.map((nestedItem, idx) => (
                                                <ListItemButton
                                                    key={`list_button_${index}_${idx}`}
                                                    sx={{ pl: 4 }}
                                                    disabled={!nestedItem.active}
                                                    onClick={(e) => handleListItemClick(e, index)}
                                                    component={nestedItem.route && Link}
                                                    to={nestedItem.route}
                                                >
                                                    <ListItemIcon key={`list_icon_${index}_${idx}`} >
                                                        {renderComponent(nestedItem.icon)}
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        key={`list_item_${index}_${idx}`}
                                                        primary={nestedItem.name}
                                                        secondary={!nestedItem.active && "Coming Soon"}
                                                    />
                                                </ListItemButton>
                                            ))}
                                        </List>
                                    </Collapse>
                                }
                            </React.Fragment>
                        ))}
                        <SwipeableDrawer
                            anchor={'right'}
                            open={openDrawer}
                            onClose={() => setOpenDrawer(false)}
                            onOpen={() => setOpenDrawer(true)}
                        >
                            {groupList()}
                        </SwipeableDrawer>
                    </List>
                    <Divider />
                    <Box sx={{ alignItems: 'flex-end' }}>
                        <FooterDiv>
                            <Typography>Version: {`${process.env.REACT_APP_VERSION}`}</Typography>
                        </FooterDiv>
                    </Box>
                </Drawer>
            </Box>
            {renderMenu}
        </>
    )
}

export default function NavBar() {
    return <NavBarContent />
}