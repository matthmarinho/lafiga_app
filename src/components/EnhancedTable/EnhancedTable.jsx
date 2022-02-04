import React, { useState } from 'react'
import EnhancedTableHead from '../../components/EnhancedTable/EnhancedTableHead'
import EnhancedTableToolbar from '../../components/EnhancedTable/EnhancedTableToolbar'
import Checkbox from '@mui/material/Checkbox'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { isBrowser } from 'react-device-detect'
import ImageIcon from '@mui/icons-material/Image'

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

function capitalize(str) {
    return str ? str.toString().charAt(0).toUpperCase() + str.toString().slice(1) : null
}

function isBase64(str) {
    return str && typeof str === 'string' && str !== '' && str.split(',')[0] === 'data:image/jpeg;base64' ? true : false
}

function generateCells(value, idx) {
    if (idx == 0) {
        return (
            <TableCell
                component="th"
                key={`cell_${value}_${idx}`}
                scope="row"
                padding="none"
            >
                {capitalize(value)}
            </TableCell>
        )
    } else if (Array.isArray(value)) {
        return (
            <TableCell key={`cell_${value}_${idx}`} align="left">
                {value.map(item => item.name).join(', ')}
            </TableCell>
        )
    } else if (isBase64(value)) {
        return (
            <TableCell key={`cell_${value}_${idx}`} align="left">
                <ImageIcon />
            </TableCell>
        )
    } else {
        return (
            <TableCell key={`cell_${value}_${idx}`} align="left">
                {capitalize(value)}
            </TableCell>
        )
    }
}

export default function EnhancedTable({ headCells, items, setOpenModal, selected, setSelected, setDeleteModal, isAdmin, title }) {
    const [order, setOrder] = useState('asc')
    const [orderBy, setOrderBy] = useState('name')
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = items
            setSelected(newSelecteds)
            return
        }
        setSelected([])
    }

    const handleClick = (event, row) => {
        const selectedIndex = selected.findIndex((item) => item.name === row.name)
        let newSelected = []

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, row)
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

    const isSelected = (row) => selected.findIndex(item => item.name === row.name) !== -1

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - items.length) : 0

    return (
        <React.Fragment>
            <EnhancedTableToolbar
                numSelected={selected.length}
                title={title}
                setOpenModal={setOpenModal}
                setDeleteModal={setDeleteModal}
                isAdmin={isAdmin}
            />
            <TableContainer>
                <Table
                    aria-labelledby="tableTitle"
                >
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={items.length}
                        headCells={headCells}
                        isAdmin={isAdmin}
                    />
                    <TableBody>
                        {stableSort(items, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                const isItemSelected = isSelected(row)
                                const labelId = `enhanced-table-checkbox-${index}`

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.name}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            {isAdmin &&
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />}
                                        </TableCell>
                                        {Object.values(row).map((value, idx) =>
                                            generateCells(value, idx)
                                        )}
                                    </TableRow>
                                )
                            })}
                        {emptyRows > 0 && (
                            <TableRow
                                style={{
                                    height: 33 * emptyRows,
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
                count={items.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </React.Fragment>
    )
}