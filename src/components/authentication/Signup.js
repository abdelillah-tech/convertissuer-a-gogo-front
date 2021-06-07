import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import AuthService from '../../api/Auth';
import Link from '@material-ui/core/Link';
import {
    NAME_MIN_LENGTH, 
    NAME_MAX_LENGTH,
    EMAIL_MIN_LENGTH,
    EMAIL_MAX_LENGTH,
    EMAIL_PATTERN,
    PASSWORD_MIN_LENGTH, 
    PASSWORD_MAX_LENGTH
} from '../../constants';
import { useHistory } from 'react-router';
import { Typography } from '@material-ui/core';

import PubSub from 'pubsub-js';
import alertType from '../../common/AlertTypes';
import { Controller, useForm } from 'react-hook-form';

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

    const { handleSubmit, control, formState: { errors }, reset } = useForm();
    const history = useHistory();
    const classes = useStyles();

    const onSubmit = data => {
        AuthService.signup(data.name, data.email, data.password)
            .then(() => {
                history.push("/login");
            }).catch(e => {
                if (e.response && e.response.data && e.response.data.statusCode === 403) {
                    PubSub.publish('alert', {
                        alertType: alertType.error,
                        message: 'Incorrect username or password'
                    })
                } else {
                    PubSub.publish('alert', {
                        alertType: alertType.error,
                        message: 'Sorry! Something went wrong. Please try again!'
                    })
                }
            });
    };

    return (
        <React.Fragment>
            <div className={classes.root}>
                <form className={classes.container} noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                    <Card className={classes.card}>
                        <CardHeader className={classes.header} title="Signup" />
                        <CardContent>
                            <div>
                                <Controller
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            type='name'
                                            margin='normal'
                                            placeholder="Maxime d'Harboullé"
                                            helperText={errors.name ? errors.name.message : ''}
                                            error={!!errors.name}
                                        />
                                    )}
                                    name="name"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: 'Required',
                                        minLength: {
                                            value: NAME_MIN_LENGTH,
                                            message: `Your input must exceed ${NAME_MIN_LENGTH} characters`,
                                        },
                                        maxLength: {
                                            value: NAME_MAX_LENGTH,
                                            message: `Your input must exceed ${NAME_MAX_LENGTH} characters`,
                                        },
                                    }} />
                                <Controller
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            type='email'
                                            margin='normal'
                                            placeholder='maxime@gmail.com'
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
                                className={classes.signupBtn}
                            >
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