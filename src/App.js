import React, { useContext } from 'react';
import MenuAppBar from './common/MenuAppBar';
import Login from './authentication/Login';
import Signup from './authentication/Signup';
import Profile from './user/Profile';
import Home from './home/Home';
import './styles/App.css';
import { Switch, Route } from "react-router-dom";
import Playground from './Playground/Playground';
import theme from './styles/Theme';
import { ThemeProvider } from '@material-ui/core/styles';
import AlertComp from './common/Alerts';
import { Context } from './common/Store';

const App = () => {

    const [state ] = useContext(Context);

    return (
        <ThemeProvider theme={theme}>
            <MenuAppBar />
            <AlertComp />
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/signup">
                    <Signup />
                </Route>
                <Route path="/profile">
                    <div>{!state.isAuthenticated ? <Login /> : <Profile />}</div>
                </Route>
                <Route path="/playground">
                    <div>{!state.isAuthenticated ? <Login /> : <Playground />}</div>
                </Route>
            </Switch>
        </ThemeProvider>
    );
}

export default App;
