import React from "react";
import PlayerNotes from "../PlayerNotes";
import {cleanup, render, screen, waitFor} from "@testing-library/react";
import axios from 'axios'; 

jest.mock('axios');

const mockPlayerNotes = {
    extraNotes: [
        {
        note_content: "extranote #1", 
        created_at: "12/08/23 06:06", 
        id:1}, 
        {
        note_content: "extranote #2",
        created_at: "12/08/23 06:06",
        id:2
        }
    ],
    notes: [{
        notes: "ciao from note"
    }]
}

axios.get.mockResolvedValue({data: mockPlayerNotes});


describe("Notes", () => {
    
    // beforeEach(() => jest.mock("../../__mocks__/PlayerNotes/axios"));
    afterEach(cleanup);

    it('should fetch profile note', async () => {
        render(
            <PlayerNotes playerInfo={[]}/>
        );
        const noteElement = await screen.findByTestId(`player-profile-note`);
        await waitFor(() => expect(noteElement.value).toBe('ciao from note'));        
    });
    
    it('should fetch extra notes', async () => {
        render(
            <PlayerNotes playerInfo={[]}/>
        );
        const extranoteElement = await screen.findAllByTestId(`extranote-content`);
        waitFor(() => expect(extranoteElement[0].innerText).toBe('extranote #1'));        
    });
})