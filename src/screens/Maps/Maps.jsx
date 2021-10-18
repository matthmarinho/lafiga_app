import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import { Container, CssBaseline, GlobalStyles, InputBase } from '@mui/material'
import { isBrowser } from 'react-device-detect'
import EnhancedTableHead from '../../components/EnhancedTable/EnhancedTableHead'
import EnhancedTableToolbar from '../../components/EnhancedTable/EnhancedTableToolbar'
import FilterList from '../../components/FilterList/FilterList'
import SearchIcon from '@mui/icons-material/Search'
import { alpha, styled } from '@mui/system'

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

function createData(name, race, subrace, type, subclass, level) {
    return {
        name,
        race,
        subrace,
        type,
        subclass,
        level,
    }
}

const rows = [
    createData('Aberama', 'Tiefling', 'Nothing', 'Fighter', 'Atirador Inigualável', 7),
    createData('Sabrino', 'Half-elf', 'Drow', 'Warlock', 'Hastur', 3),
    createData('Kanlu', 'Elf', 'High', 'Wizard', '-', 7),
    createData('Orsik', 'Dwarf', 'Mountain', 'Cleric', '-', 7),
    createData('Tiamat', 'Dragon', 'All', 'Vilain', '7 Heads', 20),
    createData('Aaaaa', 'Bbbbb', 'Ccccc', 'Ddddddd', 'Eeeeeeee', 1234),
]

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1
    }
    if (b[orderBy] > a[orderBy]) {
        return 1
    }
    return 0
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0])
        if (order !== 0) {
            return order
        }
        return a[1] - b[1]
    })
    return stabilizedThis.map((el) => el[0])
}

const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
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

export default function Maps() {
    const [order, setOrder] = React.useState('asc')
    const [orderBy, setOrderBy] = React.useState('calories')
    const [selected, setSelected] = React.useState([])
    const [page, setPage] = React.useState(0)
    const [dense, setDense] = React.useState(false)
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [items, setItems] = useState([1])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name)
            setSelected(newSelecteds)
            return
        }
        setSelected([])
    }

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name)
        let newSelected = []

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name)
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1))
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1))
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            )
        }

        setSelected(newSelected)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const handleChangeDense = (event) => {
        setDense(event.target.checked)
    }

    const isSelected = (name) => selected.indexOf(name) !== -1

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0


    const requestSearch = (searchedVal) => {
        const filteredItems = rows.filter(item => {
            return Object.keys(item).some(field => item[field].toString().toLowerCase().includes(searchedVal.toLowerCase()))
        })
        setItems(filteredItems)
    }

    useEffect(() => {
        setItems(rows)
    }, [])

    return (
        <React.Fragment>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
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
                            <React.Fragment>
                                <EnhancedTableToolbar numSelected={selected.length} title={'Maps'} />
                                <TableContainer>
                                    <Table
                                        sx={{ height: isBrowser ? '57vh' : '75vh' }}
                                        aria-labelledby="tableTitle"
                                        size="small"
                                    >
                                        <EnhancedTableHead
                                            numSelected={selected.length}
                                            order={order}
                                            orderBy={orderBy}
                                            onSelectAllClick={handleSelectAllClick}
                                            onRequestSort={handleRequestSort}
                                            rowCount={items.length}
                                            headCells={headCells}
                                        />
                                        <TableBody>
                                            {stableSort(items, getComparator(order, orderBy))
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((row, index) => {
                                                    const isItemSelected = isSelected(row.name)
                                                    const labelId = `enhanced-table-checkbox-${index}`

                                                    return (
                                                        <TableRow
                                                            hover
                                                            onClick={(event) => handleClick(event, row.name)}
                                                            role="checkbox"
                                                            aria-checked={isItemSelected}
                                                            tabIndex={-1}
                                                            key={row.name}
                                                            selected={isItemSelected}
                                                        >
                                                            <TableCell padding="checkbox">
                                                                <Checkbox
                                                                    color="primary"
                                                                    checked={isItemSelected}
                                                                    inputProps={{
                                                                        'aria-labelledby': labelId,
                                                                    }}
                                                                />
                                                            </TableCell>
                                                            <TableCell
                                                                component="th"
                                                                id={labelId}
                                                                scope="row"
                                                                padding="none"
                                                            >
                                                                {row.name}
                                                            </TableCell>
                                                            <TableCell align="left">{row.race}</TableCell>
                                                            <TableCell align="left">{row.subrace}</TableCell>
                                                            <TableCell align="left">{row.type}</TableCell>
                                                            <TableCell align="left">{row.subclass}</TableCell>
                                                            <TableCell align="left">{row.level}</TableCell>
                                                        </TableRow>
                                                    )
                                                })}
                                            {emptyRows > 0 && (
                                                <TableRow
                                                    style={{
                                                        height: (dense ? 33 : 53) * emptyRows,
                                                    }}
                                                >
                                                    <TableCell colSpan={6} />
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    component="div"
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </React.Fragment>
                        ) : (
                            <FilterList items={items} />
                        )
                        }
                    </PaperCustom>
                </Container>
            </BoxCustom>
        </React.Fragment >
    )
}