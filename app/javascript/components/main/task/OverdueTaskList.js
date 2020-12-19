import React from "react";
import { Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import Task from "./Task";

const OverdueTaskList = ({ tasklist }) => {
  const taskComponentList = tasklist.map((task) => {
    return <Task key={task.id} task={task} overdue />;
  });

  return (
    <React.Fragment>
      <Row>
        <Col xs="12">
          <ListGroup flush>
            <ListGroupItem>
              <h6 className="font-weight-bold">Overdue</h6>
            </ListGroupItem>
            {taskComponentList}
          </ListGroup>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default OverdueTaskList;
