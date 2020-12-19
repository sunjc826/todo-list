import React, { useContext, useState } from "react";
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

const Tabs = () => {
  const { taskId } = useContext(TaskContext);

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
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <SubtaskTab taskId={taskId} />
        </TabPane>
        <TabPane tabId="2">
          <CommentTab taskId={taskId} />
        </TabPane>
        <TabPane tabId="3">
          <ActivityTab taskId={taskId} />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default Tabs;
