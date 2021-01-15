import React, { useContext, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import Task from "../task/Task";
import { compareDateByDay } from "../../../helperFunctions";
import { TimeContext } from "../../Index";
import NewTask from "../task/NewTask";
import { useDispatch } from "react-redux";
import { deleteProject } from "../../../redux/actions";
import { AlertContext } from "../../Main";
import {
  Comparator,
  Id,
  State,
  Data,
  TaskAttributes,
} from "../../../redux/shared";
import { ProjectState } from "../../../redux/project/projectReducer";
import { TaskState } from "../../../redux/task/taskReducer";

interface AppProps {
  projectState: ProjectState;
  taskState: TaskState;
}

interface ParamTypes {
  projectId: string;
}

const priorityComparator: Comparator<Data<TaskAttributes>> = (a, b) => {
  return a.attributes.priority < b.attributes.priority ? -1 : 1;
};

const dateComparator: Comparator<Data<TaskAttributes>> = (a, b) => {
  return compareDateByDay({
    date1: a.attributes.dateString,
    date2: b.attributes.dateString,
    strict: true,
  })
    ? -1
    : 1;
};

const Project = ({ projectState, taskState }: AppProps) => {
  const { projectId } = useParams<ParamTypes>();
  const projectLoading = projectState.loading;
  const projectErrMsg = projectState.errMsg;
  const projectData = projectState.data;
  const taskData = taskState.data;

  const { date } = useContext(TimeContext)!;
  const { toggleAlert } = useContext(AlertContext)!;
  const [newTask, setNewTask] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const [sortBy, setSortBy] = useState<"none" | "date" | "priority">("none");
  const [sortAscending, setSortAscending] = useState(true);

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

    // sorting
    if (sortBy !== "none") {
      let comparator: Comparator<Data<TaskAttributes>>;
      switch (sortBy) {
        case "date":
          comparator = dateComparator;
          break;
        case "priority":
          comparator = priorityComparator;
          break;
        default:
          throw new Error("Case unaccounted for");
      }
      if (sortAscending) {
        taskList.sort(comparator);
      } else {
        taskList.sort((a, b) => comparator(b, a));
      }
    }

    const taskListComponent = taskList.map((task) => {
      // const isBeforeToday = compareDateByDay({
      //   date1: task.attributes.dateString,
      //   date2: date,
      //   strict: true,
      // });

      return <Task task={task} showDate key={task.id} />;
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
          <Col xs="6">
            <h2>{title}</h2>
            <p>{content}</p>
          </Col>
          <Col xs="6" className="text-right">
            <Dropdown
              isOpen={dropdownOpen}
              toggle={toggleDropdown}
              style={{ display: "inline-flex" }}
              className="mr-3"
            >
              <DropdownToggle caret>Sort</DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Sort by</DropdownItem>
                <DropdownItem onClick={() => setSortBy("none")}>
                  Reset
                </DropdownItem>
                <DropdownItem onClick={() => setSortBy("date")}>
                  Date
                </DropdownItem>
                <DropdownItem onClick={() => setSortBy("priority")}>
                  Priority
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem header>Sort order</DropdownItem>
                <DropdownItem onClick={() => setSortAscending(true)}>
                  Ascending
                </DropdownItem>
                <DropdownItem onClick={() => setSortAscending(false)}>
                  Descending
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Button
              type="button"
              color="danger"
              onClick={handleClick}
              style={{ display: "inline-flex" }}
            >
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
