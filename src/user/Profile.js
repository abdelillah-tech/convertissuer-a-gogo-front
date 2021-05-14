import React, { useState, useEffect, useContext } from 'react';
import AuthService from '../api/User';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import { Context } from "../common/Store";
import jwt_decode from "jwt-decode";

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: "center"
    },
    card: {
        marginTop: theme.spacing(10),
        justifyContent: 'center',
        maxWidth: 345,
    },
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        fontSize: '40px',
        background: '#ffff00',
        color: '#212121'
    },
    header: {
        background: '#212121',
    },
    title: {
        color: '#ffff00'
    },
    subheader: {
        color: '#ffff00'
    },
    scores: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    win: {
        color: '#008000'
    },
    defeat: {
        color: '#FF0000'
    }
})
);

const Profile = () => {

    const classes = useStyles();
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    // const [infos, setSomeInfos] = useState('');
    const [state, dispatch] = useContext(Context);

    
    
    useEffect(() => {
        const uid = jwt_decode(state.token).id;
        AuthService.getUserById(uid, state.token)
            .then(response => {
                setId(response.id);
                setName(response.name);
                setEmail(response.email);
            });
    }, []);
    

    return (
        <div className={classes.container}>
            <Card className={classes.card}>
                <CardHeader className={classes.header}
                    classes={{
                        subheader: classes.subheader,
                        title: classes.title
                    }}
                    avatar={
                        <Avatar className={classes.avatar}>{name.charAt(0).toUpperCase()}</Avatar>
                    }
                    title={`ID:${id} - ${email}`}
                    subheader={`@${name}`}
                />
                <CardContent>
                    <Typography variant="h4" align="center"></Typography>
                    <div>
                        {/*some infos*/}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default Profile;