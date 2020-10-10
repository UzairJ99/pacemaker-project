import React from "react";
import logo from '../images/logo.png';
import {Link, withRouter} from 'react-router-dom';
// stylesheets
import '../stylesheets/App.css';
import '../stylesheets/LoginPage.css';
// back end
import { withFirebase } from './Firebase/index';
// components
import {Form} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
// constants
import * as ROUTES from '../constants/routes';

const LoginPage = () => {
    return(
        <div>
        <header className="App-header">
            <img src={logo} className="logo-small" alt="logo" />
            <br></br>
            <p>
                LOGIN
            </p>
            <div style={{maxWidth: '70%', minWidth: '30%'}}>
                <SigninForm/>
            </div>
            <br></br>
            <p style={{fontSize: '15px'}}>
                Don't have an account? <Link to={ROUTES.REGISTER}>Sign Up here!</Link>
            </p>
        </header>
        </div>
    )
}


/*
The signinFormBase will be the main component which will perform all login functionality.
SigninForm will be the wrapper component for added features.
LoginPage will hold these components together at a top level hiearchy.
*/
const SigninFormBase = (props) => {
    // initial field values for login
    const initialState = {
        email: '',
        password: ''
    }

    /*
    use react hooks to hold state of login form.
    @userInfo will hold email and password.
    @invalidLogin will hold whether the login information was correct or not.
    @errorMsg will hold any errors in login procedure.
    */
    const [userInfo, setUserInfo] = React.useState(initialState);
    const [invalidLogin, setInvalidLogin] = React.useState(false);
    const [errorMsg, setError] = React.useState('');

    /*
    @event will take in an event when the form has been submitted.
    This will take the login information from the state and attempt to log the user in.
    */
    const handleLogin = (event) => {
        // prevent refresh - we'll lose data if it refreshes the page
        event.preventDefault();

        // get login info from state
        const {email, password} = userInfo;

        props.firebase.doSignIn(email, password)
        .then((authUser) => {
            // state is successful login
            setInvalidLogin(false);
            // clear userInfo
            clearInfo();
            // go to main page
            props.history.push(ROUTES.MAIN);
        })
        .catch(error => {
            // clear userInfo and reset values
            clearInfo();
            document.getElementById('emailVal').value = '';
            document.getElementById('passwordVal').value = '';

            // change state to error
            setError(error.message);
            setInvalidLogin(true);
        });
    }

    // update state when input fields change
    const changeEmail = (id) => {
        const key = document.getElementById(id);
        userInfo['email'] = key.value;
        setUserInfo(userInfo);
    }

    const changePass = (id) => {
        const key = document.getElementById(id);
        userInfo['password'] = key.value;
        setUserInfo(userInfo);
    }

    const clearInfo = () => {
        userInfo['email'] = '';
        userInfo['password'] = '';
        setUserInfo({email: '', password: ''});
    }

    // form component
    return (
        <Form onSubmit={handleLogin}>
            {
                // render error message as a flash banner if the login failed
                invalidLogin ? <Alert variant="danger" id='flashMessage' style={{fontSize: '15px'}}>{errorMsg}</Alert> : null
            }
            <Form.Group controlId="formGroupEmail">
                <Form.Label style={{float:'left', fontSize: '15px'}} >Email Address</Form.Label>
                <Form.Control onChange={()=>{changeEmail('emailVal')}} id="emailVal" type="email" placeholder="Enter email" />
                
                <Form.Label style={{float:'left', fontSize: '15px'}}>Password</Form.Label>
                <Form.Control onChange={()=>{changePass('passwordVal')}} id="passwordVal" type="password" placeholder="Password" />
            
                <Button style={{marginTop: '30px', 
                                    width: '100%', 
                                    borderRadius: '20px',
                                    height: '50px',
                                    }}
                        type="submit"
                        variant="light">
                    SUBMIT
                </Button>
            </Form.Group>
        </Form>
    )
}

/*
Wrap the signin form with firebase and the router.
The router will hold track of route history so we can redirect.
*/
const SigninForm = withRouter(withFirebase(SigninFormBase));

export default LoginPage;
export { SigninForm };