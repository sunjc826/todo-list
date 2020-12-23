import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import "./sidebar.css";
import ProjectList from "./project/ProjectList";
import TagList from "./tag/TagList";
import LabelList from "./label/LabelList";
import FilterList from "./filter/FilterList";

const Sidebar = () => {
  const history = useHistory();

  const [collapseOpen, setCollapseOpen] = useState({
    projects: true,
    tags: true,
    labels: true,
    filters: true,
  });
  const toggleCollapse = (item) => () =>
    setCollapseOpen({
      ...collapseOpen,
      [item]: !collapseOpen[item],
    });

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
              <ListGroupItem action onClick={toggleCollapse("projects")}>
                <p
                  className={`dropdown-toggle allow-rotate ${
                    collapseOpen.projects ? "list-open" : "list-closed"
                  }`}
                >
                  Projects
                </p>
                <ProjectList collapseOpen={collapseOpen.projects} />
              </ListGroupItem>
              <ListGroupItem action onClick={toggleCollapse("tags")}>
                <p
                  className={`dropdown-toggle allow-rotate ${
                    collapseOpen.tags ? "list-open" : "list-closed"
                  }`}
                >
                  Tags
                </p>
                <TagList collapseOpen={collapseOpen.tags} />
              </ListGroupItem>
              <ListGroupItem action onClick={toggleCollapse("labels")}>
                <p
                  className={`dropdown-toggle allow-rotate ${
                    collapseOpen.labels ? "list-open" : "list-closed"
                  }`}
                >
                  Labels
                </p>
                <LabelList collapseOpen={collapseOpen.labels} />
              </ListGroupItem>
              <ListGroupItem action onClick={toggleCollapse("filters")}>
                <p
                  className={`dropdown-toggle allow-rotate ${
                    collapseOpen.filters ? "list-open" : "list-closed"
                  }`}
                >
                  Filters
                </p>
                <FilterList collapseOpen={collapseOpen.filters} />
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Sidebar;
/*
              
*/
