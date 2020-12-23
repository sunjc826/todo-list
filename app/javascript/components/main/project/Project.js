import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import Task from "../task/Task";
import { compareDateByDay } from "../../../helperFunctions";
import { AppContext } from "../../Index";
import NewTask from "../task/NewTask";

const Project = ({ projectState, taskState }) => {
  const { projectId } = useParams();
  const projectLoading = projectState.loading;
  const projectErrMsg = projectState.errMsg;
  const projectData = projectState.data;
  const taskData = taskState.data;

  const { date } = useContext(AppContext);

  const [newTask, setNewTask] = useState(false);

  let projectComponent;
  if (projectLoading) {
  } else if (projectErrMsg) {
  } else {
    const project = projectData[projectId];
    const { title, completed, content } = project.attributes;
    const taskList = [];
    // filter out tasks belonging to this project

    for (const key in taskData) {
      const ele = taskData[key];
      if (ele.attributes.projectId === parseInt(projectId)) {
        taskList.push(ele);
      }
    }

    const taskListComponent = taskList.map((task) => {
      const isBeforeToday = compareDateByDay(
        task.attributes.dateString,
        date,
        true
      );

      return <Task task={task} overdue={isBeforeToday} key={task.id} />;
    });

    projectComponent = (
      <Container>
        <Row>
          <Col xs="12">
            <h2>{title}</h2>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <ListGroup flush>
              {taskListComponent}
              {newTask ? null : (
                <ListGroupItem action onClick={() => setNewTask(true)}>
                  <p className="text-secondary">
                    <i className="fas fa-plus mr-1"></i>Add new task
                  </p>
                </ListGroupItem>
              )}
              {newTask && (
                <ListGroupItem>
                  <NewTask setNewTask={setNewTask} project />
                </ListGroupItem>
              )}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }

  return projectComponent;
};

export default Project;
