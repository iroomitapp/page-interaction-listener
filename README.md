# Page Interaction Listener (@iroomit/page-interaction-listener)

[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)
![Version](https://img.shields.io/badge/Version-1.1.1-blue)

The purpose of this package is to easily delay code from running in the browser until the user has interacted with the page in some way (mouse-over, click, touch, scroll or keypress).

This can be used to lazy-load libraries and delay code that is not needed until the user has interacted with the page (UI code below the fold, UX libraries, analytics libraries, etc). This can reduce bundle size, improve initial page load time as well as the end-user experience as a result. Ultimately this will help with SEO (Search Engine Optimization).

✅ No additional libraries/imports (Pure JS)

✅ Small minified bundle size (< 2KB)

✅ Implemented in TypeScript/Full TypeScript Support

Compatible with any modern browser as it uses the native browser document events under the hood. Can be used with any major JavaScript/TypeScript library ([React](https://reactjs.org/), [Angular](https://angular.io/), [Vue](https://vuejs.org/)). SSR friendly for [Next.js](https://nextjs.org/), [Gatsby](https://www.gatsbyjs.com/), etc.

A live example can be seen on [iROOMit Roommates & Rooms Finder website](https://www.iroomit.com/) in your browser's Network Requests if you wait a bit before bringing your cursor into the page upon initial load of the website.

This code is licensed under the [MIT license](https://github.com/iroomitapp/page-interaction-listener/blob/main/LICENSE) as found in the license file.

⚠️ Warning: it is up to you to determine what is safe to lazy-load/delay and what is not. If not used carefully, this could break the page or have other unintended consequences.

## Installation

Simply run npm or yarn in your project's folder:

```
npm install @iroomit/page-interaction-listener
```

or 

```
yarn add @iroomit/page-interaction-listener
```

## Usage

Import the module in any file in your project (usually your main file makes sense, for example, your _app.js in Next.js, but other places may make sense as well):

```
import PageInteractionListener from '@iroomit/page-interaction-listener';
```

or you can import the two exposed functions, ```addListener``` and ```removeListener``` directly:

```
import { addListener, removeListener } from '@iroomit/page-interaction-listener';
```

### addListener(func: Function | Array\<Function\>)

Takes either a single function or an array of functions to run once and only once upon first user interaction with the page (for example, in React):

```
const App = (props) => {

  const codeToDelay = () => {
    import('lazy-loaded-module').then(mod => {/* your code with this lazy-loaded module */})
    
    // other expensive operations
  }

  React.useEffect(() => {
  
    addListener(codeToDelay);
  
  }, []); // call only once on component mount
  
  
  ...

}
```

You may call ```addListener``` multiple times across different modules if necessary, to add more functions that should be run on first interaction. However, it will have no effect after the first interaction has already occurred.

You can also add the same function multiple times, and it will be called multiple times.

### removeListener(func: Function | Array\<Function\>)

If for whatever reason you must remove a function you've added before the page interaction occurs, you can remove it with ```removeListener```:

```
removeListener(codeToDelay);
```

This will only remove the function if it exists in the queue and if the page interaction has not occurred already. If you've added the function multiple times, you will need to remove it multiples times as well.

Note that all functions are automatically flushed from the queue upon execution when the first interaction occurs.

*Are you looking for a roommate or a room to rent? [Check out iROOMit Roommate Finder App & Website](https://www.iroomit.com/) for thousands of roommates searching, rooms and places available today!*
