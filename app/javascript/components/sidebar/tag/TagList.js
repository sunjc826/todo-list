import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Collapse, ListGroup, ListGroupItem } from "reactstrap";

const TagList = ({ collapseOpen }) => {
  const tagState = useSelector((state) => state.tag);
  const tagLoading = tagState.loading;
  const tagErrMsg = tagState.errMsg;
  const tagData = tagState.data;

  const history = useHistory();

  let tagListComponent;

  if (tagLoading) {
  } else if (tagErrMsg) {
  } else {
    tagListComponent = [];

    for (const key in tagData) {
      const ele = tagData[key];
      const tagId = ele.id;
      const tagAttributes = ele.attributes;
      const handleClick = (e) => {
        history.push(`/tasks?tagId=${tagId}`);
        e.stopPropagation();
      };

      tagListComponent.push(
        <ListGroupItem
          action
          key={tagId}
          className="px-0"
          onClick={handleClick}
        >
          <Link to={`/tasks?tagId=${tagId}`}>{tagAttributes.description}</Link>
        </ListGroupItem>
      );
    }
  }

  return (
    <Fragment>
      <Collapse isOpen={collapseOpen}>
        <ListGroup flush>{tagListComponent}</ListGroup>
      </Collapse>
    </Fragment>
  );
};

export default TagList;
