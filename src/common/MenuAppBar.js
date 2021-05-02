import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom';
import { ACCESS_TOKEN, APP_NAME } from '../constants';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        with: '100%'
    },
    menuButton: {
        marginRight: theme.spacing(2),
        color: '#ff8C00'
    },
    toolBar: {
        background: '#212121'
    },
    iconButton: {
        color: '#ff8C00'
    },
    title: {
        flexGrow: 1,
        color: '#ff8C00'
    },
    links: {
        textDecoration: 'none',
        color: '#212121'
    }
}));

export default function MenuAppBar() {
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [menu, setMenu] = React.useState("");

    useEffect(() => {
        handleMenuItems();
    }, [anchorEl]);

    const handleMenuItems = () => {
        if (!localStorage.getItem(ACCESS_TOKEN)) {
            setMenu([
                <MenuItem key="login" onClick={handleClose}>
                    <Link to="/login" className={classes.links}>
                        Login
                    </Link>
                </MenuItem>,
                <MenuItem key="signup" onClick={handleClose}>
                    <Link to="/signup" className={classes.links}>
                        Signup
                    </Link>
                </MenuItem>
            ]);
            setAuth(false);
        }
        else {
            setMenu([
                <MenuItem key="logout" onClick={handleLogout}>
                    <Link to="/" className={classes.links}>
                        Logout
                    </Link>
                </MenuItem>,
            ]);
            setAuth(true);
        }
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        setAuth(false);
        handleClose();
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolBar}>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {APP_NAME}
                    </Typography>
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            className={classes.iconButton}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            {menu}
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
