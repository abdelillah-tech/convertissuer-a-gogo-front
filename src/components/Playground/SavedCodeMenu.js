import React, { useContext } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { Context } from "../../common/Store";
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import pubMessage from '../../common/MessagePublisher';
import CodeSaveService from '../../api/CodeSave';
import alertType from '../../common/AlertTypes';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: "center",
    },
    formControl: {
        margin: theme.spacing(1),
    },
    menuItem: {
        justifyContent: "space-between",
    },
    iconButton: {
        color: "red"
    }
}));


export default function SavedCodeMenu({ sendCodeToEditor }) {

    const [state, dispatch] = useContext(Context);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelect = (code) => {
        console.log(code);
        sendCodeToEditor(code);
        setAnchorEl(null);
    };

    const handleDelete = (id) => {
        CodeSaveService.deleteCode(id, state.token)
            .then((response) => {
                console.log(response.data.name)
                dispatch({
                    type: "CODES",
                    payload: state.codesList.filter(code => code.id !== id)
                })
                pubMessage(undefined, `Code ${response.data.name} delted successfuly`, alertType.success)
            }).catch(e => {
                pubMessage(undefined, 'Sorry! We cannot delete this code for the moment', alertType.error)
            })

        
    }

    const classes = useStyles();


    return (
        <div className={classes.container}>
            <Button
                variant="contained"
                aria-controls="simple-menu"
                aria-haspopup="true"
                className={classes.formControl}
                onClick={handleClick}
                color="primary">
                saved code
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>none</MenuItem>
                {state.codesList.map((code) => (
                    <MenuItem
                        key={code.name}
                        className={classes.menuItem}
                        onClick={() => handleSelect(code)}>
                        {code.name}
                        <IconButton 
                            aria-label="delete" 
                            className={classes.iconButton}
                            onClick={() => handleDelete(code.id)}>
                            <ClearIcon fontSize="small" />
                        </IconButton>
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}