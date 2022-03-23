import React from "react";
import { Card } from "react-bootstrap";

const Header = ({ title, text1, text2 }) => {
  return (
    <div className="mb-2">
      <Card style={{ height: 60 }}>
        <div className="page-header mt-2">
          <h2 className="page-title ml-4">
            <b>{title}</b>
          </h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="!#" onClick={(event) => event.preventDefault()}>
                  {text1}
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {text2}
              </li>
            </ol>
          </nav>
        </div>
      </Card>
    </div>
  );
};

export default Header;
