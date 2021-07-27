import React, { useEffect, useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControl from '@material-ui/core/FormControl'
import { InputLabel, MenuItem, Select, useMediaQuery } from '@material-ui/core'

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
    }
}))

export default function MarkerModal(props) {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('')
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.addNewMarker({ name: name, description: description })
        props.setOpenModal(false)
    }

    useEffect(() => {
        setOpen(props.openModal)
    }, [props.openModal])

    return (
        <div>
            <Dialog open={open} onClose={() => props.setOpenModal(false)} aria-labelledby="form-dialog-title" fullWidth maxWidth="md" fullScreen={fullScreen}>
                <DialogTitle id="form-dialog-title">Nova Localização</DialogTitle>
                <DialogContent>
                    <form className={classes.form} noValidate variant="filled">
                        <FormControl className={classes.formControl}>
                            <TextField
                                label="Nome"
                                id="outlined-margin-none"
                                className={classes.textField}
                                variant="outlined"
                                value={name}
                                onInput={e => setName(e.target.value)}
                            />
                            <TextField
                                id="outlined-full-width"
                                label="Descrição"
                                multiline
                                rows={5}
                                variant="outlined"
                                value={description}
                                onInput={e => setDescription(e.target.value)}
                            />
                        </FormControl>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-filled-label">Tipo</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={type}
                                onChange={e => setType(e.target.value)}
                            >
                                <MenuItem value={10}>Cidade</MenuItem>
                                <MenuItem value={20}>Masmorra</MenuItem>
                                <MenuItem value={30}>Equipe</MenuItem>
                            </Select>
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => props.setOpenModal(false)} className={classes.cancel}>
                        Cancelar
                    </Button>
                    <Button onClick={(e) => handleSubmit(e)} className={classes.create}>
                        Criar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
