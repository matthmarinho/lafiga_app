import React, { useState } from 'react'
import { List, ListItem, ListItemText, Paper, SpeedDial, SpeedDialAction, Stack, Typography } from "@mui/material"
import { styled } from '@mui/system'
import SettingsIcon from '@mui/icons-material/Settings'
import Checkbox from '@mui/material/Checkbox'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import library from './components/library'
import ImageModal from '../ImageModal/ImageModal'

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}))

const CustomStack = styled(Stack)(({ theme }) => ({
    paddingRight: 1,
    overflow: 'auto',
}))

export default function FilterList({ items, setOpenModal, setDeleteModal, selected, setSelected, isAdmin, title }) {
    const [img, setImg] = useState(null)
    const [openImgModal, setOpenImgModal] = useState(0)

    const handleImgClick = (event, img) => {
        setImg(img)
        setOpenImgModal(true)
    }

    const handleImgClickClose = (event) => {
        setImg(null)
        setOpenImgModal(false)
    }

    const handleToggle = (value) => () => {
        const currentIndex = selected.indexOf(value)
        const newChecked = [...selected]

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setSelected(newChecked)
    }

    const capitalize = (str) => {
        return str.toString().charAt(0).toUpperCase() + str.toString().slice(1)
    }

    const generateContent = (key, value) => {
        switch (key) {
            case 'image':
                return (
                    null
                )
            default: 
                return (
                    (value || value.length > 0) && (
                        <Typography key={`item_${key}_${value}`} component="span" variant="subtitle2">
                            {library[key]}: {
                                Array.isArray(value) ? value.map(i => i.name).join(', ') : capitalize(value)
                            }
                        </Typography>
                    )
                )
        }
    }

    return (
        <React.Fragment>
            <ImageModal src={img} open={openImgModal} handleClose={handleImgClickClose} />
            <Paper
                elevation={0}
                sx={{
                    pt: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '90vh',
                }}
            >
                <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography variant="h4" color="primary" gutterBottom>
                        {title}
                    </Typography>
                    {selected.length > 0 && (
                        <Typography variant="h6" color="primary" gutterBottom>
                            {selected.length} selected
                        </Typography>
                    )}
                </Stack>
                {items.length > 0 ? (
                    <CustomStack spacing={2}>
                        {items.map((item, index) => (
                            <Item key={index} elevation={1}>
                                <List>
                                    <ListItem
                                        key={`listItem_${index}`}
                                        onClick={(e) => item && item.image && handleImgClick(e, item.image)}
                                        secondaryAction={
                                            isAdmin &&
                                            <Checkbox
                                                edge="end"
                                                onChange={handleToggle(item)}
                                                checked={selected.indexOf(item) !== -1}
                                                inputProps={{ 'aria-labelledby': index }}
                                            />
                                        }
                                    >
                                        <ListItemText
                                            primary={
                                                <Typography variant="h6">
                                                    {item.name}
                                                </Typography>
                                            }
                                            secondaryTypographyProps={{
                                                component: 'div'
                                            }}
                                            secondary={
                                                <Stack spacing={'0.5'}>
                                                    {Object.entries(item).slice(2).map(([key, value]) => (
                                                        generateContent(key, value)
                                                    ))}
                                                </Stack>
                                            }
                                        />
                                    </ListItem>
                                </List>
                            </Item>
                        ))}
                    </CustomStack>
                ) : (
                    <div style={{ textAlign: 'center' }}>

                        <Typography variant="h6">
                            Not Found!
                        </Typography>
                    </div>
                )}
            </Paper>
            {isAdmin && <SpeedDial
                ariaLabel="SpeedDial create actions"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SettingsIcon />}
            // onClose={handleCloseMarkerDial}
            // onOpen={handleOpenMarkerDial}
            // open={openMarkerDial}
            >
                {selected.length === 0 && <SpeedDialAction
                    key='New'
                    icon={<AddIcon />}
                    tooltipTitle='New'
                    tooltipOpen
                    onClick={() => setOpenModal(true)}
                />}
                {selected.length === 1 && (
                    <SpeedDialAction
                        key='Edit'
                        icon={<EditIcon />}
                        tooltipTitle='Edit'
                        tooltipOpen
                        onClick={() => setOpenModal(true)}
                    />
                )}
                {selected.length > 0 && (
                    <SpeedDialAction
                        key='Delete'
                        icon={<DeleteIcon />}
                        tooltipTitle='Delete'
                        tooltipOpen
                        onClick={() => setDeleteModal(true)}
                    />
                )}

            </SpeedDial>}
        </React.Fragment>
    )
}