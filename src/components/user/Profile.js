import React, { useState, useEffect, useContext } from 'react';
import AuthService from '../../api/User';
import CodeSaveService from '../../api/CodeSave';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import { Context } from "../../common/Store";
import jwt_decode from "jwt-decode";
import PubSub from 'pubsub-js';
import alertType from '../../common/AlertTypes';
import { SiPython } from 'react-icons/si';
import { SiJavascript } from 'react-icons/si';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: "center",
        marginBottom: "500px"
    },
    card: {
        marginTop: theme.spacing(10),
        justifyContent: 'center',
        maxWidth: 400,
    },
    cardContent: {
        border: "3px solid #ff8C00"
    },
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        fontSize: '40px',
        background: '#ff8C00',
        color: '#212121'
    },
    header: {
        background: '#212121',
    },
    title: {
        color: '#ff8C00'
    },
    subheader: {
        color: '#ff8C00'
    },
    scores: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    loadBtn: {
        backgroundColor: '#ff8C00',
    }
})
);

const Profile = () => {

    const classes = useStyles();
    const [user, setUser] = useState('');
    const [state, dispatch] = useContext(Context);

    
    
    useEffect(() => {
        const uid = jwt_decode(state.token).id;
        AuthService.getUserById(uid, state.token)
            .then(response => {
                setUser(response);
            }).catch(e => {
                PubSub.publish('alert', {
                    alertType: alertType.error,
                    message: 'Sorry! Something went wrong. Please try again!'
                })
            });
        CodeSaveService.getCodes(state.token)
            .then((response) => {
                dispatch({
                    type: "CODES",
                    payload: response.data
                })
            }).catch(e => {
                PubSub.publish('alert', {
                    alertType: alertType.error,
                    message: 'Sorry! We cannot load your codes for the moment'
                })
            })
        
    }, []);
    
    const loadCode = (code) => {
        console.log("load code", code);
    }

    return (
        <div className={classes.container}>
            <Card className={classes.card}>
                <CardHeader className={classes.header}
                    classes={{
                        subheader: classes.subheader,
                        title: classes.title
                    }}
                    avatar={
                        <Avatar className={classes.avatar}>{user.email ? user.email.charAt(0).toUpperCase(): "@"}</Avatar>
                    }
                    title={`ID:${user.id} - ${user.email}`}
                    subheader={`${user.name}`}
                />
                <CardContent className={classes.cardContent}>
                    <Typography variant="h4" align="center"></Typography>
                    <div>
                        <h4>Your codes:</h4>
                        {state.codesList.length > 0 &&
                            <ul>
                            {state.codesList.map((code) => (
                                <li style={{ margin: "4px"}}>
                                    ID: {code.id} 
                                    &nbsp;
                                    {code.language === "javascript" && <SiJavascript></SiJavascript>}
                                    {code.language === "python" && <SiPython></SiPython>}
                                    &nbsp;
                                    {code.name}
                                </li>
                            ))}
                            </ul>
                        }

                        {state.codesList.length == 0 &&
                            <Typography align="center">You havn't saved any codes</Typography>
                        }
                    </div>
                </CardContent>
            </Card>

            <div styles={{height: "666px"}}></div>
        </div>
    );
}

export default Profile;