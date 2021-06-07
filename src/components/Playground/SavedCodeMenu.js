import React, { useContext } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { Context } from "../../common/Store";
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: "center",
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
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
                        onClick={() => handleSelect(code)}>
                        {code.name}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}