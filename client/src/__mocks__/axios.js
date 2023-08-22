const mockPlayerNotes = {
        extranotes: ["extranote #1"],
        notes: [{
            notes: "ciao from note"
        }]

}

export default {
    get: jest.fn().mockResolvedValue({data: mockPlayerNotes})
}