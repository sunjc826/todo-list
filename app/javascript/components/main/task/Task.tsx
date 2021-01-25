import React, { createContext, Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, ListGroupItem, Button, Badge } from "reactstrap";
import { dateToString, getColorForPercentage } from "../../../helperFunctions";
import styled from "styled-components";
import TaskModal from "./taskModal/TaskModal";
import { deleteTask, toggleCompleteTask } from "../../../redux/actions";
import QuickNewTask from "../../header/QuickNewTask";
import { AppDispatch, Data, Id, TaskAttributes } from "../../../redux/shared";
import { RootState } from "../../../redux/rootReducer";
import CheckComplete from "./CheckComplete";
import { useHistory } from "react-router-dom";

const Tiny = styled.div`
  font-size: 0.8rem;
`;

const DeleteButton = styled.i`
  transition: color 0.5s ease-out;

  &:hover {
    color: red;
  }
`;

type TaskContextType = {
  taskId: Id;
} | null;

const TaskContext = createContext<TaskContextType>(null);

interface AppProps {
  task: Data<TaskAttributes>;
  showDate?: boolean;
}

const Task = ({ task, showDate }: AppProps) => {
  const projectState = useSelector((state: RootState) => state.project);
  const projectLoading = projectState.loading;
  const projectErrMsg = projectState.errMsg;
  const projectData = projectState.data;
  const userId = useSelector((state: RootState) => state.user.userId);
  const {
    completed,
    content,
    priority,
    projectId,
    dateString,
  } = task.attributes;

  const { subtasks, comments, tags, labels } = task.relationships;

  let project;
  let projectIsShared = false;
  let ownsTask = task.attributes.userId === userId;
  if (!projectLoading && projectId) {
    project = projectData![projectId];
    projectIsShared = project.relationships.sharedUsers.data.length > 0;
  }

  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const dispatch: AppDispatch = useDispatch();
  const handleClick = (e: React.MouseEvent) => {
    dispatch(deleteTask(task.id));
    e.stopPropagation();
  };

  const [editOpen, setEditOpen] = useState(false);
  const toggleEdit = () => setEditOpen(!editOpen);

  // const [onHover, setOnHover] = useState(false);
  const handleComplete = (e: React.MouseEvent) => {
    if (ownsTask) {
      dispatch(toggleCompleteTask(task.id));
    }
    e.stopPropagation();
  };

  const tagState = useSelector((state: RootState) => state.tag);
  const tagData = tagState.data!;
  const labelState = useSelector((state: RootState) => state.label);
  const labelData = labelState.data!;
  const history = useHistory();

  const tagsList = tags.data.map(({ id }) => {
    const desc = tagData["" + id].attributes.description;
    const handleClick = (e: React.MouseEvent) => {
      history.push(`/tasks?tagId=${id}`);
      e.stopPropagation();
    };
    return (
      <Badge color="dark" pill key={"t" + id} onClick={handleClick} href="#">
        {desc}
      </Badge>
    );
  });

  const labelsList = labels.data.map(({ id }) => {
    const attr = labelData["" + id].attributes;
    const desc = attr.description;
    const color = attr.color;
    const handleClick = (e: React.MouseEvent) => {
      history.push(`/tasks?labelId=${id}`);
      e.stopPropagation();
    };
    // href="#" provides link styling
    return (
      <Badge color={color} pill key={"l" + id} onClick={handleClick} href="#">
        {desc}
      </Badge>
    );
  });

  const badgeList = tagsList.concat(labelsList);

  return (
    <TaskContext.Provider value={{ taskId: task.id }}>
      <ListGroupItem action className="btn-hide">
        <TaskModal
          modalOpen={modalOpen}
          toggleModal={toggleModal}
          projectTitle={project ? project.attributes.title : null}
          {...task.attributes}
          ownsTask={ownsTask}
        />
        <QuickNewTask
          modalOpen={editOpen}
          toggleModal={toggleEdit}
          isEdit
          taskId={task.id}
        />
        <Row onClick={toggleModal}>
          <Col
            xs="4"
            className={`mr-auto ${completed ? "completed-task" : ""}`}
          >
            <Row className="my-0 py-0">
              <Col xs="12">
                <p>
                  <DeleteButton
                    className="far fa-times-circle"
                    onClick={handleClick}
                  ></DeleteButton>
                  <span className="task-name">{" " + content} </span>
                  <i
                    className="fas fa-circle"
                    style={{
                      color: getColorForPercentage((priority * 20) / 100),
                    }}
                  ></i>
                </p>
                <Tiny>
                  {showDate && (
                    <span className="text-danger">
                      <i className="far fa-calendar-alt"></i>
                      {" " + dateToString(dateString) + " "}
                    </span>
                  )}
                  {subtasks.data.length > 0 && (
                    <span>
                      <i className="fas fa-tasks"></i>{" "}
                      {subtasks.data.length + " "}
                    </span>
                  )}
                  {comments.data.length > 0 && (
                    <span>
                      <i className="far fa-comment"></i>{" "}
                      {comments.data.length + " "}
                    </span>
                  )}
                  {badgeList}
                </Tiny>
              </Col>
            </Row>
          </Col>
          <Col xs="4" className="text-right">
            {!projectIsShared ? (
              <Button
                type="button"
                color="warning"
                className="d-inline btn-transition"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleEdit();
                }}
              >
                Edit <i className="fas fa-edit"></i>
              </Button>
            ) : null}
            <CheckComplete
              completed={completed}
              handleComplete={handleComplete}
              ownsTask={ownsTask}
            />
            {project && (
              <p>
                {ownsTask && <i className="fas fa-user-circle"></i>}{" "}
                <i className="fas fa-circle"></i> {project.attributes.title}
              </p>
            )}
          </Col>
        </Row>
      </ListGroupItem>
    </TaskContext.Provider>
  );
};

export default Task;
export { TaskContext, DeleteButton };
