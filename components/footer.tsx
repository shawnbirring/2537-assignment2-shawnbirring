"use client";
import { Container, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";

export default function Footer() {
  return (
    <Container>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <Row className="w-100">
          <Col md={6} className="d-flex align-items-center">
            <span className="mb-3 mb-md-0 text-muted">© 2022 Company, Inc</span>
          </Col>
          <Col md={6} className="d-flex justify-content-md-end">
            <ListGroup horizontal>
              <ListGroupItem>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </ListGroupItem>
              <ListGroupItem>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </ListGroupItem>
              <ListGroupItem>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      </footer>
    </Container>
  );
}
