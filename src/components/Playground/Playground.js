import React, { useContext, useEffect } from 'react';

import PubSub from 'pubsub-js';

import { makeStyles } from '@material-ui/core/styles';

import Editor from './Editor';

import FileReader from './FileReader';

import { Context } from "../../common/Store";

import FileUploadService from '../../api/FileUpload';

import alertType from '../../common/AlertTypes';




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

    const [state, dispatch] = useContext(Context);

    useEffect(() => {
        FileUploadService.getFiles(state.token)
            .then((response) => {
                console.log(response.data)
                dispatch({
                    type: "FILES",
                    payload: response.data
                })
            }).catch(e => {
                if (e.response.data.statusCode === 400) {
                    PubSub.publish('alert', {
                        alertType: alertType.error,
                        message: e.response.data.message.join(", ")
                    })
                } else {
                    PubSub.publish('alert', {
                        alertType: alertType.error,
                        message: 'Sorry! We cannot load your files for the moment'
                    })
                }
            })
    },[]);

    const classes = useStyles();

    return (
        <div className={classes.testContainer}>
            <Editor classes={classes.paper} />
            <FileReader classes={classes.reader} />
        </div>
    )
}

export default Playground;