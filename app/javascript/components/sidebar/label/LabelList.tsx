import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Collapse, ListGroup, ListGroupItem, Row, Col } from "reactstrap";
import NewLabel from "./NewLabel";
import { DeleteButton } from "../../main/task/Task";
import { deleteLabel } from "../../../redux/actions";
import { RootState } from "../../../redux/rootReducer";

interface AppProps {
  collapseOpen: boolean;
}

const LabelList = ({ collapseOpen }: AppProps) => {
  const labelState = useSelector((state: RootState) => state.label);
  const labelLoading = labelState.loading;
  const labelErrMsg = labelState.errMsg;
  const labelData = labelState.data;

  const history = useHistory();

  let labelListComponent;
  const dispatch = useDispatch();

  if (labelLoading) {
  } else if (labelErrMsg) {
  } else {
    labelListComponent = [];

    for (const key in labelData) {
      const ele = labelData[key];
      const labelId = ele.id;
      const labelAttributes = ele.attributes;
      const handleClick = (e: React.MouseEvent) => {
        history.push(`/tasks?labelId=${labelId}`);
        e.stopPropagation();
      };

      const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        history.push("/tasks");
        dispatch(deleteLabel(key));
      };

      labelListComponent.push(
        <ListGroupItem
          action
          key={labelId}
          className="px-0"
          onClick={handleClick}
        >
          <Row>
            <Col xs="10" className="mr-auto">
              <Link to={`/tasks?tagId=${labelId}`}>
                {labelAttributes.description}
              </Link>
            </Col>

            <Col xs="1">
              <DeleteButton
                className="fas fa-times ml-auto"
                onClick={handleDelete}
              ></DeleteButton>
            </Col>
          </Row>
        </ListGroupItem>
      );
    }
  }

  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!modalOpen);
  const handleClick = (e: React.MouseEvent) => {
    toggleModal();
    e.stopPropagation();
  };

  return (
    <Fragment>
      <NewLabel modalOpen={modalOpen} toggleModal={toggleModal} />
      <Collapse isOpen={collapseOpen}>
        <ListGroup flush>
          {labelListComponent}
          <ListGroupItem action className="px-0" onClick={handleClick}>
            <p className="text-secondary">
              <i className="fas fa-plus mr-1"></i>Add new Label
            </p>
          </ListGroupItem>
        </ListGroup>
      </Collapse>
    </Fragment>
  );
};

export default LabelList;
