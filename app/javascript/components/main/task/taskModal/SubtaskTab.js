import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "reactstrap";
import { fetchTaskData } from "../../../../redux/actions";

const SubtaskTab = ({ taskId }) => {
  const subtaskState = useSelector((state) => state.subtask);
  const dispatch = useDispatch();

  const subtaskLoading = subtaskState.loading;
  const subtaskErrMsg = subtaskState.errMsg;
  const subtaskData = subtaskState.data;

  useEffect(() => {
    dispatch(fetchTaskData(taskId));
  }, []);

  if (subtaskLoading) {
  } else if (subtaskErrMsg) {
  } else {
    // instead of filtering out all the subtasks with foreign key === taskId,
    // directly access the subtasks that are related to taskId
  }

  // console.log(subtaskState);

  return (
    <Row>
      <Col xs="12"></Col>
    </Row>
  );
};

export default SubtaskTab;
