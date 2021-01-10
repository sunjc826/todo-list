import React from "react";
import { Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Data } from "../../../redux/shared";
import Task from "./Task";

interface AppProps {
  tasklist: Array<Data>;
}

const OverdueTaskList = ({ tasklist }: AppProps) => {
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
