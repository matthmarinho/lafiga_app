import React from 'react'
import { IconButton, Toolbar, Tooltip, Typography } from "@mui/material"
import { alpha } from '@mui/material/styles'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'

export default function EnhancedTableToolbar({ numSelected, title, setOpenModal, setDeleteModal, isAdmin }) {
    return (
        <React.Fragment>
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    ...(numSelected > 0 && {
                        bgcolor: (theme) =>
                            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                    }),
                }}
            >
                {numSelected > 0 ? (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        {title}
                    </Typography>
                )}

                {isAdmin && numSelected > 0 && (
                    <Tooltip title="Delete item">
                        <IconButton onClick={() => setDeleteModal(true)}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                )}
                {isAdmin && numSelected == 1 && (
                    <Tooltip title="Edit item">
                        <IconButton onClick={() => setOpenModal(true)}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                )}
                {isAdmin && numSelected === 0 && <Tooltip title="Add item">
                    <IconButton onClick={() => setOpenModal(true)}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>}
            </Toolbar>
        </React.Fragment>
    )
}