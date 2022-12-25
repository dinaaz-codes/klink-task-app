import { apiConfig } from  "./../Config/api";
import { TxnResponse } from "./../Types/transaction";
import axios from "axios";

export const useTransactions = () => {
    const getTransactions = async (
        walletAddress: string,
        pageNo: number
    ): Promise<TxnResponse> => {
        try {
            const url = apiConfig.transactions.getTransactions(
                walletAddress,
                pageNo
            );

            const response = await axios.get(url);

            return response.data;
        } catch (err) {
            throw err;
        }
    };

    const uploadTransactionCsv = async (file: File) => {
        try {
            const url = apiConfig.transactions.uploadCsv;
            const formData = new FormData();

            formData.append("file", file);

            const response = await axios.post(url, formData);

            return response;
        } catch (err) {
            throw err;
        }
    };

    return {
        getTransactions,
        uploadTransactionCsv,
    };
};


export default useTransactions;