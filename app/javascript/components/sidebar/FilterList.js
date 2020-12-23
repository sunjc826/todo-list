import React, { Fragment } from "react";
import { Collapse, ListGroup, ListGroupItem } from "reactstrap";

const FilterList = ({ collapseOpen }) => {
  let filterListComponent;

  const handleClick = () => {};

  return (
    <Fragment>
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
