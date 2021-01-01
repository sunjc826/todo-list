import React, { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, ListGroup, ListGroupItem, Input, Button } from "reactstrap";
import { AlertContext } from "../../../Main";
import Activity from "./Activity";

const ActivityTab = ({ taskId, taskRelations }) => {
  const activityState = useSelector((state) => state.activity);

  const activityLoading = activityState.loading;
  const activityErrMsg = activityState.errMsg;
  const activityData = activityState.data;

  let activitiesComponent;
  if (activityLoading) {
  } else if (activityErrMsg) {
  } else {
    const activities = taskRelations.activities.data.map((ele) => {
      const activityId = ele.id;
      return activityData[activityId];
    });

    activitiesComponent = activities.map((activity) => {
      return (
        <Row key={activity.id}>
          <Col xs="12">
            <Activity {...activity.attributes} activityId={activity.id} />
          </Col>
        </Row>
      );
    });
  }

  return (
    <Row>
      <Col xs="12">
        <ListGroup flush>{activitiesComponent}</ListGroup>
      </Col>
    </Row>
  );
};

export default ActivityTab;
