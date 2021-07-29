import React from 'react';
import { APP_DESC } from '../../constants';
import { Typography, CardHeader, CardActions, Button, Link, CardContent, Container, Grid, Card } from '@material-ui/core';
import StarIcon from '@material-ui/icons/StarBorder';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { Context } from "../../common/Store";

const useStyles = makeStyles((theme) => ({
    '@global': {
      ul: {
        margin: 0,
        padding: 0,
        listStyle: 'none',
      },
    },
    appBar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
      flexWrap: 'wrap',
    },
    toolbarTitle: {
      flexGrow: 1,
    },
    link: {
      margin: theme.spacing(1, 1.5),
    },
    heroContent: {
      padding: theme.spacing(8, 0, 6),
    },
    cardHeader: {
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
      borderBottom: "3px solid #ff8C00",
    },
    cardPricing: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'baseline',
      marginBottom: theme.spacing(2),
    },
    footer: {
      borderTop: `1px solid ${theme.palette.divider}`,
      marginTop: theme.spacing(8),
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      [theme.breakpoints.up('sm')]: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
      },
    },

    card: {
        flex: 1,
        margin: "10px"
    },
    startCoding: {
        height: "300px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    startCodingBtn: {
        backgroundColor: "white",
        color: "#ff8C00",
        border: "2px solid #ff8C00",
        "&:hover": {
            color: "white",
            border: 0
        }
    },
    cardsContainer: {
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "stretch"
    }
    
  }));

  const cards = [
    {
      title: 'File upload',
      subheader: 'Upload and test your files',
      description: ['up to 10 files', 'stored on AWS S3'],
    },
    {
      title: 'Languages',
      subheader: 'Some popular languages',
      description: [
        'Javascipt',
        'Python',
        '(coming) C',
        '(coming) C++',
      ],
    },
    {
      title: 'Preview',
      subheader: 'Compare your input and output',

      description: [
        '.bmp .png .jpg',
        '.txt',
        'And more!',
      ],
    },
    {
      title: 'Code analysis',
      subheader: 'Compare your code with others',

      description: [
        'Get a percentage of similarity with other users code',
      ],
    },
  ];

const Home = () => {

    const [state, dispatch] = React.useContext(Context);
    const classes = useStyles();
    const history = useHistory();
    const startCoding = () => {
        if(state.isAuthenticated){
            history.push("/file-coding");
        } else {
            history.push("/login");
        }
    }

    return(
        <div style={{backgroundImage: 'url(' + require('../../images/background/background.jpg') + ')', height: "100%"}}>
            <Container maxWidth="sm" component="main" className={classes.heroContent}>
                <Typography component="h1" fontWeight="2000" variant="h4" align="center" color="textPrimary" gutterBottom>
                    {APP_DESC}
                </Typography>
                <Typography variant="h5" fontWeight="fontWeightBold" align="center" color="textPrimary" component="p">
                Quickly write and test your algorithims and test them on some files in an all in one platform. 
                </Typography>
            </Container>

            <Container maxWidth="md" component="main">
                <div className={classes.cardsContainer}>
                {cards.map((card) => (
                    <Card className={classes.card}>
                        <CardHeader
                        title={card.title}
                        subheader={card.subheader}
                        titleTypographyProps={{ align: 'center' }}
                        subheaderTypographyProps={{ align: 'center' }}
                        action={card.title === 'Pro' ? <StarIcon /> : null}
                        className={classes.cardHeader}
                        />
                        <CardContent>
                        <ul>
                            {card.description.map((line) => (
                            <Typography component="li" variant="subtitle1" align="center" key={line}>
                                {line}
                            </Typography>
                            ))}
                        </ul>
                        </CardContent>
                        <CardActions>
                        </CardActions>
                    </Card>
                ))}
                </div>
            </Container>
            <br/>
            <Container className={classes.startCoding}>
                <Button className={classes.startCodingBtn} onClick={() => startCoding()}>
                    <Typography component="h1" variant="h6" align="center">
                        Start coding!
                    </Typography>
                </Button>
            </Container>
        </div>
    );
}

export default Home;