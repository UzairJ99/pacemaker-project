import React from 'react';
import {Link} from 'react-router-dom';
// components
import {Navbar} from 'react-bootstrap';
// constants
import * as ROUTES from '../../constants/routes';


const NavbarComponent = () => {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Link to={ROUTES.MAIN}>
                    <Navbar.Brand>Pacemaker DCM System Dashboard</Navbar.Brand>
                </Link>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>Sign Out</Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default NavbarComponent;