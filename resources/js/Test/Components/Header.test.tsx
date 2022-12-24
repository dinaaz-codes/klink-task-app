import { render, screen } from "@testing-library/react";
import Header from "./../../Components/Header";
import React from "react";

describe("Header", () => {
    it("should render component", async () => {
        render(<Header />);
        expect(await screen.queryByTestId("logo-id")).toBeTruthy();
        expect(screen.queryByText("Upload")).toBeTruthy();
        expect(screen.queryByText("Transactions")).toBeTruthy();
    });
});
