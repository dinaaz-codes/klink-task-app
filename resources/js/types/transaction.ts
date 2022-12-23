export interface Transaction {
    id: string;
    tx_hash: string;
    amount: number;
    address: string;
    date_time: Date;
}

export type TxnResponse = {
    data: {
        transactions: Transaction[];
        totalAmount: number;
    };
    meta:ResponseMeta;
};

export type ResponseMeta = {
    pageNo: number;
    limit: number;
    totalPages: number;
    hasMore: boolean;
};
