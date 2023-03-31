const {_saveQuestion } = require("../data/_DATA");

describe("_saveQuestion", () => {
    it("should return true for correct parameters", async () => {
        const response = await _saveQuestion({
            optionOneText: "This is Option One",
            optionTwoText: "This is Option Two",
            author: "8xf0y6ziyjabvozdd253nd"
        });

        expect(response).toBeTruthy();
    });

    it("should return error with message", async () => {
        const response = await _saveQuestion({
            optionOneText: "This is Option One",
            optionTwoText: undefined,
            author: "8xf0y6ziyjabvozdd253nd"
        }).catch(e => e);;
        expect(response).toBe("Please provide optionOneText, optionTwoText, and author");
    });
});

