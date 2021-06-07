import React, { useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import Link from '@material-ui/core/Link';
import AuthService from '../../api/Auth';
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import PubSub from 'pubsub-js';
import alertType from '../../common/AlertTypes';
import { useForm, Controller } from 'react-hook-form';
import { Context } from "../../common/Store";
import {
    EMAIL_PATTERN,
    EMAIL_MIN_LENGTH,
    EMAIL_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    PASSWORD_MAX_LENGTH
} from '../../constants';

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
}));


const Login = () => {

    const [ state, dispatch ] = useContext(Context);

    const classes = useStyles();

    const { handleSubmit, control, formState: { errors }, reset } = useForm();

    const history = useHistory();

    const onSubmit = data => {
        AuthService.login(data.email, data.password)
            .then(resJson => {
                dispatch({
                    type: "LOGIN",
                    payload: resJson
                })
                history.push("/playground");
            }).catch(e => {
                if (e.response && e.response.data && e.response.data.statusCode === 403) {
                    PubSub.publish('alert', {
                        alertType: alertType.error,
                        message: e.response.data.message
                    })
                } else {
                    PubSub.publish('alert', {
                        alertType: alertType.error,
                        message: 'Sorry! Something went wrong. Please try again!'
                    })
                }
                reset(
                    {
                        email: '',
                        password: ''
                    },
                    {
                        errors: true,
                        dirtyFields: true
                    }
                );
            });

    }

    return (
        <div className={classes.root}>
            <form className={classes.container} onSubmit={handleSubmit(onSubmit)} autoComplete="off" >
                <Card className={classes.card}>
                    <CardHeader
                        color="primary"
                        className={classes.header}
                        title="Login" />
                    <CardContent>
                        <div>
                            <Controller
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        type='email'
                                        margin='normal'
                                        placeholder='Email'
                                        helperText={errors.email ? errors.email.message : ''}
                                        error={!!errors.email}
                                    />
                                )}
                                name="email"
                                control={control}
                                defaultValue=''
                                rules={{
                                    required: 'Required',
                                    minLength: {
                                        value: EMAIL_MIN_LENGTH,
                                        message: `Your input must exceed ${EMAIL_MIN_LENGTH} characters`,
                                    },
                                    maxLength: {
                                        value: EMAIL_MAX_LENGTH,
                                        message: `Your input must exceed ${EMAIL_MAX_LENGTH} characters`,
                                    },
                                    pattern: {
                                        value: EMAIL_PATTERN,
                                        message: "Wrong format"
                                    },
                                }}
                            />
                            <Controller
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        type='password'
                                        margin='normal'
                                        placeholder='Password'
                                        helperText={errors.password ? errors.password.message : ''}
                                        error={!!errors.password}
                                    />
                                )}
                                name="password"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Required',
                                    minLength: {
                                        value: PASSWORD_MIN_LENGTH,
                                        message: `Your input must exceed ${PASSWORD_MIN_LENGTH} characters`,
                                    },
                                    maxLength: {
                                        value: PASSWORD_MAX_LENGTH,
                                        message: `Your input must exceed ${PASSWORD_MAX_LENGTH} characters`,
                                    },
                                }}
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
                        >
                            Login
                        </Button>
                    </CardActions>
                </Card>
                <Typography>
                    Or <Link href="/signup">Register now!</Link>
                </Typography>
            </form>
        </div>
    );
}

export default Login;