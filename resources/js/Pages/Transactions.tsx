import SearchBox from "./../Components/SearchBox";
import TransactionOverview from "./../Components/TransactionOverview";
import TransactionTable from "./../Components/TransactionTable";
import useTransactions from "./../Hooks/useTransactions";
import { ResponseMeta, Transaction } from "./../Types/transaction";
import React, { useState } from "react";
import { Alert, Container } from "react-bootstrap";

export enum VariantType {
    DARK = "dark",
    LIGHT = "light",
}

const Transactions = () => {
    const [walletAddress, setWalletAddress] = useState<string>();
    const [pageNo, setPageNo] = useState<number>(0);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [transactions, setTransactions] = useState<Transaction[]>();
    const [transactionMeta, setTransactionMeta] = useState<ResponseMeta>();
    const [variant, setVariant] = useState<VariantType>(VariantType.DARK);
    const { getTransactions } = useTransactions();

    const toggleVariant = (variant: VariantType) => {
        if (variant == VariantType.DARK) {
            setVariant(VariantType.LIGHT);
        } else {
            setVariant(VariantType.DARK);
        }
    };

    const onSearchHandler = async () => {
        setPageNo(0);
        if (!walletAddress || walletAddress == "") return;
        const response = await getTransactions(walletAddress, pageNo);
        setTransactions(response.data.transactions);
        setTransactionMeta(response.meta);
        setTotalAmount(response.data.totalAmount);
    };

    const onPageChangeHandler = async (pageNo: number) => {
        setPageNo(pageNo);
        const response = await getTransactions(walletAddress??"", pageNo);
        setTransactions(response.data.transactions);
        setTransactionMeta(response.meta);
    };

    return (
        <Container>
            <div data-testid="search-box-id">
                <SearchBox
                    onSearchHandler={onSearchHandler}
                    onSearchChangeHandler={(value) => {
                        setWalletAddress(value);
                    }}
                />
            </div>

            {transactions && transactions.length > 0 && (
                <div className="m-3" data-testid="transaction-list-id">
                    <TransactionOverview
                        data-testid="transaction-overview-id"
                        totalAmount={totalAmount}
                        variant={variant}
                        toggleVariant={toggleVariant}
                    />
                    <TransactionTable
                        data-testid="transaction-table-id"
                        col={[
                            "Sr No",
                            "Date",
                            "TxnHash",
                            "Wallet Address",
                            "Amount",
                        ]}
                        data={transactions}
                        paginationMeta={transactionMeta}
                        onPageChangeHandler={onPageChangeHandler}
                        variant={variant}
                    />
                </div>
            )}
            {transactions?.length === 0 && (
                <Alert data-testid="bootstrap-alert-id" variant="light">
                    <h4> No Records found.</h4>
                </Alert>
            )}
        </Container>
    );
};

export default Transactions;
