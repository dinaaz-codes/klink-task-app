import { render,screen } from "@testing-library/react"
import React from 'react';
import TransactionOverview from "../../Components/TransactionOverview";
import { VariantType } from "../../Pages/Transactions";


describe("Transaction Overview",()=>{
    it("should render a component",async ()=>{
        const totalAmount=1000000
        const formattedTotalAmount = Intl.NumberFormat().format(totalAmount);

        render(<TransactionOverview  totalAmount={totalAmount} variant={VariantType.DARK} toggleVariant={jest.fn()}/>);

        expect(await screen.getByText(`Total Amount : ${formattedTotalAmount}`)).toBeTruthy();
        expect(screen.queryByTestId("famoon-light-id")).toBeTruthy();
    });
})