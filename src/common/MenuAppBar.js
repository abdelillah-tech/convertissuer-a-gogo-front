import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom';
import { APP_NAME } from '../constants';
import { Context } from "../common/Store";

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
        background: '#212121',
        display: "flex",
        justifyContent: "space-between"
    },
    toolBarItems: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
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
        color: '#212121',
        margin: '3px',
    }
}));

export default function MenuAppBar() {
    const [state, dispatch] = React.useContext(Context);
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [menu, setMenu] = React.useState("");

    useEffect(() => {
        handleMenuItems();
    }, [anchorEl]);

    const handleMenuItems = () => {
        if (!state.isAuthenticated) {
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
        }
        else {
            setMenu([
                <MenuItem key="playground" onClick={handleClose}>
                    <Link to="/playground" className={classes.links}>
                        Playground
                    </Link>
                </MenuItem>,
                <MenuItem key="profile" onClick={handleClose}>
                    <Link to="/profile" className={classes.links}>
                        Profile
                    </Link>
                </MenuItem>,
                <MenuItem key="logout"
                    onClick={() => {
                        dispatch({
                            type: "LOGOUT"
                        })
                        handleClose()    
                    }}>
                    <Link to="/" className={classes.links}>
                        Logout
                    </Link>
                </MenuItem>
            ]);
        }
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolBar}>
                    <div className={classes.toolBarItems}>
                        <Link
                            to={{
                                pathname: "/",
                            }}
                            className={classes.links}
                            >
                            <Typography variant="h6" className={classes.title} to="/home">
                                {APP_NAME}
                            </Typography>
                        </Link>
                    </div>
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            className={classes.iconButton}
                            color="inherit"
                        >
                            <MenuIcon />
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
