import React from "react";
import { useSelector } from "react-redux";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  ListGroup,
  Container,
} from "reactstrap";
import { RootState } from "../../redux/rootReducer";
import Activity from "../main/task/taskModal/Activity";

interface AppProps {
  modalOpen: boolean;
  toggleModal: () => void;
}

const ActivityModal = ({ modalOpen, toggleModal }: AppProps) => {
  const activityState = useSelector((state: RootState) => state.activity);
  const activityLoading = activityState.loading;
  const activityErrMsg = activityState.errMsg;
  const activityData = activityState.data;
  let activitiesComponent = [];
  if (activityLoading) {
  } else if (activityErrMsg) {
  } else {
    for (const key in activityData) {
      const ele = activityData[key];
      activitiesComponent.push(
        <Row key={ele.id}>
          <Col xs="12">
            <Activity {...ele.attributes} activityId={ele.id} />
          </Col>
        </Row>
      );
    }
  }
  return (
    <Modal isOpen={modalOpen} toggle={toggleModal} scrollable size="lg">
      <ModalHeader toggle={toggleModal}>All Activities</ModalHeader>
      <ModalBody>
        <Container>
          <Row>
            <Col xs="12">
              <ListGroup flush>{activitiesComponent}</ListGroup>
            </Col>
          </Row>
        </Container>
      </ModalBody>
    </Modal>
  );
};

export default ActivityModal;
