import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import Editor from './Editor';

const useStyles = makeStyles((theme) => ({
    container: {
        border: "5px solid green",
    },
    editor: {
        width: "100vw",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: 'center',
        alignItems: 'center',
    },
    reader: {
        width: "100vw",
        maxWidth: "100%",
    },
    paper: {
        minWidth: "50%",
        padding: theme.spacing(1),
        textAlign: "center",
    }
}));

function GridItem({ classes }) {
    return (
        <Grid item xs={12} sm={6} md={3}>
            <Paper className={classes.paper}>item</Paper>
        </Grid>
    );
}

const Playground = () => {
    const classes = useStyles();
    return (
        <div>
            <Grid container spacing={1}>
                <Grid item className={classes.editor}>
                    <Editor classes={classes.paper}/>
                </Grid>
                <Grid item className={classes.reader}>
                    <GridItem classes={classes} />
                </Grid>
            </Grid>
        </div>
    )
}

export default Playground;