import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import ProjectList from "./project/ProjectList";
import TagList from "./tag/TagList";
import LabelList from "./label/LabelList";
import FilterList from "./filter/FilterList";
import { AppContext } from "../Index";
const Sidebar = () => {
  const history = useHistory();
  const { sidebarActive, collapseOpen, toggleCollapse } = useContext(
    AppContext
  );

  return (
    <div id="sidebar" className={`${sidebarActive ? "active" : ""}`}>
      <Row>
        <Col xs="12">
          <ListGroup flush>
            <ListGroupItem action onClick={() => history.push("/home")}>
              <Link to="/home">Homepage</Link>
            </ListGroupItem>
            <ListGroupItem action onClick={() => history.push("/tasks")}>
              <Link to="/tasks">
                <i className="fas fa-tasks"></i> All Tasks
              </Link>
            </ListGroupItem>
            <ListGroupItem action onClick={toggleCollapse("projects")}>
              <p
                className={`dropdown-toggle allow-rotate ${
                  collapseOpen.projects ? "list-open" : "list-closed"
                }`}
              >
                <i className="fas fa-project-diagram"></i> Projects
              </p>
              <ProjectList collapseOpen={collapseOpen.projects} />
            </ListGroupItem>
            <ListGroupItem action onClick={toggleCollapse("tags")}>
              <p
                className={`dropdown-toggle allow-rotate ${
                  collapseOpen.tags ? "list-open" : "list-closed"
                }`}
              >
                <i className="fas fa-tags"></i> Tags
              </p>
              <TagList collapseOpen={collapseOpen.tags} />
            </ListGroupItem>
            <ListGroupItem action onClick={toggleCollapse("labels")}>
              <p
                className={`dropdown-toggle allow-rotate ${
                  collapseOpen.labels ? "list-open" : "list-closed"
                }`}
              >
                <i className="fas fa-user-tag"></i> Labels
              </p>
              <LabelList collapseOpen={collapseOpen.labels} />
            </ListGroupItem>
            <ListGroupItem action onClick={toggleCollapse("filters")}>
              <p
                className={`dropdown-toggle allow-rotate ${
                  collapseOpen.filters ? "list-open" : "list-closed"
                }`}
              >
                <i className="fas fa-filter"></i> Filters
              </p>
              <FilterList collapseOpen={collapseOpen.filters} />
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default Sidebar;
/*
              
*/
