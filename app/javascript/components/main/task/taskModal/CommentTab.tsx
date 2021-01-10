import React, { useState, useContext } from "react";
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
import { AlertContext } from "../../../Main";
import {
  AppDispatch,
  Id,
  NonUserRelationshipRecord,
} from "../../../../redux/shared";
import { RootState } from "../../../../redux/rootReducer";

interface AppProps {
  taskId: Id;
  taskRelations: NonUserRelationshipRecord;
}

const CommentTab = ({ taskId, taskRelations }: AppProps) => {
  const commentState = useSelector((state: RootState) => state.comment);
  const dispatch: AppDispatch = useDispatch();

  const commentLoading = commentState.loading;
  const commentErrMsg = commentState.errMsg;
  const commentData = commentState.data;

  let commentsComponent;
  if (commentLoading) {
  } else if (commentErrMsg) {
  } else {
    const comments = taskRelations.comments.data.map((ele) => {
      const commentId = ele.id;
      return commentData![commentId];
    });

    commentsComponent = comments.map((comment) => {
      return (
        <Row key={comment.id}>
          <Col xs="12">
            <Comment
              {...comment.attributes}
              taskId={taskId}
              commentId={comment.id}
            />
          </Col>
        </Row>
      );
    });
  }

  const [formComment, setFormComment] = useState("");
  const { toggleAlert } = useContext(AlertContext)!;
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // fetch post, then update store
    const formOutput = { content: formComment };
    setFormComment("");
    dispatch(postComment(taskId, formOutput))
      .then(() => {
        toggleAlert({
          message: "Successfully created new comment",
          color: "success",
        });
      })
      .catch((err) => {
        toggleAlert({
          message: "Error: " + err.message,
          color: "danger",
        });
      });
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
