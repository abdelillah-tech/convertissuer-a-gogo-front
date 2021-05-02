import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let Theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ff8C00',
        },
        secondary: {
            main: '#ffff00',
        },
    },
});

Theme = responsiveFontSizes(Theme);

export default Theme;