const mockPlayernotes = {
           data: {
            notes: [
                {notes: "ciaos"}
            ]
           }
    
}

export default {
    get: jest.fn().mockResolvedValue(mockPlayernotes)
}