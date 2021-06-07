import PubSub from 'pubsub-js';
import alertType from './AlertTypes';

const pubMessage = (e, message, alert) => {
    if(alert === alertType.success) {
        PubSub.publish('alert', {
            alertType: alert,
            message: message
        })
    } else if (e && e.response && e.response.data.statusCode === 400) {
        PubSub.publish('alert', {
            alertType: alert,
            message: e.response.data.message.join(", ")
        })
    } else {
        PubSub.publish('alert', {
            alertType: alertType.error,
            message
        })
    }
}

export default pubMessage;