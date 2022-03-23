import React, { Component } from "react";
import { Row, Col, Card } from "react-bootstrap";

const HeadLayoutSeacrh = ({ children }) => (
  <Col md="4" sm="12">
    {children}
  </Col>
);

const HeadLayoutButton = ({ children }) => (
  <Col>
    <div className="d-flex justify-content-center justify-content-sm-end mt-3 mt-sm-0">
      {children}
    </div>
  </Col>
);

const TableLayout = ({ children }) => <div className="mt-4">{children}</div>;

const HeadLayout = ({ children }) => <Row>{children}</Row>;

class Layout extends Component {
  static TableLayout = TableLayout;
  static HeadLayout = HeadLayout;
  static HeadLayoutSeacrh = HeadLayoutSeacrh;
  static HeadLayoutButton = HeadLayoutButton;

  render() {
    return (
      <Card>
        <Card.Body>{this.props.children}</Card.Body>
      </Card>
    );
  }
}

export default Layout;
