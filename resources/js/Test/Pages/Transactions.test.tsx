import { render, screen} from "@testing-library/react";
import Transactions from "./../../Pages/Transactions";
import React from "react";
import "@testing-library/jest-dom";

describe("Transaction Page", () => {
    
    test("that component renders", async () => {
        render(<Transactions />);

        expect(await screen.getByTestId("search-box-id")).toBeInTheDocument();
        expect(screen.queryByText("Total Amount")).not.toBeInTheDocument();
    });
});
