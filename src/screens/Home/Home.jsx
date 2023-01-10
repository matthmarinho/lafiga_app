import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import GlobalStyles from '@mui/material/GlobalStyles'
import Container from '@mui/material/Container'
import { Box } from '@mui/system'
import { Grid, Paper } from '@mui/material'
import Feed from '../../components/Feed/Feed'
import Carousel from '../../components/CarouselContent/CarouselContent'
import { isBrowser } from 'react-device-detect'

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

function HomeContent() {
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
              <Paper
                elevation={0}
                sx={{
                  p: isBrowser ? 2 : 0,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Carousel />
              </Paper>
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
              <Paper
                elevation={0}
                sx={{
                  p: isBrowser ? 2 : 0,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Feed />
              </Paper>
            </Grid>
          </Grid>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </React.Fragment >
  )
}

export default function Home() {
  return <HomeContent />
}