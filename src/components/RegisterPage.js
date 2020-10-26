import React from "react";
import logo from '../images/logo.png';
import {withRouter} from 'react-router-dom';
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

const RegisterPage = () => {
    return(
        <div>
        <header className="App-header">
            <img src={logo} className="logo-small" alt="logo" />
            <br></br>
            <p>
                Sign Up
            </p>
            <div style={{maxWidth: '70%', minWidth: '30%'}}>
                <SignupForm/>
            </div>
            <br></br>
        </header>
        </div>
    )
}


/*
The signinFormBase will be the main component which will perform all login functionality.
SigninForm will be the wrapper component for added features.
LoginPage will hold these components together at a top level hiearchy.
*/
var noOfUsers = 0;
const SignupFormBase = (props) => {
    // initial field values for login
    const initialState = {
        email: '',
        password: '',
    }

    /*
    use react hooks to hold state of login form.
    @userInfo will hold email and password.
    @invalidLogin will hold whether the login information was correct or not.
    @errorMsg will hold any errors in login procedure.
    */
    const [userInfo, setUserInfo] = React.useState(initialState);
    const [invalidSignup, setInvalidSignup] = React.useState(false);
    const [errorMsg, setError] = React.useState('');

    /*
    @event will take in an event when the form has been submitted.
    This will take the login information from the state and attempt to log the user in.
    */
    const handleSignup = (event) => {
        // prevent refresh - we'll lose data if it refreshes the page
        event.preventDefault();
        // get login info from state
        if(noOfUsers<10){
            const {email, password} = userInfo;
            let confirmedPassword = document.getElementById("passwordVal_1").value
            if(password!==confirmedPassword) 
            {
              setInvalidSignup(true)
              setError("Passwords don't match")
            }
            else{
              props.firebase.doCreateUser(email, password)
              .then((authUser) => {
                  // state is successful login
                  setInvalidSignup(false);
                  // clear userInfo

                  //temporary code starts
                  noOfUsers++;
                  //temporary code ends
                  
                  clearInfo();
                  // go to main page
                  props.history.push(ROUTES.MAIN);
              })
              .catch(error => {
                  // clear userInfo and reset values
                  clearInfo();
                  document.getElementById('emailVal').value = '';
                  document.getElementById('passwordVal').value = '';
                  document.getElementById('passwordVal_1').value = '';
      
                  // change state to error
                  setError(error.message);
                  setInvalidSignup(true);
              });
            }
        }
        else{
            setInvalidSignup(true);
            setError("Max users limit is 2")
        }
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
    let styles = {float:'left', fontSize: '15px'}

    // form component
    return (
        <Form onSubmit={handleSignup}>
            {
                // render error message as a flash banner if the login failed
                invalidSignup ? <Alert variant="danger" id='flashMessage' style={{fontSize: '15px'}}>{errorMsg}</Alert> : null
            }
            <Form.Group controlId="formGroupEmail">
                <Form.Label style={styles} >Email Address</Form.Label>
                <Form.Control onChange={()=>{changeEmail('emailVal')}} id="emailVal" type="email" placeholder="Enter email" />
                
                <Form.Label style={styles}>Password</Form.Label>
                <Form.Control onChange={()=>{changePass('passwordVal')}} id="passwordVal" type="password" placeholder="Password" />
                <Form.Label style={styles}>Confirm Password</Form.Label>
                <Form.Control id="passwordVal_1" type="password" placeholder="Confirm Password" />
            
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
const SignupForm = withRouter(withFirebase(SignupFormBase));

export default RegisterPage;
export { SignupForm };