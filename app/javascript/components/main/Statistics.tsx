import React, { useState, useContext } from "react";
import { TimeContext } from "../Index";
import { AlertContext } from "../Main";
import { TaskState } from "../../redux/task/taskReducer";
import {
  XYPlot,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
  VerticalBarSeries,
  LabelSeries,
} from "react-vis";
import { generateDateList } from "../../helperFunctions";
import { Container, Row, Col } from "reactstrap";

interface AppProps {
  taskState: TaskState;
}

const Statistics = ({ taskState }: AppProps) => {
  const { date } = useContext(TimeContext)!;
  const { toggleAlert } = useContext(AlertContext)!;
  // const [data, setData] = useState([]);
  const taskLoading = taskState.loading;
  const taskErrMsg = taskState.errMsg;
  let taskData = taskState.data;
  const chartData = [];
  if (taskLoading) {
    toggleAlert({ message: "Tasks loading...", color: "info" });
  } else if (taskErrMsg) {
    toggleAlert({ message: "Error loading tasks", color: "danger" });
  } else {
    const dateList = generateDateList({ curDate: date, days: 10 }).map((ele) =>
      ele.toLocaleDateString("en-CA")
    );
    const data: Record<string, number> = {};
    for (const day of dateList) {
      data[day] = 0;
    }
    console.log(data);
    for (const key in taskData) {
      const ele = taskData[key];
      const day = new Date(ele.attributes.dateString).toLocaleDateString(
        "en-CA"
      );
      console.log(day);

      if (!isNaN(data[day])) {
        data[day]++;
      }
    }
    // convert data to chart data

    for (const day in data) {
      chartData.push({
        x: day.substring(day.length - 2, day.length),
        y: data[day],
      });
    }
    console.log(chartData);
  }
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs="6">
          <XYPlot xType="ordinal" width={500} height={500} xDistance={100}>
            <XAxis title="Day" />
            <YAxis title="Number of tasks" />
            <VerticalGridLines />
            <HorizontalGridLines />

            <VerticalBarSeries data={chartData} barWidth={0.8} />
          </XYPlot>
        </Col>
      </Row>
    </Container>
  );
};

export default Statistics;
