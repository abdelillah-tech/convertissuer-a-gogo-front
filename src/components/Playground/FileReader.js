import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Context } from "../../common/Store";
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import IconButton from '@material-ui/core/IconButton';
import { responsiveFontSizes } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        margin: '5px'
    },
    flexHorizontal: {
        minWidth: "100%",
        display: 'flex',
        flexDirection: 'row',
    },
    fileReader: {
        margin: theme.spacing(1),
        width: "100%",
        height: "400px",
        border: "2px solid #ff8C00",
        borderRadius: '2px',
        backgroundColor: "#2f3129",
        color: "white",
        borderRadius: "10px"
    },
    inputs: {
        display: 'flex',
        justifyContent: 'space-evenly',
    },
    button: {
        margin: theme.spacing(2),
    },
    readerTitle: {
        display: "flex",
        justifyContent: "center",
        fontSize: "24px",
        maxHeight: "50px"
    },
    flexH: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center"
    },
    iframeContainer: {
        flex: "0",
        display: 'flex',
        height: "200px"
    },
    iframe: {
        backgroundColor: "white",
        margin: "5px",
        height: "337px"
    }
}));

const FileReader = () => {

    const [state, dispatch] = useContext(Context);

    const classes = useStyles();

    const downloadFile = () => {
        console.log("todo: download file")
    }

    return (
        <div className={classes.container}>
            <div className={classes.flexHorizontal}>
                <div
                    className={classes.fileReader}>
                    <div className={classes.readerTitle}>
                        <h3 className={classes.flexH}>
                            <Typography>Original file</Typography>
                        </h3>
                    </div>
                    <div className={classes.iframeContainer}>
                        <iframe
                            style={{flex: 1}}
                            className={classes.iframe}
                            src={state.selectedFile.url}
                            >
                        </iframe>
                    </div>
                </div>

                <div
                    className={classes.fileReader}>
                    <div
                        className={classes.readerTitle}>
                        <h3 className={classes.flexH}>
                            <Typography>Edited file</Typography>
                            { 
                                state.resultFileUrl 
                                    ? <a href={state.resultFileUrl} target="_blank">
                                        <IconButton><CloudDownloadIcon style={{ color: "white" }}></CloudDownloadIcon></IconButton>
                                      </a>
                                    : <div></div>
                            }
                        </h3>
                    </div>
                    <div className={classes.iframeContainer}>
                        <iframe
                            style={{flex: 1}}
                            className={classes.iframe}
                            src={state.resultFileUrl}
                            >
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FileReader;