import React, { useState } from 'react'
import api from "../../services/api";
import { login } from "../../services/auth";
import { makeStyles } from '@material-ui/core/styles'
import {
  Button, Menu, TextField, FormControlLabel, Checkbox, Grid, Link, Card,
  CardMedia, CardContent, withStyles
} from '@material-ui/core'

import { red } from '@material-ui/core/colors';

export const sendToken = (token) => token;
export const sendUserInfo = (info) => info;

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
}))(Button);

const ColorLink = withStyles((theme) => ({
  root: {
    color: red[500],
    '&:hover': {
      color: red[700],
    },
  },
}))(Link);

const ColorCheckbox = withStyles((theme) => ({
  root: {
    color: red[500],
    '&:hover': {
      color: red[700],
    },
  },
}))(Checkbox);

const useStyles = makeStyles((theme) => ({
  
  paper: {
      marginTop: theme.spacing(8),
      peddingTop: theme.spacing(8),
      maxWidth: theme.spacing(50),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
  },
  avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
  },
  form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
  },
  submit: {
      margin: theme.spacing(3, 0, 2),
  },
  loginCard: {
      maxWidth: 345,
      background: 'black'
  },
  media: {
      height: 0,
      paddingTop: '60.25%', // 16:9
  },
}))

export default function LoginModal({anchorEl, setAnchorEl}) {
  const classes = useStyles()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const menuId = 'primary-search-account-menu';
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuClose = () => {
      setAnchorEl(null);
  };

  const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();


    console.log(e);
    if (!email || !password) {
      setError("Preencha e-mail e senha para continuar!");
    } else {
      try {
        const response = await api.post("/authenticate", { email, password });
        sendUserInfo(response.data.user_info);
        login(response.data);
        sendToken(response.data.auth_token);
        // props.history.push("/");
      } catch (err) {
        setError(
          "Houve um problema com o login, verifique suas credenciais ou crie uma conta"
        );
      }
    }
  };

    return (
      anchorEl &&
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
        style={{color: 'black'}}
    >
       <Card className={classes.loginCard}>
        <CardMedia
            className={classes.media}
            image="https://media.discordapp.net/attachments/583492070644383777/869017329109979156/Logo_Marca_final.jpeg"
            title="Paella dish"
        />
        <CardContent>
        <form className={classes.form} noValidate onSubmit={handleSignIn}>
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
                <FormControlLabel
                    control={<ColorCheckbox value="remember" color="primary" />}
                    label="Lembrar"
                />
                <ColorButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Entrar
                </ColorButton>
                <Grid container>
                    <Grid item xs>
                        <ColorLink href="#" variant="body2">
                            Esqueceu a senha?
                        </ColorLink>
                    </Grid>
                </Grid>
            </form>
        </CardContent>

        </Card>
      </Menu>
    )
  }