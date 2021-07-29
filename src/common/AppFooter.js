import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
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

export default function AppFooter() {
    const [state, dispatch] = React.useContext(Context);
    const classes = useStyles();

    useEffect(() => {
    }, []);


    return (
        <div className={classes.root}>
            <AppBar position="static" color="primary">
                <Container maxWidth="md">
                    <Toolbar align="center" style={{display: "flex", justifyContent: "center"}}>
                            © 2021 Maxime d'Harboullé and Abdelillah Ghomari
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}
