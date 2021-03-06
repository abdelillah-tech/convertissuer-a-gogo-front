import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import PubSub from 'pubsub-js';
import {
    ALERT_SHOW_TIME
} from '../constants';
class AlertComp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            alertType: 'error',
            message: '',
        }
    }

    handleClose = (alert) => {
        this.setState({
            open: false,
        });
    }

    alert = PubSub.subscribe('alert', (msg, data) => {
        this.setState({
            open: true,
            alertType: data.alertType,
            message: data.message.charAt(0).toUpperCase() + data.message.slice(1),
        });

        setTimeout(() => {
            this.handleClose()
        }, ALERT_SHOW_TIME)
    });

    unsubAlert = PubSub.unsubscribe(alert);

    render() {
        return (
            <Collapse in={this.state.open} zindex="tooltip" timeout={300}>
                <Alert severity={this.state.alertType}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={
                                this.handleClose
                            }
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    {this.state.message}
                </Alert >
            </Collapse >
        );
    }
}

export default AlertComp;