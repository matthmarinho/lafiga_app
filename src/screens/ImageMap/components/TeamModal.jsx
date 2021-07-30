import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
    List, Typography,
    Divider, IconButton, ListItem, ListItemText, 
    Button, Checkbox, Link,
    withStyles, Accordion, AccordionSummary,
    AccordionDetails
} from '@material-ui/core'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { red } from '@material-ui/core/colors';

const drawerWidth = 240

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

export default function TeamModal({groups, openDrower, handleTeamDrawerClose}) {
    const classes = useStyles()
    const theme = useTheme()


    return (
        <div
          className={clsx(classes.list, 'teams')}
          role="presentation"
        //   onClick={() => toggleDrawer(false)}
        //   onKeyDown={() => toggleDrawer(false)}
        >
                <div className={classes.teamDrawerHeader}>
            <IconButton onClick={() => handleTeamDrawerClose()}>
                {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
            </div>
            <Divider />
          <List>
            {groups.map((text, index) => (
                <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={text.id}
                  id={text.id}
                >
                    <ListItem key={text.id}>
                        {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                    <ListItemText primary={`${text.group} - ${text.date}`} />
                    </ListItem>

                </AccordionSummary>
                <AccordionDetails>
                    <List>
                        <ListItem>
                        <Typography>
                            Membro 1
                        </Typography>
                        </ListItem>
                        <ListItem>
                        <Typography>
                            Membro 2
                        </Typography>
                        </ListItem>
                        <ListItem>
                        <Typography>
                            Membro 3
                        </Typography>
                        </ListItem>
                        <ListItem>
                        <Typography>
                            Membro 4
                        </Typography>
                        </ListItem>
                        <ListItem>
                        <Typography>
                            Membro 5
                        </Typography>
                        </ListItem>
                        <ListItem>
                        <Typography>
                            Membro 6
                        </Typography>
                        </ListItem>
                    </List>
                </AccordionDetails>
              </Accordion>
 
            ))}
          </List>
        </div>
    )
}
