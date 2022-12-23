import React from "react";
import { Table } from "react-bootstrap";
import CustomPagination from "./CustomPagination";
import { ResponseMeta, Transaction } from "@/types/transaction";

type Props = {
    variant:"dark"|"light";
    col: string[];
    data: Transaction[];
    paginationMeta: ResponseMeta;
    onPageChangeHandler: (pageNo: number) => void;
};

const TransactionTable = ({
    variant,
    col,
    data,
    paginationMeta,
    onPageChangeHandler,
}: Props) => {
    const getColumnHeader = () => {
        return (
            <tr>
                {col.map((header,index) => (
                    <th key={index} >{header}</th>
                ))}
            </tr>
        );
    };

    const getBody = () => {
        return data.map((transaction, index) => (
            <tr key={transaction.id}>
                <td>
                    {paginationMeta.limit * paginationMeta.pageNo + index + 1}
                </td>
                <td>{transaction.date_time.toString()}</td>
                <td>{transaction.tx_hash}</td>
                <td>{transaction.address}</td>
                <td>{transaction.amount}</td>
            </tr>
        ));
    };

    return (
        <>
            <Table  hover bordered variant={variant}>
                <thead>{getColumnHeader()}</thead>
                <tbody>{getBody()}</tbody>
            </Table>
            <CustomPagination
                currentPage={paginationMeta.pageNo}
                totalPages={paginationMeta.totalPages}
                onPageChange={onPageChangeHandler}
            />
        </>
    );
};

export default TransactionTable;
