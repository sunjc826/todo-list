import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "reactstrap";

const SubtaskTab = ({ taskId }) => {
  const subtaskState = useSelector((state) => state.subtask);
  const dispatch = useDispatch();
  // console.log(subtaskState);

  return (
    <Row>
      <Col xs="12"></Col>
    </Row>
  );
};

export default SubtaskTab;
