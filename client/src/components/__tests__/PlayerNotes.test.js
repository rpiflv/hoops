import React from "react";
import PlayerNotes from "../PlayerNotes";
import {render, screen, fireEvent, cleanup, waitFor} from "@testing-library/react";

describe("notes is added correctly", () => {

    afterEach(cleanup);

    it("should render input element", async () => {
        render(<PlayerNotes playerInfo={[]} notes="ciao"/>);
        const textareaPlayerProfileNoteElement = await screen.findByTestId("player-profile-note");
        
        await waitFor(() => {
            expect(textareaPlayerProfileNoteElement).toBeInTheDocument();
        })
    });
    
    it("should render input element 2", async () => {
        render(<PlayerNotes playerInfo={[]} />);
        const textareaPlayerProfileNoteElement = await screen.findByTestId("player-profile-note");
        await waitFor(() => {
            expect(textareaPlayerProfileNoteElement).toBeInTheDocument();
        })
    });
})