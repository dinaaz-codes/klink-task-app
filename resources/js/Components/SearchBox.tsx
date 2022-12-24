import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Form, Row, Col, Button, Card } from "react-bootstrap";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

type Props = {
    onSearchHandler: () => void;
    onSearchChangeHandler: (value: string) => void;
};

const SearchBox = ({ onSearchHandler, onSearchChangeHandler }: Props) => {
    return (
        <Card className="p-4 m-2">
            <Row className="justify-content-lg-center">
                <Col lg={7}>
                    <Form.Control
                        data-testid="search-input-id"
                        type="text"
                        placeholder="Enter Wallet Address"
                        onChange={(e) => {
                            onSearchChangeHandler(e.target.value);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") onSearchHandler();
                        }}
                    />
                </Col>
                <Col lg={1}>
                    <Button
                        data-testid="search-button-id"
                        variant="primary"
                        onClick={onSearchHandler}
                    >
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            color="white"
                        />
                    </Button>
                </Col>
            </Row>
        </Card>
    );
};

export default SearchBox;
