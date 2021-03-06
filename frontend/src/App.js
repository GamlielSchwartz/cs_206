import React, { useState } from 'react';
import SignIn from './components/SignInPage';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/SignUpPage';
import axios from 'axios';
import { Container } from '@material-ui/core';
import Navbar from './components/Navbar';

function App() {

    const [currentRoute, setCurrentRoute] = useState('/home');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    function validateUser() {
        console.log(userEmail + " " + userPassword);
        axios.post('http://localhost:4000/validateUser', { email: userEmail, pw: userPassword })
            .then(response => response.data)
            .then(data => {
                if (data === 'valid') {
                    setCurrentRoute('/home');
                }
            });
    }

    return (
        <div>
            <Navbar />

            <Container>
                <Router>
                    <Route path="/signIn" render={
                        () => <SignIn
                            setRoute={setCurrentRoute}
                            setUserEmail={setUserEmail}
                            setUserPassword={setUserPassword}
                            validateUser={validateUser}
                        />}
                    />
                    <Route path="/home" render={() => <Home />} />
                    <Route path="/signUp" render={() => <SignUp />} />
                    <Redirect to={currentRoute} />
                </Router>
            </Container>
        </div>
    );
}

export default App;
