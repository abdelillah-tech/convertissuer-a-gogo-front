import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Context } from "../../common/Store";
import alertType from '../../common/AlertTypes';
import pubMessage from '../../common/MessagePublisher';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SearchBar from "material-ui-search-bar";

import CodeSaveService from '../../api/CodeSave';
import CodePreview from './CodePreview';

import { SiPython } from 'react-icons/si';
import { SiJavascript } from 'react-icons/si';


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
    }
}));


const BrowseCode = () => {

    const [rows, setRows] = useState([]);
    const [state, dispatch] = useContext(Context);
    const [searched, setSearched] = useState("");

    const requestSearch = (searchedVal) => {
        if(searchedVal && searchedVal.length){
            CodeSaveService.getAllCodesByName(searchedVal)
                .then((response) => {
                    setRows(response.data)
                }).catch(e => {
                    pubMessage(e, 'Sorry! We cannot load your codes for the moment', alertType.error)
                })
        } else {
            CodeSaveService.getAllCodes()
                .then((response) => {
                    setRows(response.data)
                }).catch(e => {
                    pubMessage(e, 'Sorry! We cannot load your codes for the moment', alertType.error)
                })
        }
        
        
    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };
    
    useEffect(() => {
        requestSearch()
    }, []);

        

    const classes = useStyles();

    return (
        <div style={{height: "100%", backgroundImage: 'url(' + require('../../images/background/background.jpg') + ')',padding: "20px"}}>
            <Container maxWidth="sm" component="main">
                <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom className={classes.title}>
                    Browse all the saved codes
                </Typography>
            </Container>
            <Container maxWidth="md" component="main">

                <Paper style={{marginTop: "30px"}}>
                    <SearchBar
                        style={{borderBottom: "2px solid #ff8C00", }}
                        value={searched}
                        placeholder="Search by saved name"
                        onChange={(searchVal) => requestSearch(searchVal)}
                        onCancelSearch={() => cancelSearch()}
                        />
                    <TableContainer style={{marginBottom: "20px"}}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Language</TableCell>
                                <TableCell align="center">User</TableCell>
                                <TableCell align="center">Lines</TableCell>
                                <TableCell align="center">Preview</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">{row.id}</TableCell>
                                    <TableCell align="center">{row.name}</TableCell>
                                    <TableCell align="center">
                                        {row.language === "javascript" && <SiJavascript></SiJavascript>}
                                        {row.language === "python" && <SiPython></SiPython>}
                                    </TableCell>
                                    <TableCell align="center">ID({row.owner.id}): {row.owner.name}</TableCell>
                                    <TableCell align="center">{row.code.split("\n").length}</TableCell>
                                    <TableCell align="center">
                                        <CodePreview code={row}></CodePreview>  
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                </Paper>
            </Container>
        </div>
    )
}

export default BrowseCode;