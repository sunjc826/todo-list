import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import "./sidebar.css";
import ProjectList from "./ProjectList";

const Sidebar = () => {
  const history = useHistory();

  const [collapseOpen, setCollapseOpen] = useState(true);
  const toggleCollapse = () => setCollapseOpen(!collapseOpen);

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
            <ListGroup flush>
              <ListGroupItem action onClick={() => history.push("/home")}>
                <Link to="/home">Homepage</Link>
              </ListGroupItem>
              <ListGroupItem action onClick={() => history.push("/tasks")}>
                <Link to="/tasks">All Tasks</Link>
              </ListGroupItem>
              <ListGroupItem action onClick={toggleCollapse}>
                <p className="dropdown-toggle">Projects</p>
                <ProjectList collapseOpen={collapseOpen} />
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Sidebar;
