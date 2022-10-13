import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import GlobalStyles from '@mui/material/GlobalStyles'
import Container from '@mui/material/Container'
import { Box } from '@mui/system'
import { Breadcrumbs, Card, CardContent, CardHeader, CardMedia, Collapse, Grid, Paper, styled } from '@mui/material'
import { isBrowser } from 'react-device-detect'
import Aberama from './../../_assets/img/aberama_ryco.png'
import mockInfo from './components/_mock_info.json'
import library from './components/library'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect } from 'react'
import { useState } from 'react'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://lafiga.herokuapp.com/">
        Láfiga
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const DivTwo = styled('div')(({ theme }) => ({
  textAlign: "justify",
  lineHeight: "35px",
  WebkitColumns: "250px 3",
  MozColumns: "250px 3",
  columns: "250px 3",
  WebkitColumnGap: "40px",
  MozColumnGap: "40px",
  columnGap: "30px"
}))

function createData(
  key, value
) {
  return { key, value };
}

const rows = [
  createData('Raça', 'Tiefling'),
  createData('Subraça', 'Comum'),
  createData('Classe', 'Guerreiro'),
  createData('Subclasse', 'Atirador Inigualável'),
  createData('Level', 7),
];

function WikiContent() {
  const [article, setArticle] = useState({})
  const [img, setImg] = useState(null)

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const infoContent = () => {
    return (
      <Paper
        elevation={5}
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Breadcrumbs aria-label="breadcrumb" sx={{ paddingBottom: 2 }}>
          <Link underline="hover" color="inherit" href="./../../_assets/img/aberama_ryco.png">
            Lore
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="./../../_assets/img/aberama_ryco.png"
          >
            Personagens
          </Link>
        </Breadcrumbs>
        <Typography component="h2" variant="h4" color="primary" gutterBottom>
          {article.title}
        </Typography>
        <DivTwo>
          {article.content && article.content.split("\n").map((item, index) => (
            <Typography key={`paragraph_${index}`} variant="body2" display="block" align="justify" gutterBottom paragraph>
              {item}
            </Typography>
          ))}
        </DivTwo>
      </Paper>
    )
  }

  const infoTable = () => {
    return (

      <Paper
        elevation={5}
        sx={{
          p: isBrowser ? 2 : 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader title={article.title} />
          <CardMedia
            component="img"
            image={mockInfo.image ? mockInfo.image : null}
          />
          <CardContent>
            <TableContainer >
              <Table size="small" aria-label="a dense table">
                <TableBody>
                  {article && article.tableInfo && Object.entries(article.tableInfo).map(([key, value]) => (
                    <TableRow
                      key={key}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {library[key]}
                      </TableCell>
                      <TableCell align="left">{capitalize(value)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Paper>
    )
  }

  useEffect(() => {
    setArticle(mockInfo)
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <Box
        component="main"
        sx={{
          paddingTop: 8,
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Container maxWidth="lg" sx={isBrowser ? { mt: 4, mb: 4 } : null}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7} lg={8}>
              {isBrowser ? infoContent() : infoTable()}
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
              {isBrowser ? infoTable() : infoContent()}
            </Grid>
          </Grid>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </React.Fragment >
  )
}

export default function Home() {
  return <WikiContent />
}