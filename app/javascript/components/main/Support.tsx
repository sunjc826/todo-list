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

const Support = () => {
  return (
    <Container>
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>TodoApp Refund Department</CardHeader>
            <CardBody>
              <CardText>
                <i className="fas fa-phone"></i> 12345678
              </CardText>
              <CardText>
                <i className="fas fa-envelope"></i> legit@techsupport.com
              </CardText>
              <CardText>
                <i className="fas fa-fax"></i> +1-123-1234567
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Support;
