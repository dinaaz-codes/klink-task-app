const API_BASE_URL = "/api";

export const apiConfig = {
    transactions: {
        getTransactions: (walletAddress: string, pageNo: number) =>
            `${API_BASE_URL}/transaction?wallet_address=${walletAddress}&page=${pageNo}`,
        uploadCsv: `${API_BASE_URL}/transaction`,
    },
};
