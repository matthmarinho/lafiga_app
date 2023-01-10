import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import React from "react"
import MultipleSelectChip from "./MultiSelectChip"
import FileInput from "./FileInput"
import ColorPicker from "./ColorPicker"
import RichText from "./RichText"

const Field = ({ field, fieldChanged, values }) => {
    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    switch (field.component) {
        case "file-input":
            return (
                <FileInput field={field} values={values} fieldChanged={fieldChanged} />
            )
        case "multi-select":
            return (
                <MultipleSelectChip field={field} values={values} fieldChanged={fieldChanged} />
            )
        case "select":
            return (
                <FormControl key={`form_control_${field.id}`} sx={{ m: '8px', pr: '16px' }} fullWidth>
                    <InputLabel id="demo-simple-select-helper-label">{field.label} *</InputLabel>
                    <Select
                        id={field.id}
                        key={`select_${field.id}`}
                        label={field.label}
                        value={values[field.id] || []}
                        required={true}
                        onChange={e => fieldChanged(field.id, e.target.value)}
                    >
                        {field.values && field.dependence ?
                            field.values.filter(value => value.dependence_name === values[field.dependence]).map((value) => (
                                <MenuItem key={`menu_item_${value.id}`} value={value.name} >{capitalize(value.name)}</MenuItem>
                            ))
                            :
                            field.values.map((value) => (
                                <MenuItem key={`menu_item_${value.id}`} value={value.name} >{capitalize(value.name)}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            )
        case "color-picker":
            console.log(values, field, values[field.id])
            return (
                <ColorPicker field={field} values={values} fieldChanged={fieldChanged} />
            )
        case "multiline-text":
            return (
                <FormControl key={`form_control_${field.id}`} fullWidth>
                    <TextField
                        id={field.id}
                        key={`text_field_${field.id}`}
                        label={field.label}
                        type={field.component}
                        value={values[field.id] || ''}
                        onChange={e => fieldChanged(field.id, e.target.value)}
                        multiline
                        rows={5}
                        required
                    />
                </FormControl>
            )
        case "rich-text":
            return (
                <FormControl key={`form_control_${field.id}`} fullWidth>
                    <RichText field={field} values={values} fieldChanged={fieldChanged} />
                </FormControl>
            )
        default:
            return (
                <FormControl key={`form_control_${field.id}`} fullWidth>
                    <TextField
                        id={field.id}
                        key={`text_field_${field.id}`}
                        label={field.label}
                        type={field.component}
                        value={values[field.id] || ''}
                        onChange={e => fieldChanged(field.id, e.target.value)}
                        required
                    />
                </FormControl>
            )
    }
}

export default Field