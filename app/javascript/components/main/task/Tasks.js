import React, { useState, useContext } from "react";
import { Row, Col, Container } from "reactstrap";
import { useLocation } from "react-router-dom";
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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Tasks = ({ taskState, tagState, labelState }) => {
  const { date } = useContext(AppContext);
  const dateString = dateToString(date);

  const taskLoading = taskState.loading;
  const taskErrMsg = taskState.errMsg;
  let taskData = taskState.data;

  const DAYS_DISPLAYED = 30;
  const dateList = generateDateList(date, DAYS_DISPLAYED);
  let tasksComponent = null;

  const query = useQuery();

  if (taskLoading) {
  } else if (taskErrMsg) {
  } else {
    if (query.has("tagId")) {
      const tagId = query.get("tagId");
      // set taskData to only include Tasks with the given tag.
      const tagData = tagState.data;
      const tag = tagData[tagId];
      const relatedTasks = tag.relationships.tasks.data;
      const filteredTaskData = {};
      relatedTasks.forEach((task) => {
        const taskId = task.id;
        filteredTaskData[taskId] = taskData[taskId];
      });
      taskData = filteredTaskData;
    } else if (query.has("labelId")) {
      const labelId = query.get("labelId");
      // set taskData to only include Tasks with the given tag.
      const labelData = labelState.data;
      const label = labelData[labelId];
      const relatedTasks = label.relationships.tasks.data;
      const filteredTaskData = {};
      relatedTasks.forEach((task) => {
        const taskId = task.id;
        filteredTaskData[taskId] = taskData[taskId];
      });
      taskData = filteredTaskData;
    }

    let overdueTasksComponent = null;
    let currentTasksComponent = null;
    let overdueTasklist = [];

    for (let id in taskData) {
      const ele = taskData[id];
      const taskDate = ele.attributes.dateString;

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
