import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Divider, FormControl, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: '500px',
    },
    textField: {
        paddingBottom: '15px',
        width: '25ch',
    },
    textFieldMulti: {
        paddingTop: '15px'
    },
}));

export default function MarkerModal(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(props.openModal)
    }, [props.openModal])

    return (
        <div>
            <Dialog open={open} onClose={() => props.setOpenModal(false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Nova Localização</DialogTitle>
                <DialogContent>
                    <form className={classes.form} noValidate>
                        <FormControl className={classes.formControl}>
                            <TextField
                                label="Nome"
                                id="outlined-margin-none"
                                className={classes.textField}
                                variant="outlined"
                            />
                            <TextField
                                id="outlined-full-width"
                                label="Descrição"
                                fullWidth
                                multiline={true}
                                variant="outlined"
                            />
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => props.setOpenModal(false)} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={() => props.setOpenModal(false)} color="primary">
                        Criar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
