import React from "react";
import NavMenu from "../NavMenu";
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";

const MockNavMenu = () => {
    return (
        <BrowserRouter>
            <NavMenu user={
            {
            accessToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZsYXZpb0BlbWFpbC5jb20iLCJpYXQiOjE2OTI3MDYxOTQsImV4cCI6MTY5MjcwOTc5NH0.-gYWUsuUT3zH3RPmecnZw_IFEV6vky9TTVJHb2DIHQ0",
            refreshToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZsYXZpb0BlbWFpbC5jb20iLCJpYXQiOjE2OTI3MDYxOTQsImV4cCI6MTcwMDQ4MjE5NH0.NG7gcrXmG17Z1IxY6WuET3ZFSmY5d2s9vpbdNkhyS-8",
            user_id:1
            }
        }/>
        </BrowserRouter>
    )
}

describe("Navbar", () => {
    
    it("navbar containes multiple links", () => {
        render(<MockNavMenu user={""}/>);
        const linkElement = screen.getAllByRole("link");
        expect(linkElement.length).toBeGreaterThan(1);
    });
    
    it("Contains the link to NBA Teams", async () => {
        render(<MockNavMenu/>);
        const linkElementNBATeams = await screen.findByText("NBA Teams");
        expect(linkElementNBATeams).toBeInTheDocument();
    });

    it("It shows My Players link if signed in", async () => {
        render(<MockNavMenu />);
        const linkElementMyPlayers = await screen.findByText("My Players");
        waitFor(() => expect(linkElementMyPlayers).toBeInTheDocument()); 

    })
})
