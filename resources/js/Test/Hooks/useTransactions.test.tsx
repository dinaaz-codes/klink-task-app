import { renderHook } from "@testing-library/react";
import useTransactions from "../../Hooks/useTransactions";
import axios from "axios";
import { transactions, uploadCsvResponse } from "../stubs/transaction.stub";
jest.mock("axios");

describe("useTransaction hook", () => {

    it("should get transactions on getTransactions call", async () => {
        const mockResponseData = transactions();
        (axios as any).get.mockResolvedValueOnce({ data: mockResponseData });
        const { result } = renderHook(useTransactions);

        const response = await result.current.getTransactions(
            "0xa9d1e08c7793af67e9d92fe308d5697fb81d3e43",
            0
        );
        expect(response).toEqual(mockResponseData);
    });

    it("should be success on uploadtransactionsCsv", async () => {
        const mockResponseData = uploadCsvResponse();
        const { result } = renderHook(useTransactions);
        const file = new File(["foo"], "foo.csv", {
            type: "text/csv",
        });

        (axios as any).post.mockResolvedValueOnce(mockResponseData);

        const response = await result.current.uploadTransactionCsv(file);

        expect(response).toEqual(mockResponseData);
    });

    it("should throw error on call uploadtransactionsCsv for noncsv file", async () => {
        const { result } = renderHook(useTransactions);
        const file = new File(["foo"], "foo.txt", {
            type: "text/plain",
        });

        (axios as any).post.mockRejectedValue(new Error('error'));
        
        expect(result.current.uploadTransactionCsv(file)).rejects.toThrow();
    });
});
