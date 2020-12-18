import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <div id="sidebar">
      <Container>
        <Row>
          <Col xs="12">
            <h3>Sidebar</h3>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <ListGroup>
              <ListGroupItem>
                <Link to="/home">Homepage</Link>
              </ListGroupItem>
              <ListGroupItem>
                <Link to="/tasks">All Tasks</Link>
              </ListGroupItem>
              <ListGroupItem>
                <Link to="/projects">All Projects</Link>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Sidebar;
