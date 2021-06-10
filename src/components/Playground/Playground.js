import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Editor from './Editor';
import FileReader from './FileReader';
import { Context } from "../../common/Store";
import FileUploadService from '../../api/FileUpload';
import CodeSaveService from '../../api/CodeSave';
import alertType from '../../common/AlertTypes';
import pubMessage from '../../common/MessagePublisher';

const useStyles = makeStyles((theme) => ({
    container: {
        border: "5px solid green",
    },
    testContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
    },
    editor: {
        border: "2px solid #ff8C00",
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
                dispatch({
                    type: "FILES",
                    payload: response.data
                })
            }).catch(e => {
                pubMessage(e, 'Sorry! We cannot load your files for the moment', alertType.error)
            })
        CodeSaveService.getCodes(state.token)
            .then((response) => {
                dispatch({
                    type: "CODES",
                    payload: response.data
                })
            }).catch(e => {
                pubMessage(e, 'Sorry! We cannot load your codes for the moment', alertType.error)
            })
    }, []);

    const classes = useStyles();

    return (
        <div className={classes.testContainer}>
            <Editor classes={classes.paper} />
            <FileReader classes={classes.reader} />
        </div>
    )
}

export default Playground;