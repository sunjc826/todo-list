import React, { MouseEvent, useContext, useState, useEffect } from "react";
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
  Modal,
} from "reactstrap";
import Task from "../task/Task";
import {
  compareDateByDay,
  SortCategory,
  sortTaskList,
} from "../../../helperFunctions";
import { TimeContext } from "../../Index";
import NewTask from "../task/NewTask";
import { useDispatch, useSelector } from "react-redux";
import {
  completeProject,
  deleteProject,
  fetchProject,
} from "../../../redux/actions";
import { AlertContext } from "../../Main";
import {
  Comparator,
  Id,
  State,
  Data,
  TaskAttributes,
  UserAttributes,
  DataRecord,
  NormalizedData,
  AppDispatch,
} from "../../../redux/shared";
import { ProjectState } from "../../../redux/project/projectReducer";
import { TaskState } from "../../../redux/task/taskReducer";
import CheckComplete from "../task/CheckComplete";
import normalize from "json-api-normalizer";
import ShareModal from "./ShareModal";
import { UserState } from "../../../redux/user/userReducer";
import { RootState } from "../../../redux/rootReducer";
import ConfirmationModal from "../../shared/ConfirmationModal";
import { priorityComparator, dateComparator } from "../../../helperFunctions";
import SortDropdown from "../../shared/SortDropdown";

interface AppProps {
  userState: UserState;
}

interface ParamTypes {
  projectId: string;
}

const Project = ({ userState }: AppProps) => {
  const { projectId } = useParams<ParamTypes>();
  const dispatch: AppDispatch = useDispatch();
  // fetching here is needed to update shared projects with tasks created by other users
  useEffect(() => {
    dispatch(fetchProject(projectId));
  }, [projectId]);

  const projectState = useSelector((state: RootState) => state.project);
  const projectLoading = projectState.loading;
  const projectErrMsg = projectState.errMsg;
  const projectData = projectState.data;
  const taskState = useSelector((state: RootState) => state.task);
  const taskData = taskState.data;

  const { date } = useContext(TimeContext)!;
  const { toggleAlert } = useContext(AlertContext)!;
  const [newTask, setNewTask] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const [sortBy, setSortBy] = useState<SortCategory>("none");
  const [sortAscending, setSortAscending] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!modalOpen);

  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const toggleConfirmationModal = () =>
    setConfirmationModalOpen(!confirmationModalOpen);

  let ownsProject = true;

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
    sortTaskList({
      taskList: taskList,
      sortBy: sortBy,
      sortAscending: sortAscending,
    });

    const taskListComponent = taskList.map((task) => {
      return <Task task={task} showDate key={task.id} />;
    });

    const dispatch = useDispatch();
    const history = useHistory();
    const handleClick = (e: React.MouseEvent) => {
      history.push("/home");
      dispatch(deleteProject(projectId));
      e.stopPropagation();
    };

    const handleComplete = (e: React.MouseEvent) => {
      dispatch(completeProject(projectId));
      e.stopPropagation();
    };

    const projectOwnerId = project.attributes.userId;
    const userId = userState.userId;
    ownsProject = Number(projectOwnerId) === Number(userId);

    projectComponent = (
      <Container>
        <Modal isOpen={modalOpen} toggle={toggleModal} size="lg">
          <ShareModal toggleModal={toggleModal} />
        </Modal>
        <ConfirmationModal
          action="Delete"
          message="Are you sure you want to delete project?"
          modalOpen={confirmationModalOpen}
          toggleModal={toggleConfirmationModal}
          handleConfirm={handleClick}
        />
        <Row className="my-3">
          <Col xs="6">
            <h2>{title}</h2>
            <p>{content}</p>
          </Col>
          <Col xs="6" className="text-right">
            <span>{completed ? "Uncomplete project" : "Complete Project"}</span>
            <CheckComplete
              completed={completed}
              handleComplete={handleComplete}
              active={ownsProject}
            />
            <SortDropdown
              dropdownOpen={dropdownOpen}
              toggleDropdown={toggleDropdown}
              sortBy={sortBy}
              setSortBy={setSortBy}
              sortAscending={sortAscending}
              setSortAscending={setSortAscending}
            />
            <Button
              type="button"
              color="danger"
              onClick={toggleConfirmationModal}
              style={{ display: "inline" }}
              className="btn-transition"
              disabled={!ownsProject}
            >
              Delete Project <i className="fas fa-trash"></i>
            </Button>
          </Col>

          <Col xs="12" className="text-right">
            <Button
              color="warning"
              onClick={toggleModal}
              disabled={!ownsProject}
            >
              Share
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
