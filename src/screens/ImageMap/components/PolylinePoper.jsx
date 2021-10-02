import React, { useEffect, useState } from 'react'
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Popper from '@material-ui/core/Popper';
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControl from '@material-ui/core/FormControl'
import { Box, InputLabel, MenuItem, Select, useMediaQuery } from '@material-ui/core'
import { HuePicker } from 'react-color'
import CategoryService from '../services/category'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: '100%',
    },
    textField: {
        paddingBottom: '15px',
        width: '100%',
    },
    textFieldMulti: {
        paddingTop: '15px'
    },
    cancel: {
        color: 'white',
        backgroundColor: 'red'
    },
    create: {
        color: 'white',
        backgroundColor: 'green'
    },
    formControl: {
        margin: theme.spacing(1),
    },
    margin: {
        margin: theme.spacing(1),
    },
}))

export default function PolylinePoper(props) {
    const classes = useStyles()

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        props.setLineName('')
    }, [props.openLineColor])

    return (
        <div>
                <Popper style={{ position: 'relative', zIndex: '999'}} 
                        id="new-line-element" 
                        aria-labelledby="simple-dialog-title" 
                        placement={'top'} 
                        open={props.openLineColor} 
                        anchorEl={props.anchorEl} 
                        transition
                >
                    <TextField id="standard-basic" 
                               label="Nome da rota" 
                               variant="filled" 
                               style={{background: 'black', width: '99%'}} 
                               value={props.lineName} 
                               onInput={e => props.setLineName(e.target.value)}
                    />
                    <HuePicker color={props.colorLine} onChangeComplete={color => { props.setColorLine(color.hex) }} />
                </Popper>
        </div>
    )
}
