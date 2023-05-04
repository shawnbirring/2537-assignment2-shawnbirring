"use client";
import Link from "next/link";
import { Navbar, Container, Nav } from "react-bootstrap";

const linkStyle = {
  textDecoration: "none",
  color: "rgba(0, 0, 0, 0.5)",
  marginLeft: "15px",
  display: "block",
};

export default function CustomNavbar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand>MongoDB App</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="me-auto">
            <Nav.Item>
              <Link href="/" passHref style={linkStyle}>
                Home
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link href="/members" passHref style={linkStyle}>
                Members
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link href="/signup" passHref style={linkStyle}>
                Sign Up
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link href="/login" passHref style={linkStyle}>
                Log In
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link href="/admin-view" passHref style={linkStyle}>
                Admin View
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
