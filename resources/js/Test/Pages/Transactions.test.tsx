import { render, screen, fireEvent } from "@testing-library/react";
import { transactions } from "../stubs/transaction.stub";
import * as useTransactions from "./../../Hooks/useTransactions";
import Transactions from "./../../Pages/Transactions";
import React from "react";
import "@testing-library/jest-dom";

describe("Transaction Page", () => {
    let getTransactions;

    beforeEach(() => {
        getTransactions = jest.fn().mockResolvedValue(transactions());
        jest.spyOn(useTransactions, 'useTransactions').mockImplementation(
            () => {
                return { getTransactions, uploadTransactionCsv: jest.fn() };
            }
        );

    });

    test("that component renders", async () => {
        render(<Transactions />);

        expect(await screen.getByTestId("search-box-id")).toBeInTheDocument();
        expect(screen.queryByText("Total Amount")).not.toBeInTheDocument();
    });

    test("that it lists transaction on search", async () => {
        render(<Transactions />);

        const searchInput = await screen.getByTestId("search-input-id");
        const searchButton = screen.getByTestId("search-button-id");

        fireEvent.change(searchInput, {
            target: { value: "0xa9d1e08c7793af67e9d92fe308d5697fb81d3e43" },
        });
        fireEvent.click(searchButton);
    });
});
