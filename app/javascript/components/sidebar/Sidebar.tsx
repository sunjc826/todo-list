import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Badge,
} from "reactstrap";
import ProjectList from "./project/ProjectList";
import TagList from "./tag/TagList";
import LabelList from "./label/LabelList";
import FilterList from "./filter/FilterList";
import { SidebarContext } from "../Index";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
const Sidebar = () => {
  const history = useHistory();
  const { sidebarActive, collapseOpen, toggleCollapse } = useContext(
    SidebarContext
  )!;

  const userState = useSelector((state: RootState) => state.user);
  const userId = userState.userId!;
  const userData = userState.data!;

  const userRelations = userData[userId].relationships;
  const numTasks = userRelations.tasks.data.length;
  const numProjects = userRelations.projects.data.length;
  const numLabels = userRelations.labels.data.length;
  const numFilters = userRelations.filters.data.length;

  return (
    <div id="sidebar" className={`${sidebarActive ? "active" : ""}`}>
      <Row>
        <Col xs="12">
          <ListGroup flush>
            <ListGroupItem action onClick={() => history.push("/home")}>
              <Link to="/home">Home</Link>
            </ListGroupItem>
            <ListGroupItem action onClick={() => history.push("/tasks")}>
              <Link to="/tasks">
                <i className="fas fa-tasks"></i> All Tasks{" "}
                <Badge pill>{numTasks}</Badge>
              </Link>
            </ListGroupItem>
            <ListGroupItem action onClick={toggleCollapse("projects")}>
              <p
                className={`dropdown-toggle allow-rotate ${
                  collapseOpen.projects ? "list-open" : "list-closed"
                }`}
              >
                <i className="fas fa-project-diagram"></i> Projects{" "}
                <Badge pill>{numProjects}</Badge>
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
                <i className="fas fa-user-tag"></i> Labels{" "}
                <Badge pill>{numLabels}</Badge>
              </p>
              <LabelList collapseOpen={collapseOpen.labels} />
            </ListGroupItem>
            <ListGroupItem action onClick={toggleCollapse("filters")}>
              <p
                className={`dropdown-toggle allow-rotate ${
                  collapseOpen.filters ? "list-open" : "list-closed"
                }`}
              >
                <i className="fas fa-filter"></i> Filters{" "}
                <Badge pill>{numFilters}</Badge>
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
