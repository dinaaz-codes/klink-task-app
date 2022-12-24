import React from "react";
import CustomPagination from "./../../Components/CustomPagination";
import { render ,screen } from "@testing-library/react";

describe("custom pagination", () => {
    test("that it renders the component",async () => {
        render(
            <CustomPagination
                currentPage={0}
                totalPages={5}
                onPageChange={() => jest.fn()}
            />
        );

        await screen.getByText("Next");

        expect(screen.getByText("Previous")).toBeTruthy();
        expect(screen.getByText("1")).toBeTruthy();
    });
});
