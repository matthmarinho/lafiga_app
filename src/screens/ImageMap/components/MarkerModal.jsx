import React, { useEffect, useState } from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material'
import { Box } from '@mui/system'
import { SketchPicker } from 'react-color'
import { styled } from '@mui/material/styles'

export default function MarkerModal({ openModal, addNewMarker, edit, setOpenModal, categories, markerInfo, teams }) {
    const [name, setName] = useState('')
    const [color, setColor] = useState('#fff')
    const [openPicker, setOpenPicker] = useState(false)
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    // const [categoryName, setCategoryName] = useState('')
    const [team, setTeam] = useState('')
    const isOpen = Boolean(openModal)

    const componentToHex = (c) => {
        var hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }

    const rgbToHex = ({ r, g, b }) => {
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
        let data = {
            name: name,
            description: description,
            color: hexToRgb(color),
            category: categories.find(item => item.name === category),
            team: teams.find(item => item.name === team),
        }
        console.log(data)
        if (Object.values(markerInfo).length === 0) {
            addNewMarker(data)
        } else {
            edit(data)
        }
        setName('')
        setDescription('')
        setCategory({ name: '' })
        // setCategoryName('')
        setTeam({name: ''})
        setOpenModal(false)
    }

    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(color),
        backgroundColor: color,
        '&:hover': {
            backgroundColor: color,
        },
        alignContent: 'left'
    }));

    useEffect(() => {
        if (Object.keys(markerInfo).length > 0) {
            setName(markerInfo.name)
            setDescription(markerInfo.description)
            setCategory(markerInfo.category.name)
            // setCategoryName(markerInfo.category_name)
            setTeam(markerInfo.team.name)
            if (markerInfo.color) {
                let hex = rgbToHex(markerInfo.color)
                setColor(hex)
            }
        }
    }, [markerInfo])// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={() => setOpenModal(false)}
                aria-labelledby="form-dialog-title"
                fullWidth maxWidth="md"
            >
                <DialogTitle id="form-dialog-title">New Marker</DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, maxWidth: '100%' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <Box item>
                            <FormControl sx={{ m: '8px', pr: '16px' }} fullWidth>
                                <InputLabel id="demo-simple-select-helper-label">Category *</InputLabel>
                                <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    value={category}
                                    label={'Category*'}
                                    onChange={e => setCategory(e.target.value)}
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category.id} value={category.name}>{category.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        {category === 'Equipe' ? (
                            <Box item>
                                <FormControl sx={{ m: '8px', pr: '16px' }} fullWidth>
                                    <InputLabel id="demo-simple-select-helper-label">Team *</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-filled-label"
                                        id="demo-simple-select-filled"
                                        value={team}
                                        label={'Team*'}
                                        onChange={e => setTeam(e.target.value)}
                                    >
                                        {teams.map((team) => (
                                            <MenuItem key={team.id} value={team.name}>{team.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        ) : (
                            <Box item>
                                <FormControl fullWidth>
                                    <TextField
                                        label="Name"
                                        id="outlined-margin-none"
                                        variant="outlined"
                                        value={name}
                                        onInput={e => setName(e.target.value)}
                                        required={true}
                                    />
                                </FormControl>
                            </Box>
                        )}
                        <Box item>
                            <FormControl fullWidth>
                                <TextField
                                    id="outlined-full-width"
                                    label="Description"
                                    multiline
                                    rows={5}
                                    variant="outlined"
                                    value={description}
                                    onInput={e => setDescription(e.target.value)}
                                    required={true}
                                />
                            </FormControl>
                        </Box>
                        {category === 'Equipe' &&
                            <Box item sx={{m: 1}}>
                                <FormControl fullWidth>
                                    <ColorButton variant="contained" color="primary" onClick={() => setOpenPicker(!openPicker)}>
                                        Color
                                    </ColorButton>
                                </FormControl>
                            </Box>
                        }
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenModal(false)} >
                        Cancel
                    </Button>
                    <Button onClick={(e) => handleSubmit(e)} disabled={description === '' || category === ''}>
                        {Object.values(markerInfo).length === 0 ? 'Create' : 'Edit'}
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog onClose={() => setOpenPicker(false)} aria-labelledby="simple-dialog-title" open={openPicker}>
                <SketchPicker color={color} onChangeComplete={color => { setColor(color.hex) }} />
            </Dialog>
        </div>
    )
}
