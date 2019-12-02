import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { createMuiTheme, makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import './App.css';

import { Login } from './Login';
import { About } from './About';
import { Home } from './Home';
import { User } from './User';
import { CourseDetail } from './CourseDetail';
import { Notfound } from './NotFound';
import Nav from './Nav';
import SubjectList from './SubjectList';

export const admin = 'admin@muni.cz';
export const adminPassword = '123';

const ourTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#829298',
        },
        secondary: {
            main: '#82d4bb',
        },
    },
});

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#E8E8E8',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    link: {
        textDecoration: 'none',
    },
}));
const pages = [
    {
        to: '/',
        label: 'Home',
    },
    {
        to: '/about/',
        label: 'About',
    },
    {
        to: '/user/',
        label: 'User',
    },
    {
        to: '/course/',
        label: 'Course Detail',
    },
    {
        to: '/subjects/',
        label: 'Subjects',
    },
];

const App: React.FC = () => {
    const classes = useStyles;
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const authorizeUser = (username: string, password: string) => {
        const isAuthorized = username === admin && password === adminPassword;

        setIsLoggedIn(isAuthorized);

        return isAuthorized;
    };

    return (
        <MuiThemeProvider theme={ourTheme}>
            <Router>
                {!isLoggedIn && <Redirect to={'/login/'} />}
                <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} pages={pages} />
                <Switch>
                    <Route
                        exact
                        path="/login/"
                        render={() => <Login authorizeUser={authorizeUser} />}
                    />
                    <Route exact path="/about/" component={About} />
                    <Route exact path="/user/" component={User} />
                    <Route exact path="/course/:courseId" component={CourseDetail} />
                    <Route exact path="/subjects" component={SubjectList} />
                    <Route exact path="/" component={Home} />
                    <Route component={Notfound} />
                </Switch>
            </Router>
        </MuiThemeProvider>
    );
};

export default App;
