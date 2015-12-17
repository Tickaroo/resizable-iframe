var isIE = !!navigator.userAgent.toLowerCase().match(/trident/);

var calculateHeight = function() {};

if(isIE) {
  calculateHeight = function() {
   if(document.body) {
     return document.body.clientHeight + 30;
   } else {
     return -1;
   }
 }; 
} else {
  calculateHeight = function() {
    if(document.documentElement) {
      return document.documentElement.getBoundingClientRect().height;
    } else {
      return -1;
    }
  };
}

resizable_iframe = function() {
  this.knownHeight = 0;
  this.start();
};

resizable_iframe.prototype.checkHeight = function() {
  var newHeight = calculateHeight();
  if(newHeight != -1 && newHeight != this.knownHeight) {

    var message = JSON.stringify({
      tikEmbedIframeName: window.name,
      tikEmbedIframeHeight: newHeight
    });

    parent.postMessage(message, "*")

    this.knownHeight = newHeight;
  }
};


resizable_iframe.prototype.start = function() {
  if(!this.interval) {
    this.checkHeight();
    var self = this;
    this.interval = setInterval(function() {
      self.checkHeight();
    }, 1000);
  }
};

resizable_iframe.prototype.stop = function() {
  if(this.interval) {
    clearInterval(interval);
    this.interval = null;
  }
};

module.exports = resizable_iframe;