import React, { useState } from "react";
import { Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import Task from "./Task";
import { dateToString } from "../../../helperFunctions";
import NewTask from "./NewTask";
import { Data, TaskAttributes } from "../../../redux/shared";

interface AppProps {
  day: Date;
  tasklist: Array<Data<TaskAttributes>>;
}

// lists out all tasks on the given day
const TaskList = ({ day, tasklist }: AppProps) => {
  const taskComponentList = tasklist.map((task) => {
    return <Task key={task.id} task={task} />;
  });

  const [newTask, setNewTask] = useState(false);

  return (
    <React.Fragment>
      <Row>
        <Col xs="12">
          <ListGroup flush>
            <ListGroupItem>
              <h6
                className={
                  tasklist.length > 0
                    ? "font-weight-bold"
                    : "font-weight-bold text-muted"
                }
              >
                {dateToString(day)}
              </h6>
            </ListGroupItem>
            {taskComponentList}

            {newTask ? (
              <ListGroupItem>
                <NewTask setNewTask={setNewTask} day={day} />
              </ListGroupItem>
            ) : (
              <ListGroupItem action onClick={() => setNewTask(true)}>
                <p className="text-secondary">
                  <i className="fas fa-plus mr-1"></i>Add new task
                </p>
              </ListGroupItem>
            )}
          </ListGroup>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default TaskList;
