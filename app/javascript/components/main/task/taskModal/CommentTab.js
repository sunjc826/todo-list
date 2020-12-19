import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Form,
  FormGroup,
  Input,
  Button,
} from "reactstrap";
import Comment from "./Comment";
import { postComment } from "../../../../redux/actions";

const CommentTab = ({ taskId, taskRelations }) => {
  const commentState = useSelector((state) => state.comment);
  const dispatch = useDispatch();

  const commentLoading = commentState.loading;
  const commentErrMsg = commentState.errMsg;
  const commentData = commentState.data;

  let commentsComponent;
  if (commentLoading) {
  } else if (commentErrMsg) {
  } else {
    const comments = taskRelations.comments.data.map((ele) => {
      const commentId = ele.id;
      return commentData[commentId];
    });

    commentsComponent = comments.map((comment) => {
      return (
        <Row key={comment.id}>
          <Col xs="12">
            <Comment {...comment.attributes} />
          </Col>
        </Row>
      );
    });
  }

  const [formComment, setFormComment] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // fetch post, then update store
    const formOutput = { content: formComment };
    dispatch(postComment(taskId, formOutput));
  };

  const form = (
    <Form onSubmit={handleSubmit}>
      <FormGroup row>
        <Col>
          <ListGroup flush>
            <ListGroupItem>
              <Input
                type="textarea"
                name="comment"
                id="comment"
                placeholder="Write a comment"
                value={formComment}
                onChange={(e) => setFormComment(e.target.value)}
              />
            </ListGroupItem>
            <ListGroupItem>
              <Button type="submit" color="primary">
                Add Comment
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Col>
      </FormGroup>
    </Form>
  );

  return (
    <Row>
      <Col xs="12">
        <ListGroup flush>{commentsComponent}</ListGroup>
      </Col>
      <Col xs="12">{form}</Col>
    </Row>
  );
};
// TODO: ListGroup flush not working?
export default CommentTab;
