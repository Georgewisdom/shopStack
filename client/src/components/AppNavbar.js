import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';



class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state  = {
            isOpen: false
        }
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
            <NavbarBrand href="/">ShopStack</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink href="https://github.com/Georgewisdom">
                        Github
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink href="https://github.com/Georgewisdom">
                        Facebook
                        </NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Container>
        </Navbar>
      </div>
    )
  }
}
export default AppNavbar;
