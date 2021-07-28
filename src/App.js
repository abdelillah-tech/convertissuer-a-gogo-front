import React, { useContext } from 'react';

import { Switch, Route } from "react-router-dom";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './styles/Theme';
import './styles/App.css';

import AlertComp from './common/Alerts';
import { Context } from './common/Store';
import MenuAppBar from './common/MenuAppBar';
import AppFooter from './common/AppFooter';

import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';
import Profile from './components/user/Profile';
import Home from './components/home/Home';
import BrowseCode from './components/browse/BrowseCode';
import Playground from './components/Playground/Playground';

const App = () => {

    const [state ] = useContext(Context);

    return (
        <div style={{height: "100vh"}}>
            <ThemeProvider theme={theme} style={{display: "flex", flexDirection: "column"}}>
                <MenuAppBar />
                <AlertComp />
                <Switch style={{flexGrow: 4}}>
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
                    <Route path="/browse-code">
                        <BrowseCode />
                    </Route>
                </Switch>
                <AppFooter style={{flex: 0}}/>
            </ThemeProvider>
        </div>

    );
}

export default App;
