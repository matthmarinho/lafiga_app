import React, { useState } from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material'
import Form from './Form'

export default function FormModal({ open, setOpen, formData, data, title, Service, getAll }) {
    const isOpen = Boolean(open)
    const [values, setValues] = useState([])

    const handleSubmit = (event) => {
        event.preventDefault()

        if (data) {
            edit()
        } else {
            create()
        }
    }

    const edit = () => {
        Service.update(data.id, values)
            .then(response => {
                setOpen(false)
                getAll()
            })
            .catch(e => {
                console.log(e)
            })
    }

    const create = () => {
        console.log(values, 'opa')
        Service.create(values)
        .then(response => {
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
                    <Form formData={formData} values={values} setValues={setValues} data={data} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCancel()} >
                        Cancel
                    </Button>
                    <Button onClick={(e) => handleSubmit(e)}>
                        {data ? 'Edit' : 'Create'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
