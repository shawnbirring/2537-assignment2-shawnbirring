"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

export default function SignUp() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    const response = await fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, username, password }),
    });
    const result = await response.json();
    if (response.ok) {
      router.push(`/members?name=${name}`);
    } else {
      setMessage(result.message);
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={12} md={{ span: 6, offset: 3 }}>
          <h1 className="text-center m-5">Sign Up</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName" className="m-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
              />
            </Form.Group>

            <Form.Group controlId="formBasicUsername" className="m-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="m-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </Form>
          {message && <p>{message}</p>}
        </Col>
      </Row>
    </Container>
  );
}
