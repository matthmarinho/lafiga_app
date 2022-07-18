import React, { useEffect, useState } from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material'
import Form from './Form'

export default function FormModal({ open, setOpen, formData, row, title, Service, getAll }) {
    const isOpen = Boolean(open)
    const [values, setValues] = useState([])
    const [selectedFiles, setSelectedFiles] = useState();

    const handleSubmit = (event) => {
        event.preventDefault()

        if (row) {
            edit()
        } else {
            create()
        }
    }

    const edit = () => {
        Service.update(row.id, values)
            .then(response => {
                setOpen(false)
                getAll()
            })
            .catch(e => {
                console.log(e)
            })
    }

    const create = () => {
        let oldValue = ''
        if (values['attachment']) {
            oldValue = values['attachment']
            values['attachment'] = selectedFiles
        }
        Service.create(values)
        .then(response => {
            if (values['attachment']) {
                values['attachment'] = oldValue
            }
            values['attachment'] = oldValue
            setOpen(false)
            getAll()
        })
        .catch(e => {
            console.log(e)
        })
    }

    const handleCancel = () => {
        setValues([])
        setOpen(false)
    }

    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={() => handleCancel()}
                aria-labelledby="form-dialog-title"
                fullWidth maxWidth="md"
            >
                <DialogTitle id="form-dialog-title">New {title}</DialogTitle>
                <DialogContent>
                    <Form formData={formData} values={values} setValues={setValues} row={row} selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCancel()} >
                        Cancel
                    </Button>
                    <Button onClick={(e) => handleSubmit(e)}>
                        {row ? 'Edit' : 'Create'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
