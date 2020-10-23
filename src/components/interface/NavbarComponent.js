import React from 'react';
import {Link, withRouter} from 'react-router-dom';
// components
import {Navbar} from 'react-bootstrap';
// stylesheets
import '../../stylesheets/Interface.css';
// back end
import { withFirebase } from '../Firebase/index';
// constants
import * as ROUTES from '../../constants/routes';


const NavbarComponent = (props) => {

    const handleLogOut = (event) => {
        event.preventDefault();
        props.firebase.doSignOut()
        .then(() => {
            // redirect
            props.history.push(ROUTES.LANDING);
        })
        .catch(error => {
            console.log(error);
        });
    }

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Link to={ROUTES.MAIN}>
                    <Navbar.Brand>Pacemaker DCM System Dashboard</Navbar.Brand>
                </Link>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text id='signoutBtn' onClick={handleLogOut}>Sign Out</Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

// wrap in router for redirect
const LogOff = withRouter(withFirebase(NavbarComponent));

export default NavbarComponent;
export {LogOff};