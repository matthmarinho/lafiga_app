import React, { useState, useEffect } from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    DialogContentText,
    Typography
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { styled } from '@mui/material/styles'
import MarkerService from '../../../services/marker'


const DivButton = styled('div')(({ theme }) => ({
    marginLeft: theme.spacing(1),
}));

const DivTitle = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
}))

export default function InfoModal({
    openModal, setCloseModal, markerInfo,
    openEdit, setOpenModal, getMap, isAdmin
}) {
    const isOpen = Boolean(openModal)
    const [marker, setMarker] = useState({})
    const [open, setOpen] = useState(false)

    const handleOpenEdit = () => {
        setOpenModal(false)
        openEdit(true)
    }

    const handleDelete = () => {
        MarkerService.remove(marker.map_id, marker.id)
            .then(response => {
                setOpen(false)
                setCloseModal()
                getMap()
            })
            .catch(e => {
                console.log(e);
            });
    }

    useEffect(() => {
        if (markerInfo) {
            setMarker(markerInfo)
        }
    }, [markerInfo])

    return (
        <div>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Delete "{marker.name}"
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>No</Button>
                    <Button onClick={() => handleDelete()} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={isOpen}
                onClose={setCloseModal}
                aria-labelledby="form-dialog-title"
                fullWidth maxWidth="md"
            >
                <DialogTitle id="alert-dialog-title">
                    <DivTitle >
                        {marker.name}
                        {isAdmin &&
                            <>
                                <DivButton>
                                    <IconButton color="primary" aria-label="edit picture" component="span" size="small" onClick={handleOpenEdit}>
                                        <EditIcon />
                                    </IconButton>
                                </DivButton>
                                <DivButton>
                                    <IconButton color="primary" aria-label="edit picture" component="span" size="small" onClick={() => setOpen(true)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </DivButton>
                            </>
                        }
                    </DivTitle>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="caption" display="block" gutterBottom>
                        {marker.category_name}
                    </Typography>
                    <DialogContentText id="alert-dialog-description" sx={{ whiteSpace: 'pre-line' }}>
                        {marker.description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={setCloseModal} >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
