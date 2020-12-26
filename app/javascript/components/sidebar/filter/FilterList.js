import React, { Fragment, useState } from "react";
import { Collapse, ListGroup, ListGroupItem } from "reactstrap";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import NewFilter from "./NewFilter";

const FilterList = ({ collapseOpen }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!modalOpen);

  let filterListComponent = [];
  const filterState = useSelector((state) => state.filter);
  const filterLoading = filterState.loading;
  const filterErrMsg = filterState.errMsg;
  const filterData = filterState.data;
  console.log(filterData);
  const history = useHistory();

  if (filterLoading) {
  } else if (filterErrMsg) {
  } else {
    for (const key in filterData) {
      const ele = filterData[key];
      const filterAttributes = ele.attributes;

      const handleClick = (e) => {
        history.push(`/tasks?filterId=${key}`);
        e.stopPropagation();
      };

      filterListComponent.push(
        <ListGroupItem key={key} action className="px-0" onClick={handleClick}>
          <Link to={`/tasks?filterId=${key}`}>
            {filterAttributes.description}
          </Link>
        </ListGroupItem>
      );
    }
  }

  const handleClick = (e) => {
    toggleModal();
    e.stopPropagation();
  };

  return (
    <Fragment>
      <NewFilter modalOpen={modalOpen} toggleModal={toggleModal} />
      <Collapse isOpen={collapseOpen}>
        <ListGroup flush>
          {filterListComponent}
          <ListGroupItem action className="px-0" onClick={handleClick}>
            <p className="text-secondary">
              <i className="fas fa-plus mr-1"></i>Add new Filter
            </p>
          </ListGroupItem>
        </ListGroup>
      </Collapse>
    </Fragment>
  );
};

export default FilterList;
