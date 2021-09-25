import React, { useEffect, useState } from 'react'
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControl from '@material-ui/core/FormControl'
import { Box, InputLabel, MenuItem, Select, useMediaQuery } from '@material-ui/core'
import { SketchPicker } from 'react-color'
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

export default function MarkerModal(props) {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')
    const [color, setColor] = useState('#fff')
    const [openPicker, setOpenPicker] = useState(false)
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [categoryName, setCategoryName] = useState('')
    const [categories, setCategories] = useState([])
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClose = () => {
        setOpen(false)
    }

    const componentToHex = (c) => {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    const rgbToHex = (r, g, b) => {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    const hexToRgb = (hex) => {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.addNewMarker({ name: name, description: description, color: hexToRgb(color), category: category, categoryName: categoryName })
        props.setOpenModal(false)
    }

    const ColorButton = withStyles((theme) => ({
        root: {
            color: theme.palette.getContrastText(color),
            backgroundColor: color,
            '&:hover': {
                backgroundColor: color,
            },
            alignContent: 'left'
        },
    }))(Button);

    const getCategories = () => {
        CategoryService.getAll()
            .then(response => {
                setCategories(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    }

    useEffect(() => {
        setName('')
        setDescription('')
        setCategory('')
        getCategories()
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
                                required={true}
                            />
                            <TextField
                                id="outlined-full-width"
                                label="Descrição"
                                multiline
                                rows={5}
                                variant="outlined"
                                value={description}
                                onInput={e => setDescription(e.target.value)}
                                required={true}
                            />
                        </FormControl>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-filled-label">Tipo *</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={category}
                                name={'teste'}
                                onChange={e => setCategory(e.target.value)}
                                required={true}
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category.id} value={category.id} onClick={e => setCategoryName(category.name)}>{category.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {categoryName === 'Equipe' &&
                            <FormControl variant="outlined" className={classes.formControl}>
                                <Box>
                                    <ColorButton variant="contained" color="primary" onClick={() => setOpenPicker(!openPicker)}>
                                        Cor
                                    </ColorButton>
                                </Box>
                            </FormControl>
                        }
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => props.setOpenModal(false)} className={classes.cancel}>
                        Cancelar
                    </Button>
                    <Button onClick={(e) => handleSubmit(e)} className={classes.create} disabled={name === '' || description === '' || category === ''}>
                        Criar
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog onClose={() => setOpenPicker(false)} aria-labelledby="simple-dialog-title" open={openPicker}>
                <SketchPicker color={color} onChangeComplete={color => { setColor(color.hex) }} />
            </Dialog>
        </div>
    )
}
