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

describe("navbar", () => {
    
    it("navbar containes multiple links", () => {
        render(<MockNavMenu user={""}/>);
        const linkElement = screen.getAllByRole("link");
        expect(linkElement.length).toBeGreaterThan(1);
    });
    
    it("Contains the link to NBA Teams", async () => {
        render(<MockNavMenu/>);
        const linkElementNBATeams = await screen.findByText("NBA Teams");
        expect(linkElementNBATeams).toBeInTheDocument();
    })
})
