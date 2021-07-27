import React, { useContext } from 'react';

import { Switch, Route } from "react-router-dom";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './styles/Theme';
import './styles/App.css';

import AlertComp from './common/Alerts';
import { Context } from './common/Store';
import MenuAppBar from './common/MenuAppBar';

import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';
import Profile from './components/user/Profile';
import Home from './components/home/Home';
import Playground from './components/Playground/Playground';

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
                <Route path="/file-coding">
                    <div>{!state.isAuthenticated ? <Login /> : <Playground />}</div>
                </Route>
            </Switch>
        </ThemeProvider>
    );
}

export default App;
