import { Button, FormControl, InputBase, LinearProgress, ListItem, TextField, Typography } from '@mui/material'
import { Box, styled } from '@mui/system'
import React, { useState } from 'react'

export default function FileInput({field, values, fieldChanged}) {

    return (
        <FormControl sx={{ m: '8px', pr: '16px' }} fullWidth>
            <label htmlFor="btn-upload">
                <input
                    id="btn-upload"
                    name="btn-upload"
                    style={{ display: 'none' }}
                    type="file"
                    onChange={e => fieldChanged(field.id, e.target.files[0])} />
                <Button
                    className="btn-choose"
                    variant="outlined"
                    component="span" >
                    Choose File
                </Button>
                {values[field.id] ?
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        value={values[field.id].name || ''}
                        inputProps={{ 'aria-label': 'file' }}
                    />
                    :
                    null
                }
            </label>
        </FormControl >
    )
}