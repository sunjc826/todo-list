import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { RootState } from "../../../../redux/rootReducer";
import { Id, NonUserRelationshipRecord } from "../../../../redux/shared";
import NewSubtask from "./NewSubtask";
import Subtask from "./Subtask";

interface AppProps {
  taskId: Id;
  taskRelations: NonUserRelationshipRecord;
  ownsTask: boolean;
}

const SubtaskTab = ({ taskId, taskRelations, ownsTask }: AppProps) => {
  const subtaskState = useSelector((state: RootState) => state.subtask);

  const subtaskLoading = subtaskState.loading;
  const subtaskErrMsg = subtaskState.errMsg;
  const subtaskData = subtaskState.data;

  let subtasksComponent;
  if (subtaskLoading) {
  } else if (subtaskErrMsg) {
  } else {
    // instead of filtering out all the subtasks with foreign key === taskId,
    // directly access the subtasks that are related to taskId
    const subtasks = taskRelations.subtasks.data.map((ele) => {
      const subtaskId = ele.id;
      return subtaskData![subtaskId];
    });

    subtasksComponent = subtasks.map((subtask) => {
      return (
        <Row key={subtask.id}>
          <Col xs="12">
            <Subtask
              {...subtask.attributes}
              taskId={taskId}
              subtaskId={subtask.id}
            />
          </Col>
        </Row>
      );
    });
  }

  const [newSubtask, setNewSubtask] = useState(false);

  return (
    <Row>
      <Col xs="12">
        <ListGroup flush>
          {subtasksComponent}
          {newSubtask || !ownsTask ? null : (
            <ListGroupItem action onClick={() => setNewSubtask(true)}>
              <p className="text-secondary">
                <i className="fas fa-plus mr-1"></i>Add new task
              </p>
            </ListGroupItem>
          )}
          {newSubtask && (
            <ListGroupItem>
              <NewSubtask taskId={taskId} setNewSubtask={setNewSubtask} />
            </ListGroupItem>
          )}
        </ListGroup>
      </Col>
    </Row>
  );
};

// TODO: ListGroup flush not working?

export default SubtaskTab;
