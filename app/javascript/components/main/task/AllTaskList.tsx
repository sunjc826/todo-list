import React, { useState } from "react";
import { Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import Task from "./Task";
import { dateToString } from "../../../helperFunctions";
import NewTask from "./NewTask";
import { Data, TaskAttributes } from "../../../redux/shared";

interface AppProps {
  tasklist: Array<Data<TaskAttributes>>;
}

// lists out all tasks
const AllTaskList = ({ tasklist }: AppProps) => {
  const taskComponentList = tasklist.map((task) => {
    return <Task key={task.id} task={task} showDate />;
  });

  return (
    <React.Fragment>
      <Row>
        <Col xs="12">
          <ListGroup flush>
            <ListGroupItem>
              <h6 className="font-weight-bold">All Tasks</h6>
            </ListGroupItem>
            {taskComponentList}
          </ListGroup>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default AllTaskList;
