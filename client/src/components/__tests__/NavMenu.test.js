import React from "react";
import NavMenu from "../NavMenu";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";

const MockNavMenu = () => {
    return (
        <BrowserRouter>
            <NavMenu />
        </BrowserRouter>
    )
}

it("nevbar is shown", () => {
    render(<MockNavMenu user={""}/>);
    const linkElement = screen.getAllByRole("link");
    expect(linkElement.length).toBeGreaterThan(1);
})