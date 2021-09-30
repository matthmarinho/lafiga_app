import React, { useState } from 'react'
import api from "../../services/api"
import { login } from "../../services/auth"
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import TextField from '@mui/material/TextField'
import Box from '@mui/system/Box'
import { styled } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'

export const sendToken = (token) => token
export const sendUserInfo = (info) => info

const Form = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(1),
}));

const ButtonSubmit = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

const CustomBox = styled(Box)(({ theme }) => ({
  margin: theme.spacing(3),
}));

export default function LoginModal({ anchorEl, setAnchorEl, setLogged }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const menuId = 'primary-search-account-menu'
  const isMenuOpen = Boolean(anchorEl)

  const handleMenuClose = () => {
    setAnchorEl(null)
    setError(false)
  }

  const handleSignIn = async (e) => {
    e.preventDefault()


    if (!email || !password) {
      setError(true)
    } else {
      try {
        await api.post("/authenticate", { email, password })
          .then(response => {
            login(response.data)
            setLogged(true)
            setAnchorEl(false)
            setError(false)
          })
          .catch(e => {
            setError(true)
            console.log(e)
          })
      } catch (err) {
        setError(true)
      }
    }
  }

  return (
    anchorEl &&
    <Menu
      id={menuId}
      keepMounted
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        style: {
          maxWidth: 300
        },
      }}
    >
      <CustomBox>
        <Form noValidate onSubmit={handleSignIn}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" />}
            label="Remenber me"
          /> */}
          {error &&
            <FormHelperText error id="component-error-text" >
              Sorry, we can't find that account, or your password didn't match. Please try again!
            </FormHelperText>
          }
          <ButtonSubmit
            type="submit"
            fullWidth
            variant="contained"
          >
            Log In
          </ButtonSubmit>
          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Esqueceu a senha?
              </Link>
            </Grid>
          </Grid> */}
        </Form>
      </CustomBox>
    </Menu>
  )
}