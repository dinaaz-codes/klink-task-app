import { VariantType } from "@/Pages/Transactions";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { faMoon as solidFaMoon } from "@fortawesome/free-solid-svg-icons";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
    totalAmount: number;
    variant: VariantType;
    toggleVariant: (variant: VariantType) => void;
};

const TransactionOverview = ({
    totalAmount,
    variant,
    toggleVariant,
}: Props) => {
    return (
        <Row >
            <Col lg={9}>
                <h4 className="text-success">
                    Total Amount : {Intl.NumberFormat().format(totalAmount)}
                </h4>
            </Col>
            <Col lg={2}></Col>
            <Col className="justify-content-end">
                {variant === VariantType.DARK ? (
                    <FontAwesomeIcon icon={faMoon}  onClick={()=>{toggleVariant(variant)}} color="warning" />
                ) : (
                    <FontAwesomeIcon icon={solidFaMoon} onClick={()=>{toggleVariant(variant)}}/>
                )}
            </Col>
        </Row>
    );
};

export default TransactionOverview;
