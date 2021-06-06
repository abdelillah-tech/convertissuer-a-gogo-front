import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Context } from "../../common/Store";

import FileViewer from "react-file-viewer";

import { Typography } from '@material-ui/core';

import Button from '@material-ui/core/Button';

import DocViewer from "react-doc-viewer";

import GoogleDocsViewer from 'react-google-docs-viewer';

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

    // const docs = [
    //     { uri: file },
    // ];

    // const props = {
    //     allowFullScreen: false,
    //     src: file
    // };
    

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
                {/* <DocViewer documents={docs} /> */}
                {/* <FileViewer
                    fileType={type}
                    filePath={file}
                    className={classes.fileViewer}>
                </FileViewer> */}
                {/* <GoogleDocsViewer
                    width="600px"
                    height="780px"
                    fileUrl={file}
                /> */}
                {/* <img src={file} /> */}

                <iframe
                    width="99%"
                    height="99%"
                    src={state.selectedFile.url}
                >
                </iframe>
            </div>
        </div>
    )
}

export default FileReader;