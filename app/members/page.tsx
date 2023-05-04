"use client";
import { useSearchParams } from "next/navigation";
import { Container, Row, Col } from "react-bootstrap";
import { useSession, getSession } from "next-auth/react";

export default function Members() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Access Denied</p>;
  }
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  return (
    <Container>
      <Row>
        <Col xs={12}>
          <h1 className="text-center m-5">Members</h1>
          <h3 className="text-center">Hi {name ? name : "User"}!</h3>
        </Col>
      </Row>
    </Container>
  );
}
