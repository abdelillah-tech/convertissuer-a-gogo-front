import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import AuthService from '../api/Auth';
import Link from '@material-ui/core/Link';
import { 
    NAME_MIN_LENGTH, NAME_MAX_LENGTH, 
    USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH,
    EMAIL_MAX_LENGTH,
    PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH
} from '../constants';
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
    signupBtn: {
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
        maxWidth: 350,
    },
}),
);

const Signup = () => {
    const history = useHistory();
    const classes = useStyles();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [helperText, setHelperText] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        if (name.trim() && email.trim() && password.trim()) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [password, name, email]);

    const handleSignup = event => {
        event.preventDefault();
        AuthService.signup(name, email, password)
            .then((response) => {
                history.push("/login");
            }).catch(e => {
                if (e.response.status === 401) {
                    setHelperText('Incorrect username or password');
                } else {
                    setHelperText('Sorry! Something went wrong. Please try again!');
                }
            });
    };

    return (
        <React.Fragment>
            <div className={classes.root}>
                <form className={classes.container} noValidate autoComplete="off" onSubmit={handleSignup}>
                    <Card className={classes.card}>
                        <CardHeader className={classes.header} title="Signup" />
                        <CardContent>
                            <div>
                                <TextField
                                    error={error}
                                    fullWidth
                                    id="name"
                                    type="text"
                                    label="Name"
                                    placeholder="Name"
                                    margin="normal"
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <TextField
                                    error={error}
                                    fullWidth
                                    id="email"
                                    type="email"
                                    label="Email"
                                    placeholder="Email"
                                    margin="normal"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <TextField
                                    error={error}
                                    fullWidth
                                    id="password"
                                    type="password"
                                    label="Password"
                                    placeholder="Password"
                                    margin="normal"
                                    helperText={helperText}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </CardContent>
                        <CardActions>
                            <Button
                                variant="contained"
                                size="large"
                                color="secondary"
                                type="submit"
                                className={classes.signupBtn}
                                disabled={isButtonDisabled}>
                                Signup
                        </Button>
                        </CardActions>
                    </Card>
                    <Typography>Already registed? <Link href="/login">Login now!</Link></Typography>
                </form>
            </div>
        </React.Fragment>
    );
}

export default Signup;