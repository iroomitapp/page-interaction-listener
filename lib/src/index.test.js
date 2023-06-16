"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
* Package Name: @iroomit/page-interaction-listener
* Original Author: iROOMit Inc.
* Original File: src/index.test.ts

* First Created: June 15, 2023
* Last Edited: June 15, 2023

* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
const globals_1 = require("@jest/globals");
let PageInteractionListener;
(0, globals_1.describe)("PageInteractionListener", () => {
    let mockListener;
    (0, globals_1.beforeEach)(() => {
        mockListener = globals_1.jest.fn();
        return Promise.resolve().then(() => __importStar(require('.'))).then(module => {
            PageInteractionListener = module.default;
            globals_1.jest.resetModules();
        });
    });
    (0, globals_1.afterEach)(() => {
        globals_1.jest.clearAllMocks();
    });
    (0, globals_1.test)("addListener should add a single listener function and call it upon interaction", () => {
        PageInteractionListener.addListener(mockListener);
        (0, globals_1.expect)(mockListener).not.toBeCalled();
        // Trigger the interaction
        document.dispatchEvent(new Event("mousedown"));
        (0, globals_1.expect)(mockListener).toBeCalledTimes(1);
    });
    (0, globals_1.test)("addListener should add multiple listener functions and call them upon interaction", () => {
        const mockListener2 = globals_1.jest.fn();
        const mockListener3 = globals_1.jest.fn();
        (0, globals_1.expect)(mockListener).not.toBeCalled();
        (0, globals_1.expect)(mockListener2).not.toBeCalled();
        (0, globals_1.expect)(mockListener3).not.toBeCalled();
        PageInteractionListener.addListener([mockListener, mockListener2, mockListener3]);
        (0, globals_1.expect)(mockListener).not.toBeCalled();
        (0, globals_1.expect)(mockListener2).not.toBeCalled();
        (0, globals_1.expect)(mockListener3).not.toBeCalled();
        // Trigger the interaction
        document.dispatchEvent(new Event("mousedown"));
        (0, globals_1.expect)(mockListener).toBeCalledTimes(1);
        (0, globals_1.expect)(mockListener2).toBeCalledTimes(1);
        (0, globals_1.expect)(mockListener3).toBeCalledTimes(1);
    });
    (0, globals_1.test)("addListener should not add listener functions after interaction is triggered", () => {
        // Trigger the interaction
        document.dispatchEvent(new Event("mousedown"));
        PageInteractionListener.addListener(mockListener);
        (0, globals_1.expect)(mockListener).not.toBeCalled();
    });
    (0, globals_1.test)("removeListener should remove a single listener function and it shouldn't get called upon trigger", () => {
        PageInteractionListener.addListener(mockListener);
        (0, globals_1.expect)(mockListener).not.toBeCalled();
        PageInteractionListener.removeListener(mockListener);
        // Trigger the interaction again
        document.dispatchEvent(new Event("mousedown"));
        (0, globals_1.expect)(mockListener).not.toBeCalled();
    });
    (0, globals_1.test)("removeListener should remove multiple listener functions and the removed functions should no longer be called upon trigger", () => {
        const mockListener2 = globals_1.jest.fn();
        const mockListener3 = globals_1.jest.fn();
        PageInteractionListener.addListener([mockListener, mockListener2, mockListener3]);
        (0, globals_1.expect)(mockListener).not.toBeCalled();
        (0, globals_1.expect)(mockListener2).not.toBeCalled();
        (0, globals_1.expect)(mockListener3).not.toBeCalled();
        PageInteractionListener.removeListener([mockListener, mockListener3]);
        (0, globals_1.expect)(mockListener).not.toBeCalled();
        (0, globals_1.expect)(mockListener2).not.toBeCalled();
        (0, globals_1.expect)(mockListener3).not.toBeCalled();
        // Trigger the interaction
        document.dispatchEvent(new Event("mousedown"));
        (0, globals_1.expect)(mockListener).not.toBeCalled();
        (0, globals_1.expect)(mockListener2).toBeCalledTimes(1); // Still called
        (0, globals_1.expect)(mockListener3).not.toBeCalled();
    });
    (0, globals_1.test)("removeListener should not remove listener functions after interaction is triggered", () => {
        PageInteractionListener.addListener(mockListener);
        (0, globals_1.expect)(mockListener).not.toBeCalled();
        // Trigger the interaction
        document.dispatchEvent(new Event("mousedown"));
        (0, globals_1.expect)(mockListener).toBeCalledTimes(1);
        PageInteractionListener.removeListener(mockListener);
        // Trigger the interaction again
        document.dispatchEvent(new Event("mousedown"));
        (0, globals_1.expect)(mockListener).toBeCalledTimes(1);
    });
});
