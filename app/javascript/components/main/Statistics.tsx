import React, { useState, useContext } from "react";
import { TimeContext } from "../Index";
import { AlertContext } from "../Main";
import { TaskState } from "../../redux/task/taskReducer";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  TooltipProps,
} from "recharts";
import { generateDateList } from "../../helperFunctions";
import {
  Container,
  Row,
  Col,
  Card,
  CardText,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Button,
  Input,
} from "reactstrap";

interface AppProps {
  taskState: TaskState;
}
const DEFAULT_DAYS = 10;

const Statistics = ({ taskState }: AppProps) => {
  const { date } = useContext(TimeContext)!;
  const { toggleAlert } = useContext(AlertContext)!;
  let maxTask = 0;
  const [days, setDays] = useState(DEFAULT_DAYS);
  const taskLoading = taskState.loading;
  const taskErrMsg = taskState.errMsg;
  let taskData = taskState.data;
  const chartData = [];
  if (taskLoading) {
    toggleAlert({ message: "Tasks loading...", color: "info" });
  } else if (taskErrMsg) {
    toggleAlert({ message: "Error loading tasks", color: "danger" });
  } else {
    const dateList = generateDateList({ curDate: date, days }).map((ele) =>
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
      maxTask = Math.max(maxTask, data[day]);
      chartData.push({
        fullDate: day,
        date: day.substring(day.length - 2, day.length),
        taskCount: data[day],
      });
    }
    console.log(chartData);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val > 0 && val < 100) {
      setDays(val);
    } else {
      setDays(DEFAULT_DAYS);
    }
  };

  // https://github.com/babel/babel/issues/11038
  // workaround: Add "d3-array": "2.3.3" to resolutions in package.json
  return (
    <Container>
      <Row>
        <Col xs="12">
          <LineChart
            width={800}
            height={600}
            data={chartData}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <Line type="monotone" dataKey="taskCount" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis
              type="number"
              allowDecimals={false}
              domain={[
                0,
                (dataMax: number) => {
                  return Math.floor(dataMax * 1.25);
                },
              ]}
            />
            <Tooltip content={<CustomTooltip />} />
          </LineChart>
        </Col>
        <Col xs="12">
          <Form inline>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="days" className="mr-sm-2">
                Days into Future
              </Label>
              <Input
                type="number"
                name="days"
                id="days"
                onChange={handleChange}
              />
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  // console.log(label);
  // console.log(payload);

  // payload[0].payload attribute is not defined in "/node_modules/recharts/types/component/DefaultTooltipContent.d.ts"
  if (active && payload) {
    return (
      <Card body>
        <CardTitle tag="h5">{payload[0].payload.fullDate}</CardTitle>
        <CardText>Num Tasks: {payload[0].value}</CardText>
      </Card>
    );
  }

  return null;
};

export default Statistics;
