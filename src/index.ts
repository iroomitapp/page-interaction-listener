/**
* Package Name: @iroomit/page-interaction-listener
* Original Author: iROOMit Inc.
* Original File: src/index.ts

* First Created: September 29, 2022
* Last Edited: November 14, 2022

* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

// Store the listener functions added by the user
const _listeners: Array<Function> = [];

// Used to make sure the listener functions are triggered once and only once
var _triggered: boolean = false;

/**
   * Adds a function or array of functions to be executed once upon first page interaction.
   *
   * @param func - The function or array of functions to be executed
   *
   */
function addListener(func: Function | Array<Function>): void {

    if (_triggered) {
        console.warn("@iroomit/page-interaction-listener: Listener already triggered by interaction; adding a function now has no effect.");
        return;
    }

    if (func instanceof Array<Function>) { // if it's an array, add all the functions to listeners variable
        for (var i: number = 0; i < func.length; i++) {
            _listeners.push(func[i]);
        }
    } else if (func instanceof Function) { // otherwise, push the function
        _listeners.push(func);
    }
}

/**
   * Removes a function or array of functions that were to be executed once upon first page interaction.
   * 
   * If function(s) does not exist in the queue, a console warning is produced.
   * 
   * @param func - The function or array of functions that were already added (to be executed)
   *
   */
function removeListener(func: Function | Array<Function>): void {
    if (_triggered) {
        console.warn("@iroomit/page-interaction-listener: Listener already triggered by interaction; removing a function now has no effect.");
        return;
    }

    if (func instanceof Array<Function>) { // if it's an array, remove all the functions found in listeners variable
        for (var i: number = 0; i < func.length; i++) {
            let foundIndex: number = _listeners.indexOf(func[i]);

            if (foundIndex > -1) {
                _listeners.splice(foundIndex, 1); // remove the function if found in our listeners
            } else {
                console.warn("@iroomit/page-interaction-listener: A listener that was never added was attempted to be removed and failed.");
            }
        }
    } else if (func instanceof Function) { // otherwise, remove the single function if found
        let foundIndex: number = _listeners.indexOf(func);

        if (foundIndex > -1) {
            _listeners.splice(foundIndex, 1);
        } else {
            console.warn("@iroomit/page-interaction-listener: A listener that was never added was attempted to be removed and failed.");
        }
    }
}

// All listeners defined by the user are triggered here
function _onTrigger(e: Event): void {

    // We want to make sure we trigger this function once and only once
    if (_triggered) {
        return;
    }

    _triggered = true;

    for (var listener of _listeners) { // run all the user-defined listeners
        listener(); 
    }

    // Remove the listeners
    document.removeEventListener('mousedown', _onTrigger);
    document.removeEventListener('mousemove', _onTrigger);
    document.removeEventListener('touchstart', _onTrigger);
    document.removeEventListener('scroll', _onTrigger);
    document.removeEventListener('keydown', _onTrigger);

    // Finally, release local listeners
    while (_listeners.length) {
        _listeners.pop()
    }
}

// Make sure we're in a browser before adding our Main listener
// Makes safe for SSR with Next.js, Gatsby etc.
if (typeof window !== 'undefined') {

    // Trigger our main function on any input from the user in the browser
    document.addEventListener('mousedown', _onTrigger);
    document.addEventListener('mousemove', _onTrigger);
    document.addEventListener('touchstart', _onTrigger);
    document.addEventListener('scroll', _onTrigger);
    document.addEventListener('keydown', _onTrigger);
}

export default {
    addListener,
    removeListener
};