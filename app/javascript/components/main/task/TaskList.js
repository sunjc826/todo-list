import React from "react";
import { Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import Task from "./Task";
import { dateToString } from "../../../helperFunctions";

// lists out all tasks on the given day
const TaskList = ({ day, tasklist }) => {
  const taskComponentList = tasklist.map((task) => {
    return <Task key={task.id} task={task} />;
  });

  return (
    <React.Fragment>
      <Row>
        <Col xs="12">
          <ListGroup flush>
            <ListGroupItem>
              <h6 className="font-weight-bold">{dateToString(day)}</h6>
            </ListGroupItem>
            {taskComponentList}
            <ListGroupItem action>
              <p className="text-secondary">
                <i className="fas fa-plus mr-1"></i>Add new task
              </p>
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default TaskList;