import React, { useState, useContext, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import CodeSaveService from '../../api/CodeSave';
import { Context } from "../../common/Store";
import pubMessage from '../../common/MessagePublisher';
import alertType from '../../common/AlertTypes';
import SaveIcon from '@material-ui/icons/Save';


const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: "center",
    },
    formControl: {
        margin: theme.spacing(1),
        padding: theme.spacing(2),
        minWidth: 120,
        maxWidth: 300,
    },
}));

const SaveCodeDialog = ({code, language, savedCode}) => {

    const [state, dispatch] = useContext(Context);

    const [open, setOpen] = React.useState(false);

    const [name, setName] = useState("")

    const handleClickOpen = () => {
        if(code.id !== null){
            handleUpdate()
        } else {
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        let data = {
            code: code.code,
            language: language,
            name: name,
        }
        CodeSaveService.save(data, state.token)
            .then((responseSaveCode) => {
                pubMessage(undefined, 'Your code is now saved', alertType.success)
                CodeSaveService.getCodes(state.token, language)
                    .then((responseAllCodes) => {
                        dispatch({
                            type: "CODES",
                            payload: responseAllCodes.data
                        })
                        savedCode(responseSaveCode.data)
                    }).catch(e => {
                        pubMessage(e, 'Sorry! We cannot load your codes for the moment', alertType.error)
                        setOpen(false);
                    })
            }).catch(e => {
                pubMessage(e, 'Sorry! We cannot load your codes for the moment', alertType.error)
            })
        setOpen(false);
    }
    
    const handleUpdate = () => {
        CodeSaveService.update(code, state.token)
            .then((response) => {
                pubMessage(undefined, 'Your code is now updated', alertType.success)
            }).catch(e => {
                pubMessage(e, 'Sorry! We cannot load your codes for the moment', alertType.error)
            })
        CodeSaveService.getCodes(state.token, language)
            .then((response) => {
                dispatch({
                    type: "CODES",
                    payload: response.data
                })
            }).catch(e => {
                pubMessage(e, 'Sorry! We cannot load your codes for the moment', alertType.error)
                setOpen(false);
            })
        setOpen(false);
    }
    const onChangeName = (event) => {
        setName(event.target.value);
    }

    const classes = useStyles();


    return (
        <div className={classes.container}>
            <Button
                variant="contained"
                className={classes.FormControl}
                onClick={handleClickOpen}>
                    <SaveIcon/>
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Save code</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter a title to your code
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Code name"
                        type="text"
                        onChange={onChangeName}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default SaveCodeDialog;