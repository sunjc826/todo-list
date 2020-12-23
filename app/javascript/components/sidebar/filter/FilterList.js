import React, { Fragment, useState } from "react";
import { Collapse, ListGroup, ListGroupItem } from "reactstrap";
import NewFilter from "./NewFilter";

const FilterList = ({ collapseOpen }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!modalOpen);

  let filterListComponent;

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
