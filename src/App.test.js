import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import App, { FILTER_MAP, FILTER_NAMES } from "./App";

const mockData = [
  { id: "todo-0", name: "Code", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false },
];

afterEach(cleanup);

describe("The App component should be rendered successfully", () => {
  it("App component rendered without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App tasks={mockData} />, div);
  });

  it("App component snapshot test", () => {
    const componet = renderer.create(<App tasks={mockData} />);
    const tree = componet.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("FILTER_MAP object and the array FILTER_NAMES that contains its keys test", () => {
  it("FILTER_MAP object should contain 3 keys: All, Active, Completed", () => {
    expect(FILTER_MAP).toHaveProperty("All");
    expect(FILTER_MAP).toHaveProperty("Active");
    expect(FILTER_MAP).toHaveProperty("Completed");
  });
  it("FILTER_NAMES array should contain the keys of FILTER_MAP", () => {
    expect(FILTER_NAMES).toEqual(
      expect.arrayContaining(Object.keys(FILTER_MAP))
    );
  });
});

describe("Heading text test", () => {
  it("Heading text should display the number of active task(s)", () => {
    const { getByTestId } = render(<App tasks={mockData} />);
    const headingText = getByTestId("headingText");
    expect(headingText.textContent).toBe("0 tasks remaining");
  });
});
