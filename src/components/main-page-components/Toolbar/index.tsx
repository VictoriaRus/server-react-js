import React from "react";
import "./Toolbar.css"
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface IToolBarProps {
    block: () => void;
    unblock: () => void;
    del: () => void;
}

const Toolbar = ({ block, del, unblock }: IToolBarProps) => {
    return (
        <Row className="toolbar">
            <Col className="d-flex justify-content-between">
                <Button variant="primary" onClick={ block }>Block</Button>
                <Button variant="success" onClick={ unblock }>Unblock</Button>
                <Button variant="danger" onClick={ del }>Delete</Button>
            </Col>
        </Row>
    );
};

export default Toolbar;