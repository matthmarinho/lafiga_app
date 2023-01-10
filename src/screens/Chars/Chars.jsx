import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { Backdrop, Button, CircularProgress, Container, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, GlobalStyles, InputBase } from '@mui/material'
import { isBrowser } from 'react-device-detect'
import FilterList from '../../components/FilterList/FilterList'
import SearchIcon from '@mui/icons-material/Search'
import { alpha, styled } from '@mui/system'
import EnhancedTable from '../../components/EnhancedTable/EnhancedTable'
import FormModal from '../../components/DynamicForm/FormModal'
import klassData from '../../_assets/data/klasses.json'
import subClassesData from '../../_assets/data/subclasses.json'
import racesData from '../../_assets/data/races.json'
import subRacesData from '../../_assets/data/subraces.json'
import Service from '../../services/char'
import { userData } from '../../services/auth'

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(2),
        width: 'auto',
    },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}))

const PaperCustom = styled(Paper)(({ theme }) => ({
    margin: isBrowser ? theme.spacing(2) : theme.spacing(0),
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(2),
        width: 'auto',
    },
}))

const BoxCustom = styled(Box)(({ theme }) => ({
    paddingTop: isBrowser ? theme.spacing(6) : theme.spacing(9),
    flexGrow: 1,
    overflow: 'auto',
}))

const headCells = [
    {
        id: 'id',
        numeric: false,
        disablePadding: true,
        label: 'ID',
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Name',
    },
    {
        id: 'race',
        numeric: false,
        disablePadding: false,
        label: 'Race',
    },
    {
        id: 'subrace',
        numeric: false,
        disablePadding: false,
        label: 'SubRace',
    },
    {
        id: 'class',
        numeric: false,
        disablePadding: false,
        label: 'Class',
    },
    {
        id: 'subclass',
        numeric: false,
        disablePadding: false,
        label: 'SubClass',
    },
    {
        id: 'level',
        numeric: false,
        disablePadding: false,
        label: 'Level',
    },
]

const dataValue = [
    {
        "component": "text",
        "label": "Name",
        "type": "text",
        "id": "name"
    },
    {
        "component": "select",
        "label": "Race",
        "type": "select",
        "id": "race",
        "values": racesData
    },
    {
        "component": "select",
        "label": "SubRace",
        "type": "select",
        "id": "sub_race",
        "values": subRacesData,
        "dependence": "race"
    },
    {
        "component": "select",
        "label": "Classes",
        "type": "select",
        "id": "klass",
        "values": klassData
    },
    {
        "component": "select",
        "label": "SubClass",
        "type": "select",
        "id": "sub_class",
        "values": subClassesData,
        "dependence": "klass"
    },
    {
        "component": "number",
        "label": "Level",
        "type": "number",
        "id": "level"
    }
]

export default function Chars() {
    const [rows, setRows] = useState([])
    const [items, setItems] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [selected, setSelected] = useState([])
    const [currentRow, setCurrentRow] = useState([])
    const [deleteModal, setDeleteModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isadmin, setIsAdmin] = useState(false)

    const requestSearch = (searchedVal) => {
        const filteredItems = rows.filter(item => {
            return Object.keys(item).some(field => item[field].toString().toLowerCase().includes(searchedVal.toLowerCase()))
        })
        setItems(filteredItems)
    }

    const remove = () => {
        setLoading(true)
        setDeleteModal(false)
        Service.removeInBatches({ data: JSON.stringify(selected) })
            .then(response => {
                setSelected([])
                getAll()
            })
            .catch(e => {
                console.log(e)
            })
    }

    const getAll = () => {
        setLoading(true)
        Service.getAll()
            .then(response => {
                setSelected([])
                setRows(response.data)
                setItems(response.data)
                setLoading(false)
            })
            .catch(e => {
                console.log(e)
            })
    }

    const getUser = () => {
        let user = userData()
        setIsAdmin(Boolean(user && user.role_id === 1 ? true : false))
    }

    useEffect(() => {
        getAll()
        getUser()
    }, [])

    useEffect(() => {
        setCurrentRow(selected)
    }, [selected])

    return (
        <React.Fragment>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Dialog
                open={deleteModal}
                onClose={() => setDeleteModal(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Delete {selected.length > 0 ? `chars` : `char`} ?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteModal(false)}>No</Button>
                    <Button onClick={() => remove()} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            <FormModal
                open={openModal}
                setOpen={setOpenModal}
                formData={dataValue}
                data={currentRow[0]}
                title={'Char'}
                Service={Service}
                getAll={getAll}
            />
            <BoxCustom component="main">
                <Container maxWidth="lg" sx={isBrowser ? { mt: 4, mb: 4 } : null}>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={(event) => requestSearch(event.target.value)}
                        />
                    </Search>
                    <PaperCustom>
                        {isBrowser ? (
                            <EnhancedTable
                                headCells={headCells}
                                items={items}
                                setOpenModal={setOpenModal}
                                selected={selected}
                                setSelected={setSelected}
                                setDeleteModal={setDeleteModal}
                                isadmin={isadmin}
                                title={'Chars'}
                            />
                        ) : (
                            <FilterList
                                items={items}
                                setOpenModal={setOpenModal}
                                setDeleteModal={setDeleteModal}
                                selected={selected}
                                setSelected={setSelected}
                                isadmin={isadmin}
                                title={'Chars'}
                            />
                        )
                        }
                    </PaperCustom>
                </Container>
            </BoxCustom>
        </React.Fragment >
    )
}