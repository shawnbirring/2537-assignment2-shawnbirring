"use client";

import { Button, Container, Row, Col } from "react-bootstrap";
import { SessionProvider } from "next-auth/react";

const heroStyle = {
  minHeight: "70vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f8f9fa",
  paddingTop: "2rem",
  paddingBottom: "2rem",
};

export default function Home() {
  return (
    <div style={heroStyle}>
      <Container>
        <Row>
          <Col>
            <h1>Hello, this is my Cool application!</h1>
            <p>
              This appliation uses Next.js, Next-auth React, Bootstrap and
              MongoDB to complete Comp 2537 Assignment 2.
            </p>
          </Col>
          <Col>
            <Button variant="primary" className="m-3" href="/signup">
              Sign Up
            </Button>
            <Button variant="primary" className="m-3" href="/login">
              Log In
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
