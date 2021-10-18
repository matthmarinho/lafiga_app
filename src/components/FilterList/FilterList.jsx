import React from 'react'
import { List, ListItem, ListItemText, Paper, SpeedDial, SpeedDialAction, Stack, Typography } from "@mui/material"
import { styled } from '@mui/system'
import SettingsIcon from '@mui/icons-material/Settings'
import Checkbox from '@mui/material/Checkbox'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'

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

export default function FilterList({ items, setOpenModal, setDeleteModal, selected, setSelected, isAdmin }) {

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

    return (
        <React.Fragment>
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
                        Chars
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
                                        {/* <ListItemAvatar>
                                            <Avatar>
                                                <ImageIcon />
                                            </Avatar>
                                        </ListItemAvatar> */}
                                        <ListItemText
                                            primary={
                                                <>
                                                    <Typography variant="h6">
                                                        {item.name}
                                                    </Typography>
                                                </>
                                            }
                                            secondary={
                                                <Stack spacing={0.5}>
                                                    <Typography variant="subtitle2" sx={{ whiteSpace: 'pre-line' }}>
                                                        Race: {item.race}, {item.subrace}
                                                    </Typography>
                                                    <Typography variant="subtitle2" sx={{ whiteSpace: 'pre-line' }}>
                                                        Class: {item.klass}, {item.subclass}
                                                    </Typography>
                                                    <Typography variant="subtitle2" sx={{ whiteSpace: 'pre-line' }}>
                                                        Level: {item.level}
                                                    </Typography>
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
                <SpeedDialAction
                    key='New'
                    icon={<AddIcon />}
                    tooltipTitle='New'
                    tooltipOpen
                    onClick={() => setOpenModal(true)}
                />
                {selected.length == 1 && (
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