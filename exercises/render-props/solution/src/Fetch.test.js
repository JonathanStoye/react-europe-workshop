import React from "react";
import renderer from "react-test-renderer";
import Fetch from "./Fetch";

global.fetch = jest.fn();

describe("Fetch Commponent", () => {
  it("renders a snapshot that is good", () => {
    global.fetch.mockReturnValue(Promise.resolve({}));
    const tree = renderer
      .create(<Fetch url="https://something.com">{args => null}</Fetch>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("start with loading === true", () => {
    let result;
    const tree = renderer.create(
      <Fetch>
        {({ loading }) => {
          result = loading;
          return null;
        }}
      </Fetch>
    );
    expect(result).toBe(true);
  });

  it("should do data", done => {
    global.fetch.mockReturnValue(
      new Promise((resolve, reject) => {
        setTimeout(() => resolve({ json: () => "DATA" }), 1);
      })
    );
    let result;
    const tree = renderer.create(
      <Fetch>
        {({ data }) => {
          result = data;
          return null;
        }}
      </Fetch>
    );
    setTimeout(() => {
      expect(result).toBe("DATA");
      done();
    }, 2);
  });

  it("should do error", done => {
    global.fetch.mockReturnValue(
      new Promise((resolve, reject) => {
        setTimeout(() => reject("ERROR"), 1);
      })
    );
    let result;
    const tree = renderer.create(
      <Fetch>
        {({ error }) => {
          result = error;
          return null;
        }}
      </Fetch>
    );
    setTimeout(() => {
      expect(result).toBe("ERROR");
      done();
    }, 2);
  });
});
