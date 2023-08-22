import React from "react";
import PlayerNotes from "../PlayerNotes";
import {cleanup, render, screen, waitFor} from "@testing-library/react";


describe("Notes are added correctly", () => {

    beforeEach(() => jest.mock("../../__mocks__/axios"));
    afterEach(cleanup);

    it('should fetch and render input element', async () => {
        render(
            <PlayerNotes playerInfo={[]}/>
        );
        const followerDivElement = await screen.findByTestId(`player-profile-note`);
        waitFor(() => expect(followerDivElement.value).toBe('ciao from note'));        
    });
    
    it('should fetch and render input element', async () => {
        render(
            <PlayerNotes playerInfo={[]}/>
        );
        const followerDivElement = await screen.findByTestId(`extranote`);
        waitFor(() => expect(followerDivElement.value).toBe('extranote #1'));        
    });
})