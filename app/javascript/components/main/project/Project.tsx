import React, { useContext, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
} from "reactstrap";
import Task from "../task/Task";
import { compareDateByDay } from "../../../helperFunctions";
import { TimeContext } from "../../Index";
import NewTask from "../task/NewTask";
import { useDispatch } from "react-redux";
import { deleteProject } from "../../../redux/actions";
import { AlertContext } from "../../Main";
import { Id, State } from "../../../redux/shared";
import { ProjectState } from "../../../redux/project/projectReducer";

interface AppProps {
  projectState: ProjectState;
  taskState: State;
}

interface ParamTypes {
  projectId: string;
}

const Project = ({ projectState, taskState }: AppProps) => {
  const { projectId } = useParams<ParamTypes>();
  const projectLoading = projectState.loading;
  const projectErrMsg = projectState.errMsg;
  const projectData = projectState.data;
  const taskData = taskState.data;

  const { date } = useContext(TimeContext)!;
  const { toggleAlert } = useContext(AlertContext)!;
  const [newTask, setNewTask] = useState(false);

  let projectComponent;

  if (projectLoading) {
    toggleAlert({ message: "Project loading...", color: "info" });
  } else if (projectErrMsg) {
    toggleAlert({ message: "Error loading projects", color: "danger" });
  } else {
    const project = projectData![projectId];
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
      const isBeforeToday = compareDateByDay({
        date1: task.attributes.dateString,
        date2: date,
        strict: true,
      });

      return <Task task={task} overdue={isBeforeToday} key={task.id} />;
    });

    const dispatch = useDispatch();
    const history = useHistory();
    const handleClick = (e: React.MouseEvent) => {
      history.push("/home");
      dispatch(deleteProject(projectId));
      e.stopPropagation();
    };

    projectComponent = (
      <Container>
        <Row className="my-3">
          <Col xs="8">
            <h2>{title}</h2>
            <p>{content}</p>
          </Col>
          <Col xs="4" className="text-right">
            <Button type="button" color="danger" onClick={handleClick}>
              Delete Project
            </Button>
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
  if (!projectComponent) {
    projectComponent = <div></div>;
  }

  return projectComponent;
};

export default Project;
