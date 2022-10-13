import { Button, Dialog, FormControl } from '@mui/material'
import { styled } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { SketchPicker } from 'react-color';
import { Box } from '@mui/system'

export default function ColorPicker({ field, values, fieldChanged }) {

    const [open, setOpen] = useState(false)
    const [color, setColor] = useState('#fff')

    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(values[field.id] ? values[field.id] : color),
        backgroundColor: values[field.id] ? values[field.id] : color,
        '&:hover': {
            backgroundColor: values[field.id] ? values[field.id] : color,
        },
        alignContent: 'left'
    }));

    const colorChanged = (fieldId, color) => {
        setColor(color)
        fieldChanged(fieldId, color)
    }

    return (
        <div>
            <Box item sx={{ m: 1 }}>
                <FormControl fullWidth>
                    <ColorButton variant="contained" color="primary" onClick={() => setOpen(!open)}>
                        Color
                    </ColorButton>
                </FormControl>
            </Box>
            <Dialog onClose={() => setOpen(false)} aria-labelledby="simple-dialog-title" open={open}>
                <SketchPicker color={values[field.id] ? values[field.id] : color} onChangeComplete={color => colorChanged(field.id, color.hex)} />
            </Dialog>
        </div>
    )
}