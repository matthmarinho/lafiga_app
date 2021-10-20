import * as React from 'react'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Chip from '@mui/material/Chip'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

export default function MultipleSelectChip({ field, values, fieldChanged }) {
    return (
        <div>
            <FormControl key={`form_control_${field.id}`} sx={{ m: '8px', pr: '16px' }} fullWidth>
                <InputLabel id="demo-multiple-chip-label">{field.label} *</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={values[field.id] ? values[field.id].map(item => item.name) : []}
                    onChange={e => fieldChanged(field.id, field.values.filter(item => e.target.value.includes(item.name)))}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={() => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {values[field.id].map(item => item.name).map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {field.values.map((item) => (
                        <MenuItem
                            id={field.name}
                            key={`select_${field.id}_${item.id}`}
                            value={item.name}
                        >
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}