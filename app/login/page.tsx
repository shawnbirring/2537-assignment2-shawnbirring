"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    console.log(result);
    if (response.ok) {
      router.push(`/members?name=${result.name}`);
    } else {
      setMessage(result.message);
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={12} md={{ span: 6, offset: 3 }}>
          <h1 className="text-center m-5">Log In</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicUsername" className="m-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Enter username"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="m-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Log In
            </Button>
          </Form>
          {message && <p>{message}</p>}
        </Col>
      </Row>
    </Container>
  );
}
