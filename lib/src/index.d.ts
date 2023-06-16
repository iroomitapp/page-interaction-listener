/**
* Package Name: @iroomit/page-interaction-listener
* Original Author: iROOMit Inc.
* Original File: src/index.ts

* First Created: September 29, 2022
* Last Edited: April 3, 2023

* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
/**
   * Adds a function or array of functions to be executed once upon first page interaction.
   *
   * @param func - The function or array of functions to be executed
   *
   */
declare function addListener(func: Function | Array<Function>): void;
/**
   * Removes a function or array of functions that were to be executed once upon first page interaction.
   *
   * If function(s) does not exist in the queue, a console warning is produced.
   *
   * @param func - The function or array of functions that were already added (to be executed)
   *
   */
declare function removeListener(func: Function | Array<Function>): void;
declare const PageInteractionListener: {
    addListener: typeof addListener;
    removeListener: typeof removeListener;
};
export default PageInteractionListener;
