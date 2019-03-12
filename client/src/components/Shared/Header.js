import React from 'react';
import { Nav, NavItem, Navbar, NavbarBrand, Collapse, NavbarToggler, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import auth from '../../authentication/auth';


class Header extends React.Component {

    static contextTypes = {
        router: PropTypes.object
    }

    logout(e){

            if (window.confirm('Are you sure you wish to delete this item?')){
            auth.logout(() => {
                this.context.router.history.push("/");
            });
        }

    }

    render() {

        return (
            <div>
        <Navbar color="navbar-dark bg-dark" light expand="md">
        <NavbarBrand href="/"><h2 className="orangify">Cake | POS</h2></NavbarBrand>

    <Nav className="ml-auto" navbar>
    <NavItem>
    <Button className="orangify" id="logout-btn" onClick={this.logout.bind(this)} >Log Out</Button>
    </NavItem>
    </Nav>


    </Navbar>
    <br />
    </div>
    );
    }
}

export default Header;