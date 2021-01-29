import React, { useState, useContext, useEffect } from "react";
import {
  Row,
  Col,
  Container,
  Badge,
  Button,
  Progress,
  ButtonGroup,
} from "reactstrap";
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
  sortTaskList,
} from "../../../helperFunctions";
import { useQuery } from "../../../customHooks";
import { AlertContext } from "../../Main";
import { TaskState } from "../../../redux/task/taskReducer";
import { TagState } from "../../../redux/tag/tagReducer";
import { LabelState } from "../../../redux/label/labelReducer";
import { FilterState } from "../../../redux/filter/filterReducer";
import Toggle from "react-toggle";
import { useHistory } from "react-router-dom";
import { priorityComparator, dateComparator } from "../../../helperFunctions";
import SortDropdown from "../../shared/SortDropdown";
import AllTaskList from "./AllTaskList";

interface AppProps {
  taskState: TaskState;
  tagState: TagState;
  labelState: LabelState;
  filterState: FilterState;
}

const Tasks = ({ taskState, tagState, labelState, filterState }: AppProps) => {
  const [colSize, setColSize] = useState(12);
  const [showIncomplete, setShowIncomplete] = useState(false);
  const toggleShowIncomplete = () => setShowIncomplete(!showIncomplete);
  const [hideDates, setHideDates] = useState(false);
  const toggleHideDates = () => setHideDates(!hideDates);
  // SortDropdown states
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const [sortBy, setSortBy] = useState<"none" | "date" | "priority">("none");
  const [sortAscending, setSortAscending] = useState(true);

  const { date } = useContext(TimeContext)!;
  const dateString = dateToString(date);

  const taskLoading = taskState.loading;
  const taskErrMsg = taskState.errMsg;
  let taskData = taskState.data;

  const [daysDisplayed, setDaysDisplayed] = useState(30);
  useEffect(() => {
    setDaysDisplayed(30);
  }, []);
  let dateList = generateDateList({ curDate: date, days: daysDisplayed });
  let tasksComponent = null;
  let badgesComponent = null; // shows the current tag/label/filter that is in effect
  let completedCount, totalTask, completionPercentage;
  const query = useQuery();
  const { toggleAlert } = useContext(AlertContext)!;
  const history = useHistory();
  if (taskLoading) {
    toggleAlert({ message: "Tasks loading...", color: "info" });
  } else if (taskErrMsg) {
    toggleAlert({ message: "Error loading tasks", color: "danger" });
  } else {
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
        const handleClick = (e: React.MouseEvent) => {
          history.push(`/tasks?tagId=${tagId}`);
          e.stopPropagation();
        };
        return (
          <Badge
            color="dark"
            pill
            key={"tag " + tagId}
            onClick={handleClick}
            href="#"
          >
            {tagData[tagId].attributes.description}
          </Badge>
        );
      });
      const labelBadges = filterLabels.map((labelId) => {
        const handleClick = (e: React.MouseEvent) => {
          history.push(`/tasks?labelId=${labelId}`);
          e.stopPropagation();
        };
        return (
          <Badge
            color={labelData[labelId].attributes.color}
            pill
            key={"label" + labelId}
            onClick={handleClick}
            href="#"
          >
            {labelData[labelId].attributes.description}
          </Badge>
        );
      });
      badgesComponent = tagBadges.concat(labelBadges);
    }
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

    completedCount = 0;
    totalTask = 0;
    for (const key in taskData) {
      const ele = taskData[key];
      if (ele.attributes.completed) {
        completedCount++;
      }
      totalTask++;
    }
    if (totalTask === 0) {
      completionPercentage = 100;
    } else {
      completionPercentage = (completedCount / totalTask) * 100;
    }

    if (hideDates) {
      let allTaskList = [];
      for (let id in taskData) {
        const ele = taskData[id];
        allTaskList.push(ele);
      }

      sortTaskList({
        taskList: allTaskList,
        sortBy: sortBy,
        sortAscending: sortAscending,
      });
      tasksComponent = (
        <Col xs="12">
          <AllTaskList tasklist={allTaskList} />
        </Col>
      );
    } else {
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
        <Col xs={colSize} key="overdue" className="mb-3">
          <OverdueTaskList tasklist={overdueTasklist} />
        </Col>
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
        return (
          <Col xs={colSize} key={day.toString()} className="mb-3">
            <TaskList day={day} tasklist={tasklist} />
          </Col>
        );
      });

      currentTasksComponent.unshift(overdueTasksComponent);
      tasksComponent = currentTasksComponent;
    }
  }

  return (
    <Container>
      <Row className="align-items-center mt-2 ">
        <Col xs="4" className="mr-auto">
          <p className="my-2">{dateString}</p>
          {badgesComponent}
        </Col>
        <Col xs="4" className="text-center">
          {!hideDates && (
            <ButtonGroup>
              <Button outline onClick={() => setColSize(12)}>
                <i className="fas fa-grip-lines"></i>
              </Button>
              <Button outline onClick={() => setColSize(6)}>
                <i className="fas fa-th-large"></i>
              </Button>
              <Button outline onClick={() => setColSize(4)}>
                <i className="fas fa-th"></i>
              </Button>
            </ButtonGroup>
          )}
        </Col>
        <Col xs="4" className="text-right">
          {hideDates && (
            <SortDropdown
              dropdownOpen={dropdownOpen}
              toggleDropdown={toggleDropdown}
              sortBy={sortBy}
              setSortBy={setSortBy}
              sortAscending={sortAscending}
              setSortAscending={setSortAscending}
            />
          )}
          <Button onClick={toggleHideDates}>
            {hideDates ? "Show" : "Hide"} Dates
          </Button>
        </Col>
        <Col xs="12" className="text-right">
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
        {!showIncomplete && completionPercentage !== undefined ? (
          <Col xs="12">
            <div className="text-center">
              {Math.floor(completionPercentage)}%
            </div>
            <Progress value={completionPercentage}></Progress>
          </Col>
        ) : null}
      </Row>
      <Row>{tasksComponent}</Row>
      {!hideDates && (
        <Row>
          <Col xs="12" className="text-center">
            <Button
              outline
              color="primary"
              onClick={() => setDaysDisplayed(daysDisplayed + 30)}
            >
              Show More
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Tasks;
