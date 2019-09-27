import React, { useState } from 'react';
import SignIn from './components/SignInPage';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import EditorView from './components/EditorView';
import SignUp from './components/SignUpPage';
import axios from 'axios';

function App() {

    const [currentRoute, setCurrentRoute] = useState('/signIn');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    function validateUser() {
        console.log(userEmail + " " + userPassword);
        axios.post('http://localhost:4000/validateUser', {email:userEmail, pw: userPassword})
        .then(response => response.data)
        .then(data => {
            if (data === 'editor'){
                setCurrentRoute('/editor');
            }
        });
    }

    return (

        <div>
            <Router>
                <Route path="/signIn" render={
                    () => <SignIn
                        setRoute={setCurrentRoute}
                        setUserEmail={setUserEmail}
                        setUserPassword={setUserPassword}
                        validateUser={validateUser}
                    />}
                />
                <Route path="/editor" render={() => <EditorView />} />
                <Route path="/signUp" render={() => <SignUp />} />
                <Redirect to={currentRoute} />
            </Router>
        </div>
    );
}

export default App;
