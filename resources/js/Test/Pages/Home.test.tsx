import { render, screen } from "@testing-library/react";
import Home from "../../Pages/Home";
import React from "react";

describe("Home", () => {
    it("should render upload transaction form", async () => {
        render(<Home />);
        expect(await screen.getByText(/upload file/i)).toBeTruthy();
    });
});
