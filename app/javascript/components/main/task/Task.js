import React, { createContext, useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, ListGroupItem, Button } from "reactstrap";
import { dateToString, getColorForPercentage } from "../../../helperFunctions";
import styled from "styled-components";
import TaskModal from "./taskModal/TaskModal";
import { deleteTask } from "../../../redux/actions";
import QuickNewTask from "../../header/QuickNewTask";

const Tiny = styled.div`
  font-size: 0.7rem;
`;

const DeleteButton = styled.i`
  transition: color 0.5s ease-out;

  &:hover {
    color: red;
  }
`;

const TaskContext = createContext();

const Task = ({ task, overdue }) => {
  const projectState = useSelector((state) => state.project);
  const projectLoading = projectState.loading;
  const projectErrMsg = projectState.errMsg;
  const projectData = projectState.data;

  const {
    completed,
    content,
    priority,
    projectId,
    dateString,
  } = task.attributes;

  let project;
  if (!projectLoading && projectId) {
    for (let id in projectData) {
      if (parseInt(id) === parseInt(projectId)) {
        project = projectData[id];
        break;
      }
    }
  }

  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const dispatch = useDispatch();
  const handleClick = (e) => {
    dispatch(deleteTask(task.id));
    e.stopPropagation();
  };

  const [editOpen, setEditOpen] = useState(false);
  const toggleEdit = () => setEditOpen(!editOpen);

  return (
    <TaskContext.Provider value={{ taskId: task.id }}>
      <ListGroupItem action>
        <TaskModal
          modalOpen={modalOpen}
          toggleModal={toggleModal}
          projectTitle={project ? project.attributes.title : null}
          {...task.attributes}
        />
        <QuickNewTask
          modalOpen={editOpen}
          toggleModal={toggleEdit}
          isEdit
          taskId={task.id}
        />
        <Row onClick={toggleModal}>
          <Col xs="4" className="mr-auto">
            <Row className="my-0 py-0">
              <Col xs="12">
                <p>
                  <DeleteButton
                    className="far fa-times-circle"
                    onClick={handleClick}
                  ></DeleteButton>
                  {" " + content}{" "}
                  <i
                    className="fas fa-circle"
                    style={{
                      color: getColorForPercentage((priority * 20) / 100),
                    }}
                  ></i>
                </p>
                <Tiny>
                  {overdue && (
                    <p className="text-danger">{dateToString(dateString)}</p>
                  )}
                </Tiny>
              </Col>
            </Row>
          </Col>
          <Col xs="4" className="text-right">
            {project && <p>{project.attributes.title}</p>}
            <Button
              type="button"
              color="warning"
              className="d-inline"
              onClick={(e) => {
                e.stopPropagation();
                toggleEdit();
              }}
            >
              Edit
            </Button>
          </Col>
        </Row>
      </ListGroupItem>
    </TaskContext.Provider>
  );
};

export default Task;
export { TaskContext, DeleteButton };
