import useTransactions from "./../Hooks/useTransactions";
import React, { useRef, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import CustomToast from "./CustomToast";

const UploadTxnForm = () => {
    const [file, setFile] = useState<File>();
    const fileRef = useRef<any>();
    const { uploadTransactionCsv } = useTransactions();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const showToast = () => {
        setTimeout(() => {
            setIsSuccess(false);
            setIsError(false);
        }, 3000);
    };

    const onChangeHandler = (e) => {
        setFile(e.target.files[0]);
    };

    const onSubmit = async () => {
        if (!file) return;

        const response = await uploadTransactionCsv(file);

        if (response.status == 201) {
            setIsSuccess(true);
            setIsError(false);
            showToast();
        } else {
            setIsError(true);
            setIsSuccess(false);
            showToast();
        }
        (fileRef.current as any).value = "";
    };

    return (
        <>
            {isSuccess && (
                <CustomToast
                    variant="success"
                    title="Success"
                    message="File upload successful!"
                />
            )}
            {isError && (
                <CustomToast
                    variant="danger"
                    title="Failure"
                    message="File upload failure!"
                />
            )}

            <Card className="p-5 mt-3">
                <Row>
                    <Col lg={10}>
                        <Form.Control
                            ref={fileRef}
                            type="file"
                            accept="text/csv"
                            onChange={onChangeHandler}
                        />
                    </Col>
                    <Col lg={2}>
                        <Button
                            variant="primary"
                            onClick={onSubmit}
                            disabled={!file}
                        >
                            Upload File
                        </Button>
                    </Col>
                </Row>
            </Card>
        </>
    );
};

export default UploadTxnForm;
