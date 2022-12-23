import React from "react";
import { Pagination } from "react-bootstrap";

type Props = {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNo: number) => void;
};

const CustomPagination = ({ currentPage, totalPages, onPageChange }: Props) => {

    return (
        <Pagination >
            <Pagination.First onClick={() => onPageChange(0)} />
            <Pagination.Prev
                disabled={currentPage <= 0}
                onClick={() => onPageChange(currentPage - 1)}
            />
            <Pagination.Item
                    key={currentPage}
                    onClick={() => onPageChange(currentPage)}
                    active={true}
                >
                    {currentPage + 1}
                </Pagination.Item>
            <Pagination.Next
                disabled={currentPage >= totalPages - 1}
                onClick={() => onPageChange(currentPage + 1)}
            />
            <Pagination.Last onClick={() => onPageChange(totalPages - 1)} />
        </Pagination>
    );
};

export default CustomPagination;
