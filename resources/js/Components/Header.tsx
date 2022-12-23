import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
    return (
        <Navbar>
            <Container>
                <Navbar.Brand href="/">
                    <img
                        alt="klink logo"
                        src="https://uploads-ssl.webflow.com/63123f170934f7ba0d43e3d5/631659736f7b0e91baeb8f6b_Logo.svg"
                        width="80"
                        height="40"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Nav.Link href="/">
                            <FontAwesomeIcon icon={faUpload} />
                             Upload
                        </Nav.Link>
                        <Nav.Link href="/transaction">Transactions</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
