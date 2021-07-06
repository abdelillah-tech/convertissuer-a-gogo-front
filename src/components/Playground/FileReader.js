import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Context } from "../../common/Store";
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
    },
    flexHorizontal: {
        display: 'flex',
        flexDirection: 'row',
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
        justifyContent: 'space-evenly',
    },
    button: {
        margin: theme.spacing(2),
    },
}));

const FileReader = () => {

    const [state, dispatch] = useContext(Context);

    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className={classes.inputs}>
                <h3>
                    <Typography>original file</Typography>
                </h3>
                <p>
                    <Typography>edited file</Typography>
                </p>

            </div>
            <div className={classes.flexHorizontal}>
                <div
                    className={classes.fileReader}>
                    <iframe
                        width="99%"
                        height="99%"
                        src={state.selectedFile.url}
                        >
                    </iframe>
                </div>

                <div
                    className={classes.fileReader}>
                    <iframe
                        width="99%"
                        height="99%"
                        src={state.resultFileUrl}
                        >
                    </iframe>
                </div>
            </div>
        </div>
    )
}

export default FileReader;