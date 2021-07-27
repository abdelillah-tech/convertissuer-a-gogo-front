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
import ListIcon from '@material-ui/icons/List';


const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: "center",
    },
    formControl: {
        //margin: theme.spacing(1),
    },
    menuItem: {
        padding: "0px"
    },
    iconButton: {
        color: "red"
    },
    savedCodeTitle: {
        margin: "0px",
        padding: "15px",
        width: "100%"
    }
}));


export default function SavedCodeMenu({ code, sendCodeToEditor }) {

    const [state, dispatch] = useContext(Context);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelect = (code) => {
        sendCodeToEditor(code);
        setAnchorEl(null);
    };

    const handleDelete = (id) => {
        CodeSaveService.deleteCode(id, state.token)
            .then((response) => {
                dispatch({
                    type: "CODES",
                    payload: state.codesList.filter(code => code.id !== id)
                })
                if(code.id === id){
                    handleSelect({name: null, code: null, id: null, language: null})
                }
                pubMessage(undefined, `Code deleted successfuly`, alertType.success)
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
                <ListIcon></ListIcon>
                code
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => handleSelect({})}>default</MenuItem>

                {state.codesList.map((code) => (
                    <MenuItem
                        key={code.name}
                        className={classes.menuItem}
                        >
                        
                        <span 
                            onClick={() => handleSelect(code)}
                            className={classes.savedCodeTitle}>
                            {code.name}
                        </span>
                        
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