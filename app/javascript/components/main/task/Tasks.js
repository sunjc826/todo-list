import React, { useState, useContext } from "react";
import { Row, Col, Container } from "reactstrap";
import { AppContext } from "../../Index";
import TaskList from "./TaskList";
import OverdueTaskList from "./OverdueTaskList";
import {
  dateToString,
  sameDay,
  getPrevDay,
  getNextDay,
  generateDateList,
  compareDateByDay,
} from "../../../helperFunctions";

const Tasks = ({ taskState }) => {
  const { date } = useContext(AppContext);
  const dateString = dateToString(date);

  const taskLoading = taskState.loading;
  const taskErrMsg = taskState.errMsg;
  const taskData = taskState.data;

  const DAYS_DISPLAYED = 30;
  const dateList = generateDateList(date, DAYS_DISPLAYED);
  let tasksComponent = null;

  if (taskLoading) {
  } else if (taskErrMsg) {
  } else {
    let overdueTasksComponent = null;
    let currentTasksComponent = null;
    let overdueTasklist = [];

    for (let id in taskData) {
      const ele = taskData[id];
      const taskDate = new Date(ele.attributes.dateString);

      if (compareDateByDay(taskDate, date, true)) {
        overdueTasklist.push(ele);
      }
    }
    overdueTasksComponent = (
      <OverdueTaskList key="overdue" tasklist={overdueTasklist} />
    );

    // can give a more efficient implementation, by sorting by date, then partitioning
    currentTasksComponent = dateList.map((day) => {
      const tasklist = [];
      for (const id in taskData) {
        const ele = taskData[id];
        const taskDate = new Date(ele.attributes.dateString);
        // console.log(dateToString(taskDate));
        if (sameDay(taskDate, day)) {
          tasklist.push(ele);
        }
      }
      // console.log(tasklist);
      return <TaskList key={day} day={day} tasklist={tasklist} />;
    });

    currentTasksComponent.unshift(overdueTasksComponent);
    tasksComponent = currentTasksComponent;
  }

  return (
    <Container>
      <Row>
        <Col xs="12">
          <p>{dateString}</p>
        </Col>
      </Row>
      {tasksComponent}
    </Container>
  );
};

export default Tasks;
