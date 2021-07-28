import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Context } from "../../common/Store";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AceEditor from 'react-ace';

const useStyles = makeStyles((theme) => ({
    container: {
        
    },
    testContainer: {
        display: "flex",
        flexDirection: "column",
    },
    table: {
        minWidth: 650
    },
    title: {
        margin: "30px"
    },
    aceEditor: {       
        borderTop: "2px solid #ff8C00",
        display: "flex",
        borderBottomRightRadius: "10px",
        borderBottomLeftRadius: "10px",
    },
}));


const CodePreview = ({code}) => {

    const classes = useStyles();

    const [state, dispatch] = useContext(Context);

    const [open, setOpen] = React.useState(false);

    useEffect(() => {
    }, []);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <IconButton 
                color="primary"
                onClick={handleClickOpen}>
                <VisibilityIcon></VisibilityIcon>
            </IconButton>

            <Dialog 
                modal={true}
                open={open} 
                onClose={handleClose} aria-labelledby="form-dialog-title">

                <DialogTitle id="form-dialog-title">Code Preview: {code.name}</DialogTitle>
                <DialogContent
                    >
                    <DialogContentText>
                        Code written by {code.owner.name}.
                    </DialogContentText>
                    
                    <AceEditor
                        className={classes.aceEditor}
                        mode={code.language}
                        theme="monokai"
                        name="editor"
                        fontSize="34"
                        editorProps={{
                            $blockScrolling: true
                        }}
                        value={code.code}
                        setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: true,
                            showLineNumbers: true,
                            tabSize: 2,
                        }}
                        readOnly={true}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CodePreview;