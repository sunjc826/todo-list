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
import { TagState } from "../../redux/tag/tagReducer";
import { LabelState } from "../../redux/label/labelReducer";
import { bootstrapColorToHex } from "../../helperFunctions";
interface AppProps {
  taskState: TaskState;
  tagState: TagState;
  labelState: LabelState;
}
const DEFAULT_DAYS = 10;

const Statistics = ({ taskState, tagState, labelState }: AppProps) => {
  const { date } = useContext(TimeContext)!;
  const { toggleAlert } = useContext(AlertContext)!;
  let maxTask = 0;
  const [days, setDays] = useState(DEFAULT_DAYS);
  const taskLoading = taskState.loading;
  const taskErrMsg = taskState.errMsg;
  let taskData = taskState.data;
  const tagData = tagState.data;
  const labelData = labelState.data;

  const [showTags, setShowTags] = useState(true);
  const [showLabels, setShowLabels] = useState(true);

  const chartData = [];
  if (taskLoading) {
    toggleAlert({ message: "Tasks loading...", color: "info" });
  } else if (taskErrMsg) {
    toggleAlert({ message: "Error loading tasks", color: "danger" });
  } else {
    const dateList = generateDateList({ curDate: date, days }).map((ele) =>
      ele.toLocaleDateString("en-CA")
    );
    const data: Record<string, any> = {};

    for (const day of dateList) {
      data[day] = { all: 0, tag: {}, label: {} };

      for (const tagId in tagData) {
        data[day]["tag"][tagId] = 0;
      }
      for (const labelId in labelData) {
        data[day]["label"][labelId] = 0;
      }
    }
    // console.log(data);
    for (const key in taskData) {
      const ele = taskData[key];
      const day = new Date(ele.attributes.dateString).toLocaleDateString(
        "en-CA"
      );
      const relatedTags = ele.relationships.tags.data;
      const relatedLabels = ele.relationships.labels.data;

      if (data[day]) {
        data[day]["all"]++;
        relatedTags.forEach((tag) => {
          const tagId = tag.id;
          data[day]["tag"][tagId]++;
        });
        relatedLabels.forEach((label) => {
          const labelId = label.id;
          data[day]["label"][labelId]++;
        });
      }
    }
    // convert data to chart data

    for (const day in data) {
      maxTask = Math.max(maxTask, data[day]);
      chartData.push({
        fullDate: day,
        date: day.substring(day.length - 2, day.length),
        taskCount: data[day]["all"],
        tagTaskCount: data[day]["tag"],
        labelTaskCount: data[day]["label"],
      });
    }
    // console.log(chartData);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val > 0 && val < 100) {
      setDays(val);
    } else {
      setDays(DEFAULT_DAYS);
    }
  };

  const tagLines = [];
  for (const tagId in tagData) {
    const accessor = (data: any) => {
      return data["tagTaskCount"][tagId];
    };
    const tagLine = (
      <Line
        key={"t" + tagId}
        type="monotone"
        dataKey={accessor}
        stroke={bootstrapColorToHex["dark"]}
        name={tagData[tagId].attributes.description}
      />
    );
    tagLines.push(tagLine);
  }
  const labelLines = [];
  for (const labelId in labelData) {
    const accessor = (data: any) => {
      return data["labelTaskCount"][labelId];
    };
    const color = labelData[labelId].attributes.color;
    const labelLine = (
      <Line
        key={"l" + labelId}
        type="monotone"
        dataKey={accessor}
        stroke={bootstrapColorToHex[color]}
        name={labelData[labelId].attributes.description}
      />
    );
    labelLines.push(labelLine);
  }

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
            <Legend align="right" verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="taskCount"
              stroke="#8884d8"
              name="Total Tasks"
            />
            {showTags ? tagLines : null}
            {showLabels ? labelLines : null}
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
        <Col xs="12">
          <Button onClick={() => setShowTags(!showTags)} className="mr-1">
            {showTags ? "Hide" : "Show"} Tags
          </Button>
          <Button onClick={() => setShowLabels(!showLabels)}>
            {showLabels ? "Hide" : "Show"} Labels
          </Button>
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
