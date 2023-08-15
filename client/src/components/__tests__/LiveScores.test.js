import Livescores from "../LiveScores";
import {render, cleanup, screen} from "@testing-library/react";

test("test", () => {
    expect(true).toBe(true);
})

test("test-01", () => {
    render(<Livescores/>);
    const LiveScoreElement = screen.getByTestId("test-01");
})