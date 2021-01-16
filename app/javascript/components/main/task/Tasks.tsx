import React, { useState, useContext } from "react";
import { Row, Col, Container, Badge, Button } from "reactstrap";
import { TimeContext } from "../../Index";
import TaskList from "./TaskList";
import OverdueTaskList from "./OverdueTaskList";
import {
  dateToString,
  sameDay,
  generateDateList,
  compareDateByDay,
  dateLiesBetween,
  listContains,
} from "../../../helperFunctions";
import { useQuery } from "../../../customHooks";
import { AlertContext } from "../../Main";
import { State } from "../../../redux/shared";
import { TaskState } from "../../../redux/task/taskReducer";
import { TagState } from "../../../redux/tag/tagReducer";
import { LabelState } from "../../../redux/label/labelReducer";
import { FilterState } from "../../../redux/filter/filterReducer";
import Toggle from "react-toggle";

interface AppProps {
  taskState: TaskState;
  tagState: TagState;
  labelState: LabelState;
  filterState: FilterState;
}

const Tasks = ({ taskState, tagState, labelState, filterState }: AppProps) => {
  const [showIncomplete, setShowIncomplete] = useState(false);
  const toggleShowIncomplete = () => setShowIncomplete(!showIncomplete);

  const { date } = useContext(TimeContext)!;
  const dateString = dateToString(date);

  const taskLoading = taskState.loading;
  const taskErrMsg = taskState.errMsg;
  let taskData = taskState.data;

  const DAYS_DISPLAYED = 30;
  let dateList = generateDateList({ curDate: date, days: DAYS_DISPLAYED });
  let tasksComponent = null;
  let badgesComponent = null; // shows the current tag/label/filter that is in effect
  const query = useQuery();
  const { toggleAlert } = useContext(AlertContext)!;

  if (taskLoading) {
    toggleAlert({ message: "Tasks loading...", color: "info" });
  } else if (taskErrMsg) {
    toggleAlert({ message: "Error loading tasks", color: "danger" });
  } else {
    // filter by completion state
    if (showIncomplete) {
      const filteredTaskData: typeof taskData = {};
      for (const key in taskData) {
        const ele = taskData[key];
        if (!ele.attributes.completed) {
          filteredTaskData[key] = ele;
        }
      }
      taskData = filteredTaskData;
    }

    if (query.has("tagId")) {
      const tagId = query.get("tagId")!;
      // set taskData to only include Tasks with the given tag.
      const tagData = tagState.data!;
      const tag = tagData[tagId];
      const relatedTasks = tag.relationships.tasks.data;
      const filteredTaskData: typeof taskData = {};
      relatedTasks.forEach((task) => {
        const taskId = task.id;
        filteredTaskData[taskId] = taskData![taskId];
      });
      taskData = filteredTaskData;

      badgesComponent = (
        <Badge color="dark" pill>
          {tag.attributes.description}
        </Badge>
      );
    } else if (query.has("labelId")) {
      const labelId = query.get("labelId")!;
      // set taskData to only include Tasks with the given label.
      const labelData = labelState.data!;
      const label = labelData[labelId];
      const relatedTasks = label.relationships.tasks.data;
      const filteredTaskData: typeof taskData = {};
      relatedTasks.forEach((task) => {
        const taskId = task.id;
        filteredTaskData[taskId] = taskData![taskId];
      });
      taskData = filteredTaskData;

      badgesComponent = (
        <Badge color={label.attributes.color} pill>
          {label.attributes.description}
        </Badge>
      );
    } else if (query.has("filterId")) {
      const filterId = query.get("filterId")!;
      // set taskData to only include Tasks with the given filter.
      const filterData = filterState.data!;
      const filter = filterData[filterId];
      const filterStartDate = new Date(filter.attributes.startdate);
      const filterEndDate = new Date(filter.attributes.enddate);
      const filterTags = filter.relationships.tags.data.map((tag) => tag.id);
      const filterLabels = filter.relationships.labels.data.map(
        (label) => label.id
      );
      const filteredTaskData: typeof taskData = {};
      // filter by date
      dateList = dateList.filter((date) =>
        dateLiesBetween({
          startDate: filterStartDate,
          endDate: filterEndDate,
          date,
        })
      );

      for (const key in taskData) {
        const ele = taskData[key];
        // const taskDate = ele.attributes.dateString;

        // check if tasks has all tags and labels associated with that filter
        const taskTags = ele.relationships.tags.data.map((tag) => tag.id);
        const taskLabels = ele.relationships.labels.data.map(
          (label) => label.id
        );
        if (
          listContains({ larger: taskTags, smaller: filterTags }) &&
          listContains({ larger: taskLabels, smaller: filterLabels })
        ) {
          filteredTaskData[key] = ele;
        }
      }
      taskData = filteredTaskData;
      const tagData = tagState.data!;
      const labelData = labelState.data!;
      const tagBadges = filterTags.map((tagId) => {
        return (
          <Badge color="dark" pill key={"tag " + tagId}>
            {tagData[tagId].attributes.description}
          </Badge>
        );
      });
      const labelBadges = filterLabels.map((labelId) => {
        return (
          <Badge
            color={labelData[labelId].attributes.color}
            pill
            key={"label" + labelId}
          >
            {labelData[labelId].attributes.description}
          </Badge>
        );
      });
      badgesComponent = tagBadges.concat(labelBadges);
    }

    if (query.has("searchTerm")) {
      const searchTerm = query.get("searchTerm")!;
      const filteredTaskData: typeof taskData = {};
      for (const key in taskData) {
        const ele = taskData[key];
        const taskName = ele.attributes.content;
        if (taskName.indexOf(searchTerm) != -1) {
          filteredTaskData[key] = ele;
        }
      }
      taskData = filteredTaskData;
    }

    let overdueTasksComponent = null;
    let currentTasksComponent = null;
    let overdueTasklist = [];

    for (let id in taskData) {
      const ele = taskData[id];
      const taskDate = ele.attributes.dateString;

      if (compareDateByDay({ date1: taskDate, date2: date, strict: true })) {
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
        if (sameDay(taskDate, day)) {
          tasklist.push(ele);
        }
      }
      return <TaskList key={day.toString()} day={day} tasklist={tasklist} />;
    });

    currentTasksComponent.unshift(overdueTasksComponent);
    tasksComponent = currentTasksComponent;
  }

  return (
    <Container>
      <Row className="align-items-center mt-2 border border-primary">
        <Col xs="6" className="mr-auto">
          <p className="my-2">{dateString}</p>
          {badgesComponent}
        </Col>
        <Col xs="6" className="text-right">
          <label>
            <span>
              Showing {showIncomplete ? "Incomplete Tasks" : "All Tasks"}
            </span>{" "}
            <Toggle
              defaultChecked={showIncomplete}
              icons={false}
              onChange={toggleShowIncomplete}
            />
          </label>
        </Col>
      </Row>
      {tasksComponent}
    </Container>
  );
};

export default Tasks;
