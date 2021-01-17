import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardText,
  Container,
  Row,
  Col,
} from "reactstrap";
import data from "./supportData";

const Support = () => {
  return (
    <Container>
      <Row className="mt-3">
        <Col xs="12">
          <Card>
            <CardHeader tag="h3" className="bg-info">
              User Manual
            </CardHeader>
            <CardBody>
              {data.manual.map((paragraph, index) => {
                return (
                  <CardText key={index} style={{ whiteSpace: "pre-wrap" }}>
                    {paragraph}
                  </CardText>
                );
              })}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Support;
