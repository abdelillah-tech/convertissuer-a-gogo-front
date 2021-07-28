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
import Typography from "@material-ui/core/Typography";
import SearchBar from "material-ui-search-bar";

import CodeSaveService from '../../api/CodeSave';


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
            CodeSaveService.getAllCodesByName(state.token, searchedVal)
                .then((response) => {
                    setRows(response.data)
                }).catch(e => {
                    pubMessage(e, 'Sorry! We cannot load your codes for the moment', alertType.error)
                })
        } else {
            CodeSaveService.getAllCodes(state.token)
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
        <div>
            <Container maxWidth="sm" component="main">
                <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom className={classes.title}>
                    Browse all the saved codes
                </Typography>
            </Container>
            <Container maxWidth="md" component="main">

                <Paper style={{marginTop: "30px"}}>
                    <SearchBar
                        style={{borderBottom: "2px solid #ff8C00"}}
                        value={searched}
                        onChange={(searchVal) => requestSearch(searchVal)}
                        onCancelSearch={() => cancelSearch()}
                        />
                    <TableContainer>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Language</TableCell>
                                <TableCell align="right">User</TableCell>
                                <TableCell align="right">Length</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">{row.id}</TableCell>
                                    <TableCell align="right">{row.name}</TableCell>
                                    <TableCell align="right">{row.language}</TableCell>
                                    <TableCell align="right">userID</TableCell>
                                    <TableCell align="right">{row.code.split(" ").length}</TableCell>
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