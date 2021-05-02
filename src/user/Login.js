import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import Link from '@material-ui/core/Link';
import { ACCESS_TOKEN } from '../constants/index';
import AuthService from '../api/Auth';
import { useHistory } from 'react-router';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    loginBtn: {
        marginTop: theme.spacing(2),
        flexGrow: 1,
    },
    header: {
        textAlign: 'center',
        background: '#212121',
        color: '#ff8C00',
    },
    card: {
        marginTop: theme.spacing(10),
        maxWidth: 345,
    },
}),
);

const Login = () => {
    const classes = useStyles();
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [helperText, setHelperText] = useState('');
    const history = useHistory();

    useEffect(() => {
        if (email.trim() && password.trim()) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [email, password]);


    const handleSubmit = event => {
        event.preventDefault();
        AuthService.login(email, password)
            .then((response) => {
                localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
                history.push("/playground");
            }).catch(e => {
                console.log(e);
                if (e.response.status === 401) {
                    setHelperText('Incorrect name or password');
                } else {
                    setHelperText('Sorry! Something went wrong. Please try again!');
                }
            });

    }

    return (
        <div className={classes.root}>
            <form className={classes.container} onSubmit={handleSubmit} autoComplete="off" >
                <Card className={classes.card}>
                    <CardHeader 
                        color="primary"
                        className={classes.header} 
                        title="Login" />
                    <CardContent>
                        <div>
                            <TextField
                                fullWidth
                                id="email"
                                type="text"
                                label="email"
                                placeholder="email"
                                margin="normal"
                                onChange={(e) => setemail(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                id="password"
                                type="password"
                                label="Password"
                                placeholder="Password"
                                margin="normal"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button
                            variant="contained"
                            size="large"
                            color="primary"
                            type="submit"
                            className={classes.loginBtn}
                            disabled={isButtonDisabled}
                        >
                            Login
                        </Button>
                    </CardActions>
                    <p style={{ color: "red" }}>{helperText}</p>
                </Card>
                <Typography>
                    Or <Link href="/signup">Register now!</Link>
                </Typography>
            </form>
        </div>
    );
}

export default Login;