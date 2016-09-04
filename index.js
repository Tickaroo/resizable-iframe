var calculateHeight;
var isIE = !!navigator.userAgent.toLowerCase().match(/trident/);

if (isIE) {
  calculateHeight = function() {
   if (document.body) {
     return document.body.clientHeight + 30;
   } else {
     return -1;
   }
 };
} else {
  calculateHeight = function() {
    if (document.documentElement) {
      return document.documentElement.getBoundingClientRect().height;
    } else {
      return -1;
    }
  };
}

var ResizableIframe = function(options) {
  options = options || {};
  this.options = {
    nameKey: options.nameKey || 'iframeName',
    heightKey: options.heightKey || 'iframeHeight',
    intervalDuration: options.intervalDuration || 1000
  };
  this.knownHeight = 0;
  this.start();
};

ResizableIframe.prototype.checkHeight = function() {
  var newHeight = calculateHeight();
  if (newHeight !== -1 && newHeight !== this.knownHeight) {
    var sizeObject = {};
    sizeObject[this.options.nameKey] = window.name;
    sizeObject[this.options.heightKey] = newHeight;

    if (window.parent && parent.postMessage) {
      parent.postMessage(JSON.stringify(sizeObject), '*');
    }
    this.knownHeight = newHeight;
  }
};


ResizableIframe.prototype.start = function() {
  if ( ! this.interval) {
    this.checkHeight();
    var self = this;
    this.interval = setInterval(function() {
      self.checkHeight();
    }, this.options.intervalDuration);
  }
};

ResizableIframe.prototype.stop = function() {
  if (this.interval) {
    clearInterval(this.interval);
    this.interval = null;
  }
};

module.exports = ResizableIframe;
