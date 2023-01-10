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
} from '@mui/material'
import { Box } from '@mui/system'
import { SketchPicker } from 'react-color'
import Form from '../../../components/DynamicForm/Form'

const dataValueTeam = [
    {
        "component": "select",
        "label": "Team",
        "type": "select",
        "id": "name",
        "values": []
    },
    {
        "component": "number",
        "label": "Day",
        "type": "number",
        "id": "day"
    },
    {
        "component": "select",
        "label": "Season",
        "type": "select",
        "id": "season",
        "values": [{ id: 0, name: 'Primavera' }, { id: 1, name: 'Verão' }, { id: 2, name: 'Outono' }, { id: 3, name: 'Inverno' }]
    },
    {
        "component": "multiline-text",
        "label": "Description",
        "type": "text",
        "id": "description",
    },
    {
        "component": "color-picker",
        "label": "Color",
        "type": "color",
        "id": "color",
    },
]

export default function MarkerModal({ openModal, addNewMarker, edit, setOpenModal, categories, markerInfo, teams }) {
    const [color, setColor] = useState('#fff')
    const [openPicker, setOpenPicker] = useState(false)
    const [markerableType, setCategory] = useState('')
    const [markerableId, setMarkerableId] = useState('')
    const isOpen = Boolean(openModal)

    const [values, setValues] = useState([])

    const handleSubmit = (event) => {
        event.preventDefault()

        let mId

        if (!markerableId) {
            switch (markerableType) {
                case 'Team': mId = teams.find((val) => val.name === values.name).id
                    break
                default: mId = null
            }
        }

        let data = {
            markerable: {
                ...values
            },
            markerable_id: markerableId ? markerableId : mId,
            markerable_type: markerableType,
        }

        if (Object.values(markerInfo).length === 0) {
            addNewMarker(data)
        } else {
            edit(data)
        }
        setValues([])
        setOpenModal(false)
    }

    const setTeams = () => {
        dataValueTeam.find((value) => value.id === 'name').values = teams
    }

    useEffect(() => {
        if (markerInfo.markerable_type) {
            setCategory(markerInfo.markerable_type)
            setMarkerableId(markerInfo.markerable.id)
        } else {
            setCategory('')
            setMarkerableId('')
        }
        setTeams()
    }, [markerInfo])// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={() => setOpenModal(false)}
                aria-labelledby="form-dialog-title"
                fullWidth maxWidth="md"
            >
                <DialogTitle id="form-dialog-title">{Object.values(markerInfo).length === 0 ? 'New' : 'Edit'} Marker</DialogTitle>
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
                                    value={markerableType}
                                    label={'Category*'}
                                    onChange={e => setCategory(e.target.value)}
                                    disabled={Object.values(markerInfo).length !== 0}
                                >
                                    {categories.map((markerableType) => (
                                        <MenuItem key={markerableType.id} value={markerableType.class_name}>{markerableType.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                    {markerableType === 'Team' &&
                        <Form formData={dataValueTeam} values={values} setValues={setValues} data={markerInfo.markerable} />
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenModal(false)} >
                        Cancel
                    </Button>
                    <Button onClick={(e) => handleSubmit(e)} >
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
