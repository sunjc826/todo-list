import React, { useState, useContext } from "react";
import { Row, Col, Container } from "reactstrap";
import { AppContext } from "../../App";

function getNextDay(date) {
  const tmr = new Date(date);
  tmr.setDate(tmr.getDate() + 1);
  return tmr;
}

function generateDateList(curDate, days) {
  const days = [];
  for (let i = 0; i < DAYS_DISPLAYED; i++) {
    days.push(getNextDay(curDate));
    curDate = getNextDay(date);
  }
  return days;
}

function dateToString(date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);
}

function sameDay(d1, d2) {
  const sameYear = d1.getFullYear() === d2.getFullYear();
  const sameMonth = d1.getMonth() === d2.getMonth();
  const sameDate = d1.getDate() === d2.getDate();
  return sameYear && sameMonth && sameDate;
}

const Tasks = ({ taskState }) => {
  const { date } = useContext(AppContext);

  const taskState = useSelector((state) => state.task);
  const taskLoading = taskState.loading;
  const taskErrMsg = taskState.errMsg;
  const taskData = taskState.data;

  const DAYS_DISPLAYED = 100;
  const dateList = generateDateList(date, DAYS_DISPLAYED);

  if (taskLoading) {
  } else if (taskErrMsg) {
  } else {
    // can give a more efficient implementation, by sorting by date, then partitioning
    const tasks = dateList.map((day) => {
      const tasklist = [];
      for (const index in taskData.data) {
        const ele = taskData.data[index];
        const taskDate = ele.attributes.deadline;
        if (sameDay(taskDate, day)) {
          tasklist.push(ele);
        }
      }
      return <TaskList day={day} tasklist={tasklist} />;
    });
  }

  return (
    <Container>
      <Row>
        <Col xs="12">
          <p>{dateString}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Tasks;
