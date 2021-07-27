export const API_BASE_URL = process.env.NODE_ENV === "production" ? "http://ec2-15-188-232-65.eu-west-3.compute.amazonaws.com/api/v1" : 'http://localhost:3030/api/v1';
export const ACCESS_TOKEN = 'token';

export const NAME_MIN_LENGTH = 4;
export const NAME_MAX_LENGTH = 40;

export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 15;

export const EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const EMAIL_MIN_LENGTH = 3;
export const EMAIL_MAX_LENGTH = 40;

export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 20;

export const APP_NAME = 'Convertisseur à gogo';
export const APP_DESC = 'This is Convertisseur à gogo';

export const ALERT_SHOW_TIME = 3000 //ms

export const CODE_EXEC_COOLDOWN = 4000 //ms