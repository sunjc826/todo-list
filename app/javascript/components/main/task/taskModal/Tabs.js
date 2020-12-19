import React, { useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";
import SubtaskTab from "./SubtaskTab";
import CommentTab from "./CommentTab";
import ActivityTab from "./ActivityTab";
import { TaskContext } from "../Task";
import { fetchTaskData } from "../../../../redux/actions";

const Tabs = () => {
  const { taskId } = useContext(TaskContext);

  const [doneEffect, setDoneEffect] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setDoneEffect(true);
    dispatch(fetchTaskData(taskId));
  }, []);

  const task = useSelector((state) => state.task.data[taskId]);
  const taskRelations = task.relationships;

  const [activeTab, setActiveTab] = useState("1");

  const toggleTab = (tab) => () => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink onClick={toggleTab("1")}>Subtasks</NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={toggleTab("2")}>Comments</NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={toggleTab("3")}>Activity</NavLink>
        </NavItem>
      </Nav>
      {doneEffect && (
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <SubtaskTab taskId={taskId} taskRelations={taskRelations} />
          </TabPane>
          <TabPane tabId="2">
            <CommentTab taskId={taskId} taskRelations={taskRelations} />
          </TabPane>
          <TabPane tabId="3">
            <ActivityTab taskId={taskId} taskRelations={taskRelations} />
          </TabPane>
        </TabContent>
      )}
    </div>
  );
};

export default Tabs;
