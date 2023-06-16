/**
* Package Name: @iroomit/page-interaction-listener
* Original Author: iROOMit Inc.
* Original File: src/index.test.ts

* First Created: June 15, 2023
* Last Edited: June 15, 2023

* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
import {jest, describe, beforeEach, afterEach, test, expect} from '@jest/globals';

let PageInteractionListener: {
    addListener: (func: Function | Function[]) => void;
    removeListener: (func: Function | Function[]) => void;
};

describe("PageInteractionListener", () => {
  let mockListener: Function;

  beforeEach(() => {
    mockListener = jest.fn();

    return import('.').then(module => {
        PageInteractionListener = module.default;
        jest.resetModules();
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("addListener should add a single listener function and call it upon interaction", () => {

    PageInteractionListener.addListener(mockListener);

    expect(mockListener).not.toBeCalled();

    // Trigger the interaction
    document.dispatchEvent(new Event("mousedown"));

    expect(mockListener).toBeCalledTimes(1);
  });

  test("addListener should add multiple listener functions and call them upon interaction", () => {
    const mockListener2 = jest.fn();
    const mockListener3 = jest.fn();

    expect(mockListener).not.toBeCalled();
    expect(mockListener2).not.toBeCalled();
    expect(mockListener3).not.toBeCalled();

    PageInteractionListener.addListener([mockListener, mockListener2, mockListener3]);
    
    expect(mockListener).not.toBeCalled();
    expect(mockListener2).not.toBeCalled();
    expect(mockListener3).not.toBeCalled();


    // Trigger the interaction
    document.dispatchEvent(new Event("mousedown"));

    expect(mockListener).toBeCalledTimes(1);
    expect(mockListener2).toBeCalledTimes(1);
    expect(mockListener3).toBeCalledTimes(1);
  });

  test("addListener should not add listener functions after interaction is triggered", () => {
    // Trigger the interaction
    document.dispatchEvent(new Event("mousedown"));

    PageInteractionListener.addListener(mockListener);

    expect(mockListener).not.toBeCalled();
  });

  test("removeListener should remove a single listener function and it shouldn't get called upon trigger", () => {
    PageInteractionListener.addListener(mockListener);

    expect(mockListener).not.toBeCalled();

    PageInteractionListener.removeListener(mockListener);

    // Trigger the interaction again
    document.dispatchEvent(new Event("mousedown"));

    expect(mockListener).not.toBeCalled();
  });

  test("removeListener should remove multiple listener functions and the removed functions should no longer be called upon trigger", () => {
    const mockListener2 = jest.fn();
    const mockListener3 = jest.fn();

    PageInteractionListener.addListener([mockListener, mockListener2, mockListener3]);

    expect(mockListener).not.toBeCalled();
    expect(mockListener2).not.toBeCalled();
    expect(mockListener3).not.toBeCalled();

    PageInteractionListener.removeListener([mockListener, mockListener3]);

    expect(mockListener).not.toBeCalled();
    expect(mockListener2).not.toBeCalled();
    expect(mockListener3).not.toBeCalled();

    // Trigger the interaction
    document.dispatchEvent(new Event("mousedown"));

    expect(mockListener).not.toBeCalled();
    expect(mockListener2).toBeCalledTimes(1); // Still called
    expect(mockListener3).not.toBeCalled();
  });

  test("removeListener should not remove listener functions after interaction is triggered", () => {
    PageInteractionListener.addListener(mockListener);

    expect(mockListener).not.toBeCalled();

    // Trigger the interaction
    document.dispatchEvent(new Event("mousedown"));

    expect(mockListener).toBeCalledTimes(1);

    PageInteractionListener.removeListener(mockListener);

    // Trigger the interaction again
    document.dispatchEvent(new Event("mousedown"));

    expect(mockListener).toBeCalledTimes(1);
  });
});
