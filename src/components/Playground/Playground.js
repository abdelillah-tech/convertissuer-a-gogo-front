import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Editor from './Editor';
import FileReader from './FileReader';

const useStyles = makeStyles((theme) => ({
    container: {
        border: "5px solid green",
    },
    testContainer: {
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
    },
    editor: {
        border: "2px solid #ff8C00",
        width: "100vw",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: 'center',
        alignItems: 'center',
    },
    reader: {
        maxWidth: "100%",
    },
    paper: {
        minWidth: "50%",
        padding: theme.spacing(1),
        textAlign: "center",
    }
}));

const Playground = () => {
    const classes = useStyles();
    return (
        <div className={classes.testContainer}>
            <Editor classes={classes.paper} />
            <FileReader classes={classes.reader} />
        </div>
    )
}

export default Playground;