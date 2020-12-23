import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Collapse, ListGroup, ListGroupItem } from "reactstrap";
import NewLabel from "./NewLabel";

const LabelList = ({ collapseOpen }) => {
  const labelState = useSelector((state) => state.label);
  const labelLoading = labelState.loading;
  const labelErrMsg = labelState.errMsg;
  const labelData = labelState.data;

  const history = useHistory();

  let labelListComponent;

  if (labelLoading) {
  } else if (labelErrMsg) {
  } else {
    labelListComponent = [];

    for (const key in labelData) {
      const ele = labelData[key];
      const labelId = ele.id;
      const labelAttributes = ele.attributes;
      const handleClick = (e) => {
        history.push(`/tasks?labelId=${labelId}`);
        e.stopPropagation();
      };

      labelListComponent.push(
        <ListGroupItem
          action
          key={labelId}
          className="px-0"
          onClick={handleClick}
        >
          <Link to={`/tasks?tagId=${labelId}`}>
            {labelAttributes.description}
          </Link>
        </ListGroupItem>
      );
    }
  }

  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!modalOpen);
  const handleClick = (e) => {
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
