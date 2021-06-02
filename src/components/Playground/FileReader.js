import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Context } from "../../common/Store";

import FileViewer from "react-file-viewer";

import { Typography } from '@material-ui/core';

import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
    },
    fileReader: {
        width: "500px",
        height: "600px",
        maxWidth: '100vw',
        border: "2px solid #ff8C00",
        borderRadius: '2px',
    },
    inputs: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: "center",
    },
    button: {
        margin: theme.spacing(2),
    },
}));

const FileReader = () => {

    const [state, dispatch] = useContext(Context);

    // const file = state.selectedFile ? `${URL.createObjectURL(state.selectedFile)}`.substring(5  ) : "";
    const file = "C:\\fakepath\\jeeDemo.png"
    const type = "png";

    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className={classes.inputs}>
                <Button
                    variant="contained"
                    component="label"
                    className={classes.button}
                >
                    <Typography>original file</Typography>
                </Button>

                <Button
                    variant="contained"
                    className={classes.button}
                >
                    <Typography>edited file</Typography>
                </Button>
            </div>
            <div
                className={classes.fileReader}>
                <FileViewer
                    fileType={type}
                    filePath={file}
                    className={classes.fileViewer}>
                </FileViewer>
            </div>
        </div>
    )
}

export default FileReader;