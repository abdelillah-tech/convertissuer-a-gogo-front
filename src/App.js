import React from 'react';
import MenuAppBar from './common/MenuAppBar';
import Login from './user/Login';
import Signup from './user/Signup';
import Profile from './user/Profile';
import Home from './common/Home';
import './styles/App.css';
import { Switch, Route } from "react-router-dom";
import Editor from './Playground/Editor';
import Playground from './Playground/Playground';
import theme from './styles/Theme';
import { ThemeProvider } from '@material-ui/core/styles'


const App = () => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <MenuAppBar />
                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/login" >
                        <Login />
                    </Route>
                    <Route path="/signup">
                        <Signup />
                    </Route>
                    <Route path="/profile">
                        <Profile />
                    </Route>
                    <Route path="/Editor">
                        <Editor />
                    </Route>
                    <Route path="/Playground">
                        <Playground />
                    </Route>
                </Switch>
            </ThemeProvider>
        </>
    );
}

export default App;
