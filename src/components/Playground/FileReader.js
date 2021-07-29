import React, {  useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Context } from "../../common/Store";
import { Typography, Link } from '@material-ui/core';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import IconButton from '@material-ui/core/IconButton';

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

    return (
        <div className={classes.container}>
            <div className={classes.flexHorizontal}>
                { state.selectedFile.url &&
                    <div
                        className={classes.fileReader}>
                        <div className={classes.readerTitle}>
                            <h3 className={classes.flexH}>
                                <Typography>Original file</Typography>
                            </h3>
                        </div>
                        <div className={classes.iframeContainer}>
                            <iframe
                                title="input"
                                style={{flex: 1}}
                                className={classes.iframe}
                                src={state.selectedFile.url}
                                >
                            </iframe>
                        </div>
                    </div>
                }
                { state.resultFileUrl &&
                    <div
                        className={classes.fileReader}>
                        <div
                            className={classes.readerTitle}>
                            <h3 className={classes.flexH}>
                                <Typography>Edited file</Typography>
                                { 
                                    state.resultFileUrl 
                                        ? <Link to={state.resultFileUrl} target="_blank">
                                            <IconButton><CloudDownloadIcon style={{ color: "white" }}></CloudDownloadIcon></IconButton>
                                        </Link>
                                        : <div></div>
                                }
                            </h3>
                        </div>
                        <div className={classes.iframeContainer}>
                            <iframe
                                title="output"
                                style={{flex: 1}}
                                className={classes.iframe}
                                src={state.resultFileUrl}
                                >
                            </iframe>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default FileReader;