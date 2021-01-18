import React, { useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  CardText,
  Container,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import data from "./supportData";

const Support = () => {
  const [curPage, setCurPage] = useState("");

  return (
    <Container>
      <Row className="mt-3">
        <Col xs="12">
          <Card>
            <CardHeader tag="h3" className="bg-info">
              User Manual
            </CardHeader>
            <CardBody>
              <Pagination>
                {data.manual.map(({ title }) => {
                  return (
                    <PaginationItem
                      key={title}
                      onClick={() => setCurPage(title)}
                      active={curPage === title}
                    >
                      <Link
                        className="page-link"
                        to={`/support/${title}`}
                        id={title}
                      >
                        {title}
                      </Link>
                    </PaginationItem>
                  );
                })}
              </Pagination>
              <Switch>
                <Route exact path={`/support`}>
                  <CardText style={{ whiteSpace: "pre-wrap" }}>
                    Click one of the above links to see the relevant info
                  </CardText>
                </Route>
                {data.manual.map(({ title, content }) => {
                  return (
                    <Route exact path={`/support/${title}`} key={title}>
                      <CardText
                        style={{ whiteSpace: "pre-wrap", textIndent: 0 }}
                      >
                        {content}
                      </CardText>
                    </Route>
                  );
                })}
              </Switch>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Support;
