import React from "react";
import TransactionTable from "./../../Components/TransactionTable";
import { Transaction } from "./../../Types/transaction";
import { render, screen } from "@testing-library/react";

describe("TransactionTable", () => {
    test("that it renders the component", async () => {
        const col = ["Tx Hash", "Date Time", "Wallet Address", "Amount"];
        const data: Transaction[] = [
            {
                id: "1",
                tx_hash: "test_hash_1",
                amount: 278,
                address: "test_address_1",
                date_time: new Date("2022-12-24T11:52:52.555Z"),
            },
            {
                id: "2",
                tx_hash: "test_hash_2",
                amount: 279,
                address: "test_address_2",
                date_time: new Date("2022-12-24T11:52:52.555Z"),
            },
            {
                id: "3",
                tx_hash: "test_hash_3",
                amount: 280,
                address: "test_address_3",
                date_time: new Date("2022-12-24T11:52:52.555Z"),
            },
        ];

        const responseData = {
            pageNo: 0,
            limit: 10,
            totalPages: 5,
            hasMore: true,
        };

        render(
            <TransactionTable
                col={col}
                data={data}
                onPageChangeHandler={jest.fn}
                paginationMeta={responseData}
                variant="light"
            />
        );

        expect(await screen.getByText("Tx Hash")).toBeTruthy();
        expect(screen.getByText("Date Time")).toBeTruthy();
        expect(screen.getByText("Amount")).toBeTruthy();
        expect(screen.getByText("Wallet Address")).toBeTruthy();
    });
});
