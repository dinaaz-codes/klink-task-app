import UploadTxnForm from "./../Components/UploadCsvForm";
import React from "react";
import { Container } from "react-bootstrap";

const Home = () => {
    return (
        <Container data-testid="home-id">
            <UploadTxnForm/>
        </Container>
    );
};

export default Home;
