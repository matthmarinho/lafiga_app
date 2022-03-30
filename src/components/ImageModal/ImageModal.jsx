import React from 'react'
import { Modal } from '@mui/material'
import { Box } from '@mui/system'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: "80vw",
}

const imgStyle = {
    width: '100%'
}

export default function ImageModal({ src, open, handleClose }) {
    const isOpen = Boolean(open)
    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            fullWidth maxWidth="md"
        >
            <Box sx={style}>
                <img src={src} style={imgStyle} />
            </Box>
        </Modal>
    )
}