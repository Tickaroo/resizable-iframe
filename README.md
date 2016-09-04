# resizable-iframe
[![npm version](https://badge.fury.io/js/resizable-iframe.svg)](https://www.npmjs.com/package/resizable-iframe) [![Build Status](https://travis-ci.org/Tickaroo/resizable-iframe.svg?branch=master)](https://travis-ci.org/Tickaroo/resizable-iframe) [![codecov.io](https://codecov.io/github/Tickaroo/resizable-iframe/coverage.svg?branch=master)](https://codecov.io/github/Tickaroo/resizable-iframe?branch=master)

Library to delegate size of an iframe to the parent window.

## Install

```bash
$ npm install --save resizable-iframe
```

## Build

This repository only includes the CommonJS module.  
If you wish to build this library without CommonJS environment run this commands:

```bash
npm i
npm run build
cd ./dist/
```

## Usage

Below is a example of usage.

#### Iframe document:

```javascript
// require it
var ResizableIframe = require('resizable-iframe');

// create a new instance on domready. it will be started automatically
var resizableIframe;
domready(function() {
  resizableIframe = new ResizableIframe();
});

// it can be stopped at any type
onSomeEvent(function() {
  resizableIframe.stop();
});

// and later restarted
onSomeEvent(function() {
  resizableIframe.start();
});
```

#### Parent document:

```javascript
window.addEventListener('message', function(event) {
  if (typeof event.data === 'string' && event.data.charAt(0) === '{') {
    var msg = JSON.parse(event.data);
    if (msg.iframeHeight) {
      myIframe.style.height = msg.iframeHeight + 'px';
    }
  }
}, false);
```


## API

### new ResizableIframe(options)
Creates new instance of `ResizableIframe`.

#### `intervalDuration`
type: `int`  
default: `1000`  
Defines the interval duration of the size check.

#### `nameKey`
type: `String`  
default: `'iframeName'`  
Name of the key with iframe's name value passed to the parent window.

#### `heightKey`
type: `String`  
default: `'iframeHeight'`  
Name of the key with iframe's height value passed to the parent window.


### instance.start()
Starts the messaging to the parent window. Automatically called on new instance initialization.

### instance.stop()
Stops the messaging to the parent window.
